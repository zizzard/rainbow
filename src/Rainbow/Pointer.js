function Pointer({ color, link, x, y }) {
  let xPx = x + "px";
  let yPx = y + "px";
  let position = { top: yPx, left: xPx };

  return (
    <>
      <img
        src={link}
        className={"trail rainbow-" + color}
        style={position}
        alt={color}
      />
    </>
  );
}

export default Pointer;
