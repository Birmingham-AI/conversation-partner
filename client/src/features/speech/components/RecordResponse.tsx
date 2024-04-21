import { CiMicrophoneOn } from "react-icons/ci";

import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useState, useRef } from "react";
import { fetchClient } from "@/utils/fetchClient";
import { useRecordResponse } from "../hooks/useRecordUserInput";
import { delay } from "../../conversation/utils";
import { useAudioToText } from "../hooks/useAudioToText";

// export const useSpeechToText = () => {
//   const results = useMutation<{ text: string }, Error, Blob>({
//     mutationKey: ["speech-to-text"],
//     mutationFn: async (blob) => {
//       const formData = new FormData();
//       const file = new File([blob], `${new Date().valueOf()}.mp3`);
//       formData.append("file", file);
//       const response = await fetchClient("/convertAudioToText", {
//         method: "POST",
//         body: formData,
//       });

//       return response.json();
//     },
//   });

//   return results;
// };

// export const useRecordResponse = () => {
//   const audioChunks = useRef<Blob[]>([]);
//   const [hasGetStreamError, setHasGetStreamError] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [mediaInputStream, setMediaInputStream] = useState<
//     MediaStream | undefined
//   >();
//   const [mediaRecorder, setMediaRecorder] = useState<
//     MediaRecorder | undefined
//   >();

//   const { mutate } = useSpeechToText();

//   // Get permission to use the user's audio hardware:
//   useEffect(() => {
//     try {
//       (async () => {
//         const stream = await global.window.navigator.mediaDevices.getUserMedia({
//           audio: true,
//         });
//         setMediaInputStream(stream);
//         const recorder = new MediaRecorder(stream);
//         recorder.ondataavailable = (event) => {
//           audioChunks.current.push(event.data);
//         };

//         setMediaRecorder(recorder);
//       })();
//     } catch (error) {
//       console.error(error);
//       setHasGetStreamError(true);
//     }
//   }, []);

//   const beginRecording = useCallback(() => {
//     audioChunks.current = [];
//     mediaRecorder?.start();
//     setIsRecording(true);
//   }, [mediaRecorder]);

//   const stopRecording = useCallback(async () => {
//     mediaRecorder?.stop();
//     // const file = new File(audioChunks.current, "test");
//     // console.log(file);
//     await delay(10);
//     const fullBlob = new Blob(audioChunks.current);
//     console.log(fullBlob);
//     setIsRecording(false);
//     mutate(fullBlob);
//     // const test = global.window.URL.createObjectURL(fullBlob);
//     // const sound = new Audio(test);
//     // sound.play();
//     // sound.oncanplay = () => {
//     //   console.log("can play");
//     //   sound.play();
//     // };

//     // audioChunks.current = [];
//   }, [mediaRecorder, mutate]);

//   return { beginRecording, stopRecording, isRecording };
// };

export type RecordResponseProps = {
  onRecord: () => void;
  onRecordEnd: () => void;
  isDisabled: boolean;
  isRecording: boolean;
};

export function RecordResponse({
  onRecord,
  onRecordEnd,
  isDisabled,
  isRecording,
}: RecordResponseProps) {
  return (
    <div>
      <p> {isRecording ? "recording" : "waiting"}</p>
      {isRecording ? (
        <button onClick={onRecordEnd}>stop</button>
      ) : (
        <button onClick={onRecord}>record</button>
      )}
      {/* <button className=" btn-circle btn-lg p-20" onClick={onRecord}>
        <CiMicrophoneOn className="text-secondary-content text-4xl" />
      </button> */}
      {/* <button
        className="btn btn-circle btn-lg"
        onMouseDown={onRecord}
        onMouseUp={onRecordEnd}
      >
        {isRecording ? "recording" : "waiting"}
      </button> */}
    </div>
  );
}
