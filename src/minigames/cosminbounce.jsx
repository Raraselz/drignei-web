import { useEffect, useRef, useState } from "react";
import ball from "../assets/ball.jpg";

function CosminBounce() {
  const [pos, setPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const dir = useRef({ x: 1, y: 1 });

  const speed = 3;
  const [width, setWidth] = useState(Math.min(window.innerWidth / 3, window.innerHeight / 3));
  const [height, setHeight] = useState(Math.min(window.innerWidth / 3, window.innerHeight / 3));
  const [barOffset, setBarOffset] = useState(window.innerHeight * 0.07); // offset for the top bar
  useEffect(() => {
    setWidth(Math.min(window.innerWidth / 3, window.innerHeight / 3));
    setHeight(Math.min(window.innerWidth / 3, window.innerHeight / 3));
    setBarOffset(window.innerHeight * 0.07);
  }, [window.innerWidth, window.innerHeight]); 
  const animate = () => {
    setPos(prev => {
      let x = prev.x + dir.current.x * speed;
      let y = prev.y + dir.current.y * speed;

      const maxX = window.innerWidth - width;

      const maxY = window.innerHeight - height;

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
    <div className="w-full bg-transparent z-0" style={
      { height: '93vh'}
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
    </div>
  );
}

export default CosminBounce;
