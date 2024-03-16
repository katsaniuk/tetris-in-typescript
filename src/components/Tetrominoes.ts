import { PLAYFIELD_COLUMNS } from '../app';

export let tetromino: {
  name: string;
  matrix: number[][];
  row: number;
  column: number;
};

export const TETROMINO_NAMES: string[] = ['O', 'J', 'L', 'I', 'S', 'T', 'Z'];

export const TETROMINOES: { [key: string]: number[][] } = {
  O: [
    [1, 1],
    [1, 1]
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ],
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0]
  ]
};

export function getRandomElement<T>(array: T[]): T {
  const randomIndex: number = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function generateTetromino(): void {
  const name: string = getRandomElement(TETROMINO_NAMES);
  const matrix: number[][] = TETROMINOES[name];
  const column: number = PLAYFIELD_COLUMNS / 2 - Math.floor(matrix.length / 2);
  const rowTetro: number = -2;

  tetromino = {
    name,
    matrix,
    row: rowTetro,
    column
  };
}

export default { generateTetromino };
