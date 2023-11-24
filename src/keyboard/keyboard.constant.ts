export const keyboardFeatures = ['2.4G 1000Hz', 'hot-swap', 'knob'];
export const KEYBOARD_NOT_FOUND = 'Keyboard(s) not found';
export const keyboardFilters = [
  {
    filterName: 'Keyboard Profile',
    slug: 'profile',
    values: [
      { slug: 'low', name: 'Low-Profile' },
      { slug: 'normal', name: 'Normal-Profile' },
    ],
  },
  {
    filterName: 'Series',
    slug: 'series',
    values: [
      { slug: 'air', name: 'Air' },
      { slug: 'halo', name: 'Halo' },
      { slug: 'field', name: 'Field' },
    ],
  },
  {
    filterName: 'Connectivity',
    slug: 'connectivity',
    values: [
      { slug: 'tri-mode', name: 'Tri-Mode Wireless' },
      { slug: 'wired', name: 'Wired' },
    ],
  },
  {
    filterName: 'Size',
    slug: 'size',
    values: [
      { slug: 60, name: '60%' },
      { slug: 65, name: '65%' },
      { slug: 75, name: '75%' },
      { slug: 96, name: '96%' },
    ],
  },
  {
    filterName: 'Features',
    slug: 'features',
    values: [
      { slug: '2.4G 1000Hz', name: '2.4G 1000Hz' },
      { slug: 'hot-swap', name: 'How-Swappable' },
      { slug: 'knob', name: 'Knob' },
    ],
  },
];
