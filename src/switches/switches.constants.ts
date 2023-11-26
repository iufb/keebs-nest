export const SWITCHES_NOT_FOUND_ERROR = 'Switches not found.';
export const switchesFilters = [
  {
    filterName: 'Compatibility',
    slug: 'compatibility',
    values: [
      { slug: 'low', name: 'Low-Profile Keys' },
      { slug: 'normal', name: 'Normal-Profile Keys' },
    ],
  },
  {
    filterName: 'Switch Type',
    slug: 'type',
    values: [
      { slug: 'clicky', name: 'Clicky' },
      { slug: 'linear', name: 'Linear' },
      { slug: 'tactile', name: 'Tactile' },
    ],
  },
];
