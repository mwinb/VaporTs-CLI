import { valid as semverValid } from 'semver';

export function getUserCurrentFolder(): string {
  return process.cwd().split('/').pop();
}

export function projectNameValidator(name: string): boolean {
  // Regex Pattern taken from npm package.json docs.
  return new RegExp('^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$').test(name);
}

export function versionValidator(version: string): boolean {
  return semverValid(version) !== null;
}

export function filterEmptyPromptListItems(val: string[]): string[] {
  return val.filter(i => i.length > 0);
}

export function formatRepositoryPrompt(val: string): Record<string, string> | undefined {
  return { type: 'git', url: val };
}
