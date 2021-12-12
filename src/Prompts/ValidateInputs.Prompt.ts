import { PromptObject } from 'prompts';

export const validateInputsPrompt: PromptObject = {
  type: 'confirm',
  name: 'confirmed',
  message: 'Are these correct?'
};
