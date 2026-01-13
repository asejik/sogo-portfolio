import { Cpu, UserCheck, Database, Layout } from 'lucide-react';

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
  icon: any;
  color: string;
}

export const projects: Project[] = [
  {
    id: 'living-word-ai',
    title: 'Living Word AI',
    category: 'AI-Powered SaaS',
    description: 'A personalized devotional app featuring AI-generated content and Text-to-Speech audio. Architected to deliver unique daily spiritual content tailored to user streaks and preferences.',
    tech: ['Gemini API', 'React', 'TTS Audio', 'Go'],
    links: {
      live: '#', // Add real link if available
    },
    icon: Cpu,
    color: 'text-cyan-400'
  },
  {
    id: 'remote-staff-attendance',
    title: 'Remote Staff Attendance',
    category: 'Corporate Utility',
    description: 'A biometric PWA for verifying staff presence in remote locations. Features offline capabilities, GPS tagging, and AI-powered liveness detection to prevent spoofing.',
    tech: ['Biometrics', 'PWA', 'Offline-First', 'React'],
    links: {},
    icon: UserCheck,
    color: 'text-red-400'
  },
  {
    id: 'aso-oke-configurator',
    title: 'Aso Oke Configurator',
    category: 'Cultural Tech',
    description: 'A complex digitization tool for Nigerian fabric patterns. Replaces vague descriptions with precise visual blueprints using HTML5 Canvas to render repeatable weave structures.',
    tech: ['HTML5 Canvas', 'React', 'Algorithms', 'Tailwind'],
    links: {
      live: 'https://digital-loom-project.vercel.app',
    },
    icon: Layout,
    color: 'text-gold-500'
  },
  {
    id: 'n8n-automation',
    title: 'n8n Automation Server',
    category: 'Workflow Automation',
    description: 'Self-hosted automation infrastructure on Google Cloud. Handles complex data orchestration between disparate apps, bypassing manual API coding for rapid integration.',
    tech: ['n8n', 'Docker', 'Google Cloud', 'Webhooks'],
    links: {},
    icon: Database,
    color: 'text-green-400'
  }
];