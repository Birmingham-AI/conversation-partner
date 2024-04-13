"use client";
import { useState, useEffect, useCallback } from "react";
import { useDebounceCallback } from "usehooks-ts";

/**
 * Queuing state management system so that only one audio file can be
 * played at a time without losing any events.
 */
export const useAudioQueue = () => {
  const [audioQueue, setAudioQueue] = useState<HTMLAudioElement[]>([]);
  const [isQueueLocked, setIsQueueLocked] = useState(false);

  const queueAudioForPlayback = useCallback(
    (audio: HTMLAudioElement) =>
      setAudioQueue((current) => [...current, audio]),
    []
  );

  const onSpeechEnd = useDebounceCallback(() => setIsQueueLocked(false), 500);

  useEffect(() => {
    const [nextAudio, ...restOfQueue] = audioQueue;
    if (nextAudio && !isQueueLocked) {
      try {
        setIsQueueLocked(true);
        nextAudio.addEventListener("ended", onSpeechEnd, { once: true });
        nextAudio.play();
      } catch (error) {
        setIsQueueLocked(false);
        console.error(error);
      } finally {
        setAudioQueue(restOfQueue);
      }
    }
  }, [audioQueue, isQueueLocked, onSpeechEnd]);

  return {
    queueAudioForPlayback,
    isAudioPlaying: isQueueLocked,
  } as const;
};
