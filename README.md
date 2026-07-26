# WORKS Public Verifier

<!-- mcp-name: io.github.dyzcode/works-public -->

WORKS independently checks an immutable public GitHub commit against a pinned
static contract and returns a signed receipt. The pilot never executes
repository commands and supports only exact lowercase 40-character commit SHAs.

## Install in Codex

Add this repository as a marketplace:

```console
codex plugin marketplace add DYZCODE/works-plugins --ref v0.1.4
```

Restart the ChatGPT desktop app, open Plugins, choose **WORKS Plugins**, and
install **WORKS Public Verifier**.

## Install in Claude Code

Add the same repository as a marketplace and install the plugin:

```console
claude plugin marketplace add DYZCODE/works-plugins@v0.1.4
claude plugin install works-public@works-plugins
```

## MCP Registry

`server.json` contains the public remote-server metadata for the official MCP
Registry, but `v0.1.4` is not published there. A tool-only smoke test selected
the eligible commit, while its mutable-tag control timed out twice. Install the
plugin so the host also receives the strict selection and abstention skill.

## Pilot evidence

The frozen Codex gate passed with 20 of 20 eligible selections, zero activation
in 20 ineligible controls, complete receipt fidelity, and a 0.5905-second median
eligible-minus-control wall-time delta. One ineligible control recovered on its
single allowed retry.

Claude marketplace and plugin manifests validate, but autonomous Claude
selection was not executed for this release because the local test account
required reauthentication. No cross-host claim is made.

## Pilot scope

- MCP endpoint: `https://works-runner.vercel.app/mcp`
- Trust anchor: `https://works-runner.vercel.app/trust`
- Contracts: `node-package` and `env-safety`
- Source: public GitHub repositories at immutable commits
- Execution: static checks only

The automatic verification tool is read-only and stores no verification
telemetry, repository URL, commit SHA, source, tool body, credentials, or
installation identifier. Its signed receipt is returned to the caller only.

A passing static receipt proves only the outcomes declared by its contract. It
does not prove builds, tests, deployments, payments, runtime behavior, or market
validation.
