import { TemplateFile } from '../Interfaces';
import { PromptReader, FileHandler, TemplateModel } from '.';

export class TemplateInstaller {
  private promptResults = {};

  constructor(private templateFiles: TemplateFile[]) {}

  get promptValues(): Record<string, any> {
    return this.promptResults;
  }

  set promptValues(newResult: Record<string, any>) {
    this.promptResults = { ...this.promptResults, ...newResult };
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
