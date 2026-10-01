# Troubleshooting

**node is not recognized:** Install Node.js 20 or newer, reopen your terminal and check `node --version`.

**Address already in use:** Run `node bin/btw.mjs serve 4174`, then open port 4174.

**Blank page from index.html:** Start the local server. Browsers restrict module/fetch behavior for file URLs.

**Tests report Implement ...:** The starter is supposed to fail. Replace each exported function using the contract and hints.

**Workspace exists:** Your work is protected. Use it as-is, back it up, or deliberately reset with `--force`.

**Four second timeout:** Check infinite loops. Return or resolve promises. The teaching tests need very little compute.

**Progress missing:** Browser data is scoped to the exact origin, including port. CLI data is in `work/progress.json`. Export browser progress before clearing site data. Private browsing may discard local state.

**Offline page unavailable:** Start the local server from the archive. Service worker caching needs a prior completed load and can be removed by browser cache eviction.

**Repair tests failed:** This is expected before fixing the deliberately broken code. Read the failure explanation in the lab README.

## Optional browser smoke check

On a development machine, install Playwright and its Chromium browser, start the local server on port 4173, and run `node tests/browser.smoke.mjs`. Playwright is a development-only tool; the core project has no package dependencies.
