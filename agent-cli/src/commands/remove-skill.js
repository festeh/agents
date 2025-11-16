const path = require('path');
const fs = require('fs');

/**
 * Executes the remove-skill command
 * @param {string} skillName - Name of the skill to remove
 */
function executeRemoveSkill(skillName) {
  try {
    if (!skillName) {
      throw new Error('Usage: agent-cli remove-skill <skill-name>');
    }

    const projectRoot = process.cwd();
    const skillPath = path.join(projectRoot, '.claude', 'skills', skillName);

    // Check if the skill exists
    if (!fs.existsSync(skillPath)) {
      console.error(`Error: Skill "${skillName}" not found.`);
      console.log(`\nLooked in: ${skillPath}`);
      console.log('\nRun "agent-cli list-skills" to see installed skills.');
      process.exit(1);
    }

    // Check if it's a directory
    const stats = fs.statSync(skillPath);
    if (!stats.isDirectory()) {
      throw new Error(`"${skillName}" is not a skill directory`);
    }

    // Remove the skill directory
    console.log(`Removing skill: ${skillName}`);
    console.log(`Location: ${skillPath}`);

    fs.rmSync(skillPath, { recursive: true, force: true });

    console.log(`\n✓ Skill "${skillName}" removed successfully!`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  executeRemoveSkill
};
