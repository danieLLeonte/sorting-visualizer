// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function resetArray() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const MAX_HEIGHT_BAR = windowHeight - 160;
  const NUMBER_OF_ARRAY_BARS = Math.floor(windowWidth / 6.1);
  const array = [];
  for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
    array.push(randomIntFromInterval(5, MAX_HEIGHT_BAR));
  }
  return array;
}
