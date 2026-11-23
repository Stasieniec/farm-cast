// Every piece of copy and contact detail on the site lives here.
// Values in [BRACKETS] are still to be filled in.

export const site = {
  title: 'farm-cast: machine learning and computer vision for food production',
  description:
    'Yield, quality and timing per field, growing room or batch. Machine learning and computer vision for food processors and large growers.',
  email: 'hello@farm-cast.com',
  locations: 'Amsterdam · [CITY], Poland',
  replyTime: '[RESPONSE TIME]',
  legal: '[LEGAL ENTITY, REG. NO., ADDRESS]',
  credits:
    'Imagery: Copernicus Sentinel-2 · Ortofotomapa © GUGiK · Fields: ARiMR · Map © OpenStreetMap contributors, OpenMapTiles, OpenFreeMap · Mushroom footage: [SOURCE]',
};

export const hero = {
  headline: 'We measure what food production has always guessed.',
  lede: 'Yield, quality and timing per field, growing room or batch. Machine learning and computer vision for processors and large growers.',
  cta: 'Talk to the founders',
};

export const work = {
  heading: 'Old problems, new data',
  lede: "Built on public data, before we see a client's records. Live demos on request.",
  more: 'Compost batches, flush timing, grading on the line, other crops bought on contract.',
  moreLink: 'Ask about yours.',
};

export const whyNow = [
  { title: 'Every field, seen from space', body: 'Free Sentinel-2 images of every field in Europe every few days, since 2017.' },
  { title: 'Vision next to the crop', body: 'Detection models that run on a small device in a growing room or on the line.' },
  { title: 'Models for small data', body: 'Pretrained models that learn from a few seasons of records, with honest uncertainty.' },
];

export const method = {
  heading: 'Every forecast is scored',
  lede: 'Against the estimate your team already makes. Under NDA.',
  steps: [
    { tag: '01 · before we start', title: 'Backtest', body: 'On your past seasons.' },
    { tag: '02 · one season', title: 'Live', body: 'Forecasts on fixed dates, scored at intake.' },
    { tag: '03 · after that', title: 'Decisions', body: 'Lifting order, storage, grower advice.' },
  ],
};

export const team = {
  heading: 'Two founders, both on every project',
  people: [
    { name: 'Filip Pieniak', role: 'CEO · [one-line background]', photo: 'filip', linkedin: '#' },
    { name: 'Stanisław Wasilewski', role: 'CTO · ML researcher, MSc AI, University of Amsterdam', photo: 'stas', linkedin: '#' },
  ],
};

export const contact = {
  heading: 'What do you still guess?',
  body: `Tell us the crop, the scale and what you measure. We reply within ${site.replyTime}.`,
  cta: 'Email us',
};
