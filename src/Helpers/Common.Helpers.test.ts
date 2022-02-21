import { EventEmitter } from 'events';
import { generatePath } from './Common.Helpers';
import { exit, getBinPath, listenOnce } from '.';

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

describe('get bin path', () => {
  it('returns the require main path', () => {
    require.resolve('./');
    expect(getBinPath()).toBeDefined();
  });
});

describe('listen once', () => {
  it('waits for an event message before resolving', async () => {
    const emitter = new EventEmitter();
    setTimeout(() => {
      emitter.emit('test', 'some test value');
    }, 100);
    expect(await listenOnce(emitter, 'test')).toBe('some test value');
  });

  it('allows for a custom reject message (error message)', async () => {
    let error: Error;
    const emitter = new EventEmitter();

    setTimeout(() => {
      emitter.emit('testError', new Error('thrown'));
    }, 100);

    try {
      await listenOnce(emitter, 'test', 'testError');
    } catch (err) {
      error = err;
    }
    expect(error.message).toBe('thrown');
  });
});

describe('exit', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('calls process.exit', () => {
    jest.spyOn(process, 'exit').mockImplementation();
    exit();
    expect(process.exit).toHaveBeenCalled();
  });
});
