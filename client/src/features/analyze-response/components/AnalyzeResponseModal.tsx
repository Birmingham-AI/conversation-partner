import { Button } from "@/components/Button";
import { useAnalyzeResponse } from "@/features/conversation";
import { AnalyzeResponseInput } from "../types";
import { AnalyzeModalContent } from "./AnalyzeModalContent";

export const openAnalyzeResponseModal = () => {
  // @ts-expect-error DaisyUI provides this method
  global.window.document.getElementById("analyze-modal")?.showModal();
};

export function AnalyzeResponseModal({
  responseText,
  questionText,
}: Partial<AnalyzeResponseInput>) {
  const { data, isError } = useAnalyzeResponse(questionText, responseText);

  return (
    <dialog id="analyze-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-3">Answer Analysis</h3>
        <div className="overflow-auto px-3">
          <AnalyzeModalContent
            analysisResult={data?.analysis}
            isError={isError}
          />
        </div>
        <form method="dialog">
          <Button className="btn-primary btn-block mt-4" type="submit">
            Continue
          </Button>
        </form>
      </div>
    </dialog>
  );
}
