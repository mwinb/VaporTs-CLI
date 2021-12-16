import { PackageInstaller } from '.';
import { EventEmitter } from 'stream';
import * as childProcess from 'child_process';

describe('Package installer', () => {
  let emitter: EventEmitter;
  beforeEach(() => {
    jest.spyOn(console, 'log');
    emitter = new EventEmitter();
    emitter['stderr'] = new EventEmitter();
    emitter['stdout'] = new EventEmitter();
    jest.spyOn(childProcess, 'spawn').mockImplementation((command: string, args: readonly string[]) => {
      return emitter as any;
    });
    setTimeout(() => {
      emitter.emit('close', 0);
    }, 100);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls spawn npm with provided args and dependencies', async () => {
    await PackageInstaller['executeInstall'](['i'], ['dependency']);
    expect(childProcess.spawn).toHaveBeenLastCalledWith('npm', ['i', 'dependency']);
  });

  it('calls npm install with the developer arg', async () => {
    await PackageInstaller.installDev(['dependency']);
    expect(childProcess.spawn).toHaveBeenLastCalledWith('npm', ['i', '-D', 'dependency']);
  });

  it('calls npm install with the dependencies', async () => {
    await PackageInstaller.installProd(['dependency']);
    expect(childProcess.spawn).toHaveBeenLastCalledWith('npm', ['i', 'dependency']);
  });
});
