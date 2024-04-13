import { useAnalyzeResponse } from "../../hooks/useAnalyzeResponse";

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
  const { data } = useAnalyzeResponse(responseText, questionText);

  console.log(data);

  return (
    <dialog id="analyze-modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click on ✕ button to close</p>
      </div>
    </dialog>
  );
}
