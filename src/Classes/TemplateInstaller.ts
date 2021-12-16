import { InstallerConfig, TemplateFile } from '../Interfaces';
import { PromptReader, FileHandler, TemplateModel, PackageInstaller } from '.';

export class TemplateInstaller {
  private promptResults = {};
  private dependencies: string[];
  private devDependencies: string[];
  private templateFiles: TemplateFile[];

  constructor({ templateFiles, dependencies, devDependencies }: InstallerConfig) {
    this.dependencies = dependencies;
    this.templateFiles = templateFiles;
    this.devDependencies = devDependencies;
  }

  get promptValues(): Record<string, any> {
    return this.promptResults;
  }

  set promptValues(newResult: Record<string, any>) {
    this.promptResults = { ...this.promptResults, ...newResult };
  }

  async install(): Promise<void> {
    await this.initTemplateFiles();
    await PackageInstaller.installProd(this.dependencies);
    await PackageInstaller.installDev(this.devDependencies);
  }

  async initTemplateFiles(): Promise<void> {
    for (const templateFile of this.templateFiles) {
      const fileHandler = FileHandler.fromBinTemplateFile(templateFile);
      templateFile.prompts ? await this.handleFileWithPrompts(templateFile, fileHandler) : fileHandler.copyFile();
    }
  }

  async handleFileWithPrompts(templateFile: TemplateFile, fileHandler: FileHandler) {
    this.promptValues = await PromptReader.readPrompts(templateFile.prompts);
    const models = TemplateModel.factory(this.promptValues, templateFile.stringify);
    fileHandler.readFile().replaceTemplateValues(models).writeFile();
  }
}

export default TemplateInstaller;
