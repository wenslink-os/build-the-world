# Build an expiring key-value store

Implement SET, GET and lazy expiration.

## Contract

`createKV(now)`

Inject now() in milliseconds. set(key,value,ttl=null) replaces a key; null TTL never expires. A key expires when now >= deadline. Missing or expired get returns null. Negative TTL throws. delete returns whether a key existed.

## Build

1. Run `node bin/btw.mjs init redis` from the repository root.
2. Edit `work/redis/solution.mjs`.
3. Run `node bin/btw.mjs test redis`.
4. Run `node bin/btw.mjs break redis` to install the deliberately broken implementation into a separate repair workspace.
5. Edit `work/redis-repair/solution.mjs` and run `node bin/btw.mjs test redis --repair`.

## Hints

1. Store a deadline with each value.
2. Check >= at the expiration boundary, including zero TTL.

## Failure lab

Expiration boundary. The same acceptance tests expose the defect.

Reference implementation: `solution/solution.mjs`. Read it after trying the exercise.
