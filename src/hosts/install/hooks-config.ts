import { existsSync, mkdirSync, readdirSync, readFileSync, rmdirSync, rmSync } from 'node:fs';
import { dirname } from 'node:path';
import { atomicWriteFile } from '@/core/io/atomic-write';
import type { InstallResult } from '@/hosts/install/types';

export function isJsonObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseHooksConfig(raw: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(raw);
    return isJsonObjectRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function readPreToolUseRules(config: Record<string, unknown>): unknown[] {
  const preToolUse = isJsonObjectRecord(config.hooks) ? config.hooks.PreToolUse : undefined;
  return Array.isArray(preToolUse) ? preToolUse : [];
}

function writeHooksConfigFile(
  configPath: string,
  config: Record<string, unknown>,
  preToolUse: unknown[],
): void {
  const hooks = isJsonObjectRecord(config.hooks) ? config.hooks : {};
  atomicWriteFile(
    configPath,
    `${JSON.stringify({ ...config, hooks: { ...hooks, PreToolUse: preToolUse } }, null, 2)}\n`,
  );
}

function canonicalPreToolUseRule(command: string, timeout: number) {
  return { hooks: [{ type: 'command', command, timeout }] };
}

export function findManagedPreToolUseRules(
  config: Record<string, unknown>,
  command: string,
): Array<Record<string, unknown>> {
  return readPreToolUseRules(config).filter(
    (rule): rule is Record<string, unknown> =>
      isJsonObjectRecord(rule) &&
      Array.isArray(rule.hooks) &&
      rule.hooks.some((hook) => isJsonObjectRecord(hook) && hook.command === command),
  );
}

function stripManagedPreToolUseRules(rules: readonly unknown[], command: string): unknown[] {
  return rules.flatMap((rule) => {
    if (!isJsonObjectRecord(rule) || !Array.isArray(rule.hooks)) return [rule];
    const foreign = rule.hooks.filter(
      (hook) => !(isJsonObjectRecord(hook) && hook.command === command),
    );
    if (foreign.length === rule.hooks.length) return [rule];
    return foreign.length === 0 ? [] : [{ ...rule, hooks: foreign }];
  });
}

export function preToolUseDriftErrors(
  rule: Record<string, unknown>,
  command: string,
  timeout: number,
): string[] {
  const handlers = Array.isArray(rule.hooks) ? rule.hooks.filter(isJsonObjectRecord) : [];

  const managed = handlers.find((hook) => hook.command === command);
  return [
    ...(rule.matcher === undefined || rule.matcher === '' || rule.matcher === '*'
      ? []
      : ['Managed hook has a "matcher" that narrows coverage; reinstall to repair']),
    ...(managed?.type === 'command'
      ? []
      : ['Managed hook "type" is not "command"; reinstall to repair']),
    ...(managed?.timeout === timeout
      ? []
      : [`Managed hook "timeout" is not ${timeout}; reinstall to repair`]),
  ];
}

export function syncHooksConfigFile(
  configPath: string,
  command: string,
  timeout: number,
): InstallResult {
  if (!existsSync(configPath)) {
    mkdirSync(dirname(configPath), { recursive: true });
    writeHooksConfigFile(configPath, {}, [canonicalPreToolUseRule(command, timeout)]);
    return { path: configPath, alreadyInstalled: false };
  }

  const config = parseHooksConfig(readFileSync(configPath, 'utf-8'));

  if (!config) {
    writeHooksConfigFile(configPath, {}, [canonicalPreToolUseRule(command, timeout)]);
    return { path: configPath, alreadyInstalled: false };
  }

  const existing = readPreToolUseRules(config);
  const managed = findManagedPreToolUseRules(config, command);
  const canonical = canonicalPreToolUseRule(command, timeout);
  if (managed.length === 1 && JSON.stringify(managed[0]) === JSON.stringify(canonical)) {
    return { path: configPath, alreadyInstalled: true };
  }

  writeHooksConfigFile(configPath, config, [
    ...stripManagedPreToolUseRules(existing, command),
    canonical,
  ]);
  return { path: configPath, alreadyInstalled: false };
}

export function desyncHooksConfigFile(
  configPath: string,
  command: string,
  removeEmptyDirectories: readonly string[] = [],
): InstallResult {
  if (!existsSync(configPath)) return { path: configPath, alreadyInstalled: false };

  const config = parseHooksConfig(readFileSync(configPath, 'utf-8'));

  if (!config) return { path: configPath, alreadyInstalled: false };

  const existing = readPreToolUseRules(config);
  const stripped = stripManagedPreToolUseRules(existing, command);
  if (JSON.stringify(stripped) === JSON.stringify(existing)) {
    return { path: configPath, alreadyInstalled: false };
  }

  const hooks = isJsonObjectRecord(config.hooks) ? config.hooks : {};
  const onlyOurs =
    stripped.length === 0 && Object.keys(config).length === 1 && Object.keys(hooks).length === 1;
  if (onlyOurs) {
    rmSync(configPath);
    for (const directory of removeEmptyDirectories) {
      if (existsSync(directory) && readdirSync(directory).length === 0) rmdirSync(directory);
    }
    return { path: configPath, alreadyInstalled: true };
  }

  writeHooksConfigFile(configPath, config, stripped);
  return { path: configPath, alreadyInstalled: true };
}
