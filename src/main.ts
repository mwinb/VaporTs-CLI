#! /usr/bin/env node

import PromptReader from './Classes/PromptReader';
import {
  authorPrompt,
  versionPrompt,
  projectNamePrompt,
  projectKeywordsPrompt,
  projectDescriptionPrompt
} from './Prompts';

export async function main() {
  console.log('VaporTs CLI');
  const result = await PromptReader.readPrompts([
    projectNamePrompt,
    authorPrompt,
    versionPrompt,
    projectDescriptionPrompt,
    projectKeywordsPrompt
  ]);
  console.log(JSON.stringify(result, null, 2));
}

main();
