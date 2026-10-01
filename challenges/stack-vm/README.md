# Build a stack machine

Evaluate a compact bytecode program.

## Contract

`execute(program)`

PUSH n appends a value. ADD and MUL pop two values and push the result. DUP copies the top. Missing operands and unknown instructions throw.

## Build

1. Run `node bin/btw.mjs init stack-vm` from the repository root.
2. Edit `work/stack-vm/solution.mjs`.
3. Run `node bin/btw.mjs test stack-vm`.
4. Run `node bin/btw.mjs break stack-vm` to install the deliberately broken implementation into a separate repair workspace.
5. Edit `work/stack-vm-repair/solution.mjs` and run `node bin/btw.mjs test stack-vm --repair`.

## Hints

1. An array is a stack.
2. Check operand count before popping.

## Failure lab

Stack underflow. The same acceptance tests expose the defect.

Reference implementation: `solution/solution.mjs`. Read it after trying the exercise.
