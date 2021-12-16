import EventEmitter = require('events');

export function generatePath(...args: string[]): string {
  return args
    .filter(s => s && s.length)
    .join('/')
    .replace(/\/{2,}/g, '/');
}

export function getBinPath(): string {
  return require.main.path;
}

export async function listenOnce<T>(listener: EventEmitter, event: string, errorEvent = 'error'): Promise<T> {
  return new Promise((resolve, reject) => {
    listener
      .once(event, (data: T) => {
        resolve(data);
      })
      .once(errorEvent, error => {
        reject(error);
      });
  });
}
