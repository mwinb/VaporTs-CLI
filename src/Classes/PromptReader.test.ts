import * as prompts from 'prompts';
import PromptReader from './PromptReader';
import authorPrompt from '../Prompts/Author.Prompt';
import { validateInputsPrompt } from '../Prompts';
describe('Prompt Reader', () => {
  beforeEach(() => {
    jest.spyOn(prompts, 'prompt');
    console.log = jest.fn();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('calls prompt with the provided prompt objects', async () => {
    prompts.inject(['Author Name', true]);
    const result = await PromptReader.readPrompts([authorPrompt]);
    expect(result.author).toBe('Author Name');
  });

  it('prints the result after receiving it', async () => {
    prompts.inject(['Author Name', true]);
    await PromptReader.readPrompts([authorPrompt]);
    expect(console.log).toHaveBeenCalledWith(JSON.stringify({ author: 'Author Name' }, null, 2));
  });

  it('request confirmation after the prompts.', async () => {
    prompts.inject(['Author Name', true]);
    await PromptReader.readPrompts([authorPrompt]);
    expect(prompts.prompt).toHaveBeenLastCalledWith(validateInputsPrompt);
  });

  it('loops if the confirmation returns false', async () => {
    prompts.inject(['Author Name', false, 'Author Name', true]);
    await PromptReader.readPrompts([authorPrompt]);
    expect(prompts.prompt).toHaveBeenCalledTimes(4);
  });
});
