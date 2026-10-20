import type { IntegrationDenial } from '@/core/denial';
import type { Environment } from '@/core/environment';
import {
  firstTrustedRoot,
  getToolRoute,
  outputFailedClosed,
  resolveContainedCwd,
} from '@/gate/intake';
import type { CommandToolKind, ToolCallContext } from '@/gate/invocation';
import { runConfiguredHookAdapter } from '@/hosts/hook/common';

interface GooseHookInput {
  event?: unknown;
  session_id?: unknown;
  matcher_context?: unknown;
  tool_name?: unknown;
  tool_input?: {
    command?: string;
    [key: string]: unknown;
  };
  working_dir?: unknown;
}

type GooseHookOutput = { decision: 'allow' } | { decision: 'block'; reason: string };

const GOOSE_COMMAND_TOOLS = new Map<string, CommandToolKind>([['developer__shell', 'auto']]);

function getGooseToolRoute(toolName: string) {
  return getToolRoute(toolName, GOOSE_COMMAND_TOOLS);
}

type GooseDenyOutput = (denial: IntegrationDenial) => void;

export async function runGooseHook(): Promise<void> {
  await runConfiguredHookAdapter<GooseHookInput>({
    agent: 'goose',
    createDenyOutput: (message): GooseHookOutput => ({ decision: 'block', reason: message }),
    createAllowOutput: (): GooseHookOutput => ({ decision: 'allow' }),
    isSupported: () => true,
    getToolName: (input) => input.tool_name,
    getToolInput: (input, toolName) => ({
      ok: true,
      input: input.tool_input,
      route: getGooseToolRoute(toolName),
    }),
    getContext: resolveGooseContext,
    getSessionId: (input) => (typeof input.session_id === 'string' ? input.session_id : undefined),
  });
}

function resolveGooseContext(
  input: GooseHookInput,
  toolInput: unknown,
  toolName: string,
  outputDeny: GooseDenyOutput,
  environment: Environment,
): ToolCallContext | null {
  const root = firstTrustedRoot(requestedGooseRoots(input), environment.paths);
  if (!root) {
    outputFailedClosed(outputDeny, toolInput, toolName);
    return null;
  }

  const base = resolveContainedCwd(gooseBaseCwd(input.working_dir), [root], environment.paths);
  if (!base) {
    outputFailedClosed(
      outputDeny,
      toolInput,
      toolName,
      typeof input.working_dir === 'string' ? input.working_dir : undefined,
    );
    return null;
  }

  return { configCwd: base, executionCwd: base };
}

function requestedGooseRoots(input: GooseHookInput): string[] {
  return typeof input.working_dir === 'string' && input.working_dir.trim() !== ''
    ? [input.working_dir]
    : [];
}

function gooseBaseCwd(cwd: unknown): string {
  return typeof cwd === 'string' && cwd.trim() !== '' ? cwd : '.';
}
