import { PromptObject } from 'prompts';
import { filterEmptyPromptListItems } from '../Helpers';

export const projectKeywordsPrompt: PromptObject = {
  type: 'list',
  name: 'projectKeywords',
  separator: ',',
  initial: '',
  message: 'Enter project keywords (separated by comma):',
  format: filterEmptyPromptListItems
};

export default projectKeywordsPrompt;
