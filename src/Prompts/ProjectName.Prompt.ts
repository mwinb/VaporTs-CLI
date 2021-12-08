import { PromptObject } from 'prompts';
import { getUserCurrentFolder, projectNameValidator } from '../Helpers/Prompt.Helpers';

export const projectNamePrompt: PromptObject = {
  type: 'text',
  name: 'projectName',
  initial: getUserCurrentFolder,
  message: 'Enter project name:',
  validate: projectNameValidator
};
export default projectNamePrompt;
