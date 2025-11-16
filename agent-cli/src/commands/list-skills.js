const path = require('path');
const fs = require('fs');

/**
 * Parses YAML frontmatter from SKILL.md content
 * @param {string} content - File content
 * @returns {Object} - { name, description }
 */
function parseYAMLFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/);

  if (!frontmatterMatch) {
    return { name: 'Unknown', description: 'No description' };
  }

  const frontmatter = frontmatterMatch[1];

  // Extract name
  const nameMatch = frontmatter.match(/name:\s*(.+)/);
  const name = nameMatch ? nameMatch[1].trim() : 'Unknown';

  // Extract description
  const descMatch = frontmatter.match(/description:\s*(.+)/);
  const description = descMatch ? descMatch[1].trim() : 'No description';

  return { name, description };
}

/**
 * Executes the list-skills command
 */
function executeListSkills() {
  try {
    const projectRoot = process.cwd();
    const skillsDir = path.join(projectRoot, '.claude', 'skills');

    // Check if .claude/skills directory exists
    if (!fs.existsSync(skillsDir)) {
      console.log('No skills installed yet.');
      console.log(`Skills directory not found: ${skillsDir}`);
      return;
    }

    // Read all subdirectories in .claude/skills
    const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
    const skillDirs = entries.filter(entry => entry.isDirectory());

    if (skillDirs.length === 0) {
      console.log('No skills installed yet.');
      return;
    }

    console.log(`\nInstalled Skills (${skillDirs.length}):\n`);

    // List each skill
    skillDirs.forEach((dir, index) => {
      const skillPath = path.join(skillsDir, dir.name);
      const skillMdPath = path.join(skillPath, 'SKILL.md');

      if (fs.existsSync(skillMdPath)) {
        const content = fs.readFileSync(skillMdPath, 'utf-8');
        const { name, description } = parseYAMLFrontmatter(content);

        console.log(`${index + 1}. ${name}`);
        console.log(`   ${description}`);
        console.log(`   Location: .claude/skills/${dir.name}`);
        console.log();
      } else {
        console.log(`${index + 1}. ${dir.name}`);
        console.log(`   (Invalid skill - SKILL.md not found)`);
        console.log(`   Location: .claude/skills/${dir.name}`);
        console.log();
      }
    });

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  executeListSkills
};
