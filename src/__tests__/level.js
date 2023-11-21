import getLevel from '../level';
import fetchData from '../http';

jest.mock('../http');

beforeEach(() => {
  jest.resetAllMocks();
});

test('should call getLevel function once', () => {
  fetchData.mockReturnValue({});
  getLevel(1);
  expect(fetchData).toBeCalledWith('https://server/user/1');
});

test('testing getLevel function with response status: OK', () => {
  const response = { status: 'ok', level: 7 };
  fetchData.mockReturnValueOnce(response);
  const result = getLevel(1);
  expect(result).toBe('Ваш текущий уровень: 7');
});

test('testing getLevel function with response status: Bad Request', () => {
  const response = { status: 'Bad Request' };
  fetchData.mockReturnValueOnce(response);
  const result = getLevel(1);
  expect(result).toBe('Информация об уровне временно недоступна');
});
