import { join } from 'node:path';
import type { Environment } from '@/core/environment';
import { desyncHooksConfigFile, syncHooksConfigFile } from '@/hosts/install/hooks-config';
import type { InstallResult } from '@/hosts/install/types';
import { managedHookCommands } from '@/hosts/managed-command';

export const GROK_BUILD_HOOK_COMMAND = managedHookCommands['grok-build'];
export const GROK_BUILD_HOOK_TIMEOUT = 30;

export function getGrokBuildHooksPath(environment: Environment): string {
  return join(
    environment.env.get('GROK_HOME') ?? join(environment.home, '.grok'),
    'hooks',
    'cc-safety-net.json',
  );
}

export function installGrokBuild(environment: Environment): InstallResult {
  return syncHooksConfigFile(
    getGrokBuildHooksPath(environment),
    GROK_BUILD_HOOK_COMMAND,
    GROK_BUILD_HOOK_TIMEOUT,
  );
}

export function uninstallGrokBuild(environment: Environment): InstallResult {
  return desyncHooksConfigFile(getGrokBuildHooksPath(environment), GROK_BUILD_HOOK_COMMAND);
}
