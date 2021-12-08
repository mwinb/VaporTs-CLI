import { PromptObject } from 'prompts';

export const projectKeywordsPrompt: PromptObject = {
  type: 'list',
  name: 'projectKeywords',
  separator: ',',
  message: 'Enter project keywords (separated by comma):'
};

export default projectKeywordsPrompt;
