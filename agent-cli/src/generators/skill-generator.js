const fs = require('fs');
const path = require('path');

/**
 * Sanitizes a skill name to be URL/file-system friendly
 * @param {string} name - Raw skill name
 * @returns {string} - Sanitized name (lowercase with hyphens)
 */
function sanitizeSkillName(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Generates SKILL.md file with YAML frontmatter
 * @param {Object} skillData - { name, description, content }
 * @param {string} skillsRootDir - Root directory for all skills (e.g., /path/to/skills)
 * @param {string} skillName - Name of the skill folder
 */
function generateSkill(skillData, skillsRootDir, skillName) {
  const { name, description, content } = skillData;

  // Sanitize the skill name for the frontmatter
  const sanitizedName = sanitizeSkillName(name);

  // Create the skill directory structure: skills/<skill-name>/SKILL.md
  const skillPath = path.join(skillsRootDir, skillName);

  if (!fs.existsSync(skillPath)) {
    fs.mkdirSync(skillPath, { recursive: true });
  }

  // Generate YAML frontmatter
  const yamlFrontmatter = `---
name: ${sanitizedName}
description: ${description}
---`;

  // Combine frontmatter with content
  const skillContent = `${yamlFrontmatter}\n\n${content}`;

  // Write SKILL.md file directly in skills/<skill-name>/
  const skillFilePath = path.join(skillPath, 'SKILL.md');
  fs.writeFileSync(skillFilePath, skillContent, 'utf-8');

  return skillFilePath;
}

module.exports = {
  generateSkill,
  sanitizeSkillName
};
