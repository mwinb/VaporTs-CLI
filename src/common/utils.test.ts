import { log } from './utils';

describe('Log', () => {
  it('logs the provided text', () => {
    jest.spyOn(console, 'log').mockImplementationOnce(jest.fn);
    log('log');
    expect(console.log).toHaveBeenLastCalledWith('log');
  });
});
