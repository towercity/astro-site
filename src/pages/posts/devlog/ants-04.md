---
layout: ../../../layouts/MarkdownPostLayout.astro
pubDate: 2025-06-10
title: "ants devlog 4: what if an ant could sense when food's nearby?"
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
before anything else, let's simplify the vars we use in our `ant_move()` code: previously, we referenced our current ant's x and y via their object, but if we want to reference them more often in our movement function, as we plan to, it makes more sense to simplify those to just `x` and `y`. after all, its what we'll mean in this the most

any other code in this area is replacing these vars throughout

## act 2: a tired joke about not wanting to remove bugs
this ones simple, and well worth taking note of. in our `_init()` we added a new variable `debug_text`, set to a blank string, and we end our `_draw()` with a call to print this variable to the screen (at the end, so we know it's always on top of everything). at the moment, we don't add anything to this string, as we've more or less cleaned thing up, but a simple call of `debug_text = debug_text .. "whatever we wanna check on"` keeps our business on the screen. very nice

also: _could_ we loop thru an array of strings to make this easier to add to? who cares! we can still do anything we want to later!

## act three: the actual changes we've made

> #### notice!
>
> this is wrong. this is very wrong. the sensing function we make is incredibly functional, but the way we choose to use it is very wrong. we just gotta pretend it isn't for a bit of narrative. spoiler, howver, this will end up bad

should be simple, right? we have a randomized movement function, let's slot in some new movement types.
under our list of movement options, let's add an elseif and add in a new function for looking nearby

### `find_nearby_dots`
^^ see that up there, that's what we'll be calling our sensing function. interested and detail-oriented readers (of whom, at the time of writing, i have none) will notice this is _not_ in the linked commit. that's cause i messed up rebasing. i have no desire to fix this, so it stands

that said, we can add the function in whole here now:

```lua
function find_nearby_dots(x,y,dist)
   local vals={}

   for i=0,dist-1 do
      local x1,x2=x+dist-i,x-dist+i
      local y1,y2=y+i,y-i

      if(0==i) then
         add(vals, {x1,y1})
         add(vals, {x2,y1})
         add(vals, {y2,x1})
         add(vals, {y2,x2})
      else
         add(vals, {x1,y1})
         add(vals, {x2,y1})
         add(vals, {x1,y2})
         add(vals, {x2,y2})
      end
   end

   return vals
end
```

isn't plaintext wonderful!
the above is essentially nonsense requiring a day or two of doing math (i have an MFA in creative writing), graph paper, highlighters, coordinate writing, refusing to look up answers because I'm doing this to keep my own creative forces occupied, not to make the most technically proper game. i will not be adding these notes to the page as ive moved apartment recently and dont wanna hafta get me scanner out. in place, let's just explain the finished process

end: we can of cousrse do this w/o x and y passed, as relative; link to comment
