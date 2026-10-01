# Build a snapshot store

Store immutable content-addressed snapshots.

## Contract

`createStore(hash)`

createStore receives a deterministic hash function. commit accepts string-valued file maps, sorts filenames and hashes JSON entry pairs. checkout returns a fresh file map or throws. This teaches snapshots, not Git compatibility.

## Build

1. Run `node bin/btw.mjs init git` from the repository root.
2. Edit `work/git/solution.mjs`.
3. Run `node bin/btw.mjs test git`.
4. Run `node bin/btw.mjs break git` to install the deliberately broken implementation into a separate repair workspace.
5. Edit `work/git-repair/solution.mjs` and run `node bin/btw.mjs test git --repair`.

## Hints

1. Serialize sorted entries before hashing.
2. Store serialized data instead of caller-owned objects.

## Failure lab

Mutation after commit. The same acceptance tests expose the defect.

Reference implementation: `solution/solution.mjs`. Read it after trying the exercise.
