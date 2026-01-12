export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  link: string; // Internal route or external URL
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'Optimizing HTML5 Canvas for High-Performance Rendering',
    excerpt: 'How I achieved 60FPS on the Aso Oke Configurator by using off-screen canvases and batch rendering techniques.',
    date: 'Dec 12, 2025',
    readTime: '5 min read',
    tags: ['Canvas', 'Performance', 'React'],
    link: '#' // We can hook this up to a modal or page later
  },
  {
    id: '2',
    title: 'Integrating Gemini AI with React for Real-Time Feedback',
    excerpt: 'A deep dive into prompt engineering and stream handling when building the Scripture Copilot.',
    date: 'Nov 28, 2025',
    readTime: '8 min read',
    tags: ['AI', 'Gemini', 'Streaming'],
    link: '#'
  },
  {
    id: '3',
    title: 'Building a "Simulated Live" Audio Engine',
    excerpt: 'The logic behind syncing pre-recorded sermons globally across different timezones for CLC Radio.',
    date: 'Nov 15, 2025',
    readTime: '6 min read',
    tags: ['Audio', 'Firebase', 'System Design'],
    link: '#'
  }
];