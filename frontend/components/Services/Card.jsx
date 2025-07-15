"use client";
import {
  motion,
  useTransform,
} from "motion/react";
import { useEffect, useState } from "react";

const Card = ({ icon, text, color, i, darkColor, progress,title }) => {
  const [isUnder24, setIsUnder24] = useState(false);
  const [innerWidth, setInnerWidth] = useState(0);
  const cardWidth = isUnder24 ? 300 : 350;
  const cardHeight = isUnder24 ? 300 : 400;
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setInnerWidth(window.innerWidth);
      setIsUnder24(width < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let x = null;
  let opacity = null;
  let scale = null;
  let rotateX = 0;
  const step = 0.25;
  const range = 0.1;
  if (isUnder24) {
    opacity = useTransform(progress, [i * step, i * step + range], [1, 1]);
    scale = useTransform(progress, [i * step, 1], [1, 1 - (4 - i) * 0.1]);
    rotateX = useTransform(progress, [i * step, 1], [0, 1 - (4 - i) * 15]);
  } else {
    x = useTransform(
      progress,
      [(i + 1) * 0.201, (i + 1) * 0.25],
      [0, (innerWidth - cardWidth - 100 )  - i * 20]
    );
    opacity = useTransform(
      x,
      [0, innerWidth / 2 + cardWidth / 2 - 100],
      [0, 1.2]
    );
    scale = useTransform(
      x,
      [0, innerWidth / 2 + cardWidth / 2 - 100],
      [0.5, 1]
    );
  }

  return (
    <motion.div
      style={{
        x: x ?? 0,
        scale,
        opacity,
        boxShadow: `8px 8px 8px 0px ${color},  -8px -8px 8px 0px ${color}`,
        position: "sticky",
        top: isUnder24 ? 200 + i * 50 : 250,
        left: isUnder24 ? "0%" : 0,
        zIndex: isUnder24 ? i + 50 : i,
        width: cardWidth,
        height: cardHeight,
        
      }}
      className="rounded-[2rem] p-6 lg:p-8 flex flex-col items-center justify-around border border-primary backdrop-blur-3xl bg-[radial-gradient(circle_at_center,_#0A0F2C,_#000000)] m-50 lg:m-0"
    >
      <h1 className="text-2xl font-extrabold">
        {title}
      </h1>
      <div className="h-[20%] text-[3rem] sm:text-[4rem] text-white/90 mb-2">
        {icon}
      </div>

      <p className="text-center text-white/80 text-sm sm:text-base px-2 leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
};

export default Card;
