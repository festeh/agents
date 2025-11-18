---
name: visualizer-spec
description: Creates detailed specifications for interactive educational visualizations that help users learn concepts through visual exploration. Use when the user requests a visualization spec to teach or demonstrate concepts like: physics simulations, mathematical functions, sorting algorithms, data structures, or scientific principles. Focus on defining WHAT to visualize (concept, visuals, interactions, learning goals) without implementation details. Do NOT use when the user already has a complete specification or is asking for code implementation.
---

# Specification generator for interactive educational visualizations

## Overview

Your goal is to help user with learning by making an interactive visualization that demonstrates asked concept in a clear and fun way.

**IMPORTANT**: Do NOT write the specification immediately. First gather all necessary requirements through questions, then wait for user to confirm with "DOSPEC" command before writing the spec.

## Workflow

### Phase 1: Gather Requirements

When a user requests a visualization, proactively ask questions to gather complete requirements:

**Essential Information:**
1. **Concept**: What specific concept should be taught?
2. **Learning Goal**: What should users understand after using it?
3. **Key Interactions**: How should users interact with it?
4. **Visual Preferences**: Any specific visual style or constraints?
5. **Complexity Level**: Target audience (beginner, intermediate, advanced)?

**Ask questions like:**
- "What specific aspect of [concept] do you want to focus on?"
- "Should users be able to adjust [parameter]?"
- "Do you want real-time animation or step-by-step?"
- "Are there specific visual elements you want included?"
- "What should be the main 'aha moment' for learners?"

Continue asking until you have enough detail to address all 5 specification sections.

**Before writing**: Present a brief summary of what you understood and ask: "Ready for me to write the full specification? Reply with DOSPEC to proceed."

### Phase 2: Write Specification (ONLY after "DOSPEC" command)

Once user confirms with "DOSPEC", write the complete specification following the structure below.

## Specification Structure

Every visualization specification should include these sections:

### 1. Concept & Learning Goals
- What concept is being taught or demonstrated
- What the learner should understand after interacting with the visualization
- Key insights or "aha moments" the visualization should create

### 2. Visual Design
Structure this section with subsections:

**Layout:**
- Main visualization area structure
- Information display areas

**Spatial Organization:**
- Relative positioning of visual elements (top/bottom/left/right/center)
- How elements are arranged in space

**Visual Elements:**
- What will be displayed and what each element represents
- Visual hierarchy and grouping

### 3. Interactive Controls
- What parameters the user can manipulate (sliders, buttons, toggles, etc.)
- How each control affects the visualization
- Default values and reasonable ranges
- Whether changes happen in real-time or step-by-step

### 4. Animation & Behavior
- What moves, changes, or updates over time
- How the visualization responds to user input
- State transitions and timing
- When and how to reset or restart

### 5. Educational Features
- Labels, legends, or explanatory text to include
- Visual feedback for user actions
- Ways to highlight important moments or patterns
- Progressive complexity (how users build understanding gradually)

## Example

**User Request:** "Create a visualization to teach projectile motion"

**Specification:**

### 1. Concept & Learning Goals
- Teach how launch angle and initial velocity affect projectile trajectory
- Show that gravity creates parabolic paths
- Demonstrate that 45° angle achieves maximum distance (in ideal conditions)
- Help learners understand the independence of horizontal and vertical motion

### 2. Visual Design
**Layout:**
- Main visualization area: Central canvas showing side view of the launch area
- Information display: Top area for title and real-time feedback

**Spatial Organization:**
- Ground reference: Horizontal line in the lower portion of the canvas
- Launch point: Left side, positioned on the ground line
- Flight area: Spans horizontally from launch point to the right edge
- Sky and ground: Visually distinct areas above and below the ground line

**Visual Elements:**
- Projectile: Clearly visible shape moving along the trajectory
- Trajectory trail: Persistent line showing the complete path taken
- Distance markers: Reference indicators spaced along the ground line
- Launch point indicator: Marker showing where projectile originates
- Title and instructions: Top-center area
- Real-time stats: Visible during flight showing current height and horizontal distance
- Results summary: Displayed after landing showing total distance and flight time

### 3. Interactive Controls
**Control Panel Positioning:** Bottom section of canvas, arranged horizontally

**Controls:**
- **Launch Angle slider:** 0-90 degrees, default 45°, positioned left side, labeled clearly
- **Initial Velocity slider:** 10-100 m/s, default 50 m/s, positioned center, labeled with units
- **Launch button:** Positioned right side, fires the projectile with current settings
- **Reset button:** Adjacent to launch button, clears the trajectory and returns projectile to start
- Display current slider values numerically next to each slider

### 4. Animation & Behavior
- When Launch is pressed, projectile follows parabolic path based on physics
- Position updates smoothly frame by frame
- Trail grows behind projectile showing complete path
- Animation stops when projectile hits the ground
- After landing, display total flight time and horizontal distance traveled
- Reset button clears trail and returns projectile to launch point
- Users can change sliders while projectile is flying, but changes only apply to next launch

### 5. Educational Features
- Display current height and horizontal distance during flight
- Show "Maximum Distance: X meters" when projectile lands
- Highlight when angle is set to 45° (optimal angle indicator)
- Display velocity vector as an arrow from the projectile
- Show peak height of trajectory with a marker
- Include brief text: "Adjust angle and velocity to see how they affect the trajectory"