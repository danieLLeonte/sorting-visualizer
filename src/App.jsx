import { useEffect, useRef, useState } from "react";

import Navbar from "./components/Navbar";
import { resetArray } from "./utils";
import { getMergeSortAnimations } from "./algorithms/mergeSort";

const ANIMATION_SPEED_MS = 0.5;
const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "red";

let isSorting = false;
let isSorted = false;

const App = () => {
  const [array, setArray] = useState(resetArray);
  const containerRef = useRef(null);

  const handleResetArray = () => {
    if (isSorting) return;
    setArray(resetArray);
    isSorted = false;
  };

  const mergeSort = () => {
    // Check if it's already sorting or sorted
    if (isSorting || isSorted) return;
  
    isSorting = true;
    const animations = getMergeSortAnimations(array);
    const arrayBars = containerRef.current.children;
  
    const executeAnimation = (index) => {
      if (index >= animations.length) {
        isSorting = false;
        isSorted = true;
        return;
      }
  
      const isColorChange = index % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[index];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = index % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
  
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      } else {
        const [barOneIdx, newHeight] = animations[index];
        const barOneStyle = arrayBars[barOneIdx].style;
  
        barOneStyle.height = `${newHeight}px`;
        setArray((prevArray) => {
          const newArray = [...prevArray];
          newArray[barOneIdx] = newHeight;
          return newArray;
        });
      }
  
      setTimeout(() => executeAnimation(index + 1), ANIMATION_SPEED_MS / array.length);
    };
  
    // Start the animation sequence
    executeAnimation(0);
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
            className="w-[2px] mx-[2px] inline-block array-bar"
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
