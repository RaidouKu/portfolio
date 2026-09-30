export const projects = [
  {
    id: 'ncst-enrollment',
    label: 'CASE_01',
    title: 'NCST Enrollment System',
    description: 'Full-stack student admissions and academic management platform built for National College of Science and Technology. Features an institutional landing portal, curriculum discovery, online enrollment processing, and an integrated LMS authentication gateway engineered with JavaScript, Node.js, Python services, and JSON data schemas.',
    tech: ['JavaScript', 'Python', 'Node.js', 'JSON', 'HTML', 'CSS'],
    role: 'Full-Stack Developer',
    team: 'Academic Systems Project',
    status: 'Completed',
    imageUrl: './images/projects/ncst-enrollment-landing.png',
    images: [
      {
        url: './images/projects/ncst-enrollment-landing.png',
        title: 'Admissions Portal & Institutional Hero',
        caption: 'Public-facing enrollment portal featuring university branding, navigation, and program registration pathways.',
      },
      {
        url: './images/projects/ncst-enrollment-lms.png',
        title: 'NCST LMS Authentication Gateway',
        caption: 'Centralized login interface for students and faculty providing secure access to coursework and learning resources.',
      },
    ],
    imagePlaceholder: 'Enrollment system dashboard screenshot',
    demoUrl: 'https://sia-enrollment.kesug.com/?i=2',
    repoUrl: 'https://github.com/hil9-pya/enrollmentsystem',
  },
  {
    id: 'kickcraft',
    label: 'CASE_02',
    title: 'Kickcraft 3D Studio',
    description: 'Interactive 3D footwear customization platform and digital storefront built with Vue, Tailwind CSS, JavaScript, and PHP. Allows customers to configure footwear geometry in real time, customize independent color zones, attach accessory charms, choose sizing, and reserve tailored configurations for in-store pickup.',
    tech: ['PHP', 'JavaScript', 'Vue.js', 'HTML', 'Tailwind CSS'],
    role: 'UI/UX Designer & Full-Stack Developer',
    team: 'Academic Systems Project',
    status: 'Completed',
    imageUrl: './images/projects/kickcraft-landing.png',
    images: [
      {
        url: './images/projects/kickcraft-landing.png',
        title: 'KickCraft 3D Catalog & Landing Hero',
        caption: 'Interactive storefront showcase featuring 3D shoe viewport with orbit rotation, catalog search, and reservation tracking.',
      },
      {
        url: './images/projects/kickcraft-studio.png',
        title: 'Interactive 3D Design Studio Customizer',
        caption: 'Real-time multi-zone 3D shoe configurator featuring interactive color mapping, modular charm attachments, sizing, and reservation checkout.',
      },
    ],
    imagePlaceholder: 'Kickcraft 3D shoe design studio screenshot',
    demoUrl: null, // Project is offline, no live link button
    repoUrl: 'https://github.com/hil9-pya/kickcraft',
  },
]
