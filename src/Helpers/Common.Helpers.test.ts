import { getUserFolder, log, generatePath } from './Common.Helpers';

describe('Log', () => {
  it('logs the provided text', () => {
    jest.spyOn(console, 'log').mockImplementationOnce(jest.fn);
    log('log');
    expect(console.log).toHaveBeenLastCalledWith('log');
  });
});

describe('Getting user folder', () => {
  beforeEach(() => {
    jest.spyOn(process, 'cwd').mockReturnValue('some/path/folder');
  });

  it('gets the user folder', () => {
    expect(getUserFolder()).toBe('folder');
  });
});

describe('Url Path Creation', () => {
  it('joins provided string arguments with a slash', () => {
    expect(generatePath('root', 'dir', 'dir')).toBe('root/dir/dir');
  });

  it('removes extraneous slashes', () => {
    expect(generatePath('root/', 'dir/', 'dir')).toBe('root/dir/dir');
  });

  it('filters empty strings', () => {
    expect(generatePath('root', 'dir', '')).toBe('root/dir');
  });

  it('handles undefined', () => {
    expect(generatePath('/', undefined)).toBe('/');
  });
});
