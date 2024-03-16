import {
  PLAYFIELD_COLUMNS,
  PLAYFIELD_ROWS,
  cells,
  isOutsideOfTopboard
} from '../app';
import { tetromino } from './Tetrominoes';

export let playfield: (number | string)[][];

export function convertPositionToIndex(row: number, column: number): number {
  return row * PLAYFIELD_COLUMNS + column;
}

export function generatePlayField(): void {
  for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++) {
    const div = document.createElement(`div`);
    document.querySelector('.grid').append(div);
  }

  playfield = new Array(PLAYFIELD_ROWS)
    .fill(null)
    .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
}

export function drawPlayField(): void {
  for (let row = 0; row < PLAYFIELD_ROWS; row++) {
    for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
      if (playfield[row][column] === 0) continue;

      const name: string = playfield[row][column].toString();
      const cellIndex: number = convertPositionToIndex(row, column);
      cells[cellIndex].classList.add(name);
    }
  }
}

export function drawTetromino(): void {
  const name: string = tetromino.name;
  const tetrominoMatrixSize: number = tetromino.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      if (isOutsideOfTopboard(row)) continue;
      if (!tetromino.matrix[row][column]) continue;
      const cellIndex: number = convertPositionToIndex(
        tetromino.row + row,
        tetromino.column + column
      );
      cells[cellIndex].classList.add(name);
    }
  }
}

export function draw(): void {
  cells.forEach((cell) => cell.removeAttribute('class'));
  drawPlayField();
  drawTetromino();
}
