import { useRef, useEffect, type RefObject } from "react";

import { drawDictaphoneLine } from "../utils";

export const useRecordingStreamVisualsEffect = (
  canvas: RefObject<HTMLCanvasElement>,
  isRecording: boolean,
  mediaStream?: MediaStream
) => {
  // Store the context and resulting values to a ref,
  // they should not be recreated between events:
  const audioContext = useRef<AudioContext>();
  const audioAnalyser = useRef<AnalyserNode>();
  const streamSource = useRef<MediaStreamAudioSourceNode>();
  const recordingRef = useRef(isRecording);

  useEffect(() => {
    // Needed a way to reference this in scope for the
    // isTranscribing check in the draw function:
    recordingRef.current = isRecording;

    if (!audioContext.current && mediaStream) {
      audioContext.current = new AudioContext();
      audioAnalyser.current = audioContext.current.createAnalyser();
      streamSource.current =
        audioContext.current.createMediaStreamSource(mediaStream);

      streamSource.current.connect(audioAnalyser.current);
    }

    if (!audioAnalyser.current) {
      return;
    }

    const bufferLength = audioAnalyser.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    drawDictaphoneLine(
      canvas.current,
      audioAnalyser.current,
      dataArray,
      () => recordingRef.current
    );
  }, [mediaStream, isRecording, canvas]);
};
