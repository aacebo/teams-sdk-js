import { Token } from './token';

describe('Token', () => {
  it('should succeed', () => {
    const token = new Token('test');
    expect(token).toBeDefined();
  });
});
