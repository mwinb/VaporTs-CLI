import TemplateFile from '../Interfaces/TemplateFile.Interface';
import * as fs from 'fs';
import { generatePath } from '../Helpers/Common.Helpers';

class TemplateBuilder {
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

  replaceTemplateValues(model: Record<string, string | number | boolean>, templateContent: string): string {
    return Object.keys(model).reduce(
      (str, k) => str.replace(new RegExp(`{{ ${k} }}`, 'g'), `${model[k]}`),
      templateContent
    );
  }
}

export default TemplateBuilder;
