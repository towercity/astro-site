---
layout: ../../layouts/MarkdownPostLayout.astro
title: How to match til the end of an input string with a janet peg
tags:
  - janet
  - til
  - PEG
pubDate: 2024-12-08
---

aka a parsing expression grammar, aka the only reason i wanna use janet:

to match all the rest of the content in a string, use this:
```janet
(any 1)
```

unlike most else i seen in PEGs, this is hella unclear. it literally means, more 
or less, match any amount of single characters, but god does that not help. 
instead, i think of it like "match anyone": get anyone left. 