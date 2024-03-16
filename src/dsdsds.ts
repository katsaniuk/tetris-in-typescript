// const PLAYFIELD_COLUMNS: number = 10;
// const PLAYFIELD_ROWS: number = 20;
// const btnRestart: HTMLButtonElement = document.querySelector(
//   '.btn-restart'
// ) as HTMLButtonElement;
// const scoreElement: HTMLElement = document.querySelector(
//   '.score'
// ) as HTMLElement;
// const overlay: HTMLDivElement = document.querySelector(
//   '.overlay'
// ) as HTMLDivElement;
// let isGameOver: boolean = false;
// let timedId: number | null = null;
// let isPaused: boolean = false;
// let playfield: (number | string)[][];
// let tetromino: {
//   name: string;
//   matrix: number[][];
//   row: number;
//   column: number;
// };
// let score: number = 0;

// const TETROMINO_NAMES: string[] = ['O', 'J', 'L', 'I', 'S', 'T', 'Z'];
// const TETROMINOES: { [key: string]: number[][] } = {
//   O: [
//     [1, 1],
//     [1, 1]
//   ],
//   J: [
//     [1, 0, 0],
//     [1, 1, 1],
//     [0, 0, 0]
//   ],
//   L: [
//     [0, 0, 1],
//     [1, 1, 1],
//     [0, 0, 0]
//   ],
//   I: [
//     [0, 0, 0, 0],
//     [1, 1, 1, 1],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0]
//   ],
//   S: [
//     [0, 1, 1],
//     [1, 1, 0],
//     [0, 0, 0]
//   ],
//   Z: [
//     [1, 1, 0],
//     [0, 1, 1],
//     [0, 0, 0]
//   ],
//   T: [
//     [1, 1, 1],
//     [0, 1, 0],
//     [0, 0, 0]
//   ]
// };
// let cells: NodeListOf<HTMLDivElement>;
// init();

// function init(): void {
//   score = 0;
//   scoreElement.innerHTML = '0';
//   isGameOver = false;
//   generatePlayField();
//   generateTetromino();
//   cells = document.querySelectorAll('.grid div') as NodeListOf<HTMLDivElement>;
//   moveDown();
// }

// btnRestart.addEventListener('click', handleReset);

// function handleReset(): void {
//   document.querySelector('.grid').innerHTML = '';
//   overlay.style.display = 'none';
//   init();
// }

// function convertPositionToIndex(row: number, column: number): number {
//   return row * PLAYFIELD_COLUMNS + column;
// }

// function getRandomElement<T>(array: T[]): T {
//   const randomIndex: number = Math.floor(Math.random() * array.length);
//   return array[randomIndex];
// }

// function countScore(destroyRows: number): void {
//   switch (destroyRows) {
//     case 1:
//       score += 10;
//       break;
//     case 2:
//       score += 20;
//       break;
//     case 3:
//       score += 50;
//       break;
//     case 4:
//       score += 100;
//       break;
//   }
//   scoreElement.innerHTML = score.toString();
// }

// function generatePlayField(): void {
//   for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++) {
//     const div = document.createElement(`div`);
//     document.querySelector('.grid').append(div);
//   }

//   playfield = new Array(PLAYFIELD_ROWS)
//     .fill(null)
//     .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
// }

// function generateTetromino(): void {
//   const name: string = getRandomElement(TETROMINO_NAMES);
//   const matrix: number[][] = TETROMINOES[name];
//   const column: number = PLAYFIELD_COLUMNS / 2 - Math.floor(matrix.length / 2);
//   const rowTetro: number = -2;

//   tetromino = {
//     name,
//     matrix,
//     row: rowTetro,
//     column
//   };
// }

// function placeTetromino(): void {
//   const matrixSize: number = tetromino.matrix.length;
//   for (let row = 0; row < matrixSize; row++) {
//     for (let column = 0; column < matrixSize; column++) {
//       if (isOutsideOfTopboard(row)) {
//         isGameOver = true;
//         return;
//       }
//       if (tetromino.matrix[row][column]) {
//         playfield[tetromino.row + row][tetromino.column + column] =
//           tetromino.name;
//       }
//     }
//   }

//   const filledRows: number[] = findFilledRows();
//   removeFillRows(filledRows);
//   generateTetromino();
//   countScore(filledRows.length);
// }

// function removeFillRows(filledRows: number[]): void {
//   for (let i = 0; i < filledRows.length; i++) {
//     const row: number = filledRows[i];
//     dropRowsAbove(row);
//   }
// }

// function dropRowsAbove(rowDelete: number): void {
//   for (let row = rowDelete; row > 0; row--) {
//     playfield[row] = playfield[row - 1];
//   }

//   playfield[0] = new Array(PLAYFIELD_COLUMNS).fill(0);
// }

// function findFilledRows(): number[] {
//   const fillRows: number[] = [];
//   for (let row = 0; row < PLAYFIELD_ROWS; row++) {
//     let filledColumns: number = 0;
//     for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
//       if (playfield[row][column] !== 0) {
//         filledColumns++;
//       }
//     }
//     if (PLAYFIELD_COLUMNS === filledColumns) {
//       fillRows.push(row);
//     }
//   }

//   return fillRows;
// }

// function drawPlayField(): void {
//   for (let row = 0; row < PLAYFIELD_ROWS; row++) {
//     for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
//       if (playfield[row][column] === 0) continue;

//       const name: string = playfield[row][column].toString();
//       const cellIndex: number = convertPositionToIndex(row, column);
//       cells[cellIndex].classList.add(name);
//     }
//   }
// }

// function drawTetromino(): void {
//   const name: string = tetromino.name;
//   const tetrominoMatrixSize: number = tetromino.matrix.length;

//   for (let row = 0; row < tetrominoMatrixSize; row++) {
//     for (let column = 0; column < tetrominoMatrixSize; column++) {
//       if (isOutsideOfTopboard(row)) continue;
//       if (!tetromino.matrix[row][column]) continue;
//       const cellIndex: number = convertPositionToIndex(
//         tetromino.row + row,
//         tetromino.column + column
//       );
//       cells[cellIndex].classList.add(name);
//     }
//   }
// }

// function draw(): void {
//   cells.forEach((cell) => cell.removeAttribute('class'));
//   drawPlayField();
//   drawTetromino();
// }

// function rotateTetromino(): void {
//   const oldMatrix: number[][] = tetromino.matrix;
//   const rotatedMatrix: number[][] = rotateMatrix(tetromino.matrix);
//   tetromino.matrix = rotatedMatrix;
//   if (!isValid()) {
//     tetromino.matrix = oldMatrix;
//   }
// }

// function rotate(): void {
//   rotateTetromino();
//   draw();
// }

// document.addEventListener('keydown', onKeyDown);

// function onKeyDown(e: KeyboardEvent): void {
//   if (e.key === 'Escape') {
//     togglePauseGame();
//   }

//   if (!isPaused) {
//     switch (e.key) {
//       case ' ':
//         dropTetrominoDown();
//         break;
//       case 'ArrowUp':
//         rotate();
//         break;
//       case 'ArrowDown':
//         moveTetrominoDown();
//         break;
//       case 'ArrowLeft':
//         moveTetrominoLeft();
//         break;
//       case 'ArrowRight':
//         moveTetrominoRight();
//         break;
//     }
//   }
//   draw();
// }

// function dropTetrominoDown(): void {
//   while (isValid()) {
//     tetromino.row++;
//   }
//   tetromino.row--;
// }

// function rotateMatrix(matrixTetromino: number[][]): number[][] {
//   const N: number = matrixTetromino.length;
//   const rotateMatrix: number[][] = [];
//   for (let i = 0; i < N; i++) {
//     rotateMatrix[i] = [];
//     for (let j = 0; j < N; j++) {
//       rotateMatrix[i][j] = matrixTetromino[N - j - 1][i];
//     }
//   }

//   return rotateMatrix;
// }

// function moveTetrominoDown(): void {
//   tetromino.row += 1;
//   if (!isValid()) {
//     tetromino.row -= 1;
//     placeTetromino();
//   }
//   startLoop();
// }

// function moveTetrominoLeft(): void {
//   tetromino.column -= 1;
//   if (!isValid()) {
//     tetromino.column += 1;
//   }
// }

// function moveTetrominoRight(): void {
//   tetromino.column += 1;
//   if (!isValid()) {
//     tetromino.column -= 1;
//   }
// }

// function moveDown(): void {
//   moveTetrominoDown();
//   draw();
//   stopLoop();
//   startLoop();
//   if (isGameOver) {
//     gameOver();
//   }
// }

// function gameOver(): void {
//   stopLoop();
//   overlay.style.display = 'flex';
// }

// function startLoop(): void {
//   if (!timedId) {
//     timedId = window.setTimeout(() => {
//       requestAnimationFrame(moveDown);
//     }, 700);
//   }
// }

// function stopLoop(): void {
//   cancelAnimationFrame(timedId);
//   clearTimeout(timedId);

//   timedId = null;
// }

// function togglePauseGame(): void {
//   if (isPaused === false) {
//     stopLoop();
//   } else {
//     startLoop();
//   }
//   isPaused = !isPaused;
// }

// function isValid(): boolean {
//   const matrixSize: number = tetromino.matrix.length;
//   for (let row = 0; row < matrixSize; row++) {
//     for (let column = 0; column < matrixSize; column++) {
//       if (isOutsideOfGameboard(row, column)) {
//         return false;
//       }
//       if (hasCollisions(row, column)) {
//         return false;
//       }
//     }
//   }

//   return true;
// }

// function isOutsideOfTopboard(row: number): boolean {
//   return tetromino.row + row < 0;
// }

// function isOutsideOfGameboard(row: number, column: number): boolean {
//   return (
//     tetromino.matrix[row][column] &&
//     (tetromino.column + column < 0 ||
//       tetromino.column + column >= PLAYFIELD_COLUMNS ||
//       tetromino.row + row >= PLAYFIELD_ROWS)
//   );
// }

// function hasCollisions(row: number, column: number): string | number {
//   return (
//     tetromino.matrix[row][column] &&
//     playfield[tetromino.row + row]?.[tetromino.column + column]
//   );
// }
