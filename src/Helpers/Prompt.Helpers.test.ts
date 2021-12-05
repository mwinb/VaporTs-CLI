import { getUserCurrentFolder, projectNameValidator } from './Prompt.Helpers';

describe('Getting user cwd', () => {
  beforeEach(() => {
    jest.spyOn(process, 'cwd').mockReturnValue('some/path/folder');
  });

  it('gets the user folder', () => {
    expect(getUserCurrentFolder()).toBe('folder');
  });
});

describe('project name validator (regex taken from npm package.json docs)', () => {
  it('enforces the npm project name regex.', () => {
    expect(projectNameValidator('some invalid name')).toBeFalsy();
    expect(projectNameValidator('@valid/project.name')).toBeTruthy();
  });
});
