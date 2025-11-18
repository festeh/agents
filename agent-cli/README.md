# agent-cli

A CLI tool for managing agent skills and specifications for Claude Code and other agent platforms.

## Installation

### Quick Start (npx - no installation needed)

```bash
npx @festeh/agent-cli <command>
```

### Global Installation

```bash
npm install -g @festeh/agent-cli
agent-cli <command>
```

### Development Setup

```bash
cd agent-cli
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

All examples below use `npx @festeh/agent-cli`. If you installed globally, you can use `agent-cli` instead.

### Generate Skill

Generate a Claude skill from a template's `description.md` file:

```bash
npx @festeh/agent-cli generate-skill <skill-name>
```

**Example:**

```bash
# Given: templates/visualizer-spec/description.md exists
npx @festeh/agent-cli generate-skill visualizer-spec

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

### Install Skill

Install a skill from a GitHub repository to your project's `.claude/skills` directory:

```bash
npx @festeh/agent-cli install-skill <user/repo> <skill-name>
# or
npx @festeh/agent-cli install-skill <github-repo-url> <skill-name>
```

**Examples:**

```bash
# Shorthand format (assumes GitHub)
npx @festeh/agent-cli install-skill obra/superpowers systematic-debugging

# Full URL format
npx @festeh/agent-cli install-skill https://github.com/obra/superpowers.git systematic-debugging

# Both output: Skill installed at .claude/skills/systematic-debugging/
```

**What it does:**
1. Clones the repository to a temporary directory (`/tmp`)
2. Searches for the specified skill folder using ripgrep
3. Validates the skill has proper structure (SKILL.md with YAML frontmatter)
4. Copies the skill to `.claude/skills/<skill-name>/`
5. Cleans up temporary files
6. Always installs the latest version from the default branch

### List Skills

List all installed skills in your project:

```bash
npx @festeh/agent-cli list-skills
```

**Example output:**

```
Installed Skills (1):

1. systematic-debugging
   Use when encountering any bug, test failure, or unexpected behavior...
   Location: .claude/skills/systematic-debugging
```

### Remove Skill

Remove an installed skill from your project:

```bash
npx @festeh/agent-cli remove-skill <skill-name>
```

**Example:**

```bash
npx @festeh/agent-cli remove-skill systematic-debugging

# Output:
# Removing skill: systematic-debugging
# Location: /path/to/.claude/skills/systematic-debugging
# ✓ Skill "systematic-debugging" removed successfully!
```

## CLI Tool Structure

```
agent-cli/
├── package.json
├── bin/
│   └── agent-cli.js             # CLI entry point
├── src/
│   ├── commands/
│   │   ├── generate-skill.js    # Generate skill command
│   │   ├── install-skill.js     # Install skill command
│   │   ├── list-skills.js       # List skills command
│   │   └── remove-skill.js      # Remove skill command
│   ├── parsers/
│   │   └── markdown-parser.js   # Parse markdown headers
│   └── generators/
│       └── skill-generator.js   # Generate SKILL.md with YAML
└── README.md
```

## License

ISC
