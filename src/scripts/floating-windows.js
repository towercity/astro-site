// get all the floaters on the screen
const floatingWindows = Array.from(
  document.querySelectorAll(".floating-window"),
).map((el) => {
  const { style, offsetLeft, offsetTop, offsetWidth, offsetHeight } = el;

  // then return a lot of data, so we can use it elsewhere if we want
  return {
    el,
    offsetLeft,
    offsetTop,
    offsetWidth,
    offsetHeight,
    style,
  };
});

// we have to set up the CSS in a separate call; unsure why
floatingWindows.forEach((wind) => {
  wind.style.position = "absolute";
  ["top", "left", "width", "height"].forEach((rule) => {
    wind.style[rule] =
      `${wind[`offset${rule[0].toUpperCase() + rule.slice(1)}`]}px`;
  });
});
