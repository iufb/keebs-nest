export const KEYCAP_NOT_FOUND_ERROR = 'Keycap not found.';
export const keycapFilters = [
  {
    filterName: 'Compatibility',
    slug: 'compatibility',
    values: [
      { slug: 'low', name: 'Low-Profile Keys' },
      { slug: 'normal', name: 'Normal-Profile Keys' },
    ],
  },
  {
    filterName: 'Keycap type',
    slug: 'type',
    values: [
      { slug: 'set', name: 'Keycaps Sets' },
      { slug: 'spacebar', name: 'SpaceBars' },
    ],
  },
  {
    filterName: 'Material & Finish',
    slug: 'material',
    values: [
      { slug: 'Double-shot PBT', name: 'Double-shot PBT' },
      { slug: 'Dye-sub PBT', name: 'Dye-sub PBT' },
      { slug: 'PC(Shine-Through)', name: 'PC(Shine-Through)' },
    ],
  },
  {
    filterName: 'Keycap Profile',
    slug: 'profile',
    values: [
      { slug: 'Cherry', name: 'Cherry' },
      { slug: 'KDA', name: 'KDA' },
      { slug: 'KDS', name: 'KDS' },
      { slug: 'KOP', name: 'KOP' },
      { slug: 'nSA (Low-Profile)', name: 'nSA (Low-Profile)' },
    ],
  },
];
