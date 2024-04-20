import { Button } from "@/components/Button";
import { useAnalyzeResponse } from "@/features/conversation";

export const openAnalyzeResponseModal = () => {
  // @ts-expect-error DaisyUI provides this method
  global.window.document.getElementById("analyze-modal")?.showModal();
};

export type AnalyzeResponseModalProps = {
  responseText?: string;
  questionText?: string;
};

export function AnalyzeResponseModal({
  responseText,
  questionText,
}: AnalyzeResponseModalProps) {
  const { data } = useAnalyzeResponse(questionText, responseText);

  return (
    <dialog id="analyze-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-3">Answer Analysis</h3>
        {!data ? (
          <div className="flex w-full justify-center py-10">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <p>{data.analysis}</p>
        )}
        <form method="dialog">
          <Button className="btn-primary btn-block mt-3">Continue</Button>
        </form>
      </div>
    </dialog>
  );
}
