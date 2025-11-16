const path = require('path');
const { parseMarkdownFile } = require('../parsers/markdown-parser');
const { generateSkill } = require('../generators/skill-generator');

/**
 * Executes the generate-skill command
 * @param {string} skillName - Name of the skill directory in templates folder
 * @param {Object} options - Command options
 */
function executeGenerateSkill(skillName, options) {
  try {
    const projectRoot = process.cwd();

    // Construct path to description.md in templates folder
    const descriptionPath = path.join(projectRoot, 'templates', skillName, 'description.md');

    console.log(`Looking for: ${descriptionPath}`);

    // Parse the markdown file
    const skillData = parseMarkdownFile(descriptionPath);

    console.log(`Parsed skill: ${skillData.name}`);

    // Generate the skill in skills folder
    const skillsDir = path.join(projectRoot, 'skills');
    const skillFilePath = generateSkill(skillData, skillsDir, skillName);

    console.log(`✓ Generated skill at: ${skillFilePath}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  executeGenerateSkill
};
