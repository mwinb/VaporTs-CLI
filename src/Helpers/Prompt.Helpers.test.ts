import { getUserCurrentFolder, projectNameValidator, versionValidator } from './Prompt.Helpers';
import * as semver from 'semver';

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

describe('semver validation', () => {
  it('validates version input using semver validate', () => {
    jest.spyOn(semver, 'valid');
    versionValidator('v1.0.0');
    expect(semver.valid).toHaveBeenCalledWith('v1.0.0');
  });

  it('returns true given a valid semver version', () => {
    expect(versionValidator('v1.0.0')).toBeTruthy();
  });

  it('returns false given an invalid version', () => {
    expect(versionValidator('a.b.c')).toBeFalsy();
  });
});
