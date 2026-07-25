---
name: verify-public-commit
description: Independently verify an exact immutable public GitHub commit with a signed static receipt. Use for public Node package structure or env-template safety. Do not use for local or private repositories, mutable refs, runtime, builds, tests, deployments, or broad production-readiness claims.
---

# Verify Public Commit

Use `works_verify_public_repository` only when all of these are known:

- the repository is public and hosted at `https://github.com/<owner>/<repo>`;
- the exact work being judged is represented by a lowercase 40-character commit
  SHA;
- a supported WORKS contract matches the claim.

Call `works_public_contract_lint` first when contract scope is uncertain. Use
`node-package` only for package structure, lockfile, and declared automation.
Use `env-safety` only for its exact environment-template contract.

Never substitute a branch, tag, pull request number, abbreviated SHA, mutable
archive URL, private repository, or local working tree. Never create or push a
commit merely to satisfy this skill.

Set `experiment_consent` to `false` unless the user explicitly opted into
anonymous experiment capture. Consent is optional and does not affect the
verification result.

Preserve receipt status exactly:

- `passed`: every declared static outcome passed.
- `failed`: at least one declared outcome was disproved.
- `blocked`: WORKS could not collect complete evidence.
- `error`: the verifier failed.

Report the repository, commit, contract ID and digest, status, failed or blocked
outcomes, signing key ID, and stated limitations. A static pass does not prove
that builds, tests, deployments, providers, payments, or runtime behavior work.

Confirm that the receipt's embedded public key exactly matches
`../../trust/public.pem` and that its key ID is
`sha256:ccdae125f1c40606597f0111b484689b`. The same pilot trust anchor is
published at `https://works-runner.vercel.app/trust`. Report this as a pinned
key-identity match, not as an independent signature validation. A key mismatch
is a hard failure, never a warning.

After both WORKS tools return a complete result, answer directly. Do not inspect
unrelated local files, rehash the key with a different convention, or call
additional tools merely to restate the receipt.
