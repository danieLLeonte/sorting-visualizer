import { useEffect, useRef, useState } from "react";

import Navbar from "./components/Navbar";
import { resetArray } from "./utils";
import { getMergeSortAnimations } from "./algorithms/mergeSort";

const ANIMATION_SPEED_MS = 0.1;
const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "red";

let isSorting = false;
let isSorted = false;
let animationIndex = 0;
let lastTimestamp = 0;

const App = () => {
  const [array, setArray] = useState(resetArray);
  const containerRef = useRef(null);

  const handleResetArray = () => {
    if (isSorting) return;
    setArray(resetArray);
    isSorted = false;
  };

  const mergeSort = () => {
    if (isSorting || isSorted) return;

    isSorting = true;
    const animations = getMergeSortAnimations(array);
    const interval = ANIMATION_SPEED_MS / (array.length * 2);
    const arrayBars = containerRef.current.children;

    const animate = (timestamp) => {
      // Check if enough time has passed since the last animation step
      if (timestamp - lastTimestamp > interval) {
        lastTimestamp = timestamp;

        const isColorChange = animationIndex % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[animationIndex];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color =
            animationIndex % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        } else {
          const [barOneIdx, newHeight] = animations[animationIndex];
          const barOneStyle = arrayBars[barOneIdx].style;

          barOneStyle.height = `${newHeight}px`;
          setArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[barOneIdx] = newHeight;
            return newArray;
          });
        }

        animationIndex++;

        // Check if we've reached the end of our animations
        if (animationIndex >= animations.length) {
          isSorting = false;
          isSorted = true;
          return; // Stop the animation
        }
      }

      // Schedule the next frame
      requestAnimationFrame(animate);
    };

    // Start the animation
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    // If window size gets changed, reset the array
    window.addEventListener("resize", handleResetArray);
    return () => window.removeEventListener("resize", handleResetArray);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <Navbar handleResetArray={handleResetArray} mergeSort={mergeSort} />
      <main
        className="mt-2 flex justify-center overflow-x-auto mx-auto"
        ref={containerRef}
      >
        {array.map((value, idx) => (
          <div
            className="w-2 mx-0.5 inline-block array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}
          />
        ))}
      </main>
    </div>
  );
};

export default App;
