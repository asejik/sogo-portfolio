export interface Article {
  id: string;
  slug: string; // The URL path (e.g., /garden/optimizing-canvas)
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content?: string; // The actual Markdown text
}

export const articles: Article[] = [
  {
    id: '1',
    slug: 'optimizing-canvas',
    title: 'Optimizing HTML5 Canvas for High-Performance Rendering',
    excerpt: 'How I achieved 60FPS on the Aso Oke Configurator by using off-screen canvases and batch rendering techniques.',
    date: 'Dec 12, 2025',
    readTime: '5 min read',
    tags: ['Canvas', 'Performance', 'React'],
    content: `
# Optimizing HTML5 Canvas

When building the **Aso Oke Configurator**, I hit a wall. Rendering thousands of individual threads caused the browser to stutter. Here is how I fixed it.

## The Problem: Too Many Draw Calls

Every time the user changed a pattern, I was clearing the entire canvas and redrawing 5,000+ lines.
\`\`\`javascript
// The slow way
threads.forEach(thread => {
  ctx.beginPath();
  ctx.moveTo(thread.x, 0);
  ctx.lineTo(thread.x, height);
  ctx.stroke();
});
\`\`\`

## The Solution: Offscreen Canvas

I realized the weave pattern repeats. Instead of drawing it live, I drew the pattern *once* on a hidden canvas in memory, and then just stamped that image onto the screen.

> "The fastest code is the code you never execute."

### Key Takeaways
1. Batch your draw calls.
2. Use \`requestAnimationFrame\` loop.
3. Cache complex static shapes.
    `
  },
  {
    id: '2',
    slug: 'gemini-react-integration',
    title: 'Integrating Gemini AI with React for Real-Time Feedback',
    excerpt: 'A deep dive into prompt engineering and stream handling when building the Scripture Copilot.',
    date: 'Nov 28, 2025',
    readTime: '8 min read',
    tags: ['AI', 'Gemini', 'Streaming'],
    content: `# Coming Soon\n\nThis article is being written.`
  },
  {
    id: '3',
    slug: 'simulated-live-audio',
    title: 'Building a "Simulated Live" Audio Engine',
    excerpt: 'The logic behind syncing pre-recorded sermons globally across different timezones for CLC Radio.',
    date: 'Nov 15, 2025',
    readTime: '6 min read',
    tags: ['Audio', 'Firebase', 'System Design'],
    content: `# Coming Soon\n\nThis article is being written.`
  }
];