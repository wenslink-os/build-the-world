# Security

The local HTTP server listens on 127.0.0.1. It serves bundled static assets, accepts GET/HEAD only, and rejects paths outside the website. There is no code-execution HTTP endpoint.

CLI implementations execute in Node worker threads with a four-second timeout and a heap limit. Workers are resource controls, not an OS security sandbox: code can access files, spawn processes and use the network with your user privileges. Only execute code you trust. Do not run arbitrary downloaded packs. For untrusted exercises, use a disposable virtual machine with network and credentials removed.

Browser implementations run in a dedicated worker, separate from the main UI, with a four-second timeout. The local server supplies a restrictive resource policy. Workers are not a universal security boundary; they can use browser APIs permitted by the origin. Test bodies are bundled trusted code. Keep secrets outside the editor and do not treat test results or local badges as tamper-proof credentials.

This release never runs privileged containers or real network-fault commands. WorldBreaker is a deterministic model.

Before publishing a report, use the hosting repository's private vulnerability reporting feature if its maintainers have enabled it. Otherwise contact a listed maintainer privately through their published channel. Never post credentials or user data in an issue. A reporting email has intentionally not been invented.
