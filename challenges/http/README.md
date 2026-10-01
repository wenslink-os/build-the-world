# Build an HTTP request parser

Parse a bounded HTTP/1.1 request head.

## Contract

`parseRequest(raw)`

Input ends its header section with CRLF CRLF. Return {method,path,headers}. Accept uppercase methods and HTTP/1.1 only. Lowercase header names; trim values. Reject duplicate headers, invalid lines and incomplete heads. Body decoding is outside this exercise.

## Build

1. Run `node bin/btw.mjs init http` from the repository root.
2. Edit `work/http/solution.mjs`.
3. Run `node bin/btw.mjs test http`.
4. Run `node bin/btw.mjs break http` to install the deliberately broken implementation into a separate repair workspace.
5. Edit `work/http-repair/solution.mjs` and run `node bin/btw.mjs test http --repair`.

## Hints

1. Find the header terminator first.
2. Reject duplicate names after normalizing case.

## Failure lab

Ambiguous duplicate headers. The same acceptance tests expose the defect.

Reference implementation: `solution/solution.mjs`. Read it after trying the exercise.
