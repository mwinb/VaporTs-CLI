import { PromptObject } from 'prompts';

interface TemplateFile {
  inPath: string;
  outPath: string;
  prompts?: PromptObject[];
}

export default TemplateFile;
