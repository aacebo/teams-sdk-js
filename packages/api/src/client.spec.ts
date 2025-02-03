import { Client } from './client';

describe('Client', () => {
  it('should initialize', () => {
    const client = new Client();
    expect(client).toBeDefined();
  });
});
