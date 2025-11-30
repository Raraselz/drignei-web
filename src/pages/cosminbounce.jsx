import { useEffect, useRef, useState } from "react";
import ball from "../assets/ball.jpg";

function CosminBounce() {
  const [pos, setPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const dir = useRef({ x: 1, y: 1 });

  const [speed, setSpeed] = useState(3);
  const [width, setWidth] = useState(Math.min(window.innerWidth / 3, window.innerHeight / 3));
  const [height, setHeight] = useState(Math.min(window.innerWidth / 3, window.innerHeight / 3));
  const [barOffset, setBarOffset] = useState(window.innerHeight * 0.07); // offset for the top bar
  
  const speedRef = useRef(3);
  const sizeW = useRef(width);
  const sizeH = useRef(height);
  
  useEffect(() => {
    speedRef.current = speed;
    sizeH.current = height;
    sizeW.current = width;
  }, [speed, width, height]);

  const animate = () => {
    setPos(prev => {
      let x = prev.x + dir.current.x * speedRef.current;
      let y = prev.y + dir.current.y * speedRef.current;

      const maxX = window.innerWidth - sizeW.current;

      const maxY = window.innerHeight - sizeH.current;

      // coliziune orizont
      if (x <= 0) {
        x = 0;
        dir.current.x = 1;
      } else if (x >= maxX) {
        x = maxX;
        dir.current.x = -1;
      }

      // coliziune verticală
      if (y <= 0 + barOffset) {
        y = 0 + barOffset;
        dir.current.y = 1;
      } else if (y >= maxY) {
        y = maxY;
        dir.current.y = -1;
      }

      return { x, y };
    });

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="w-full bg-transparent select-none z-0" style={
      { height: '93vh' }
    }>
      <img
        src={ball}
        style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          width,
          height,
          borderRadius: "8px",
          zIndex: 1
        }}
        className="rounded-md"
      />
      {/* Cosmin Settings */}
      <div style={{
        top:`${barOffset}`,
      }}className="absolute z-10 right-2 flex flex-col">
        <div>
          <div className="text-red-500 font-semibold text-right" >Speed: {speed}</div>
          <input className="opacity-70 outline-0 hover:opacity-100" type="range" value={speed} onChange={(e) => { setSpeed(Number(e.target.value)) }} min='1' max='20'></input>
        </div>
        <div>
          <div className="text-red-500 font-semibold text-right" >Width: {Math.floor(width)}</div>
          <input className="opacity-70 outline-0 hover:opacity-100" type="range" value={Math.floor(width)} onChange={(e) => { setWidth(Number(e.target.value)) }} min='50' max='500'></input>
        </div>
        <div>
          <div className="text-red-500 font-semibold text-right" >Height: {Math.floor(height)}</div>
          <input className="opacity-70 outline-0 hover:opacity-100" type="range" value={Math.floor(height)} onChange={(e) => { setHeight(Number(e.target.value)) }} min='50' max='500'></input>
        </div>
      </div>
    </div>
  );
}

export default CosminBounce;
