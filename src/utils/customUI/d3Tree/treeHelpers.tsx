import { useCallback, useState } from "react";
import { Point } from "react-d3-tree/lib/types/common";

export const useCenteredTree = () => {
  const [translate, setTranslate] = useState<Point | undefined>({ x: 0, y: 0 });

  const containerRef = useCallback((containerElem: HTMLDivElement): any => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();

      var newPoint: Point = {
        x: width / 2,
        y: height / 2
      };

      setTranslate(newPoint);
    }
  }, []);

  return [translate];
};
