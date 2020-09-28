import BoardCoordinate from '../BoardCoordinate';
import 'ts-jest';

test('same coordinates are equal', () => {
  let boardCoordinate = BoardCoordinate.at("a", 1);

  expect(boardCoordinate).toEqual(BoardCoordinate.at("a", 1));
});
