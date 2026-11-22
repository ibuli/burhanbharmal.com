export const services = [
  {
    id: 'product',
    title: 'Bring a product to life',
    summary: 'Turn a defined idea or existing design into a working web product.',
    fit: 'For founders and teams building a new product or a substantial feature.',
    deliverables: [
      'React and TypeScript implementation',
      'Responsive, accessible product interfaces',
      'API integration and a clear handover',
    ],
    example: 'Arkive',
    slug: 'arkive',
  },
  {
    id: 'frontend',
    title: 'Improve an existing frontend',
    summary:
      'Work through performance, architecture, and interface problems in a growing application.',
    fit: 'For teams whose frontend has become difficult to change or maintain.',
    deliverables: [
      'A focused review of the current application',
      'An agreed implementation plan',
      'Targeted improvements with documented decisions',
    ],
    example: 'Profile Pilot',
    slug: 'profile-pilot-for-antigravity',
  },
  {
    id: 'systems',
    title: 'Build consistency across a product',
    summary: 'Create reusable components and frontend conventions that a team can work with.',
    fit: 'For product teams repeating the same interface work across features.',
    deliverables: [
      'Shared React components and theming',
      'Usage guidance and implementation examples',
      'A practical path for adoption across the team',
    ],
    example: null,
    slug: null,
  },
] as const;
export const workingSteps = [
  {
    title: 'Understand the problem',
    description: 'Start with your users, the current product, and what you need to change.',
  },
  {
    title: 'Agree the scope',
    description:
      'Define deliverables, constraints, and a realistic plan before implementation begins.',
  },
  {
    title: 'Build with feedback',
    description: 'Review working increments together and keep the decisions visible.',
  },
  {
    title: 'Hand over clearly',
    description: 'Leave the implementation, documentation, and next steps with your team.',
  },
];
