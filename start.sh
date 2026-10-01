#!/bin/sh
cd "$(dirname "$0")" || exit 1
node bin/btw.mjs serve
