const fs = require('fs');

/**
 * Parses a markdown file with -- Name and -- Description headers
 * @param {string} filePath - Path to the markdown file
 * @returns {Object} - { name, description, content }
 */
function parseMarkdownFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  let name = '';
  let description = '';
  let contentLines = [];
  let currentSection = null;
  let descriptionLines = [];
  let contentStarted = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for -- Name header
    if (line.trim() === '-- Name') {
      currentSection = 'name';
      continue;
    }

    // Check for -- Description header
    if (line.trim() === '-- Description') {
      currentSection = 'description';
      contentStarted = true;
      continue;
    }

    // If we're in the name section, next non-empty line is the name
    if (currentSection === 'name' && line.trim() !== '') {
      name = line.trim();
      currentSection = null;
      continue;
    }

    // If we're in the description section
    if (currentSection === 'description') {
      // Empty line marks end of description
      if (line.trim() === '') {
        currentSection = null;
        continue;
      }
      descriptionLines.push(line);
      continue;
    }

    // After description section, everything else is content
    if (contentStarted && currentSection === null) {
      contentLines.push(line);
    }
  }

  description = descriptionLines.join('\n').trim();
  const mainContent = contentLines.join('\n').trim();

  if (!name) {
    throw new Error('Missing -- Name section in markdown file');
  }

  if (!description) {
    throw new Error('Missing -- Description section in markdown file');
  }

  return {
    name,
    description,
    content: mainContent
  };
}

module.exports = {
  parseMarkdownFile
};
