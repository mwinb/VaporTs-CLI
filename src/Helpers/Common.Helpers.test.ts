import { getUserCurrentFolder, log, generatePath, projectNameValidator } from './Common.Helpers';

describe('Log', () => {
  it('logs the provided text', () => {
    jest.spyOn(console, 'log').mockImplementationOnce(jest.fn);
    log('log');
    expect(console.log).toHaveBeenLastCalledWith('log');
  });
});

describe('Getting user cwd', () => {
  beforeEach(() => {
    jest.spyOn(process, 'cwd').mockReturnValue('some/path/folder');
  });

  it('gets the user folder', () => {
    expect(getUserCurrentFolder()).toBe('folder');
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

describe('project name validator (regex taken from npm package.json docs)', () => {
  it('enforces the npm project name regex.', () => {
    expect(projectNameValidator('some invalid name')).toBeFalsy();
    expect(projectNameValidator('@valid/project.name')).toBeTruthy();
  });
});
