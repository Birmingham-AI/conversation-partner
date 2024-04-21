import { MdDone } from "react-icons/md";
import { Button } from "@/components/Button";

export type RecordResponseProps = {
  onRecordEnd: () => void;
  isDisabled: boolean;
};

export function RecordResponse({
  onRecordEnd,
  isDisabled,
}: RecordResponseProps) {
  return (
    <div className="flex justify-center w-full">
      <Button
        className="btn-primary btn-lg btn-block sm:w-1/2"
        onClick={onRecordEnd}
        disabled={isDisabled}
      >
        <MdDone className="text-2xl" />
        Submit
      </Button>
    </div>
  );
}
