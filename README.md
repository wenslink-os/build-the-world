# 🌍 BUILD THE WORLD

**Build the technologies that built the world.**

From tiny CPUs to bounded agents. Learn it. Build it. Break it. Repair it.

## Start here

Requires Node.js 20 or newer. No npm dependencies, API keys, Docker, account or paid service.

1. Extract this archive.
2. Open a terminal in `build-the-world`.
3. Start the local website:

```sh
node bin/btw.mjs serve
```

Open **http://127.0.0.1:4173**. Choose a lab, implement its contract in the editor, and press **Run tests**. Click **Break it** for a separate repair attempt. Code and attempts are saved in browser local storage. Use **Export progress** for a backup. Opening `index.html` directly with `file://` is not supported; use the local server.

Windows: double-click `start.bat`. Linux/macOS: run `sh start.sh`.

## Build in your editor

```sh
node bin/btw.mjs list
node bin/btw.mjs init redis
# Edit work/redis/solution.mjs
node bin/btw.mjs test redis
node bin/btw.mjs break redis
# Edit work/redis-repair/solution.mjs
node bin/btw.mjs test redis --repair
node bin/btw.mjs hint redis
node bin/btw.mjs benchmark redis
node bin/btw.mjs progress
node bin/btw.mjs badge redis
```

`init` and `break` refuse to overwrite existing work unless you explicitly pass `--force`.

## Ten executable labs

| Lab | What you implement | Failure to repair |
| --- | --- | --- |
| Tiny CPU | 8-bit accumulator instructions | Arithmetic overflow |
| Stack VM | Stack operations and bytecode | Stack underflow |
| Expression compiler | Integer addition to bytecode | Malformed source input |
| Snapshot store | Immutable, content-addressed snapshots | Mutation after commit |
| Expiring KV | SET, GET, deletion and TTL | Expiration boundary |
| HTTP parser | Bounded HTTP/1.1 request heads | Duplicate header ambiguity |
| DNS cache | Canonical names and TTL | Name normalization |
| Search index | Tokenization and AND queries | Substring false positives |
| Perceptron | Prediction and one training step | Threshold disagreement |
| Tool agent | Allowlisted tools and step budget | Budget bypass |

Every lab contains a contract, starter, tests, hints, reference implementation, and deliberately broken implementation. All exercises use JavaScript ES modules. These are small educational models; the snapshot store is not Git, the key-value store is not Redis, and no exercise claims production compatibility with those projects.

## WorldBreaker

The website includes a dependency outage model for internet, DNS, authentication, payments, and database access. Toggle recovery policies and observe available, degraded, and unavailable features.

```sh
node bin/btw.mjs simulate internet,dns,payments
```

It never calls a real service or injects faults into your operating system. A queued draft never counts as a successful payment.

## Verify this release

```sh
node scripts/verify.mjs
# Or:
node bin/btw.mjs validate
node --test tests/platform.test.mjs
node bin/btw.mjs test redis --reference
```

37 platform checks cover all ten solutions, ten failure variants, ten starters, timeout handling, syntax errors, the server, metadata, and simulator consistency. The ten labs contain 59 acceptance cases in total. See `VERIFICATION.md` for the recorded checks.

## Offline use

The entire challenge catalog, website, tests, and solutions are in this archive. After installing Node.js, the local server and CLI need no network access. The website also caches its assets after an initial successful load on localhost or HTTPS. Browser cache eviction can remove those cached copies; the source archive remains your dependable offline copy. Browser and CLI progress are separate local stores.

## Repository layout

- `bin/`: CLI entrypoint.
- `engine/`: worker-based test runner, progress store, local server.
- `web/`: static website, editor, learning map, failure model, service worker.
- `challenges/`: ten self-contained executable labs.
- `tests/`: platform regression suite.
- `schemas/`: challenge metadata schema.
- `community/`: roadmap, governance, classroom sample, RFC template.
- `translations/`: English and Assamese getting-started guides.
- `.github/`: CI, issue templates, PR template, optional Pages publishing.

## Publish a static website

```sh
node scripts/build-site.mjs
```

Upload the contents of `dist/` to any static host. The `web/` folder itself is also deployable. Assets use relative URLs for repository subpaths. The optional GitHub Pages workflow must be manually enabled in the repository settings; no account or repository has been created by this archive.

## Scope of v0.1.0

This is a complete runnable foundation release, not the entire long-term curriculum. It includes the core build/test/break/repair loop, learning map, deterministic failure simulator, local progress, CLI badges and suite timing. The aspirational Rust engine, multi-language implementations, full OS/browser/LLM labs, local AI mentor, distributed failure injection, account sync and classroom management are future work. Benchmarks currently time acceptance suites including worker startup, not production throughput. No star count, accreditation or mastery claim is implied by passing these tests.

## Contribute

Read [CONTRIBUTING.md](CONTRIBUTING.md). Code is Apache-2.0; educational prose is CC BY 4.0. Original reference code and tests are included; no tutorial collection was scraped. See `LICENSE`, `LICENSE-CONTENT.md`, and `NOTICE`.
