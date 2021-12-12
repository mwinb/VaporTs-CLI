export function generatePath(...args: string[]): string {
  return args
    .filter(s => s && s.length)
    .join('/')
    .replace(/\/{2,}/g, '/');
}

export function getBinPath(): string {
  return require.main.path;
}
