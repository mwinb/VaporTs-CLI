import { PromptObject } from 'prompts';
import { StringifyTemplateValue } from '../Types';

export interface TemplateFile {
  readPath: string;
  writePath: string;
  prompts?: PromptObject[];
  stringify?: StringifyTemplateValue;
}

export default TemplateFile;
