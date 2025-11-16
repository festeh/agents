const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const crypto = require('crypto');

/**
 * Clones a GitHub repository to a temporary directory
 * @param {string} repoUrl - GitHub repository URL
 * @returns {string} - Path to the cloned repository
 */
function cloneRepo(repoUrl) {
  // Generate a unique temporary directory name
  const tmpDir = path.join('/tmp', `agent-cli-${crypto.randomBytes(8).toString('hex')}`);

  console.log(`Cloning repository: ${repoUrl}`);
  console.log(`Temporary directory: ${tmpDir}`);

  try {
    // Clone the repository
    execSync(`git clone --depth 1 "${repoUrl}" "${tmpDir}"`, {
      stdio: 'inherit'
    });

    return tmpDir;
  } catch (error) {
    throw new Error(`Failed to clone repository: ${error.message}`);
  }
}

/**
 * Finds a skill folder in the cloned repository using ripgrep
 * @param {string} repoPath - Path to the cloned repository
 * @param {string} skillName - Name of the skill folder to find
 * @returns {string} - Path to the skill folder
 */
function findSkillFolder(repoPath, skillName) {
  console.log(`Searching for skill: ${skillName}`);

  try {
    // Use ripgrep to find directories matching the skill name
    // Look for SKILL.md files first, then check if parent directory matches
    const output = execSync(`rg --files --glob "**/SKILL.md" "${repoPath}"`, {
      encoding: 'utf-8'
    });

    const skillMdFiles = output.trim().split('\n').filter(Boolean);

    // Check if any of these SKILL.md files are in a directory matching the skill name
    for (const skillMdPath of skillMdFiles) {
      const dir = path.dirname(skillMdPath);
      const dirName = path.basename(dir);

      if (dirName === skillName) {
        console.log(`Found skill at: ${dir}`);
        return dir;
      }
    }

    // If exact match not found, try to find any directory with the skill name
    const findOutput = execSync(`find "${repoPath}" -type d -name "${skillName}"`, {
      encoding: 'utf-8'
    });

    const directories = findOutput.trim().split('\n').filter(Boolean);

    if (directories.length === 0) {
      throw new Error(`Skill folder "${skillName}" not found in repository`);
    }

    // Check if any of these directories contain a SKILL.md
    for (const dir of directories) {
      const skillMdPath = path.join(dir, 'SKILL.md');
      if (fs.existsSync(skillMdPath)) {
        console.log(`Found skill at: ${dir}`);
        return dir;
      }
    }

    throw new Error(`Skill folder "${skillName}" found but does not contain SKILL.md`);
  } catch (error) {
    throw new Error(`Failed to find skill folder: ${error.message}`);
  }
}

/**
 * Validates that a skill folder has the correct structure
 * @param {string} skillPath - Path to the skill folder
 * @returns {boolean} - True if valid
 */
function validateSkill(skillPath) {
  console.log(`Validating skill structure...`);

  const skillMdPath = path.join(skillPath, 'SKILL.md');

  if (!fs.existsSync(skillMdPath)) {
    throw new Error('Invalid skill: SKILL.md not found');
  }

  // Read and validate YAML frontmatter
  const content = fs.readFileSync(skillMdPath, 'utf-8');

  // Check for YAML frontmatter
  if (!content.startsWith('---')) {
    throw new Error('Invalid skill: SKILL.md must start with YAML frontmatter (---)');
  }

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/);
  if (!frontmatterMatch) {
    throw new Error('Invalid skill: SKILL.md has malformed YAML frontmatter');
  }

  const frontmatter = frontmatterMatch[1];

  // Check for required fields
  if (!frontmatter.includes('name:')) {
    throw new Error('Invalid skill: SKILL.md frontmatter missing "name" field');
  }

  if (!frontmatter.includes('description:')) {
    throw new Error('Invalid skill: SKILL.md frontmatter missing "description" field');
  }

  console.log('✓ Skill structure is valid');
  return true;
}

/**
 * Installs a skill to the .claude/skills directory
 * @param {string} skillPath - Path to the skill folder
 * @param {string} skillName - Name of the skill
 * @param {string} projectRoot - Project root directory
 */
function installSkill(skillPath, skillName, projectRoot) {
  const claudeSkillsDir = path.join(projectRoot, '.claude', 'skills', skillName);

  console.log(`Installing skill to: ${claudeSkillsDir}`);

  // Create .claude/skills directory if it doesn't exist
  if (!fs.existsSync(path.dirname(claudeSkillsDir))) {
    fs.mkdirSync(path.dirname(claudeSkillsDir), { recursive: true });
  }

  // Remove existing skill if present
  if (fs.existsSync(claudeSkillsDir)) {
    console.log('Removing existing skill installation...');
    fs.rmSync(claudeSkillsDir, { recursive: true, force: true });
  }

  // Copy the skill folder
  fs.cpSync(skillPath, claudeSkillsDir, { recursive: true });

  console.log(`✓ Skill installed successfully at: ${claudeSkillsDir}`);
}

/**
 * Cleans up temporary directory
 * @param {string} tmpDir - Temporary directory to remove
 */
function cleanup(tmpDir) {
  if (fs.existsSync(tmpDir)) {
    console.log('Cleaning up temporary files...');
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

/**
 * Executes the install-skill command
 * @param {string} repoUrl - GitHub repository URL
 * @param {string} skillName - Name of the skill folder to install
 */
function executeInstallSkill(repoUrl, skillName) {
  let tmpDir = null;

  try {
    if (!repoUrl || !skillName) {
      throw new Error('Usage: agent-cli install-skill <github-repo-url> <skill-name>');
    }

    const projectRoot = process.cwd();

    // Step 1: Clone the repository
    tmpDir = cloneRepo(repoUrl);

    // Step 2: Find the skill folder
    const skillPath = findSkillFolder(tmpDir, skillName);

    // Step 3: Validate the skill
    validateSkill(skillPath);

    // Step 4: Install the skill
    installSkill(skillPath, skillName, projectRoot);

    console.log('\n✓ Installation complete!');
  } catch (error) {
    console.error(`\nError: ${error.message}`);
    process.exit(1);
  } finally {
    // Step 5: Cleanup
    if (tmpDir) {
      cleanup(tmpDir);
    }
  }
}

module.exports = {
  executeInstallSkill
};
