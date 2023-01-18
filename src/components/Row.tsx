import { Display } from "../utils/decoderUtil";

interface RowProps {
  row: Display[];
}

export default function Row({ row }: RowProps): JSX.Element {
  return (
    <>
      {row?.map((elem, key) => {
        return <span key={key} {...elem}></span>;
      })}
    </>
  );
}
