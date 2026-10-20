import { existsSync, readFileSync } from 'node:fs';
import type { DetectContext, HookDetection } from '@/hosts/detect/context';
import {
  GROK_BUILD_HOOK_COMMAND,
  GROK_BUILD_HOOK_TIMEOUT,
  getGrokBuildHooksPath,
} from '@/hosts/grok-build/install';
import {
  findManagedPreToolUseRules,
  isJsonObjectRecord,
  preToolUseDriftErrors,
} from '@/hosts/install/hooks-config';

export function detect(context: DetectContext): HookDetection {
  const configPath = getGrokBuildHooksPath(context.environment);

  if (!existsSync(configPath)) {
    return { platform: 'grok-build', status: 'n/a', configPath };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(configPath, 'utf-8'));
  } catch (e) {
    return {
      platform: 'grok-build',
      status: 'n/a',
      configPath,
      errors: [
        `Failed to parse Grok Build hooks config ${configPath}: ${e instanceof Error ? e.message : String(e)}`,
      ],
    };
  }

  const entry = isJsonObjectRecord(parsed)
    ? findManagedPreToolUseRules(parsed, GROK_BUILD_HOOK_COMMAND)[0]
    : undefined;
  if (!entry) {
    return { platform: 'grok-build', status: 'n/a', configPath };
  }

  const errors = preToolUseDriftErrors(entry, GROK_BUILD_HOOK_COMMAND, GROK_BUILD_HOOK_TIMEOUT);
  return {
    platform: 'grok-build',
    status: 'configured',
    method: 'hook config',
    configPath,
    errors: errors.length > 0 ? errors : undefined,
  };
}
