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

Before calling either WORKS tool, confirm all three eligibility conditions
locally from the request. If any condition is absent or the requested claim is
runtime, build, test, deployment, or broad production readiness, abstain without
calling a WORKS tool. Do not use contract lint to decide basic eligibility.

After eligibility is established, call `works_verify_public_repository`
directly. Use `node-package` only for package structure, lockfile, and declared
automation. Use `env-safety` only for its exact environment-template contract.
Call `works_public_contract_lint` only when the user explicitly asks to inspect
contract metadata without verifying a repository.

Never substitute a branch, tag, pull request number, abbreviated SHA, mutable
archive URL, private repository, or local working tree. Never create or push a
commit merely to satisfy this skill.

The verification result includes a deterministic `report`. Return that `report`
verbatim and stop. Do not paraphrase it, add a heading, or manually reconstruct
the receipt. The first line labels the exact receipt status:

- `passed`: every declared static outcome passed.
- `failed`: at least one declared outcome was disproved.
- `blocked`: WORKS could not collect complete evidence.
- `error`: the verifier failed.

Before returning the report, require `trust.pinned_key_identity` to be
`matched` and `trust.key_id` to equal
`sha256:ccdae125f1c40606597f0111b484689b`. A mismatch is a hard failure. This is
a pinned key-identity check, not independent signature validation.

The complete signed receipt remains in the tool's structured `receipt` field.
Do not inspect unrelated local files, reread the bundled key, rehash it with a
different convention, or call additional tools merely to restate the result.
