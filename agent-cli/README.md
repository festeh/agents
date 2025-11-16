# agent-cli

A CLI tool for managing agent skills and specifications for Claude Code and other agent platforms.

## Installation

```bash
npm install
npm link  # To use globally as 'agent-cli'
```

## Project Structure

This project expects the following directory structure at the root:

```
project-root/
├── templates/              # Template definitions
│   └── <skill-name>/
│       └── description.md
├── skills/                 # Generated skills
│   └── <skill-name>/
│       └── SKILL.md
└── agent-cli/             # This CLI tool
```

## Usage

### Generate Skill

Generate a Claude skill from a template's `description.md` file:

```bash
agent-cli generate-skill <skill-name>
```

**Example:**

```bash
# Given: templates/visualizer-spec/description.md exists
agent-cli generate-skill visualizer-spec

# Output: skills/visualizer-spec/SKILL.md created
```

### Input Format

The `description.md` file should follow this format:

```markdown
-- Name
skill-name

-- Description
Use this skill when [trigger conditions] - [what it does]

# Content

Your skill content goes here...
```

### Output Format

The generated `SKILL.md` file will have YAML frontmatter:

```yaml
---
name: skill-name
description: Use this skill when [trigger conditions] - [what it does]
---

# Content

Your skill content goes here...
```

### Install Skill (Coming Soon)

Install a skill from GitHub:

```bash
agent-cli install-skill <github-repo-url>
```

## Project Structure

```
agent-cli/
├── package.json
├── bin/
│   └── agent-cli.js             # CLI entry point
├── src/
│   ├── commands/
│   │   ├── generate-skill.js    # Generate skill command
│   │   └── install-skill.js     # Install skill command (future)
│   ├── parsers/
│   │   └── markdown-parser.js   # Parse markdown headers
│   └── generators/
│       └── skill-generator.js   # Generate SKILL.md with YAML
└── README.md
```

## License

ISC
