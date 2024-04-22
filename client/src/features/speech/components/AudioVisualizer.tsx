import { type RefObject } from "react";
import clsx from "clsx";
import { useRecordingStreamVisualsEffect } from "../hooks/useRecordingStreamVisuals";

export type AudioVisualizerProps = {
  canvasRef: RefObject<HTMLCanvasElement>;
  isRecording: boolean;
  isTextMode: boolean;
  isProcessingResponse: boolean;
  mediaStream?: MediaStream;
};

export function AudioVisualizer({
  canvasRef,
  isRecording,
  isTextMode,
  isProcessingResponse,
  mediaStream,
}: AudioVisualizerProps) {
  useRecordingStreamVisualsEffect(canvasRef, isRecording, mediaStream);

  return (
    <canvas
      ref={canvasRef}
      className={clsx(
        "absolute rounded-full left-1/2 2 mt-[30dvh] -translate-x-1/2 z-20 duration-300 transition-all",
        isTextMode ? "opacity-0 -z-20" : "opacity-100",
        !isRecording ? "bg-accent" : "bg-secondary",
        isProcessingResponse
          ? "animate-pulse size-20 translate-y-1/2"
          : "size-44 md:size-56 lg:size-72"
      )}
    />
  );
}
