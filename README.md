# WORKS Public Verifier

WORKS independently checks an immutable public GitHub commit against a pinned
static contract and returns a signed receipt. The pilot never executes
repository commands and supports only exact lowercase 40-character commit SHAs.

## Install in Codex

Add this repository as a marketplace:

```console
codex plugin marketplace add DYZCODE/works-plugins --ref main
```

Restart the ChatGPT desktop app, open Plugins, choose **WORKS Plugins**, and
install **WORKS Public Verifier**.

## Pilot scope

- MCP endpoint: `https://works-runner.vercel.app/mcp`
- Trust anchor: `https://works-runner.vercel.app/trust`
- Contracts: `node-package` and `env-safety`
- Source: public GitHub repositories at immutable commits
- Execution: static checks only

The default workflow does not send experiment telemetry. With explicit consent,
WORKS records aggregate verification metrics and a keyed installation hash. It
does not log the repository URL, commit SHA, tool body, or credentials.

A passing static receipt proves only the outcomes declared by its contract. It
does not prove builds, tests, deployments, payments, runtime behavior, or market
validation.
