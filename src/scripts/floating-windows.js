// get all the floaters on the screen
const floatingWindows = Array.from(
  document.querySelectorAll(".floating-window"),
).map((wind) => {
  return {
    el: wind,
    left: wind.offsetLeft,
    top: wind.offsetTop,
    width: wind.offsetWidth,
    height: wind.offsetHeight,
    style: wind.style,
  };
});

// set their positions in css now
floatingWindows.forEach((wind) => {
  wind.style.position = "absolute";
  ["left", "top", "width", "height"].forEach((rule) => {
    wind.style[rule] = `${wind[rule]}px`;
  });
});
