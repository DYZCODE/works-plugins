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
codex plugin marketplace add DYZCODE/works-plugins --ref v0.1.13
```

Restart the ChatGPT desktop app, open Plugins, choose **WORKS Plugins**, and
install **WORKS Public Verifier**.

## Install in Claude Code

Add the same repository as a marketplace and install the plugin:

```console
claude plugin marketplace add DYZCODE/works-plugins@v0.1.13
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
changing the validated verification tool or trust anchor. `v0.1.10` makes the
installer replace older tag-pinned marketplace snapshots before reinstalling.
`v0.1.11` publishes the fresh paired multistack result and adds a locked,
testable installer package.
`v0.1.12` publishes the rejected v3 scale result and its successful targeted
v4 corrective canary without changing the public static verifier or trust anchor.
`v0.1.13` publishes the passing reserved v4b holdout and advances only the
technical evidence state; billing, the verifier, and the trust anchor are
unchanged.

## Pilot evidence

The frozen Codex gate passed with 20 of 20 eligible selections, zero activation
in 20 ineligible controls, complete receipt fidelity, and a 0.5905-second median
eligible-minus-control wall-time delta. One ineligible control recovered on its
single allowed retry.

Claude marketplace and plugin manifests validate, but autonomous Claude
selection was not executed for this release because the local test account
required reauthentication. No cross-host claim is made.

The fresh repair-agent pilot then compared 20 randomized pairs across Node,
Python, monolithic, and layered fixtures. WORKS passed 20/20 while the control
passed 6/20, a 70-point lift. It stayed within the frozen wall-time and verifier
call budgets; median input tokens increased by 53.24%. Raw results, score, hashes,
method, and limitations are in [`evidence/`](evidence/README.md).

The next frozen scale run stopped at 34 tasks with verdict `kill_or_pivot`.
WORKS retained a 23.33-point success lift and neutral median wall time, but
missed the 25% token limit at 26.44% and exhausted its final error budget. A
targeted four-case corrective canary then passed 4/4 with 68.32% lower median
input tokens and 67.08% lower median wall time than the corresponding v3 arms.

The reserved fresh v4b holdout then completed 23 decisive pairs. WORKS passed
21/23 while the same model without WORKS passed 7/23, a 60.87-point lift.
Median wall time fell 45.01% and median input tokens fell 20.44%. All frozen
runtime, fixture, verifier-call, selection, and error gates passed. One WORKS
arm timed out, and two Python repairs failed in both arms. This clears the
technical pilot gate; it does not prove organic routing, real-repository
performance, retention, willingness to pay, or a durable moat.

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
