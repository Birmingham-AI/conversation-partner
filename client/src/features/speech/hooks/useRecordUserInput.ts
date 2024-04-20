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
    // I do not understand what, but some async process causes this to get weird if you
    // don't give it a tick to create the blob. As far as I can tell, there is no async
    // step here, so this is a bit of a bandaid/hack.
    await delay(100);

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
