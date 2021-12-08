import { PromptObject } from 'prompts';

const projectKeywordsPrompt: PromptObject = {
  type: 'list',
  name: 'projectKeywords',
  separator: ',',
  message: 'Enter project keywords (separated by comma):'
};

export default projectKeywordsPrompt;
