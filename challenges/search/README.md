# Build an inverted index

Find documents containing every query term.

## Contract

`createIndex(documents)`

Tokenize using lowercase ASCII alphanumeric runs. Build word-to-document-id sets. search(query) returns sorted numeric ids matching every term. Empty queries return []. Repeated words must not duplicate results.

## Build

1. Run `node bin/btw.mjs init search` from the repository root.
2. Edit `work/search/solution.mjs`.
3. Run `node bin/btw.mjs test search`.
4. Run `node bin/btw.mjs break search` to install the deliberately broken implementation into a separate repair workspace.
5. Edit `work/search-repair/solution.mjs` and run `node bin/btw.mjs test search --repair`.

## Hints

1. Map each word to a Set of document ids.
2. Intersect candidate sets for multiword queries.

## Failure lab

Token boundary mismatch. The same acceptance tests expose the defect.

Reference implementation: `solution/solution.mjs`. Read it after trying the exercise.
