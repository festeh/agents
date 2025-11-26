#!/usr/bin/env node

const { Command } = require('commander');
const { executeInstallSkill } = require('../src/commands/install-skill');
const { executeListSkills } = require('../src/commands/list-skills');
const { executeRemoveSkill } = require('../src/commands/remove-skill');
const { version } = require('../package.json');

const program = new Command();

program
  .name('agent-cli')
  .description('CLI tool for managing Claude Code skills')
  .version(version);

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
