import { useEffect, useRef, Fragment } from "react";
import Row from "./Row";
import Spinner from "./Spinner";
import { DisplayMatrix } from "../utils/decoderUtil";

interface ResultMatrixDisplayProps {
  title: string | null;
  matrix: DisplayMatrix | null;
  focusSelector: string;
  customCss: string;
  loading: boolean;
}

export default function ResultMatrixDisplay({
  title,
  matrix,
  focusSelector,
  customCss,
  loading,
}: ResultMatrixDisplayProps) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (focusSelector && didMountRef.current) {
      let target = document.querySelector(focusSelector);
      target?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
    didMountRef.current = true;
  }, [matrix, focusSelector]);

  return (
    <>
      <h1>{title}</h1>
      <div className={"overlayContainer " + (customCss ? customCss : "")}>
        {loading ? <Spinner /> : ""}
        {matrix?.map((row, key) => {
          return (
            <Fragment key={key}>
              <Row row={row} />
              <br />
            </Fragment>
          );
        })}
      </div>
    </>
  );
}
