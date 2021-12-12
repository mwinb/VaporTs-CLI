import * as fs from 'fs';
import { TemplateModel } from '.';
import { generatePath, getBinPath } from '../Helpers';
import { TemplateFile } from '../Interfaces';

export class FileHandler {
  public fileContent: string;

  static fromBinTemplateFile(templateFile: TemplateFile): FileHandler {
    return new FileHandler(generatePath(getBinPath(), templateFile.readPath), templateFile.writePath);
  }

  constructor(public readPath: string, private _writePath?: string) {}

  get writePath(): string {
    return this._writePath ?? this.readPath;
  }

  setFileContent(content: string): FileHandler {
    this.fileContent = content;
    return this;
  }

  copyFile(writePath = this.writePath): FileHandler {
    this.createDirs();
    fs.copyFileSync(this.readPath, writePath);
    return this;
  }

  readFile(): FileHandler {
    this.fileContent = fs.readFileSync(this.readPath).toString();
    return this;
  }

  writeFile(): FileHandler {
    if (!this.fileContent) {
      throw new Error('No file content has been provided to write to file.');
    }
    this.createDirs();
    fs.writeFileSync(this.writePath, this.fileContent);
    return this;
  }

  createDirs() {
    const dirs = this.getWriteDirs();
    console.log(this.writePath);
    console.log(dirs);
    console.log(fs.existsSync(dirs));
    if (dirs !== '' && !fs.existsSync(dirs)) {
      fs.mkdirSync(dirs, { recursive: true });
    }
  }

  getWriteDirs(): string {
    const splitPath = this.writePath.split(/\/|\\/g);
    splitPath.pop();
    return splitPath.join('/');
  }

  replaceTemplateValues(models: TemplateModel[]): FileHandler {
    models.forEach(m => {
      this.replaceTemplateValue(m);
    });
    return this;
  }

  replaceTemplateValue(model: TemplateModel): FileHandler {
    if (!this.fileContent) {
      throw new Error('No file content has been provided to replace template values.');
    }
    this.fileContent = this.fileContent.replace(new RegExp(`{{ ${model.key} }}`, 'g'), model.stringify());
    return this;
  }
}

export default FileHandler;
