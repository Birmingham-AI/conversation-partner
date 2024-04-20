import { useRef, useEffect } from "react";
import clsx from "clsx";

import { useTextToAudio } from "@/features/conversation";

export type SpeechVisualizerProps = {
  isTextMode: boolean;
  audioSrc?: HTMLAudioElement;
  mediaInputStream?: MediaStream;
};

export function SpeechVisualizer({
  isTextMode,
  audioSrc,
  mediaInputStream,
}: SpeechVisualizerProps) {
  // const audioFileContext = useRef<AudioContext | undefined>();
  const audioContext = useRef(new AudioContext());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { data } = useTextToAudio(
    "test file that is reasoanbly long, but not like crazy long, but long enough to test"
  );

  // Very heavily inspired by MDN's example: https://github.com/mdn/dom-examples/blob/main/media/web-dictaphone/scripts/app.js
  useEffect(() => {
    if (!data) {
      return;
    }

    audioContext.current = new AudioContext();

    data.play();
    const source = audioContext.current.createMediaElementSource(data);
    // const streamSource =
    //   audioContext.current.createMediaStreamSource(mediaInputStream);
    const analyser = audioContext.current.createAnalyser();
    analyser.fftSize = 2048;

    const bufferLength = analyser.frequencyBinCount ?? 0;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    // streamSource.connect(analyser);
    analyser.connect(audioContext.current.destination);

    function draw() {
      if (!canvasRef.current) {
        return;
      }

      const canvasCtx = canvasRef.current.getContext("2d")!;
      const WIDTH = canvasRef.current?.width ?? 0;
      const HEIGHT = canvasRef.current?.height ?? 0;

      requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "black";
      canvasCtx.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      canvasCtx.beginPath();

      let sliceWidth = (WIDTH * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        let v = dataArray[i] / 128.0;
        let y = (v * HEIGHT) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvasRef.current.width, canvasRef.current.height / 2);
      canvasCtx.stroke();
    }

    draw();
  }, [data, 3]);

  return (
    <canvas
      ref={canvasRef}
      className={clsx(
        "absolute bg-accent rounded-full size-44 md:size-56 left-1/2 -translate-x-1/2 mt-[30dvh] z-20 duration-200 transition-all",
        isTextMode ? "opacity-0" : "opacity-100"
      )}
    >
      {/* <canvas className="w-full h-full bg-red-500 rounded-full" /> */}
    </canvas>
  );
}
