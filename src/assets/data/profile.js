export const profile = {
  name: 'Lebron James Pangan',
  displayName: 'Lebron James',
  avatarUrl: null, // Set to path e.g. '/assets/images/profile.jpg' when ready
  tagline: 'UI/UX Designer & Developer',
  bio: `I am a third-year Bachelor of Science in Information Technology student at the National College of Science and Technology. My academic and practical focus centers on the convergence of human-centered interface design and full-stack software architecture, translating conceptual product requirements into accessible, robust, and performant web applications.

To establish comprehensive technical breadth, I actively advance my capabilities across the full engineering lifecycle. On the frontend, I engineer modular, component-driven user interfaces using modern JavaScript, Vue.js, and utility-first styling frameworks, prioritizing semantic structure, typographical hierarchy, and fluid micro-interactions. On the backend, I architect relational database schemas, construct server-side application logic, and handle database transactions using PHP and MySQL to ensure systemic stability and data integrity.

My methodology emphasizes disciplined, end-to-end execution. By maintaining equal rigor in visual ergonomics during the Figma prototyping phase and computational cleanliness throughout implementation, I construct digital systems that are purposeful, scalable, and devoid of generic templates.`,
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
