import { PromptObject } from 'prompts';
import { versionValidator } from '../Helpers/Prompt.Helpers';

const versionPrompt: PromptObject = {
  type: 'text',
  name: 'version',
  initial: '0.0.1',
  message: 'Enter project version:',
  validate: versionValidator
};
export default versionPrompt;
