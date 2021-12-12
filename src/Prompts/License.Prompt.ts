import { PromptObject } from 'prompts';

export const licensePrompt: PromptObject = {
  type: 'text',
  name: 'license',
  initial: 'MIT',
  message: 'Enter project license:'
};

export default licensePrompt;
