import { Cpu, Globe, Radio, Database } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  links: {
    live?: string;
    github?: string;
  };
  icon: any; // Lucide icon component
  color: string; // Tailwind color class for accents
}

export const projects: Project[] = [
  {
    id: 'scripture-copilot',
    title: 'Scripture Copilot',
    category: 'AI & Real-time Ops',
    description: 'A local-first AI assistant for church media teams. Uses the Web Speech API and Regex to listen to live sermons, detect scripture references instantly, and push them to OBS via the Broadcast Channel API. Features fuzzy matching for phonetic accuracy.',
    tech: ['React 18', 'OpenAI / Regex', 'Broadcast API', 'Vite'],
    links: {
      github: 'https://github.com/asejik', // Placeholder if private
    },
    icon: Cpu,
    color: 'text-cyan-400'
  },
  {
    id: 'aso-oke',
    title: 'Aso Oke Configurator',
    category: '3D / Digital Loom',
    description: 'A digital drafting tool for Nigerian weavers. Replaces vague descriptions with precise, segment-based visual blueprints. Built with HTML5 Canvas to render complex, repeatable stripe patterns and high-res texture overlays.',
    tech: ['React', 'HTML5 Canvas', 'Zustand', 'TypeScript'],
    links: {
      live: 'https://digital-loom-project.vercel.app', // Placeholder
    },
    icon: Globe,
    color: 'text-gold-500'
  },
  {
    id: 'clc-radio',
    title: 'CLC Radio',
    category: 'Streaming / Audio',
    description: 'A "Simulated Live" radio player. It calculates strict time offsets to ensure all listeners hear the exact same segment of a pre-recorded sermon simultaneously, syncing filler worship music in between schedules.',
    tech: ['Firebase', 'React', 'Audio API', 'Tailwind'],
    links: {
      live: 'https://clc-radio.web.app',
    },
    icon: Radio,
    color: 'text-red-400'
  },
  {
    id: 'n8n-automation',
    title: 'n8n Automation Server',
    category: 'DevOps / Systems',
    description: 'Self-hosted automation infrastructure on Google Cloud Platform. Configured Docker containers, swap space memory management, and Nginx reverse proxying to handle heavy workflow loads cost-effectively.',
    tech: ['Docker', 'GCP Compute', 'Linux', 'Nginx'],
    links: {},
    icon: Database,
    color: 'text-green-400'
  }
];