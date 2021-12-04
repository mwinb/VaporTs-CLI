import { PromptObject, prompt } from 'prompts';

class PromptReader {
  static async readPrompts(promptObjects: PromptObject[]): Promise<Record<string, any>> {
    return prompt(promptObjects);
  }
}

export default PromptReader;
