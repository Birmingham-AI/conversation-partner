import { MdDone } from "react-icons/md";
import { Button } from "@/components/Button";

export type CompleteRecordingProps = {
  onRecordEnd: () => void;
  isDisabled: boolean;
};

export function CompleteRecording({
  onRecordEnd,
  isDisabled,
}: CompleteRecordingProps) {
  return (
    <div className="flex justify-center w-full">
      <Button
        className="btn-primary btn-block"
        onClick={onRecordEnd}
        disabled={isDisabled}
      >
        <MdDone className="text-2xl" />
        Submit
      </Button>
    </div>
  );
}
