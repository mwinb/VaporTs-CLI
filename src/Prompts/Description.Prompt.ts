import { PromptObject } from 'prompts';

export const projectDescriptionPrompt: PromptObject = {
  type: 'text',
  name: 'description',
  message: 'Enter description:'
};

export default projectDescriptionPrompt;
