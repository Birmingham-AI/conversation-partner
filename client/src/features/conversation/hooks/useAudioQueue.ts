"use client";
import { useState, useEffect, useCallback } from "react";
import { useDebounceCallback } from "usehooks-ts";

/**
 * Queuing state management system so that only one audio file can be
 * played at a time without losing any events.
 */
export const useAudioQueue = () => {
  const [audioQueue, setAudioQueue] = useState<HTMLAudioElement[]>([]);
  // const [isQueueLocked, setIsQueueLocked] = useState(false);
  const [activeAudioItem, setActiveAudioItem] = useState<
    HTMLAudioElement | undefined
  >();

  const queueAudioForPlayback = useCallback(
    (audio: HTMLAudioElement) =>
      setAudioQueue((current) => [...current, audio]),
    []
  );

  const onSpeechEnd = useDebounceCallback(
    () => setActiveAudioItem(undefined),
    500
  );

  useEffect(() => {
    const [nextAudio, ...restOfQueue] = audioQueue;
    if (nextAudio && !activeAudioItem) {
      try {
        setActiveAudioItem(nextAudio);
        nextAudio.addEventListener("ended", onSpeechEnd, { once: true });
        nextAudio.play();
      } catch (error) {
        setActiveAudioItem(undefined);
        console.error(error);
      } finally {
        setAudioQueue(restOfQueue);
      }
    }
  }, [audioQueue, activeAudioItem, onSpeechEnd]);

  return {
    queueAudioForPlayback,
    isAudioPlaying: !!activeAudioItem,
    activeAudioItem,
  } as const;
};
