import { PromptObject } from 'prompts';

const projectDescriptionPrompt: PromptObject = {
  type: 'text',
  name: 'projectDescription',
  message: 'Enter project description:'
};

export default projectDescriptionPrompt;
