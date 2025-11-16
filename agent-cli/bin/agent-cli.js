#!/usr/bin/env node

const { Command } = require('commander');
const { executeGenerateSkill } = require('../src/commands/generate-skill');

const program = new Command();

program
  .name('agent-cli')
  .description('CLI tool for managing agent skills and specifications')
  .version('1.0.0');

program
  .command('generate-skill')
  .description('Generate a SKILL.md file from a description.md file')
  .argument('<skill-name>', 'Name of the skill directory containing description.md')
  .action((skillName) => {
    executeGenerateSkill(skillName);
  });

program
  .command('install-skill')
  .description('Install a skill from GitHub via npx (coming soon)')
  .argument('[repo]', 'GitHub repository URL')
  .action(() => {
    console.log('install-skill command coming soon!');
  });

program.parse();
