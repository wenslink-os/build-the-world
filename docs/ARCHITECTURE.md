# Architecture

The source catalog holds challenge ids, contracts, prerequisite ids, export names, case bodies and browser starters. Per-lab files expose the same code for editor-based learning.

The CLI imports an implementation in a Node worker. The harness creates an asynchronous function for each trusted test body and injects named exports plus assertion helpers. Each failure becomes a named result; startup and import errors become failures for all cases. The parent terminates long-running workers. The worker's elapsed time includes imports and startup.

The browser uses a module worker and an ephemeral Blob module for editable source. It runs the same harness and cases. The UI saves source and results per lab and per build/repair mode. Workers are terminated when switching labs, restoring work or starting another run. Local storage failures are surfaced without preventing use.

The server exposes static files only. There is no database, telemetry, user login or code-upload route. Browser state and CLI state are intentionally separate in v0.1.0.

WorldBreaker evaluates explicit dependency booleans and recovery choices. Both CLI and browser implementations are compared across every combination in tests. It shows degraded local behavior and refuses to misrepresent an offline payment as successful.

The service worker caches packaged assets. The authoritative offline delivery remains the source archive, because browser caches can be evicted.
