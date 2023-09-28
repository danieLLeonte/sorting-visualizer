import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import { resetArray } from "./utils";
import { getMergeSortAnimations } from "./algorithms/mergeSort";

const ANIMATION_SPEED_MS = 150;
const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "red";

let isSorting = false;
let isSorted = false;

const App = () => {
  const [array, setArray] = useState(resetArray);

  const handleResetArray = () => {
    if (isSorting) return;
    setArray(resetArray);
    isSorted = false;
  };

  const mergeSort = () => {
    // if already sorting or already sorted, return
    if (isSorting || isSorted) return;
    isSorting = true;

    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, (i * ANIMATION_SPEED_MS) / (array.length / 2));
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, (i * ANIMATION_SPEED_MS) / (array.length / 2));
      }
    }
    // set isSorting to false after the animations are done
    setTimeout(() => {
      isSorting = false;
      isSorted = true;
    }, (animations.length * ANIMATION_SPEED_MS) / (array.length / 2));
  };

  useEffect(() => {
    // if window size gets changed, reset the array
    window.addEventListener("resize", handleResetArray);
    return () => window.removeEventListener("resize", handleResetArray);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <Navbar handleResetArray={handleResetArray} mergeSort={mergeSort} />
      <main className="mt-2 flex justify-center overflow-x-scroll mx-auto">
        {array.map((value, idx) => (
          <div
            className="w-[2px] mx-[2px] inline-block array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}
          ></div>
        ))}
      </main>
    </div>
  );
};

export default App;
