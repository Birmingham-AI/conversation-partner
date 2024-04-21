import { MdError } from "react-icons/md";

export function ResponseErrorAlert() {
  return (
    <div role="alert" className={"alert alert-error"}>
      <MdError className="text-2xl" />
      <span>
        There was an error submitting your response. Please try again.
      </span>
    </div>
  );
}
