import { dirname, join } from 'node:path';
import type { Environment } from '@/core/environment';
import { desyncHooksConfigFile, syncHooksConfigFile } from '@/hosts/install/hooks-config';
import type { InstallResult } from '@/hosts/install/types';
import { managedHookCommands } from '@/hosts/managed-command';

export const GOOSE_HOOK_COMMAND = managedHookCommands.goose;
export const GOOSE_HOOK_TIMEOUT = 30;

const GOOSE_PLUGIN_NAME = 'cc-safety-net';

export function getGooseHooksPath(environment: Environment): string {
  return join(
    environment.env.get('GOOSE_PATH_ROOT') ?? environment.home,
    '.agents',
    'plugins',
    GOOSE_PLUGIN_NAME,
    'hooks',
    'hooks.json',
  );
}

export function installGoose(environment: Environment): InstallResult {
  return syncHooksConfigFile(
    getGooseHooksPath(environment),
    GOOSE_HOOK_COMMAND,
    GOOSE_HOOK_TIMEOUT,
  );
}

export function uninstallGoose(environment: Environment): InstallResult {
  const configPath = getGooseHooksPath(environment);
  return desyncHooksConfigFile(configPath, GOOSE_HOOK_COMMAND, [
    dirname(configPath),
    dirname(dirname(configPath)),
  ]);
}
