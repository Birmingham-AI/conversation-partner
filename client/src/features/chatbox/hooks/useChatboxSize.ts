import { RefObject, useState, useLayoutEffect } from "react";
import {
  useDebounceCallback,
  useResizeObserver,
  useWindowSize,
} from "usehooks-ts";

const getElementsHeight = <T extends HTMLElement>(element?: T | null) =>
  element?.offsetHeight ?? 0;

/**
 * Bit of a hack to calculate the size of the chat window so
 * it always extends to the bottom of the screen, while handling
 * its overflow.
 */
export const useChatboxSize = ({
  responseContainerRef,
  delay = 50,
}: {
  responseContainerRef: RefObject<HTMLDivElement>;
  delay?: number;
}) => {
  const [chatboxHeight, setChatboxHeight] = useState(0);
  const { height } = useWindowSize();
  const handleResize = useDebounceCallback(() => {
    // TODO: More declarative way of calculating this:
    const paddingOffset = 48; // just eye-balled to look right
    const header = getElementsHeight(document.getElementById("header"));
    const footer = getElementsHeight(document.getElementById("footer"));
    const responseControls = getElementsHeight(responseContainerRef.current);

    const newHeight =
      height - header - footer - responseControls - paddingOffset;
    console.log(newHeight);

    setChatboxHeight(newHeight);
  }, delay);

  useLayoutEffect(handleResize, [height, handleResize]);

  useResizeObserver({
    ref: responseContainerRef,
    onResize: handleResize,
  });

  return chatboxHeight;
};
