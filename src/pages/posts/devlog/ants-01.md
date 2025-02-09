---
layout: ../../../layouts/MarkdownPostLayout.astro
pubDate: 2025-01-30
title: 'ants devlog 1'
tags: 
- pico-8
- ants
- devlog
- code
- lua
- simulation
---
to live is to struggle, of course, as well to die; pico-8 is a fantasy computer console.

in pico-8 i am simulating bugs. it is clear they aren't actual bugs, but bugs are the smallest creature i've seen that was also living (in high school, with microscopes, we made the bacteria die). therefore i am calling my creatures bugs, as a tip of the hat to the fact that they are living (or in other words _outside of my control_)

### world
first we must create a world for them to live in. pico8 offers three default functions, `_init()`, `_draw()`, and `_update()` (or, in our case, the closely related `_update60()` to do something similar in 60fps) to simulate our world, so let's start with these

`_init()` creates our world. at the moment we will be existentialists and encounter it as given. thus we will not touch upon it now

`_update60()` creates action in our world. now, as perhaps idealists, we will ignore this for now.

`_draw()` in fact is all we need to create our world. software after all is not concerned with reality, only representation, thank god. thus, we need only add the color of dirt to our draw function, as dirt is the insects' natural home. pico-8 uses a [integer index-based color palatte](https://pico-8.fandom.com/wiki/Palette#The_system_palette), so let's draw with that now:
```lua
function _draw()
    cls(4)
end
```

what does this mean? `_draw()`, run every frame, will create an image of all we've made. within in, `cls()` paints the screen a single color [^1], which we've set to `4`, in other words brown, the color of earth

every second, in other words, we will be reminded the earth is brown. i find this wonderful

![a square of brown](./assets/ants_0.png)
> our world so far: so much dirt

[^1]: [clears the graphics buffer](https://pico-8.fandom.com/wiki/Cls), so to say