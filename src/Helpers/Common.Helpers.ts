export function generatePath(...args: string[]): string {
  return args
    .filter(s => s && s.length)
    .join('/')
    .replace(/\/{2,}/g, '/');
}
