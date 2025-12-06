import { useEffect, useRef, useState } from "react";

export const useDims = <T extends HTMLElement>() => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const localRef = useRef<T>(null);

  const getDims = () => {
    if (localRef.current) {
      setWidth(localRef.current.getBoundingClientRect().width);
      setHeight(localRef.current.getBoundingClientRect().height);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", getDims, false);
    getDims();
  }, [localRef]);

  return { width, height, ref: localRef, refreshDims: getDims };
};
