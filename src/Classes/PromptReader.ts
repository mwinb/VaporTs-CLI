import { PromptObject, prompt } from 'prompts';
import { validateInputsPrompt } from '../Prompts';

export class PromptReader {
  static async readPrompts(promptObjects: PromptObject[]): Promise<Record<string, any>> {
    let result: Record<string, any>;
    let confirmation: Record<string, any>;
    do {
      result = await prompt(promptObjects);
      console.log(JSON.stringify(result, null, 2));
      confirmation = await prompt(validateInputsPrompt);
    } while (!confirmation.confirmed);
    return result;
  }
}

export default PromptReader;
