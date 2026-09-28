/*
  Projects shown in the Work section.

  To add a screenshot: put the image in /public/projects/ (for example
  /public/projects/living-word.jpg, ideally 1600 x 1000) and set `image`
  to '/projects/living-word.jpg'. Projects without an image still look fine.

  Only add `liveLink` or `githubLink` when the link really works.
*/

export interface Project {
  id: string;
  title: string;
  kind: string; // what it is, in plain words
  summary: string;
  techStack: string[];
  image?: string;
  liveLink?: string;
  githubLink?: string;
  featured?: boolean;
  // Case study (shown in the pop-up)
  situation: string;
  action: string;
  result: string;
}

export const projects: Project[] = [
  {
    id: 'scripture-copilot',
    title: 'Scripture Copilot',
    kind: 'Live scripture projection for church media teams',
    summary:
      'Listens as the preacher speaks, picks out Bible references in real time, and sends them to the projector or LED wall with one click.',
    techStack: ['Groq (Llama 3.3 70B)', 'React', 'TypeScript', 'PWA'],
    githubLink: 'https://github.com/asejik/scripture-copilot',
    featured: true,
    situation:
      'During a service, the media team has to catch every scripture the preacher mentions, find it and put it on screen, often after the preacher has already moved on. Built for the media team at Citizens of Light Church.',
    action:
      'Built an app that listens through a microphone and spots Bible references as they are spoken. Clear references are recognised instantly on the device, and Groq AI sorts out messy speech (for example, "Proverbs 418" becomes Proverbs 4:18). The operator clicks Project and the verse appears in OBS or on the LED wall. The whole Bible is stored on the device, so projection keeps working without internet.',
    result:
      'Verses are ready to project moments after they are spoken, so the screen keeps up with the preacher. One key clears the screen instantly if something goes wrong.',
  },
  {
    id: 'living-word-ai',
    title: 'Living Word AI',
    kind: 'AI devotional app',
    summary:
      'Personalised, scripture-based devotionals for adults, kids and communities, with audio playback.',
    techStack: ['Gemini API', 'React', 'Go', 'Text-to-Speech'],
    featured: true,
    situation:
      'People wanted daily devotionals that spoke to their own season of life, not the same generic reading everyone else gets.',
    action:
      'Built a React app that sends carefully engineered prompts to Google Gemini to write devotionals grounded in scripture, with separate Adult, Kids and Testimony modes and built-in text-to-speech for listening.',
    result:
      'Each reader gets a fresh devotional written for them, and can read it or listen to it.',
  },
  {
    id: 'clc-ops',
    title: 'CLC Ops Platform',
    kind: 'Operations platform for a ministry',
    summary:
      'One place for a ministry to run its operations: requests, approvals, notifications and leadership dashboards.',
    techStack: ['React', 'TypeScript', 'Supabase', 'Realtime'],
    featured: true,
    situation:
      'Running a growing ministry means many people, many requests and many approvals, and it gets hard to see what is happening and who needs to act.',
    action:
      'Built a React and TypeScript platform on Supabase with real-time notifications, a financial request workflow with clear approval steps, and executive dashboards.',
    result:
      'Leaders see the state of operations at a glance, and financial requests move through a clear, trackable approval path.',
  },
  {
    id: 'remote-attendance',
    title: 'Remote Attendance & Verification',
    kind: 'Offline-first staff attendance app',
    summary:
      'Staff clock in from remote sites with no internet. The app confirms it is really them and where they are.',
    techStack: ['React', 'PWA', 'Supabase', 'face-api.js'],
    featured: true,
    situation:
      'An organisation needed to confirm that staff were actually present at remote locations, often in areas with no internet, without people cheating with photos.',
    action:
      'Built an offline-first PWA that stores records on the device (IndexedDB), checks the person is live with an on-device "smile" check, and captures GPS location.',
    result:
      'Staff clock in fully offline. Records sync to the Supabase database automatically as soon as the device gets a connection.',
  },
  {
    id: 'freedom-messages',
    title: 'Freedom Messages',
    kind: 'Sermon streaming platform with AI search',
    summary:
      'Stream 12 years of sermons from Apostle Muyiwa Areo and guest ministers, and find messages by asking a question in plain English.',
    techStack: ['Next.js 16', 'Supabase', 'Groq', 'Python'],
    liveLink: 'https://freedom-message.vercel.app',
    githubLink: 'https://github.com/asejik/freedom-message',
    situation:
      'Citizens of Light Church had over 1,400 audio sermons from 2015 to 2026, spread across 12 yearly spreadsheets and Archive.org folders. The same preacher was spelled 51 different ways, and the only way to find a message was to remember its exact title.',
    action:
      'Wrote a Python pipeline that cleaned up the records, merged the 51 name spellings into 29 ministers, and matched every sermon to its audio, transcript and cover art. AI then read each transcript to write a short summary and pull out key scriptures, a prayer focus and themes. On top of that, I built a Next.js site with a player that keeps playing when you change pages or lock your phone, and an "Ask AI" search where you can ask, for example, what Apostle Muyiwa taught about faith in tough times.',
    result:
      'The whole archive is now one library you can browse by year, preacher, series or theme, or search by what a message is about. Each sermon shows what it covers before you press play.',
  },
  {
    id: 'clc-radio',
    title: 'CLC Freedom Radio',
    kind: 'Online radio station for a church',
    summary:
      'A round-the-clock church radio station where every listener hears the same thing at the same moment, like real live radio.',
    techStack: ['React', 'TypeScript', 'Firebase', 'PWA'],
    liveLink: 'https://clc-radio.vercel.app',
    githubLink: 'https://github.com/asejik/clc-radio',
    situation:
      'CLC Freedom Church wanted an online radio station that felt truly live, with everyone hearing the same sermon or song together, without the cost and effort of a traditional live-streaming setup.',
    action:
      'Built a "simulated live" radio. Every second, the app checks the time against the schedule and jumps to the exact point the programme should be at, so someone who joins 10 minutes late starts at the 10-minute mark. When no sermon is scheduled, it plays worship songs, also in sync for everyone. A live listener count shows how many people are tuned in, and on an admin page the team can upload a full day\'s schedule at once, with any clashes flagged.',
    result:
      'The station runs by itself from a schedule, and everyone hears the same thing at the same time. It can also be installed on a phone like an app.',
  },
  {
    id: 'vbs-2026',
    title: 'VBS 2026',
    kind: 'Event website with registration and payments',
    summary:
      "Landing page and registration for The Atrium Church's Vacation Bible School, where parents sign up their children and pay online.",
    techStack: ['React', 'Supabase', 'Paystack', 'Vercel Functions'],
    liveLink: 'https://vbs-sigma.vercel.app',
    situation:
      'The Atrium Church needed to register children for Vacation Bible School 2026 at two campuses, Ilorin and Lagos, each with its own fees and its own payment account.',
    action:
      'Built a React site with a lively landing page and photo gallery, plus a registration form where parents can add several children at once. Choosing a campus switches the fees and the Paystack account. After payment, a server function checks with Paystack that the payment is real before saving the registration and copying it to a Google Sheet for bookkeeping.',
    result:
      'Parents register and pay in one go, and every confirmed payment is recorded, even if the parent closes the page straight after paying.',
  },
  {
    id: 'soulmate-reg',
    title: 'Soulmate-Reg Platform',
    kind: 'Registration system and learning platform',
    summary:
      'Handles a rush of registrations at once, then takes each person through video lessons and issues a certificate.',
    techStack: ['Go', 'React', 'PDF generation'],
    situation:
      'A programme needed to register many people at the same time, then take each of them through a set course before certifying them.',
    action:
      'Built a Go backend designed for many simultaneous sign-ups, a React frontend, sequential video lessons that unlock in order, and automatic PDF certificates.',
    result:
      'Registration, learning and certification run in one system, with no manual certificate work.',
  },
  {
    id: 'negotiation-dojo',
    title: 'Negotiation Dojo',
    kind: 'AI salary negotiation trainer',
    summary:
      'Practise a salary negotiation out loud against a tough AI negotiator, then get a coaching report.',
    techStack: ['Gemini Live API', 'React', 'TypeScript', 'Vite'],
    githubLink: 'https://github.com/asejik/negotiation-dojo',
    situation:
      'Most people never practise salary negotiation, so the first real attempt is the one that counts. Built for the Google Gemini Developer Competition (Feb 2026).',
    action:
      'Used Gemini native audio over the Live API to create "Viper", a real-time voice negotiator, and a second Gemini model to produce a structured coaching report after each session. Runs fully in the browser, deployed on Vercel.',
    result:
      'A safe place to rehearse a high-stakes conversation, with specific feedback on what to do better next time.',
  },
  {
    id: 'aso-oke',
    title: 'Aso Oke Configurator',
    kind: 'Design tool for Yoruba hand-woven cloth',
    summary:
      'Design Aso Oke patterns visually, or describe one in plain words and let AI draft it.',
    techStack: ['HTML5 Canvas', 'React', 'Gemini API', 'Zustand'],
    liveLink: 'https://digital-loom-project.vercel.app',
    situation:
      'Weavers were getting orders as vague text descriptions of complex, repeating stripe patterns, which led to costly mistakes.',
    action:
      'Built an interactive canvas that renders repeating weave structures smoothly, with Gemini turning plain-language descriptions into patterns.',
    result:
      'Designers export an exact 9:16 blueprint and share it on WhatsApp, so the weaver sees exactly what to make.',
  },
  {
    id: 'learn2earn-sandbox',
    title: 'Learn2Earn Sandbox',
    kind: 'Go coding sandbox with an AI mentor',
    summary:
      'Write and run Go in the browser with an AI mentor that reviews your code as you work.',
    techStack: ['Go', 'Groq', 'Llama 3.1 8B', 'React'],
    situation:
      'Beginners learning Go needed a place to practise with quick, specific feedback, not just error messages.',
    action:
      'Built a browser-based IDE experience with an AI mentor running on Groq (Llama 3.1 8B) that reviews code in real time.',
    result:
      'Learners get feedback on their code in seconds while they practise.',
  },
  {
    id: 'sermon-assistant',
    title: 'Sermon Assistant',
    kind: 'AI sermon search',
    summary:
      'Church members find past sermons by asking in plain English.',
    techStack: ['Python', 'Streamlit', 'Gemini API', 'thefuzz'],
    situation:
      'Members could not easily find specific past sermons buried in large spreadsheet archives.',
    action:
      'Used Gemini to understand plain-English questions (for example, "messages on hope by Pastor Seun") and fuzzy matching to handle different spellings of names.',
    result:
      'Finding a sermon now takes a quick question instead of minutes of scrolling.',
  },
  {
    id: 'n8n-server',
    title: 'Self-hosted n8n Server',
    kind: 'Automation infrastructure',
    summary:
      'A free, self-hosted automation server on Google Cloud for connecting apps without paying for Zapier.',
    techStack: ['n8n', 'Docker', 'Google Cloud', 'Cloudflare Tunnel'],
    situation:
      'I needed to connect apps and automate workflows without paying monthly SaaS fees.',
    action:
      'Set up n8n in Docker on a free Google Cloud e2-micro instance, added swap memory to work around the RAM limit, and secured it with a Cloudflare Zero Trust tunnel.',
    result:
      'A secure automation server that costs nothing to run. I wrote up the full setup as a guide.',
  },
];
