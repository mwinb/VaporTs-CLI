#! /usr/bin/env node

import PromptReader from './Classes/PromptReader';
import { log } from './Helpers/Common.Helpers';
import authorPrompt from './Prompts/Author.Prompt';
import projectNamePrompt from './Prompts/ProjectName.Prompt';

export async function main() {
  log('VaporTs CLI');
  const result = await PromptReader.readPrompts([projectNamePrompt, authorPrompt]);
  console.log(JSON.stringify(result, null, 2));
}

main();
