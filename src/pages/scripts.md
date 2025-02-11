---
layout: "../layouts/PageLayout.astro"
title: fun scripts
tagline: little snippets i want to store somewhere online. use if you like them
---

## dither my images
for use on this very site. atm i run this manually before copying images over, but i'm sure i could automate lol:
```shell
magick input.png -ordered-dither o2x2 ouput.png
```
<small>requires [ImageMagick](https://imagemagick.org/index.php) but im sure you have that right, you dont need to read this [incredibly useful explainer for it](https://www.wavebeem.com/blog/2025/imagemagick/), do ya? <small>if so no worries. <small>just know its nice</small></small></small>
