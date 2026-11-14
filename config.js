const path = require("path");

function readPositiveInteger(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

function readNonNegativeInteger(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : fallback;
}

function readBoolean(value, fallback) {
  if (value === undefined || value === null || String(value).trim() === "") {
    return fallback;
  }
  return !/^(0|false|no|off)$/i.test(String(value).trim());
}

const updateIntervalMs = readNonNegativeInteger(
  process.env.DATA_UPDATE_INTERVAL_MS,
  6 * 60 * 60 * 1000
);
const port = readPositiveInteger(process.env.PORT, 13000);
const host = process.env.HOST || "0.0.0.0";
const remoteSyncEnabled = readBoolean(process.env.DATA_REMOTE_SYNC, true);

module.exports = {
  host,
  port,
  remoteSyncEnabled,
  webhookPath: process.env.WEBHOOK_PATH || "/webhook",
  webhookSecret: process.env.GITHUB_WEBHOOK_SECRET || "",
  githubToken: process.env.GITHUB_TOKEN || "",
  dataPath: process.env.DATA_JS_PATH || path.join(__dirname, "data.js"),
  githubFileUrl:
    process.env.GITHUB_DATA_URL ||
    "https://raw.githubusercontent.com/Penguin134/5echmweb_search/refs/heads/index/data.js",
  githubApiUrl: process.env.GITHUB_CONTENT_API_URL || "",
  downloadUrl:
    process.env.DATA_DOWNLOAD_URL ||
    "https://raw.githubusercontent.com/Penguin134/5echmweb_search/refs/heads/index/data.js.zip",
  updateIntervalMs,
};
