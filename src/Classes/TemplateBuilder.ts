import * as fs from 'fs';
import { TemplateModel } from '.';
import { generatePath } from '../Helpers';
import { TemplateFile } from '../Interfaces';

export class TemplateBuilder {
  constructor(private execPath: string) {}

  getTemplatePath(file: TemplateFile): string {
    return generatePath(this.execPath, file.inPath);
  }

  copyTemplateFile(file: TemplateFile): void {
    fs.copyFileSync(this.getTemplatePath(file), file.outPath);
  }

  readTemplate(file: TemplateFile): string {
    return fs.readFileSync(this.getTemplatePath(file)).toString();
  }

  writeTemplate(file: TemplateFile, content: string): void {
    fs.writeFileSync(file.outPath, content);
  }

  replaceTemplateValues(models: TemplateModel[], templateString: string): string {
    return models.reduce(
      (newTemplateString: string, m: TemplateModel) => this.replaceTemplateValue(m, newTemplateString),
      templateString
    );
  }

  replaceTemplateValue(model: TemplateModel, templateString: string): string {
    return templateString.replace(new RegExp(`{{ ${model.key} }}`, 'g'), model.stringify());
  }
}

export default TemplateBuilder;
