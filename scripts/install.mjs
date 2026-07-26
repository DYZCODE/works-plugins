#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MARKETPLACE = "works-plugins";
const PLUGIN = "works-public@works-plugins";
const SOURCE = "DYZCODE/works-plugins";

function option(name, fallback = null) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? fallback : process.argv[index + 1];
}

function flag(name) {
  return process.argv.includes(`--${name}`);
}

function commandAvailable(command) {
  const probe = spawnSync(command, ["--version"], {
    encoding: "utf8",
    windowsHide: true,
    shell: false
  });
  return !probe.error;
}

export function codexExecutable({
  home = os.homedir(),
  platform = process.platform,
  configured = process.env.CODEX_CLI_PATH
} = {}) {
  const name = platform === "win32" ? "codex.exe" : "codex";
  const candidates = [
    configured,
    path.join(home, ".codex", "plugins", ".plugin-appserver", name),
    name
  ].filter(Boolean);
  return candidates.find(
    (candidate) => !path.isAbsolute(candidate) || existsSync(candidate)
  );
}

function run(command, args, { dryRun = false, allowFailure = false } = {}) {
  if (dryRun) {
    return { status: 0, stdout: "", stderr: "", command, args };
  }
  const result = spawnSync(command, args, {
    encoding: "utf8",
    windowsHide: true,
    shell: false
  });
  if (result.error) {
    if (allowFailure) return { ...result, status: 1 };
    throw result.error;
  }
  if (result.status !== 0 && !allowFailure) {
    throw new Error(
      `${path.basename(command)} ${args.join(" ")} failed: ${(
        result.stderr || result.stdout
      ).trim()}`
    );
  }
  return result;
}

function json(command, args) {
  const result = run(command, args);
  return JSON.parse(result.stdout || "null");
}

export function codexPlan({ marketplacePresent, pluginInstalled }) {
  return [
    marketplacePresent
      ? ["plugin", "marketplace", "upgrade", MARKETPLACE]
      : ["plugin", "marketplace", "add", SOURCE],
    ...(pluginInstalled
      ? [["plugin", "remove", PLUGIN], ["plugin", "add", PLUGIN]]
      : [["plugin", "add", PLUGIN]])
  ];
}

export function claudePlan({ marketplacePresent, pluginInstalled }) {
  return [
    marketplacePresent
      ? ["plugin", "marketplace", "update", MARKETPLACE]
      : ["plugin", "marketplace", "add", SOURCE],
    pluginInstalled
      ? ["plugin", "update", PLUGIN]
      : ["plugin", "install", PLUGIN, "--scope", "user"]
  ];
}

function installCodex({ dryRun }) {
  const executable = codexExecutable();
  if (!executable) throw new Error("Codex CLI is unavailable");
  let marketplacePresent = false;
  let pluginInstalled = false;
  if (!dryRun) {
    const marketplaces = json(executable, [
      "plugin",
      "marketplace",
      "list",
      "--json"
    ]);
    marketplacePresent = Boolean(
      marketplaces.marketplaces?.some(({ name }) => name === MARKETPLACE)
    );
    const plugins = json(executable, ["plugin", "list", "--json"]);
    pluginInstalled = Boolean(
      plugins.installed?.some(({ pluginId }) => pluginId === PLUGIN)
    );
  }
  const plan = codexPlan({ marketplacePresent, pluginInstalled });
  for (const args of plan) run(executable, args, { dryRun });
  return { client: "codex", status: "installed", commands: plan.length };
}

function installClaude({ dryRun }) {
  if (!dryRun && !commandAvailable("claude")) {
    throw new Error("Claude CLI is unavailable");
  }
  let marketplacePresent = false;
  let pluginInstalled = false;
  if (!dryRun) {
    const marketplaces = json("claude", [
      "plugin",
      "marketplace",
      "list",
      "--json"
    ]);
    marketplacePresent = Boolean(
      marketplaces?.some(({ name }) => name === MARKETPLACE)
    );
    const plugins = json("claude", ["plugin", "list", "--json"]);
    pluginInstalled = Boolean(
      plugins?.some(({ id }) => id === PLUGIN)
    );
  }
  const plan = claudePlan({ marketplacePresent, pluginInstalled });
  for (const args of plan) run("claude", args, { dryRun });
  return { client: "claude", status: "installed", commands: plan.length };
}

export function requestedClients(value, available) {
  if (value && !["codex", "claude", "both"].includes(value)) {
    throw new Error("--client must be codex, claude, or both");
  }
  if (value === "both") return ["codex", "claude"];
  if (value) return [value];
  const detected = [];
  if (available.codex) detected.push("codex");
  if (available.claude) detected.push("claude");
  if (detected.length === 0) {
    throw new Error("Neither Codex nor Claude CLI is available");
  }
  return detected;
}

export async function signalInstall({
  fetchImpl = fetch,
  endpoint = "https://works-runner.vercel.app/adoption"
} = {}) {
  try {
    const response = await fetchImpl(endpoint, {
      method: "POST",
      redirect: "error",
      signal: AbortSignal.timeout(3000)
    });
    return response.status === 204 ? "sent" : "rejected";
  } catch {
    return "unavailable";
  }
}

export async function main() {
  const dryRun = flag("dry-run");
  const available = {
    codex: Boolean(codexExecutable()),
    claude: dryRun || commandAvailable("claude")
  };
  const clients = requestedClients(option("client"), available);
  const results = clients.map((client) =>
    client === "codex" ? installCodex({ dryRun }) : installClaude({ dryRun })
  );
  const aggregateSignal =
    dryRun || flag("no-signal") ? "disabled" : await signalInstall();
  process.stdout.write(
    `${JSON.stringify({
      status: "ok",
      plugin: PLUGIN,
      endpoint: "https://works-runner.vercel.app/mcp",
      credentials_required: false,
      restart_required: true,
      aggregate_install_signal: aggregateSignal,
      dry_run: dryRun,
      results
    }, null, 2)}\n`
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
