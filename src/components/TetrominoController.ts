import {
  gameOver,
  isGameOver,
  isPaused,
  isValid,
  placeTetromino,
  startLoop,
  stopLoop,
  togglePauseGame
} from '../app';
import { draw } from './Playfield';
import { tetromino } from './Tetrominoes';

export function rotateTetromino(): void {
  const oldMatrix: number[][] = tetromino.matrix;
  const rotatedMatrix: number[][] = rotateMatrix(tetromino.matrix);
  tetromino.matrix = rotatedMatrix;
  if (!isValid()) {
    tetromino.matrix = oldMatrix;
  }
}

export function rotate(): void {
  rotateTetromino();
  draw();
}

export function onKeyDown(e: KeyboardEvent): void {
  if (e.key === 'Escape') {
    togglePauseGame();
  }

  if (!isPaused) {
    switch (e.key) {
      case ' ':
        dropTetrominoDown();
        break;
      case 'ArrowUp':
        rotate();
        break;
      case 'ArrowDown':
        moveTetrominoDown();
        break;
      case 'ArrowLeft':
        moveTetrominoLeft();
        break;
      case 'ArrowRight':
        moveTetrominoRight();
        break;
    }
  }
  draw();
}

export function dropTetrominoDown(): void {
  while (isValid()) {
    tetromino.row++;
  }
  tetromino.row--;
}

export function rotateMatrix(matrixTetromino: number[][]): number[][] {
  const N: number = matrixTetromino.length;
  const rotateMatrix: number[][] = [];
  for (let i = 0; i < N; i++) {
    rotateMatrix[i] = [];
    for (let j = 0; j < N; j++) {
      rotateMatrix[i][j] = matrixTetromino[N - j - 1][i];
    }
  }

  return rotateMatrix;
}

export function moveTetrominoDown(): void {
  tetromino.row += 1;
  if (!isValid()) {
    tetromino.row -= 1;
    placeTetromino();
  }
  startLoop();
}

export function moveTetrominoLeft(): void {
  tetromino.column -= 1;
  if (!isValid()) {
    tetromino.column += 1;
  }
}

export function moveTetrominoRight(): void {
  tetromino.column += 1;
  if (!isValid()) {
    tetromino.column -= 1;
  }
}

export function moveDown(): void {
  moveTetrominoDown();
  draw();
  stopLoop();
  startLoop();
  if (isGameOver) {
    gameOver();
  }
}
