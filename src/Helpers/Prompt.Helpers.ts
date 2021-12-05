export function getUserCurrentFolder(): string {
  return process.cwd().split('/').pop();
}

export function projectNameValidator(name: string): boolean {
  // Regex Pattern taken from npm package.json docs.
  return new RegExp('^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$').test(name);
}
