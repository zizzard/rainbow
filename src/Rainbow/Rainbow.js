import { useEffect, useState, useRef } from "react";
import Pointer from "./Pointer";
import "./Rainbow.css";

import pointer_black from "./pointers/pointer-black.svg";
import pointer_red from "./pointers/pointer-red.svg";
import pointer_orange from "./pointers/pointer-orange.svg";
import pointer_yellow_orange from "./pointers/pointer-yellow-orange.svg";
import pointer_yellow from "./pointers/pointer-yellow.svg";
import pointer_green from "./pointers/pointer-green.svg";
import pointer_blue_green from "./pointers/pointer-blue-green.svg";
import pointer_blue from "./pointers/pointer-blue.svg";
import pointer_purple from "./pointers/pointer-purple.svg";

const COLORS = [
  "black",
  "red",
  "orange",
  "yellow-orange",
  "yellow",
  "green",
  "blue-green",
  "blue",
  "purple",
];
const SVG = [
  pointer_black,
  pointer_red,
  pointer_orange,
  pointer_yellow_orange,
  pointer_yellow,
  pointer_green,
  pointer_blue_green,
  pointer_blue,
  pointer_purple,
];

const DEFAULT_X = 20;
const DEFAULT_Y = 20;
const NUM_COLORS = 9;
const SPEED_SCALE = 8; //lower is slower

const DEFAULT_POSITIONS = [];
for (let i = 0; i < NUM_COLORS; i++)
  DEFAULT_POSITIONS.push({ x: DEFAULT_X, y: DEFAULT_Y });

function Rainbow() {
  //Refs are used to store data for computations
  //While the states are used to refresh the UI
  const requestRef = useRef(); //This ref is used to request another animation calculation

  const mouseX = useRef(DEFAULT_X);
  const mouseY = useRef(DEFAULT_Y);

  const [pointerPos, setPointerPos] = useState(DEFAULT_POSITIONS);
  const pointerPositions = useRef(DEFAULT_POSITIONS);

  function updateMousePosition(event) {
    let x = event.clientX;
    let y = event.clientY;
    let offset =
      window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
    if (offset === undefined) offset = 0;
    y += offset;

    mouseX.current = x;
    mouseY.current = y;
  }

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const animate = (time) => {
    let x = mouseX.current;
    let y = mouseY.current;

    let array = pointerPositions.current;
    array.forEach((pointer, index) => {
      pointer.x = x;
      pointer.y = y;

      let nextIndex = index === NUM_COLORS - 1 ? 0 : index + 1;
      let nextPos = array[nextIndex];
      x += 0.01 * (100 - SPEED_SCALE) * (nextPos.x - x);
      y += 0.01 * (100 - SPEED_SCALE) * (nextPos.y - y);
    });
    pointerPositions.current = array;
    setPointerPos([...array]);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {pointerPos.map((pos, index) => {
        return (
          <Pointer
            color={COLORS[index]}
            link={SVG[index]}
            x={pos.x}
            y={pos.y}
            key={index}
          />
        );
      })}
    </>
  );
}

export default Rainbow;
