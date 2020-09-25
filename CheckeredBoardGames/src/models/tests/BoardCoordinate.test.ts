import BoardCoordinate from '../BoardCoordinate';
import 'ts-jest';

test('same coordinates are equal', () => {
  let boardCoordinate = new BoardCoordinate("a", 1);
  let boardCoordinate2 = new BoardCoordinate("a", 1);

  expect(boardCoordinate).toEqual(boardCoordinate2);
});