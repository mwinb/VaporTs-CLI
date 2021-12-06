#! /usr/bin/env node

import PromptReader from './Classes/PromptReader';
import authorPrompt from './Prompts/Author.Prompt';
import projectNamePrompt from './Prompts/ProjectName.Prompt';
import versionPrompt from './Prompts/Version.Prompt';

export async function main() {
  console.log('VaporTs CLI');
  const result = await PromptReader.readPrompts([projectNamePrompt, authorPrompt, versionPrompt]);
  console.log(JSON.stringify(result, null, 2));
}

main();
