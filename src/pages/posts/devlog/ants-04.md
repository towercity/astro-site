---
layout: ../../../layouts/MarkdownPostLayout.astro
pubDate: 2025-06-10
title: 'ants devlog 4'
tags:
- pico-8
- ants
- devlog
- code
- lua
- simulation
---

wait, let's make use of the tools given to us by default: here's the [commit for this post's code, on Github](https://github.com/towercity/pico-8/commit/711a188d81fa7a630eace70e9eef84bdbeaa5142)

had i thought on this far enough ahead, perhaps we'd have had a PR with many commits, one for each change, but in that idea's place let's follow a simple three act structure (out of 5, as you will see very soon our work ends with a large and tragic turn)

## act i: setting the scene
[code here](https://github.com/towercity/pico-8/commit/711a188d81fa7a630eace70e9eef84bdbeaa5142#diff-b721798d62d91dffebb80509dc1df0799026aee02d3447ecc980e801882a902bL91)

before anything else, let's simplify the vars we use in our `ant_move()` code: previously, we referenced our current ant's x and y via their object, but if we want to reference them more often in our movement function, as we plan to, it makes more sense to simplify those to just `x` and `y`. after all, its what we'll mean in this the most

any other code in this area is replacing these vars throughout
