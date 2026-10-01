# Build a tiny CPU

Execute an 8-bit accumulator instruction set.

## Contract

`run(program)`

Accumulator starts at zero. LOAD, ADD and SUB wrap modulo 256. OUT appends a number. HALT stops. Unknown instructions throw.

## Build

1. Run `node bin/btw.mjs init cpu` from the repository root.
2. Edit `work/cpu/solution.mjs`.
3. Run `node bin/btw.mjs test cpu`.
4. Run `node bin/btw.mjs break cpu` to install the deliberately broken implementation into a separate repair workspace.
5. Edit `work/cpu-repair/solution.mjs` and run `node bin/btw.mjs test cpu --repair`.

## Hints

1. Use one accumulator and one output array.
2. Mask arithmetic results with 255.

## Failure lab

Arithmetic overflow. The same acceptance tests expose the defect.

Reference implementation: `solution/solution.mjs`. Read it after trying the exercise.
