# Goose Installation

[Goose](https://github.com/block/goose) is the open source AI agent by Block. CC Safety Net
protects it through Goose's Open Plugins lifecycle hooks, which have supported `PreToolUse`
denial since Goose v1.35.0 ([block/goose PR #9304](https://github.com/block/goose/pull/9304)).

## Install

```bash
npx -y cc-safety-net@latest install --goose
```

or pick Goose from the interactive `cc-safety-net install` prompt. To update or remove it:

```bash
npx -y cc-safety-net@latest update
npx -y cc-safety-net@latest uninstall --goose
```

## Where the hook lives

Goose discovers plugins in `~/.agents/plugins/<name>/hooks/hooks.json` (user scope). CC Safety
Net writes its own plugin directory and hook config there:

```
~/.agents/plugins/cc-safety-net/hooks/hooks.json
```

The `GOOSE_PATH_ROOT` environment variable relocates the user plugins directory, exactly as
Goose resolves it; when set, `$GOOSE_PATH_ROOT/.agents/plugins/cc-safety-net/hooks/hooks.json`
is used instead. The command entry is written literally (no environment-variable interpolation
in paths). The config registers one `PreToolUse` rule with no `matcher`, so every tool call is
inspected and the adapter routes on the tool name itself — Goose's built-in shell tool is
`developer__shell`. Goose runs the entry with `sh -c` and a 30-second timeout.

A fresh install is enabled by default: Goose adds the newly discovered plugin to its
`config.yaml` with `enabled: true`. If Goose still does not trigger the hook after install,
check `goose`'s plugin settings (`~/.config/goose/settings.json`, Open Plugins
`disabledPlugins`) and restart the running session.

## The hook contract

- **Input.** Goose pipes the event payload as JSON on stdin. Tool events carry `event`,
  `session_id`, `matcher_context`, `tool_name`, `tool_input`, and `working_dir`. For the shell
  tool, the command is `tool_input.command`.
- **Deny.** Printing `{"decision":"block","reason":"..."}` on stdout (or exiting with status 2
  and the reason on stderr) blocks the tool call. Any other outcome — malformed output, a
  crash, or a timeout — lets the call proceed: Goose hooks are **fail-open**.
- **Allow.** An allowed call prints `{"decision":"allow"}`; Goose treats any stdout that is not
  a `block` as allow.

`cc-safety-net doctor` reports the Goose integration as configured when the managed rule is
present and drift-free (no narrowing `matcher`, `type: "command"`, 30-second timeout), and it
names any drift a reinstall would repair.

See [SECURITY.md](../SECURITY.md) for the fail-open contract and the security model.