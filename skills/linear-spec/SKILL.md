---
name: linear-spec
description: Uses Linear MCP to read and update a Linear ticket until it contains a comprehensive specification that an AI/LLM can implement directly. Use when a Linear ticket lacks implementation details, clear steps, or acceptance criteria. Transforms vague feature requests into actionable, AI-implementable specifications with explicit technical details.
---

# Linear Specification Writer


## Overview

Transform incomplete Linear tickets into comprehensive, AI-implementable specifications with clear goals, explicit implementation steps, and testable acceptance criteria. The specification should provide enough technical detail and context that an AI/LLM can autonomously implement the feature without ambiguity.

## Workflow

This skill follows a two-phase approach to ensure quality specifications:

### Phase 1: Gather Context

**DO NOT write the specification immediately.** First, thoroughly understand the ticket and project:

1. **Read the Linear ticket** using Linear MCP tools:
   - Use `linear_search_issues` with the ticket ID or title
   - Review current description, comments, and metadata
   - Note priority, status, and assigned team

2. **Understand the project context**:
   - Explore relevant codebase areas
   - Identify architectural patterns and conventions
   - Review related tickets or similar features
   - Understand existing implementation patterns

3. **Identify specification gaps**:
   - What is the actual goal? (Why does this need to be done?)
   - What are the specific implementation steps?
   - What are the acceptance criteria?
   - Are there any edge cases or dependencies?

4. **Ask clarifying questions** to the user:
   - Business context and user value
   - Technical constraints or preferences
   - Integration points with existing features
   - Expected behavior in edge cases

5. **Wait for user confirmation** with the command **WRITESPEC** before proceeding to Phase 2.

### Phase 2: Write Specification

Once the user confirms with **WRITESPEC**, update the Linear ticket:

1. **Compose the specification** following the structure below
2. **Update the ticket** using `linear_update_issue` with the ticket ID
3. **Verify the update** by reading the ticket again to confirm changes

## Specification Structure

Update the ticket description to include these sections for AI implementation:

### Goal
- What needs to be achieved and why
- User value or business context
- Expected behavior in 1-2 sentences

### Context
- **Relevant Files**: Explicit file paths that need modification (e.g., `src/services/auth.py`, `pkg/handlers/user.go`, `lib/validators/email.rb`)
- **Related Code**: Existing functions, classes, modules, or components to reference or extend
- **Architecture Patterns**: Specific patterns used in the project (e.g., "Follow repository pattern", "Use dependency injection", "MVC architecture")
- **Dependencies**: External libraries or internal modules to use

### Implementation Steps
Explicit, numbered steps with technical details:

1. **[Action]** in `path/to/file.ext`
   - Specific code changes or additions
   - Function/method signatures to create
   - Example: "Add `validate_user(email)` method that returns boolean"

2. **[Action]** in `path/to/another-file.ext`
   - Data structures or models to define
   - API endpoints to call or create
   - Database schema changes

Each step must include:
- Exact file paths
- Function/class/module/method names
- Data types or schemas
- API contracts (input parameters, return values, error cases)
- Error handling requirements

### Acceptance Criteria
Testable requirements with explicit verification:
- **Functional**: User can perform X action and sees Y result
- **Technical**: Code implements Z pattern/interface correctly
- **Testing**: Unit tests verify A, integration tests verify B
- **Edge Cases**: Handles invalid input, null values, error states

## Linear MCP Tool Usage

**Reading issues:**
- `linear_search_issues`: Search by text, team, status, assignee, or labels
- `linear_get_user_issues`: Retrieve user-assigned issues
- Resource: `linear-issue:///{issueId}` for specific issue details

**Updating issues:**
- `linear_update_issue`: Update title, description, priority, or status
- Pass the issue ID and new description field
- Description supports markdown formatting

**Adding context:**
- `linear_add_comment`: Add comments instead of updating description if noting specific discussions or decisions

## Best Practices

**Be explicit and unambiguous for AI:**
- Use exact file paths (not "the auth file" but `src/services/auth.py` or `pkg/auth/validator.go`)
- Specify function/method signatures with parameters and return types
- Define data structures, models, schemas, or interfaces explicitly
- Name APIs, endpoints, and methods precisely

**Provide sufficient context:**
- Reference existing code patterns to follow
- Identify similar implementations in the codebase
- Specify dependencies and imports needed
- Include error handling patterns

**Make steps independently implementable:**
- Each step should be self-contained
- No ambiguous references like "use the same pattern"
- Include all parameters and return types
- Specify where to add code (beginning, end, before/after function X)

**Enable autonomous testing:**
- Write testable acceptance criteria
- Specify test cases including edge cases
- Define expected inputs and outputs
- Include error scenarios and expected behavior

**Validate AI-implementability:**
- Could an AI implement this without asking questions?
- Are all technical decisions specified?
- Are file locations, names, and structures explicit?
- Is the expected behavior clear for all scenarios?
