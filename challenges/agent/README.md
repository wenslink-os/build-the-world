# Build a bounded tool agent

Run an allowlisted plan with a hard step budget.

## Contract

`runAgent(plan,tools,budget)`

runAgent takes a list of {tool,input}, an object of allowed tool functions, and a nonnegative integer budget. Reject over-budget plans before invoking tools. Invoke tools in order, awaiting each. Only own properties of the tool object are allowed. No LLM or network is involved.

## Build

1. Run `node bin/btw.mjs init agent` from the repository root.
2. Edit `work/agent/solution.mjs`.
3. Run `node bin/btw.mjs test agent`.
4. Run `node bin/btw.mjs break agent` to install the deliberately broken implementation into a separate repair workspace.
5. Edit `work/agent-repair/solution.mjs` and run `node bin/btw.mjs test agent --repair`.

## Hints

1. Validate the plan length before execution.
2. Object.hasOwn prevents inherited property execution.

## Failure lab

Step budget bypass. The same acceptance tests expose the defect.

Reference implementation: `solution/solution.mjs`. Read it after trying the exercise.
