import * as prompts from 'prompts';
import PromptReader from './PromptReader';
import authorPrompt from '../Prompts/Author.Prompt';
describe('Prompt Reader', () => {
  beforeEach(() => {
    jest.spyOn(prompts, 'prompt').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('calls prompt with the provided prompt objects', () => {
    PromptReader.readPrompts([authorPrompt]);
    expect(prompts.prompt).toHaveBeenCalled();
  });
});
