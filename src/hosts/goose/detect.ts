import { existsSync, readFileSync } from 'node:fs';
import type { DetectContext, HookDetection } from '@/hosts/detect/context';
import { GOOSE_HOOK_COMMAND, GOOSE_HOOK_TIMEOUT, getGooseHooksPath } from '@/hosts/goose/install';
import {
  findManagedPreToolUseRules,
  isJsonObjectRecord,
  preToolUseDriftErrors,
} from '@/hosts/install/hooks-config';

export function detect(context: DetectContext): HookDetection {
  const configPath = getGooseHooksPath(context.environment);

  if (!existsSync(configPath)) {
    return { platform: 'goose', status: 'n/a', configPath };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(configPath, 'utf-8'));
  } catch (e) {
    return {
      platform: 'goose',
      status: 'n/a',
      configPath,
      errors: [
        `Failed to parse Goose hooks config ${configPath}: ${e instanceof Error ? e.message : String(e)}`,
      ],
    };
  }

  const rule = isJsonObjectRecord(parsed)
    ? findManagedPreToolUseRules(parsed, GOOSE_HOOK_COMMAND)[0]
    : undefined;
  if (!rule) {
    return { platform: 'goose', status: 'n/a', configPath };
  }

  const errors = preToolUseDriftErrors(rule, GOOSE_HOOK_COMMAND, GOOSE_HOOK_TIMEOUT);
  return {
    platform: 'goose',
    status: 'configured',
    method: 'hook config',
    configPath,
    errors: errors.length > 0 ? errors : undefined,
  };
}
