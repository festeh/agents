#!/usr/bin/env node

const { Command } = require('commander');
const { executeGenerateSkill } = require('../src/commands/generate-skill');
const { executeInstallSkill } = require('../src/commands/install-skill');
const { executeListSkills } = require('../src/commands/list-skills');
const { executeRemoveSkill } = require('../src/commands/remove-skill');

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
  .description('Install a skill from a GitHub repository')
  .argument('<repo-url>', 'GitHub repository URL')
  .argument('<skill-name>', 'Name of the skill folder in the repository')
  .action((repoUrl, skillName) => {
    executeInstallSkill(repoUrl, skillName);
  });

program
  .command('list-skills')
  .description('List all installed skills')
  .action(() => {
    executeListSkills();
  });

program
  .command('remove-skill')
  .description('Remove an installed skill')
  .argument('<skill-name>', 'Name of the skill to remove')
  .action((skillName) => {
    executeRemoveSkill(skillName);
  });

program.parse();
