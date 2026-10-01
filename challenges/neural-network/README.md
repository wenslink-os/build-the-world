# Build a perceptron

Implement prediction and one training update.

## Contract

`predict(weights,bias,input), train(weights,bias,input,target,rate)`

predict returns 1 if dot(weights,input)+bias >= 0, otherwise 0. Dimensions must match. train returns fresh {weights,bias} using rate*(target-prediction) and does not mutate weights. This is a perceptron exercise, not an LLM.

## Build

1. Run `node bin/btw.mjs init neural-network` from the repository root.
2. Edit `work/neural-network/solution.mjs`.
3. Run `node bin/btw.mjs test neural-network`.
4. Run `node bin/btw.mjs break neural-network` to install the deliberately broken implementation into a separate repair workspace.
5. Edit `work/neural-network-repair/solution.mjs` and run `node bin/btw.mjs test neural-network --repair`.

## Hints

1. Compute a weighted sum plus bias.
2. Use the same prediction threshold when calculating error.

## Failure lab

Threshold disagreement. The same acceptance tests expose the defect.

Reference implementation: `solution/solution.mjs`. Read it after trying the exercise.
