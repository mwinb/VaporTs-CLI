export function log(...args: any[]): void {
  console.log(...args);
}

export function getUserCurrentFolder(): string {
  return process.cwd().split('/').pop();
}

export function generatePath(...args: string[]): string {
  return args
    .filter(s => s && s.length)
    .join('/')
    .replace(/\/{2,}/g, '/');
}

export function projectNameValidator(name: string): boolean {
  // Regex Pattern taken from npm package.json docs.
  return new RegExp('^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$').test(name);
}
