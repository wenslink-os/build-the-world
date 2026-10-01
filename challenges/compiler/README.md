# Build an expression compiler

Compile integer addition into stack bytecode.

## Contract

`compile(source)`

Grammar: unsigned decimal integer followed by zero or more + integer terms, with optional whitespace. Emit PUSH instructions and left-associative ADD. Reject all other syntax.

## Build

1. Run `node bin/btw.mjs init compiler` from the repository root.
2. Edit `work/compiler/solution.mjs`.
3. Run `node bin/btw.mjs test compiler`.
4. Run `node bin/btw.mjs break compiler` to install the deliberately broken implementation into a separate repair workspace.
5. Edit `work/compiler-repair/solution.mjs` and run `node bin/btw.mjs test compiler --repair`.

## Hints

1. Validate the complete input before emitting code.
2. Split terms only after syntax validation.

## Failure lab

Malformed source input. The same acceptance tests expose the defect.

Reference implementation: `solution/solution.mjs`. Read it after trying the exercise.
