export function log(...args: any[]): void {
  console.log(...args);
}

export function getUserFolder(): string {
  return process.cwd().split('/').pop();
}

export function generatePath(...args: string[]): string {
  return args
    .filter(s => s && s.length)
    .join('/')
    .replace(/\/{2,}/g, '/');
}
