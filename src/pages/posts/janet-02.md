---
layout: ../../layouts/MarkdownPostLayout.astro
title: Janet PEGs don't accept unicode??
tags:
  - janet
  - til
  - PEG
  - unicode
pubDate: 2024-12-08
---

nope! not easily, at least. you can match unicode characters, but NOTHING is 
made easy for you, the way a regex `/u` flag will. that said, its still possible
with use of `(to)` 

look, for example, at a truncated version of a PEG i'm writing to pull info
from a french/english dictionary:
```janet
(def dict-result-peg
  ~{
    # ... catch some stuff
    :pronunciation (* "/" (to "/") "/")
    # ... and so on
   })
 
```

i wanna catch all the character in the words IPA prnounciation, which luckily 
enough are surrounded by `/`s. since janets PEGs don't allow for a character
class range of unicode prononciation strings, i instead use a `(to "/")` to 
grab all the text between delimiters. it's imprecise, but in this instance 
perfect, as i know ill never get a `/` in the prnonciation guide