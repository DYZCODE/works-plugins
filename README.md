# WORKS Public Verifier

<!-- mcp-name: io.github.DYZCODE/works-public -->

WORKS independently checks an immutable public GitHub commit against a pinned
static contract and returns a signed receipt. The pilot never executes
repository commands and supports only exact lowercase 40-character commit SHAs.

## One-command install

Install in every detected supported agent without supplying a Vercel credential:

```console
npx github:DYZCODE/works-plugins
```

Use `--client codex` or `--client claude` to select only one host. Restart the
host after the installer completes.

After success, the installer sends one bodyless aggregate install signal. It
contains no installation ID, account, repository, payload, or cookie and can be
disabled with `--no-signal`.

## Install in Codex

Add this repository as a marketplace:

```console
codex plugin marketplace add DYZCODE/works-plugins --ref v0.1.9
```

Restart the ChatGPT desktop app, open Plugins, choose **WORKS Plugins**, and
install **WORKS Public Verifier**.

## Install in Claude Code

Add the same repository as a marketplace and install the plugin:

```console
claude plugin marketplace add DYZCODE/works-plugins@v0.1.9
claude plugin install works-public@works-plugins
```

## MCP Registry

The official MCP Registry metadata points to a dedicated three-tool endpoint.
Its frozen Codex gate passed with 20 of 20 eligible verifications, zero
verification in 20 ineligible controls, 100% eligible response fidelity, and no
final host errors. Ineligible controls had a 34.8955-second median and a
67.353-second maximum final wall time. One control recovered on its single
allowed retry.

The Registry is currently in preview. The Codex and Claude plugin path remains
available so supported hosts can also install the strict selection and
abstention skill.

The `v0.1.6` Registry attempt was rejected before publication because its
GitHub namespace casing did not match the OIDC grant. `v0.1.7` published the
correct Registry metadata but retained the previous Codex adapter version.
`v0.1.8` aligned the Codex, Claude, and Registry release metadata. `v0.1.9`
adds the one-command installer and its bodyless aggregate install signal without
changing the validated verification tool or trust anchor.

## Pilot evidence

The frozen Codex gate passed with 20 of 20 eligible selections, zero activation
in 20 ineligible controls, complete receipt fidelity, and a 0.5905-second median
eligible-minus-control wall-time delta. One ineligible control recovered on its
single allowed retry.

Claude marketplace and plugin manifests validate, but autonomous Claude
selection was not executed for this release because the local test account
required reauthentication. No cross-host claim is made.

## Pilot scope

- Plugin MCP endpoint: `https://works-runner.vercel.app/mcp`
- Registry MCP endpoint: `https://works-runner.vercel.app/mcp-registry`
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
