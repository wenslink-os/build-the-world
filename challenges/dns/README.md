# Build a DNS cache

Cache names with deterministic TTLs.

## Contract

`createDNS(now)`

put(name,ip,ttl) stores an address until now()+ttl milliseconds. DNS names are case insensitive and may have one trailing dot. Expire at >= deadline. Missing names return null; negative TTL throws. No external network requests.

## Build

1. Run `node bin/btw.mjs init dns` from the repository root.
2. Edit `work/dns/solution.mjs`.
3. Run `node bin/btw.mjs test dns`.
4. Run `node bin/btw.mjs break dns` to install the deliberately broken implementation into a separate repair workspace.
5. Edit `work/dns-repair/solution.mjs` and run `node bin/btw.mjs test dns --repair`.

## Hints

1. Normalize both write and lookup keys.
2. Inject a clock so expiration tests do not sleep.

## Failure lab

DNS name normalization. The same acceptance tests expose the defect.

Reference implementation: `solution/solution.mjs`. Read it after trying the exercise.
