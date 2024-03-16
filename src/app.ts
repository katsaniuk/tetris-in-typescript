import { generatePlayField, playfield } from './components/Playfield';
import { moveDown, onKeyDown } from './components/TetrominoController';
import { generateTetromino, tetromino } from './components/Tetrominoes';

export const PLAYFIELD_COLUMNS: number = 10;
export const PLAYFIELD_ROWS: number = 20;
export const btnRestart: HTMLButtonElement = document.querySelector(
  '.btn-restart'
) as HTMLButtonElement;
export const scoreElement: HTMLElement = document.querySelector(
  '.score'
) as HTMLElement;
export const overlay: HTMLDivElement = document.querySelector(
  '.overlay'
) as HTMLDivElement;
export let isGameOver: boolean = false;
export let timedId: number | null = null;
export let isPaused: boolean = false;
export let score: number = 0;

export let cells: NodeListOf<HTMLDivElement>;

export function init(): void {
  score = 0;
  scoreElement.innerHTML = '0';
  isGameOver = false;
  generatePlayField();
  generateTetromino();
  cells = document.querySelectorAll('.grid div') as NodeListOf<HTMLDivElement>;
  moveDown();
}

init();

btnRestart.addEventListener('click', handleReset);

export function handleReset(): void {
  document.querySelector('.grid').innerHTML = '';
  overlay.style.display = 'none';
  init();
}

export function placeTetromino(): void {
  const matrixSize: number = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (isOutsideOfTopboard(row)) {
        isGameOver = true;
        return;
      }
      if (tetromino.matrix[row][column]) {
        playfield[tetromino.row + row][tetromino.column + column] =
          tetromino.name;
      }
    }
  }

  const filledRows: number[] = findFilledRows();
  removeFillRows(filledRows);
  generateTetromino();
  countScore(filledRows.length);
}

export function countScore(destroyRows: number): void {
  switch (destroyRows) {
    case 1:
      score += 10;
      break;
    case 2:
      score += 20;
      break;
    case 3:
      score += 50;
      break;
    case 4:
      score += 100;
      break;
  }
  scoreElement.innerHTML = score.toString();
}

export function removeFillRows(filledRows: number[]): void {
  for (let i = 0; i < filledRows.length; i++) {
    const row: number = filledRows[i];
    dropRowsAbove(row);
  }
}

export function dropRowsAbove(rowDelete: number): void {
  for (let row = rowDelete; row > 0; row--) {
    playfield[row] = playfield[row - 1];
  }

  playfield[0] = new Array(PLAYFIELD_COLUMNS).fill(0);
}

export function findFilledRows(): number[] {
  const fillRows: number[] = [];
  for (let row = 0; row < PLAYFIELD_ROWS; row++) {
    let filledColumns: number = 0;
    for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
      if (playfield[row][column] !== 0) {
        filledColumns++;
      }
    }
    if (PLAYFIELD_COLUMNS === filledColumns) {
      fillRows.push(row);
    }
  }

  return fillRows;
}

document.addEventListener('keydown', onKeyDown);

export function gameOver(): void {
  stopLoop();
  overlay.style.display = 'flex';
}

export function startLoop(): void {
  if (!timedId) {
    timedId = window.setTimeout(() => {
      requestAnimationFrame(moveDown);
    }, 700);
  }
}

export function stopLoop(): void {
  cancelAnimationFrame(timedId);
  clearTimeout(timedId);

  timedId = null;
}

export function togglePauseGame(): void {
  if (isPaused === false) {
    stopLoop();
  } else {
    startLoop();
  }
  isPaused = !isPaused;
}

export function isValid(): boolean {
  const matrixSize: number = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (isOutsideOfGameboard(row, column)) {
        return false;
      }
      if (hasCollisions(row, column)) {
        return false;
      }
    }
  }

  return true;
}

export function isOutsideOfTopboard(row: number): boolean {
  return tetromino.row + row < 0;
}

export function isOutsideOfGameboard(row: number, column: number): boolean {
  return (
    tetromino.matrix[row][column] &&
    (tetromino.column + column < 0 ||
      tetromino.column + column >= PLAYFIELD_COLUMNS ||
      tetromino.row + row >= PLAYFIELD_ROWS)
  );
}

export function hasCollisions(row: number, column: number): string | number {
  return (
    tetromino.matrix[row][column] &&
    playfield[tetromino.row + row]?.[tetromino.column + column]
  );
}
