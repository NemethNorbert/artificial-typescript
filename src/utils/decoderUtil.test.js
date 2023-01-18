import decoderUtil from "./decoderUtil";

test("createSquareMatrix does create a square matrix", () => {
  const squareMatrix = decoderUtil.createSquareMatrix(2);
  expect(squareMatrix).toEqual([
    [undefined, undefined],
    [undefined, undefined],
  ]);
});

test("decodeScroll replaces all #", () => {
  const mockupSequence = "#~~~##~~#~~###~#~~##~#~#~";
  const decodedSequence = decoderUtil.decodeScroll(mockupSequence);

  decodedSequence.map((tile) => expect(tile).not.toBe("#"));
  expect(decodedSequence.length).toEqual(mockupSequence.length);
});

test("decodeScroll logic check", () => {
  const threeSequence = "~~~#";
  const oneSequence = "~##";
  const zeroSequence = "~~~~~~~~~~#";
  const zeroFollowIslandSequence = "~~~~~~~~~~#~#";
  const elevenSequence = "~~~~~~~~~~~#~~~~";
  expect(decoderUtil.decodeScroll(threeSequence).join("")).toBe("~~~3");
  expect(decoderUtil.decodeScroll(oneSequence).join("")).toBe("~1~");
  expect(decoderUtil.decodeScroll(zeroSequence).join("")).toBe("~~~~~~~~~~~");
  expect(decoderUtil.decodeScroll(zeroFollowIslandSequence).join("")).toBe(
    "~~~~~~~~~~~~1"
  );
  expect(decoderUtil.decodeScroll(elevenSequence).join("")).toBe(
    "~~~~~~~~~~~1~~~~"
  );
});

test("formSpiralMatrix fills every value of the matrix with a Number or ~", () => {
  const mockupSequence = decoderUtil.decodeScroll("#~~~##~~#~~###~#~~##~#~#~");
  const matrixLength = Math.sqrt(mockupSequence.length);
  const mockupSquareMatrix = decoderUtil.createSquareMatrix(matrixLength);
  const mockupSpiralMatrix = decoderUtil.formSpiralMatrix(
    mockupSequence,
    mockupSquareMatrix
  );

  mockupSpiralMatrix.map((row) => {
    row.map((tile) => {
      if (typeof tile === "string") {
        expect(tile).toEqual("~");
      } else {
        expect(typeof tile === "number").toBe(true);
      }
    });
  });
});

test("mapIsValid retrun false if sequence holds anything else than ~ and #", () => {
  const validSequence = "#~~~##~~#~~###~#~~##~#~#~";
  const wrongSequence1 = "#~~~##~~#~1###~#~~##~#~#~";
  const wrongSequence2 = "#~~~##~~#~a###~#~~##~#~#~";
  const wrongSequence3 = "#~~~##~~#~%###~#~~##~#~#~";
  expect(decoderUtil.mapIsValid(validSequence)).toBe(true);
  expect(decoderUtil.mapIsValid(wrongSequence1)).toBe(false);
  expect(decoderUtil.mapIsValid(wrongSequence2)).toBe(false);
  expect(decoderUtil.mapIsValid(wrongSequence3)).toBe(false);
});

test("getResultWithDisplayMatrix returns a number and a matrix that does not hold undefined", () => {
  const mockupSequence = decoderUtil.decodeScroll("#~~~##~~#~~###~#~~##~#~#~");
  const matrixLength = Math.sqrt(mockupSequence.length);
  const mockupSquareMatrix = decoderUtil.createSquareMatrix(matrixLength);
  const mockupSpiralMatrix = decoderUtil.formSpiralMatrix(
    mockupSequence,
    mockupSquareMatrix
  );
  const [value, matrix] =
    decoderUtil.getResultWithDisplayMatrix(mockupSpiralMatrix);

  expect(typeof value === "number").toBe(true);
  matrix.map((row) => {
    row.map((tile) => {
      expect(tile).toBeDefined();
    });
  });
});
