import { PromptObject } from 'prompts';
import { formatRepositoryPrompt } from '../Helpers';

export const repositoryPrompt: PromptObject = {
  type: 'text',
  message: 'Git repository:',
  name: 'repository',
  format: formatRepositoryPrompt
};

export default repositoryPrompt;
