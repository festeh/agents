---
name: visualizer-spec-implementer
description: Implements interactive JavaScript visualizations from specification files. Use when working with visualization spec files to create educational interactive demos using any appropriate JavaScript library. Handles spec parsing, creates standalone HTML/CSS/JS files, interactive controls, and animation implementation.
---

# Interactive Visualization Implementer

Implement standalone interactive JavaScript visualizations from specification files for educational purposes.

## Overview

This skill guides the implementation of interactive visualizations that demonstrate concepts clearly and engagingly. Read specification files, extract requirements, and generate self-contained HTML/CSS/JavaScript files with proper structure, interactivity, and animation.

**Key principle**: Create standalone, independent implementations that work without dependencies on other project files.

## Implementation Workflow

Follow these steps in order:

### 1. Read and Parse the Specification

Read the specification file and extract all requirements.

### 2. Choose Appropriate Libraries

Select libraries based on the task requirements:

- **p5.js**: Quick creative coding, particle systems, generative art
- **D3.js**: Data-driven visualizations, charts, graphs
- **Three.js**: 3D visualizations, spatial concepts
- **Chart.js**: Simple charts and graphs
- **Plotly.js**: Scientific plotting, complex data viz
- **Vanilla Canvas API**: Lightweight, no dependencies
- **Any other library** that best solves the problem

Use CDN links for all libraries to keep implementations standalone.

### 3. Create Standalone Files

Generate a complete, self-contained implementation:

**Required files:**
- `index.html` - Main HTML structure with embedded or linked CSS/JS
- Can be single-file (everything in HTML) or multi-file (separate CSS/JS)

**Key requirements:**
- Must work when opened directly in browser
- No dependencies on other project files
- All libraries loaded via CDN
- Completely independent and portable

### 4. Implement Core Features

In this order:
1. HTML structure with canvas/container elements
2. CSS styling for layout and controls
3. JavaScript setup and configuration
4. Core visualization logic
5. Animation loop
6. Interactive controls (sliders, buttons, dropdowns)
7. Visual polish (colors, labels, guides)

### 5. Test Standalone Functionality

Verify:
- Files work independently when opened in browser
- No external dependencies beyond CDN libraries
- Controls respond correctly
- Animations are smooth (60fps target)
- Concept is clearly demonstrated

## Code Patterns

### Standalone HTML Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visualization Title</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        #canvas-container {
            border: 1px solid #ccc;
            margin: 20px 0;
        }
        .controls {
            display: flex;
            gap: 20px;
            align-items: center;
        }
    </style>
</head>
<body>
    <h1>Visualization Title</h1>
    <div class="controls">
        <label>Parameter: <input type="range" id="param" min="0" max="1" step="0.01" value="0.5"></label>
        <span id="value">0.5</span>
    </div>
    <div id="canvas-container">
        <canvas id="canvas" width="800" height="600"></canvas>
    </div>

    <!-- Load libraries from CDN -->
    <script src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.min.js"></script>

    <script>
        // Visualization implementation
        let param = 0.5;

        // Setup controls
        document.getElementById('param').addEventListener('input', (e) => {
            param = parseFloat(e.target.value);
            document.getElementById('value').textContent = param;
        });

        // Main visualization logic here
        function animate() {
            // Clear and draw
            requestAnimationFrame(animate);
        }

        animate();
    </script>
</body>
</html>
```

## Best Practices

- **Standalone and portable**: Ensure files work independently without external project dependencies
- **Use CDN links**: Load all libraries via CDN for portability
- **Keep it simple**: Focus on demonstrating the concept clearly
- **Provide immediate feedback**: Visual changes should respond to input instantly
- **Add labels and guides**: Help users understand what they're seeing
- **Use appropriate colors**: Choose colors that enhance understanding
- **Optimize performance**: Target 60fps for smooth animations
- **Make it responsive**: Handle different screen sizes appropriately
- **Include clear instructions**: Add text explaining how to interact with the visualization

## Common Pitfalls

- Creating dependencies on other project files
- Hardcoding paths that won't work standalone
- Over-complicating the visualization
- Missing clear labels or instructions
- Poor performance with complex animations
- Unclear connection between controls and visual changes
- Not handling edge cases in parameters
- Forgetting to test files work when opened independently

## What to Avoid

- **Alert/confirm/prompt dialogs**: Disruptive and break the interactive experience. Use inline UI feedback instead.
- **Element overlapping**: Ensure controls, labels, and UI elements don't obscure the visualization. Maintain clear visual hierarchy.

## Library Selection Guide

Choose the best tool for the job:

- **Simple geometric animations** → Vanilla Canvas API
- **Creative/artistic visualizations** → p5.js
- **Data visualization** → D3.js or Chart.js
- **3D concepts** → Three.js
- **Scientific plotting** → Plotly.js
- **Network graphs** → Cytoscape.js or vis.js
- **Physics simulations** → Matter.js or p5.js

Don't limit yourself to these - use whatever library best solves the specific visualization challenge.
