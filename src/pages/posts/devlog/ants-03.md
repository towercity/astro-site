---
layout: ../../../layouts/MarkdownPostLayout.astro
pubDate: 2025-06-10
title: 'ants devlog 3'
tags:
- pico-8
- ants
- devlog
- code
- lua
- simulation
---

this is part of a [series](/tags/ants). see the [previous post here](/posts/devlog/ants-02)

---

let's take the issue head on: my attempt to write this as a pseudo-tutorial has failed. i find the writing style draining, boring, forced, etc etc. worse, the more i put it off, the further i get from when i wrote the first part of my little ants simulation, so there ain't nothing there (or at least there's less and less there), to build on, it becomes an exercise in bland uninteresting recollection, i would prefer not to.

thus a new beginning, more honest to what i'm actually doing when i write these: let's look at my furthest draft of the code and reconstruct together what i think my ideas were

### the code itself
we're up to some 200 lines now, so lets put these into little tabs. explanation are after our little guy here, so scroll on by for more

<details name="code-tabs">
    <summary>0: basic functions</summary>
    <br>
     
```lua
function _init() 
   -- allow mouse :)
   poke(0x5f2d, 1)

   cur_init()
   ants_init()
   food_init()
end

function _update60()
   cur_update()
   local click=stat(34)
   --left click
   if(1==click) then
      sfx(0,-1,4)
      ants_add(cur_x,cur_y)
   end
   --right click
   if(2==click) then
      food_add(cur_x,cur_y)
   end
   
   food_update()
   ants_update()
end

function _draw()
   cls(4)
   food_draw()
   ants_draw()
   --ants_count()
   cur_draw()
end
```

</details>
<details name="code-tabs">
    <summary>1: cursor</summary>
    <br>
     
```lua
function cur_init()
   cur_spr=1
   cur_x=60
   cur_y=60
end

function cur_draw()
   spr(cur_spr,cur_x,cur_y)
end

function cur_update()
   --mouse loc
   cur_x=stat(32)-1
   cur_y=stat(33)-1
end

```

</details>
<details name="code-tabs">
    <summary>2: ants</summary>
    <br>
     
```lua

function ants_init()
   ants={}
end

function ants_add(x,y)
   ants[#ants+1]={x=x,y=y,age=0}
end

function ants_loop(func)
   loop_pixels(ants,func)
end

function ants_draw()
   ants_loop(
      function(ant)
         pset(ant.x,ant.y,0)
      end
   )
end

function ants_move()
   ants_loop(ant_move)
end

function ant_move(ant)
   local movement=rnd(100)
   
   if(95<movement) then
      ant.x=ant.x+1
   elseif(90<movement) then
      ant.y=ant.y+1
   elseif(85<movement) then
      ant.x=ant.x-1
   elseif(80<movement) then
      ant.y=ant.y-1
   end
   
   ant.x=loop_screen(ant.x)
   ant.y=loop_screen(ant.y)
end

function ants_age()
   ants_loop(function(ant)
         -- basic rand change to die
         if(ant) then
			local dead=
               flr(rnd(2000-ant.age))
			if(0==dead) then
               del(ants,ant)
			else
               ant.age = ant.age+1
			end
         end
   end)
end

function ants_count()
   local text="ants: " .. #ants
   print(text,2,120,6)
end

function ants_eat()
   -- we actually loop the food
   -- to easy unset it
   food_loop(function(food)
         if(food) then
			local eat=pget(food.x,food.y)
			if(eat==0) -- has ant on it
			then
               --make ant live longer
               foreach(ants, function(ant)
                          if(ant.x==food.x and 
                             ant.y==food.y) then
                             ant.age=ant.age-100
                          end
               end)
               --remove the food
               del(foods,food)
               sfx(1)
			end
         end
   end)
end

function ants_update()
   ants_move()
   ants_eat()
   ants_age()
end
```

</details>
<details name="code-tabs">
    <summary>3: loop helpers</summary>
    <br>
     
```lua
function loop_screen(pos)
   if(128<pos) return 0
   if(0>pos) return 128

   return pos
   end

function loop_pixels(arr,func)
   for i=1,#arr do
      func(arr[i])
   end
end

```

</details>
<details name="code-tabs">
    <summary>4: food</summary>
    <br>
     
```lua
function food_init()
   f_sprite={2,3}
   foods={}
   food_can_add=0
end

function food_add(c_x,c_y)
   --only add if not delayed
   if(0<=food_can_add) return
   
   sfx(2)
   --reset delay
   food_can_add=25
   local s_offset=
      rnd(f_sprite) * 8
   
   -- loop the sprite to add
   -- pixels
   for x=0,7 do
      for y=0,7 do
         local pix=sget(x+s_offset,y)
         if(0!=pix) then
            foods[#foods+1]=
               {x=c_x+x,y=c_y+y,col=pix}
         end
      end
   end
end

function food_draw()
   food_loop(
      function(food)
         pset(food.x,food.y,food.col)
      end
   )
end

function food_loop(func)
   loop_pixels(foods,func)
end

function food_update()
   food_can_add=food_can_add-1
end

```

</details>

### the explanations
i like accordions. let's do that again:

<details name="exp-tabs">
    <summary>0: basic functions</summary>
    <p>
    this one's mostly straightforward: call the init, update, and draw functions of further tabs. in init, we poke to enable mouse use, in update we handle clicks, and in draw we clear the screen. 
    </p>

</details>
<details name="exp-tabs">
    <summary>1: cursor</summary>
    <p>
    another simple one. in `init`, we set our cursor sprite, in `update` we pull in the x and y position of our cursor with inexplicable functions even _i_ dont understand (minus 1, for some sweet visual alignment tricks: it makes sure we dont hide our single pixel ants), and draw draws a sprite to the screen at that position. i think its neat. its simple. its a software sort of thing
    </p>
</details>
<details name="exp-tabs">
    <summary>2: ants</summary>
    <p>
     now we're doing something! we've got a lot here. if you've noticed, i have a tendency to order functions in a sort of least-to-most order, aka 'reverse', so let's describe them in reverse also, starting at the bottom of our code:
     
#### `ants_update`
the simple one: we call all the functions we write above. our ants will move, eat, then age and possibly die

#### `ants_eat`
our first hard one, in part reliable on some functions in our food tab (so read ahead!). in short, we have an array of pixels of 'food' as well as their x and y positions. we then read the screen data of the foods x and y coords: if its palette is 0, which is an ant, we 1) make the ant live longer by subtracting from its age value and 2) delete the food from the food array (see that tab bb). we also play a sound effect

#### `ants_count`
debug func: prints the count of ants to the screen 

#### `ants_age`
we loop through our ants via the to-be-described `ants_loop` function and try to kill them via rng. essentially: the closer their age gets to 2000, the higher the chance they die. if they live, we age them by one, increasing their chance to die later

#### `ants_move` and `ant_move`
loop through and move our ants. this parts lame as hell right now, just randomizing the direction and checking to loop the screen. this'll be a HUGE change point in
our shared future

#### `ants_draw` 
loop our ants and set their pixels on the screen. simple as hell

#### `ants_loop`
and you thought you might learn? no! we call a loop pixels functions on our ant, described elsewhere!

#### `ants_add` and `ants_init`
simple: we add an ant object at x and y in ants_add, we create a global ants array in init. this is real simple stuff, unfortunately
    </p>
</details>
<details name="exp-tabs">
    <summary>3: loop helpers</summary>
<p>
aint the most complicated things so simple also? `loop_screen` makes sure our position is on the 128x128 screen, `loop_pixels` takes in an array and runs a function on every member of it

why is these together, if so different? i dont' know. i wrote this months ago
</p>
</details>
<details name="exp-tabs">
    <summary>4: food</summary>
    <p>
our last little bit of complexity, then we're through. You've got this, reader. I've got this, writer, too.
    
in init, we set up three variables. `f_sprite` holds a list of sprites that we can produce as food, `foods` holds all the food pixels we've set on screen (the same way we've set pixels for ants), and `food_can_add` helps us set a little delay so that we can't just paint food across our screen

`food_add` adds food to the x+y off the cursor: first we made sure our food can be added by checking if our `food_can_add` is zero (or less---so we don't have to worry about keeping the addable time to zero); if we're good, we play a little sound, reset our food delay to 25 frames, then pick a sprite at random from our `f_sprite` variable set above. with that in place, we loop through the pixels of our food sprite and add them to our food array at the cursor location

`food_draw` loops these pixels to add them to the screen; `food_loop` makes looping these pixels easier

finally, on `food_update`, we count our food adding counter down one tick per frame
    </p>
</details>

so: that's a lot. its also a small bit messy, but oh well. ants are insects who live in dirt, we might as well attempt their lifestyles if we'd like to simulate

next up, back in the code for this, we'll try to add an ability for our ants to scent out food near them and follow, as well as follow each others scents. let's give it a go

apologies to everyone for occasionally misspelling it as 'aunts'. i will not go back and fix this
