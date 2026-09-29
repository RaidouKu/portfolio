export const profile = {
  name: 'Lebron James Pangan',
  displayName: 'Lebron James',
  avatarUrl: null, // Set to path e.g. '/assets/images/profile.jpg' when ready
  tagline: 'UI/UX Designer & Developer',
  bio: `I am a 3rd-year Bachelor of Science in Information Technology (BSIT) student at the National College of Science and Technology (NCST). My work lives at the intersection of user interface ergonomics and full-stack software development, transforming conceptual wireframes into accessible, high-performance web applications.

Currently, I am actively broadening my engineering spectrum across both ends of the stack. On the frontend, I build responsive, component-driven interfaces with Vue and Tailwind CSS, focusing on tactile micro-interactions and rigorous typography. On the backend, I design relational database architectures and server-side systems using PHP and MySQL, ensuring that every interface is backed by dependable logic.

My goal is end-to-end craft: shaping intuitive user experiences in Figma and engineering them into clean, production-ready code without relying on generic templates.`,
  school: 'National College of Science and Technology',
  email: 'pangan.lebronjames1@ncst.edu.ph',
  github: 'https://github.com/RaidouKu',
  githubUsername: 'RaidouKu',
  socials: {
    linkedin: null,
    twitter: null,
    behance: null,
  },
  skills: {
    design: [
      { name: 'UI/UX Design', key: 'UI/UX', jp: '設計', level: 85, desc: 'Interface ergonomics, typography, user flows, and wireframing' },
      { name: 'Wireframing & Prototyping', key: 'PROTO', jp: '試作', level: 80, desc: 'Interactive clickable high-fidelity screen simulations' },
      { name: 'Visual Design', key: 'VISUAL', jp: '視覚', level: 75, desc: 'Design systems, color theory, iconography, and spatial rhythm' },
    ],
    frontend: [
      { name: 'HTML & CSS', key: 'HTML', jp: '構文', level: 90, desc: 'Semantic layouts, CSS3 animations, and responsive grids' },
      { name: 'JavaScript', key: 'JS', jp: '論理', level: 80, desc: 'ES6+ modern syntax, asynchronous events, DOM orchestration' },
      { name: 'Vue.js', key: 'VUE', jp: '景観', level: 75, desc: 'Vue 3 Composition API, reactive state, custom composables' },
      { name: 'Tailwind CSS', key: 'TW', jp: '装飾', level: 85, desc: 'Custom utility design systems and responsive token scales' },
    ],
    backend: [
      { name: 'PHP', key: 'PHP', jp: '基幹', level: 70, desc: 'Server-side rendering, session management, database handling' },
      { name: 'MySQL', key: 'SQL', jp: '記録', level: 65, desc: 'Relational schemas, queries, joins, and data normalization' },
    ],
    tools: [
      { name: 'Figma', key: 'FIG', jp: '道具', level: 80, desc: 'Auto-layout, reusable component libraries, design handoff' },
      { name: 'Git', key: 'GIT', jp: '履歴', level: 70, desc: 'Version control workflows, branching, commits, GitHub sync' },
      { name: 'VS Code', key: 'CODE', jp: '開発', level: 85, desc: 'Customized dev workflow, extension tooling, and debugging' },
    ],
  },
}
