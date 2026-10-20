import { afterEach, describe, expect, test } from 'bun:test';
import { detect as detectGoose } from '@/hosts/goose/detect';
import { installGoose, uninstallGoose } from '@/hosts/goose/install';
import type { TreeEntry, TreeSpec } from '../../helpers/fixture-tree';
import { differential, fileAt } from '../../helpers/host-differential';
import { removeTempRoots } from '../../helpers/temp-home';

const PLUGIN = '.agents/plugins/cc-safety-net';
const HOOKS = `${PLUGIN}/hooks/hooks.json`;
const HOOKS_PATH = `<home>/${HOOKS}`;
const MANAGED = 'npx -y cc-safety-net hook --goose';

const canonical = { hooks: [{ type: 'command', command: MANAGED, timeout: 30 }] };
const foreign = { matcher: 'developer__shell', hooks: [{ type: 'command', command: 'echo' }] };

const goConfig = (preToolUse: readonly unknown[], rest: Record<string, unknown> = {}) =>
  `${JSON.stringify({ hooks: { PreToolUse: preToolUse }, ...rest }, null, 2)}\n`;
const parseFile = (tree: unknown, path: string) => JSON.parse(fileAt(tree as never, path) ?? '{}');

const installInto = (seed: TreeSpec, env?: Record<string, string>) =>
  differential({ seed, env }, (environment) => installGoose(environment));
const uninstallFrom = (seed: TreeSpec) =>
  differential({ seed }, (environment) => uninstallGoose(environment));
const removeInstalled = (tree: TreeEntry[]) =>
  uninstallFrom({ [HOOKS]: fileAt(tree, HOOKS) ?? '' });
const detectOn = (seed: TreeSpec, env?: Record<string, string>) =>
  differential({ seed, env }, (environment) => detectGoose({ environment, cwd: environment.home }));

afterEach(removeTempRoots);

describe('the Goose hook config differential', () => {
  test('installs a canonical rule into a fresh home, then removes the whole plugin directory', async () => {
    const installed = await installInto({});
    expect(installed.outcome).toEqual({
      kind: 'returned',
      value: { path: HOOKS_PATH, alreadyInstalled: false },
    });
    expect(parseFile(installed.tree, HOOKS)).toEqual({ hooks: { PreToolUse: [canonical] } });

    const again = await installInto({ [HOOKS]: fileAt(installed.tree, HOOKS) ?? '' });
    expect(again.outcome).toMatchObject({
      kind: 'returned',
      value: { path: HOOKS_PATH, alreadyInstalled: true },
    });
    expect(fileAt(again.tree, HOOKS)).toBe(fileAt(installed.tree, HOOKS));
    expect(
      (await detectOn({ [HOOKS]: fileAt(installed.tree, HOOKS) ?? '' })).outcome,
    ).toMatchObject({
      kind: 'returned',
      value: {
        platform: 'goose',
        status: 'configured',
        method: 'hook config',
        configPath: HOOKS_PATH,
      },
    });

    const removed = await removeInstalled(installed.tree);
    expect(removed.outcome).toEqual({
      kind: 'returned',
      value: { path: HOOKS_PATH, alreadyInstalled: true },
    });
    expect(fileAt(removed.tree, HOOKS)).toBeUndefined();
    expect(removed.tree.map((entry) => entry.path)).not.toContain(PLUGIN);
  });

  test('repairs content the host would skip anyway', async () => {
    const repaired = await installInto({ [HOOKS]: 'not json' });
    expect(repaired.outcome).toEqual({
      kind: 'returned',
      value: { path: HOOKS_PATH, alreadyInstalled: false },
    });
    expect(parseFile(repaired.tree, HOOKS)).toEqual({ hooks: { PreToolUse: [canonical] } });
  });

  test('appends beside a foreign rule, keeps the rest, and strips only its own rule', async () => {
    const drifted = { hooks: [{ type: 'command', command: MANAGED, timeout: 5 }] };
    const seed = goConfig([foreign, drifted], { note: 1 });

    const installed = await installInto({ [HOOKS]: seed });
    expect(installed.outcome).toMatchObject({
      kind: 'returned',
      value: { path: HOOKS_PATH, alreadyInstalled: false },
    });
    expect(parseFile(installed.tree, HOOKS)).toEqual({
      hooks: { PreToolUse: [foreign, canonical] },
      note: 1,
    });

    const removed = await removeInstalled(installed.tree);
    expect(removed.outcome).toEqual({
      kind: 'returned',
      value: { path: HOOKS_PATH, alreadyInstalled: true },
    });
    expect(parseFile(removed.tree, HOOKS)).toEqual({
      hooks: { PreToolUse: [foreign] },
      note: 1,
    });
  });

  test('leaves content it cannot parse in place instead of deleting it', async () => {
    const removal = await uninstallFrom({ [HOOKS]: 'not json' });
    expect(removal.outcome).toEqual({
      kind: 'returned',
      value: { path: HOOKS_PATH, alreadyInstalled: false },
    });
    expect(fileAt(removal.tree, HOOKS)).toBe('not json');
  });

  test('follows GOOSE_PATH_ROOT out of the home directory', async () => {
    const relocated = 'goose-root/.agents/plugins/cc-safety-net/hooks/hooks.json';
    const installed = await installInto({}, { GOOSE_PATH_ROOT: '<home>/goose-root' });

    expect(fileAt(installed.tree, HOOKS)).toBeUndefined();
    expect(installed.outcome).toEqual({
      kind: 'returned',
      value: { path: `<home>/${relocated}`, alreadyInstalled: false },
    });
    expect(parseFile(installed.tree, relocated)).toEqual({ hooks: { PreToolUse: [canonical] } });
    expect(
      (
        await detectOn(
          { [relocated]: fileAt(installed.tree, relocated) ?? '' },
          { GOOSE_PATH_ROOT: '<home>/goose-root' },
        )
      ).outcome,
    ).toMatchObject({
      kind: 'returned',
      value: {
        platform: 'goose',
        status: 'configured',
        configPath: `<home>/${relocated}`,
      },
    });
  });
});

describe('the Goose detector differential', () => {
  test.each([
    [
      { matcher: 'developer__shell', hooks: canonical.hooks },
      'Managed hook has a "matcher" that narrows coverage; reinstall to repair',
    ],
    [
      { hooks: [{ type: 'inline', command: MANAGED, timeout: 30 }] },
      'Managed hook "type" is not "command"; reinstall to repair',
    ],
    [
      { hooks: [{ type: 'command', command: MANAGED, timeout: 5 }] },
      'Managed hook "timeout" is not 30; reinstall to repair',
    ],
  ])('names the drift a reinstall would repair: %o', async (rule, error) => {
    expect((await detectOn({ [HOOKS]: goConfig([rule]) })).outcome).toMatchObject({
      kind: 'returned',
      value: {
        platform: 'goose',
        status: 'configured',
        configPath: HOOKS_PATH,
        errors: [error],
      },
    });
  });

  test('says nothing is installed for a foreign, absent, or unparseable config', async () => {
    const absent = {
      platform: 'goose',
      status: 'n/a',
      configPath: HOOKS_PATH,
    };

    expect((await detectOn({ [HOOKS]: goConfig([foreign]) })).outcome).toMatchObject({
      kind: 'returned',
      value: absent,
    });
    expect((await detectOn({})).outcome).toMatchObject({ kind: 'returned', value: absent });

    const broken = await detectOn({ [HOOKS]: 'not json' });
    expect(broken.outcome).toMatchObject({
      kind: 'returned',
      value: {
        platform: 'goose',
        status: 'n/a',
        configPath: HOOKS_PATH,
        errors: [expect.stringContaining(`Failed to parse Goose hooks config ${HOOKS_PATH}: `)],
      },
    });
  });
});
