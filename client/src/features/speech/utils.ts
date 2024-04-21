// Very heavily inspired by MDN's example:
// https://github.com/mdn/dom-examples/blob/main/media/web-dictaphone/scripts/app.js
export const drawDictaphoneLine = (
  canvas: HTMLCanvasElement | null,
  analyser: AnalyserNode,
  dataArray: Uint8Array,
  isTranscribing: () => boolean
) => {
  if (!canvas) {
    return;
  }

  const canvasCtx = canvas.getContext("2d")!;

  const bufferLength = analyser.frequencyBinCount;
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  if (isTranscribing()) {
    requestAnimationFrame(() =>
      drawDictaphoneLine(canvas, analyser, dataArray, isTranscribing)
    );
  }

  analyser.getByteTimeDomainData(dataArray);

  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = "black";
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  canvasCtx.beginPath();

  let sliceWidth = (WIDTH * 1.0) / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    let v = dataArray[i] / 128.0;
    let y = (v * HEIGHT) / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();

  if (!isTranscribing()) {
    canvasCtx.reset();
  }
};
