#! /usr/bin/env node

import PromptReader from './Classes/PromptReader';
import authorPrompt from './Prompts/Author.Prompt';
import projectDescriptionPrompt from './Prompts/ProjectDescription.Prompt';
import projectKeywordsPrompt from './Prompts/ProjectKeywords.Prompt';
import projectNamePrompt from './Prompts/ProjectName.Prompt';
import versionPrompt from './Prompts/Version.Prompt';

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
