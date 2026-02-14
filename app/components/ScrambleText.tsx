"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  className?: string;
  start?: boolean;
};

const alpha = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

export default function ScrambleText({
  text,
  className = "",
  start = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start || done) return;

    const el = ref.current;
    if (!el) return;

    let iteration = 0;
    const step = 0.35;
    const fps = 30;

    const interval = setInterval(() => {
      const str = text
        .split("")
        .map((char, idx) => {
          if (iteration > idx) return text[idx];
          return alpha[Math.floor(Math.random() * alpha.length)];
        })
        .join("");

      el.innerText = str;
      iteration += step;

      if (iteration >= text.length) {
        clearInterval(interval);
        el.innerText = text;
        setDone(true);
      }
    }, fps);

    return () => clearInterval(interval);
  }, [start, done, text]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
