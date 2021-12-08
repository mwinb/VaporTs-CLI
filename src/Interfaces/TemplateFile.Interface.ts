import { PromptObject } from 'prompts';

export interface TemplateFile {
  inPath: string;
  outPath: string;
  prompts?: PromptObject[];
}

export default TemplateFile;
