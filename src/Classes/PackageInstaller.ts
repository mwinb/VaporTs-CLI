import { NpmArgs } from '../Types';
import { spawn } from 'child_process';
import { listenOnce } from '../Helpers';

export class PackageInstaller {
  public static installProd(dependencies: string[]): Promise<void> {
    console.log('Installing dependencies...');
    return this.executeInstall(['i'], dependencies);
  }

  public static installDev(dependencies: string[]): Promise<void> {
    console.log('Installing dev dependencies...');
    return this.executeInstall(['i', '-D'], dependencies);
  }

  private static async executeInstall(arg: NpmArgs, dependencies: string[]): Promise<void> {
    const npm = spawn('npm', [...arg, ...dependencies]);
    await listenOnce(npm, 'close');
    console.log('Finished installing:');
    dependencies.forEach(d => console.log(`  - ${d}`));
  }
}
