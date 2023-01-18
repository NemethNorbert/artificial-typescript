import { useState } from "react";
import ErrorFallback, { UploadError } from "./components/ErrorFallback";
import ResultMatrixDisplay from "./components/ResultMatrixDisplay";
import decoderUtil from "./utils/decoderUtil";
import { DisplayMatrix } from "./utils/decoderUtil";
import "./App.css";

function App() {
  const [displayMatrix, setDisplayMatrix] = useState<DisplayMatrix | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<UploadError | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const fileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    //TODO check if the scroll is valid
    if (file) {
      setLoading(true);
      setDisplayMatrix(null);
      setResult(null);

      const reader: FileReader = new FileReader();

      reader.onload = (event) => {
        if (!event.target?.result) return;

        const sequence: string = event.target.result.toString().trim();

        if (decoderUtil.mapIsValid(sequence)) {
          const decodedScroll = decoderUtil.decodeScroll(sequence);

          decoderUtil.fillSequence(decodedScroll);

          const spiralMap = decoderUtil.formSpiralMatrix(
            decodedScroll.reverse()
          );

          const [result, matrixMap] =
            decoderUtil.getResultWithDisplayMatrix(spiralMap);

          setDisplayMatrix(matrixMap);
          setResult(result.toString());
          setLoading(false);
        } else {
          setError({
            message:
              "Your map is a counterfeit, the search for the original map continues :(",
            resetErrorBoundary: () => {
              setError(null);
              setDisplayMatrix(null);
              setResult(null);
              setLoading(false);
            },
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Artificial Lost Island Scroll decoder</h1>
      </div>
      {error ? (
        <ErrorFallback {...error} />
      ) : (
        <>
          <div className="container mx-auto px-4">
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-1 file:border-solid
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                onChange={fileUpload}
              />
            </label>
          </div>
          <div className="result">
            <ResultMatrixDisplay
              matrix={displayMatrix}
              title={result}
              focusSelector={'span[style="color: green;"]'}
              customCss={
                "overflow-x-auto overflow-y-auto max-h-96 matrix-display"
              }
              loading={loading}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
