import { useRef, useEffect, useState, useCallback } from "react";
import { delay } from "../../conversation/utils";

export const useRecordResponse = () => {
  const audioChunks = useRef<Blob[]>([]);
  const [hasGetStreamError, setHasGetStreamError] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaInputStream, setMediaInputStream] = useState<
    MediaStream | undefined
  >();
  const [mediaRecorder, setMediaRecorder] = useState<
    MediaRecorder | undefined
  >();

  // Get permission to use the user's audio hardware:
  useEffect(() => {
    try {
      (async () => {
        // TODO: adjust stream subscription so browser only indicates recording when the recording is in process,
        // not the whole time the stream is open.
        const stream = await global.window.navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        setMediaInputStream(stream);
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };

        setMediaRecorder(recorder);
      })();
    } catch (error) {
      console.error(error);
      setHasGetStreamError(true);
    }
  }, []);

  const beginRecording = useCallback(() => {
    audioChunks.current = [];
    mediaRecorder?.start();
    setIsRecording(true);
  }, [mediaRecorder]);

  const completeRecording = useCallback(async () => {
    mediaRecorder?.stop();
    // TODO: Look into why this is necessary. From what I can tell, there is no async process to await, but not taking an
    // extra tick here prevents the old blob content from being reverted.
    await delay(50);

    setIsRecording(false);
    return new Blob(audioChunks.current);
  }, [mediaRecorder]);

  return {
    beginRecording,
    completeRecording,
    isRecording,
    hasGetStreamError,
    mediaInputStream,
  };
};
