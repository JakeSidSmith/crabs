import * as index from '../src';

describe('index', () => {
  it('should export a message', () => {
    expect(Object.keys(index)).toEqual(['message']);
    expect(index.message).toBe('Hello, World!');
  });
});
