export type AnalyzeModalContentProps = {
  isError: boolean;
  analysisResult?: string;
};

export function AnalyzeModalContent({
  analysisResult,
  isError,
}: AnalyzeModalContentProps) {
  if (isError) {
    return <p>There was an error collecting your analysis.</p>;
  }

  return analysisResult ? (
    <p>{analysisResult}</p>
  ) : (
    <div className="flex w-full justify-center py-10">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}
