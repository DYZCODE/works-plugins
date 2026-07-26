import assert from "node:assert/strict";
import test from "node:test";
import {
  claudePlan,
  codexPlan,
  requestedClients,
  signalInstall
} from "../scripts/install.mjs";

test("fresh Codex install adds one marketplace and one plugin", () => {
  assert.deepEqual(
    codexPlan({ marketplacePresent: false, pluginInstalled: false }),
    [
      ["plugin", "marketplace", "add", "DYZCODE/works-plugins"],
      ["plugin", "add", "works-public@works-plugins"]
    ]
  );
});

test("install signal is bodyless and carries no identifier", async () => {
  let captured;
  const status = await signalInstall({
    fetchImpl: async (url, options) => {
      captured = { url, options };
      return { status: 204 };
    }
  });
  assert.equal(status, "sent");
  assert.equal(captured.url, "https://works-runner.vercel.app/adoption");
  assert.deepEqual(captured.options.method, "POST");
  assert.equal(captured.options.body, undefined);
  assert.equal(captured.options.headers, undefined);
});

test("existing Codex install refreshes both marketplace and plugin", () => {
  assert.deepEqual(
    codexPlan({ marketplacePresent: true, pluginInstalled: true }),
    [
      ["plugin", "remove", "works-public@works-plugins"],
      ["plugin", "marketplace", "remove", "works-plugins"],
      ["plugin", "marketplace", "add", "DYZCODE/works-plugins"],
      ["plugin", "add", "works-public@works-plugins"]
    ]
  );
});

test("existing Claude install replaces a potentially pinned marketplace", () => {
  assert.deepEqual(
    claudePlan({ marketplacePresent: true, pluginInstalled: true }),
    [
      ["plugin", "uninstall", "works-public@works-plugins"],
      ["plugin", "marketplace", "remove", "works-plugins"],
      ["plugin", "marketplace", "add", "DYZCODE/works-plugins"],
      [
        "plugin",
        "install",
        "works-public@works-plugins",
        "--scope",
        "user"
      ]
    ]
  );
});

test("client auto-detection can install both supported agents", () => {
  assert.deepEqual(
    requestedClients(null, { codex: true, claude: true }),
    ["codex", "claude"]
  );
  assert.throws(
    () => requestedClients(null, { codex: false, claude: false }),
    /Neither Codex nor Claude/
  );
});
