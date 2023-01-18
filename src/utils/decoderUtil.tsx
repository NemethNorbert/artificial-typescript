type Matrix<T> = T[][];
type Tile = number | "~";
export type Display = {
  style: {
    color: string;
  };
  children: Tile;
};
export type DisplayMatrix = Matrix<Display>;

const water: Tile = "~";

function getResultWithDisplayMatrix(
  matrix: Matrix<Tile>
): [number, DisplayMatrix] {
  const ROW = matrix[0].length;
  const COL = matrix.length;
  // initialise islandSoulCounter to hold the the population number while we traverse trough the islands
  let islandSoulCounter = 0;
  // initialise 2 arrays to hold the current island coordinates we are traversing trough
  let currentIslandRow: number[] = [];
  let currentIslandColl: number[] = [];

  // initialise our boolean and html element matrix
  let displayObject: Display = { style: { color: "blue" }, children: "~" };
  let visited: Matrix<boolean> = createSquareMatrix(ROW, false);
  let display: DisplayMatrix = createSquareMatrix(ROW, displayObject);

  const _isNewConnectedLand = (
    matrix: Matrix<Tile>,
    row: number,
    col: number,
    visited: Matrix<boolean>
  ) => {
    // row number is in range, column number is in range
    // and value is not water and not yet visited
    return (
      row >= 0 &&
      row < ROW &&
      col >= 0 &&
      col < COL &&
      matrix[row][col] !== water &&
      !visited[row][col]
    );
  };

  // A utility function to do DFS for a 2D boolean matrix.
  // It only considers the 8 neighbors as adjacent vertices
  const _DFS = (
    matrix: Matrix<Tile>,
    row: number,
    col: number,
    visited: Matrix<boolean>
  ) => {
    // These arrays are used to get row and column numbers
    // of 8 neighbors of a given cell
    let rowNbr = [-1, -1, -1, 0, 0, 1, 1, 1];
    let colNbr = [-1, 0, 1, -1, 1, -1, 0, 1];
    // Mark this cell as visited
    visited[row][col] = true;
    // Recur for all connected neighbours
    for (let k = 0; k < 8; ++k) {
      if (
        _isNewConnectedLand(matrix, row + rowNbr[k], col + colNbr[k], visited)
      ) {
        // increase our current island soul counter
        let island = matrix[row + rowNbr[k]][col + colNbr[k]];
        if (typeof island === "number") {
          islandSoulCounter += island;
        }
        // populate the 2 array holding the current island's coordinates
        currentIslandRow.push(row + rowNbr[k]);
        currentIslandColl.push(col + colNbr[k]);
        // populate the display matrix with the island tiles;
        display[row + rowNbr[k]][col + colNbr[k]] = {
          style: { color: "lightsalmon" },
          children: matrix[row + rowNbr[k]][col + colNbr[k]],
        };
        _DFS(matrix, row + rowNbr[k], col + colNbr[k], visited);
      }
    }
  };

  // initialise highestSoulCount to hold the soul count of highest population island
  let highestSoulCount = 0;
  // initialise 2 arrays to hold the first island that holds the highest soulCount
  let finalIslandRow: number[] = [];
  let finalIslandColl: number[] = [];
  for (let i = 0; i < ROW; ++i) {
    for (let m = 0; m < COL; ++m) {
      if (matrix[i][m] !== water && !visited[i][m]) {
        // value is not water and not
        // visited yet, then new island found
        // Start storing the current island coordinates
        currentIslandRow.push(i);
        currentIslandColl.push(m);

        // get the value from the matrix for typesafety
        let island = matrix[i][m];
        if (typeof island === "number") {
          // Start incrementing our current island soul counter
          islandSoulCounter += island;
        }
        // Add island tile to display matrix
        display[i][m] = {
          style: { color: "lightsalmon" },
          children: matrix[i][m],
        };
        // Visit all cells in this island
        _DFS(matrix, i, m, visited);

        if (islandSoulCounter > highestSoulCount) {
          // Store Highest and reset
          highestSoulCount = islandSoulCounter;
          finalIslandRow = currentIslandRow;
          finalIslandColl = currentIslandColl;
          currentIslandRow = [];
          currentIslandColl = [];
          islandSoulCounter = 0;
        } else {
          // reset
          islandSoulCounter = 0;
          currentIslandRow = [];
          currentIslandColl = [];
        }
      }
    }
  }

  //color the first biggest island in the displayMatrix
  for (let i = 0; i < finalIslandRow.length; i++) {
    display[finalIslandRow[i]][finalIslandColl[i]].style = { color: "green" };
  }

  return [highestSoulCount, display];
}

function nearestCeilSq(num: number): number {
  return Math.pow(Math.ceil(Math.sqrt(num)), 2);
}

function fillSequence(sequence: Tile[]): void {
  const remainingTiles = nearestCeilSq(sequence.length) - sequence.length;
  if (remainingTiles) {
    for (let i = 0; i < remainingTiles; i++) {
      sequence.push(water);
    }
  }
}

function decodeScroll(scroll: string): Tile[] {
  let counter = 0;

  let sequence = [...scroll].map((tile) => {
    if (tile === water) {
      counter++;
      return water;
    } else if (counter % 10 === 0) {
      counter = 0;
      return water;
    } else {
      let result = counter % 10;
      counter = 0;
      return result;
    }
  });
  return sequence;
}

function createSquareMatrix<T>(length: number, content: T): Matrix<T> {
  return Array.from(Array(length), () =>
    Array.from(Array(length)).fill(content)
  );
}

function formSpiralMatrix(arr: Tile[]): Matrix<Tile> {
  let matrix = createSquareMatrix(Math.sqrt(arr.length), water);

  const ROW = matrix[0].length;
  const COLL = matrix.length;

  let top = 0;
  let bottom = COLL - 1;
  let left = 0;
  let right = ROW - 1;

  let index = 0;

  while (1) {
    if (left > right) {
      break;
    }
    // Print top row
    for (let i = right; i >= left; i--) {
      matrix[top][i] = arr[index++];
    }

    top++;

    if (top > bottom) {
      break;
    }
    // Print left column
    for (let i = top; i <= bottom; i++) {
      matrix[i][left] = arr[index++];
    }

    left++;

    if (left > right) break;

    // print bottom row
    for (let i = left; i <= right; i++) {
      matrix[bottom][i] = arr[index++];
    }

    bottom--;

    if (bottom < top) break;

    // Print right column
    for (let i = bottom; i >= top; i--) {
      matrix[i][right] = arr[index++];
    }

    right--;
  }

  return matrix;
}

function mapIsValid(str: string): boolean {
  return /^[~|#]+$/.test(str);
}

export default {
  getResultWithDisplayMatrix,
  decodeScroll,
  createSquareMatrix,
  formSpiralMatrix,
  mapIsValid,
  fillSequence,
  nearestCeilSq,
};
