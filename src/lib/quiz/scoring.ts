// Peptide Station — Quiz Scoring Engine
// Full matrix per docs/quiz/RECOMMENDATION_MATRIX.md

import type { Answers } from './questions';

export const PEPTIDES = [
  'BPC-157',
  'TB-500',
  'GHK-Cu',
  'Sermorelin',
  'CJC/Ipam',
  'AOD-9604',
  'MOTS-c',
  'PT-141',
  'IGF-1 LR3',
  'Epitalon',
] as const;

export type Peptide = (typeof PEPTIDES)[number];
export type Scores = Record<Peptide, number>;

// ── Scoring matrices ────────────────────────────────────────────────────────
// Format: answer label → { peptide: points }
// 0 means no signal (omitted for brevity; missing keys = 0)

type PeptideMap = Partial<Record<Peptide, number>>;

const Q1_MATRIX: Record<string, PeptideMap> = {
  'Heal an injury or recover from surgery': { 'BPC-157': 2, 'TB-500': 2, 'CJC/Ipam': 1 },
  'Feel younger, slow down ageing': { 'BPC-157': 1, 'GHK-Cu': 1, 'Sermorelin': 2, 'CJC/Ipam': 1, 'MOTS-c': 1, 'Epitalon': 2 },
  'Better skin, hair and appearance': { 'GHK-Cu': 2, 'Sermorelin': 1 },
  'Lose fat / improve body composition': { 'Sermorelin': 1, 'CJC/Ipam': 2, 'AOD-9604': 2, 'MOTS-c': 1, 'IGF-1 LR3': 1 },
  'Build muscle / improve performance': { 'TB-500': 1, 'Sermorelin': 1, 'CJC/Ipam': 2, 'IGF-1 LR3': 2 },
  'More energy and better sleep': { 'Sermorelin': 2, 'CJC/Ipam': 1, 'MOTS-c': 2, 'Epitalon': 1 },
  'Fix gut or digestive issues': { 'BPC-157': 2 },
  'Boost libido / sexual wellness': { 'Sermorelin': 1, 'PT-141': 2 },
};

const Q2_MATRIX: Record<string, PeptideMap> = {
  "A nagging injury that won't fully heal": { 'BPC-157': 2, 'TB-500': 2 },
  'Low energy, feeling older than I should': { 'Sermorelin': 2, 'CJC/Ipam': 1, 'MOTS-c': 2, 'Epitalon': 1 },
  'My skin and hair look older than I feel': { 'GHK-Cu': 2, 'Sermorelin': 1 },
  "Stubborn fat I can't shift": { 'Sermorelin': 1, 'CJC/Ipam': 1, 'AOD-9604': 2, 'MOTS-c': 1 },
  'Difficulty building or keeping muscle': { 'TB-500': 1, 'Sermorelin': 1, 'CJC/Ipam': 2, 'IGF-1 LR3': 2 },
  'Poor sleep ruining my recovery': { 'Sermorelin': 2, 'CJC/Ipam': 1, 'MOTS-c': 1, 'Epitalon': 1 },
  'Low drive or loss of motivation': { 'Sermorelin': 1, 'CJC/Ipam': 1, 'MOTS-c': 1, 'PT-141': 2 },
  'Gut problems, bloating or discomfort': { 'BPC-157': 2 },
};

const Q3_MATRIX: Record<string, PeptideMap> = {
  'Very fast — I bounce back quickly': {},
  'Normal — takes a day or two': {},
  'Slower than it used to be': { 'BPC-157': 1, 'TB-500': 1, 'Sermorelin': 2, 'CJC/Ipam': 1, 'MOTS-c': 1 },
  'Very slow — takes several days': { 'BPC-157': 2, 'TB-500': 2, 'Sermorelin': 1, 'CJC/Ipam': 2, 'MOTS-c': 1 },
  "I barely exercise but still feel run-down": { 'BPC-157': 1, 'Sermorelin': 2, 'CJC/Ipam': 1, 'MOTS-c': 2, 'Epitalon': 1 },
};

const Q4_MATRIX: Record<string, PeptideMap> = {
  'High — consistently good all day': {},
  'Good most days, occasional dips': { 'Sermorelin': 1, 'MOTS-c': 1 },
  'Low — I rely on caffeine to function': { 'Sermorelin': 2, 'CJC/Ipam': 1, 'MOTS-c': 2, 'Epitalon': 1 },
  'Very low — affecting quality of life': { 'BPC-157': 1, 'Sermorelin': 2, 'CJC/Ipam': 1, 'MOTS-c': 2, 'Epitalon': 1 },
};

// Q5 is multi-select — each selected issue scores independently
const Q5_MATRIX: Record<string, PeptideMap> = {
  'Joint pain or old injuries': { 'BPC-157': 2, 'TB-500': 2, 'CJC/Ipam': 1 },
  'Gut issues (IBS, bloating, reflux)': { 'BPC-157': 2 },
  'Skin concerns (fine lines, loss of firmness)': { 'GHK-Cu': 2, 'Sermorelin': 1 },
  'Hair thinning': { 'TB-500': 1, 'GHK-Cu': 2 },
  'Sleep problems': { 'Sermorelin': 2, 'CJC/Ipam': 1, 'MOTS-c': 1, 'Epitalon': 1 },
  'Brain fog or poor concentration': { 'BPC-157': 1, 'Sermorelin': 1, 'CJC/Ipam': 1, 'MOTS-c': 2, 'Epitalon': 1 },
  'Stubborn weight or slow metabolism': { 'Sermorelin': 1, 'CJC/Ipam': 1, 'AOD-9604': 2, 'MOTS-c': 1 },
  'Low libido or sexual function concerns': { 'Sermorelin': 1, 'PT-141': 2 },
  'Feeling of chronic inflammation or aching': { 'BPC-157': 2, 'TB-500': 2, 'MOTS-c': 1 },
};

const Q6_MATRIX: Record<string, PeptideMap> = {
  'Under 30': { 'CJC/Ipam': 1, 'PT-141': 1, 'IGF-1 LR3': 2 },
  '30–39': { 'BPC-157': 1, 'TB-500': 1, 'Sermorelin': 1, 'CJC/Ipam': 2, 'AOD-9604': 1, 'PT-141': 1, 'IGF-1 LR3': 1 },
  '40–49': { 'BPC-157': 1, 'TB-500': 1, 'GHK-Cu': 1, 'Sermorelin': 2, 'CJC/Ipam': 2, 'AOD-9604': 1, 'MOTS-c': 1, 'PT-141': 1, 'Epitalon': 1 },
  '50–59': { 'BPC-157': 1, 'TB-500': 1, 'GHK-Cu': 2, 'Sermorelin': 2, 'CJC/Ipam': 1, 'AOD-9604': 1, 'MOTS-c': 2, 'Epitalon': 2 },
  '60+': { 'GHK-Cu': 2, 'Sermorelin': 2, 'MOTS-c': 2, 'Epitalon': 2 },
};

const Q7_MATRIX: Record<string, PeptideMap> = {
  'Elite or competitive athlete': { 'BPC-157': 2, 'TB-500': 2, 'Sermorelin': 1, 'CJC/Ipam': 2, 'IGF-1 LR3': 2 },
  'Regular gym or active training': { 'BPC-157': 1, 'TB-500': 1, 'Sermorelin': 1, 'CJC/Ipam': 2, 'AOD-9604': 1, 'IGF-1 LR3': 2 },
  'Active lifestyle': { 'BPC-157': 1, 'TB-500': 1, 'Sermorelin': 1, 'CJC/Ipam': 1, 'AOD-9604': 1, 'MOTS-c': 1 },
  'Desk job with some exercise': { 'GHK-Cu': 1, 'Sermorelin': 2, 'CJC/Ipam': 1, 'AOD-9604': 1, 'MOTS-c': 1, 'Epitalon': 1 },
  'High stress, mostly sedentary': { 'BPC-157': 1, 'GHK-Cu': 1, 'Sermorelin': 2, 'AOD-9604': 1, 'MOTS-c': 2, 'Epitalon': 1 },
};

const Q8_MATRIX: Record<string, PeptideMap> = {
  'Fully healed from injury or surgery': { 'BPC-157': 2, 'TB-500': 2 },
  'Looking and feeling 10 years younger': { 'BPC-157': 1, 'GHK-Cu': 2, 'Sermorelin': 2, 'CJC/Ipam': 1, 'MOTS-c': 1, 'Epitalon': 2 },
  'Noticeably leaner and more defined': { 'Sermorelin': 1, 'CJC/Ipam': 2, 'AOD-9604': 2, 'MOTS-c': 1, 'IGF-1 LR3': 1 },
  'More muscle, stronger physique': { 'TB-500': 1, 'Sermorelin': 1, 'CJC/Ipam': 2, 'IGF-1 LR3': 2 },
  'More energy and mental sharpness': { 'Sermorelin': 2, 'CJC/Ipam': 1, 'MOTS-c': 2, 'Epitalon': 1 },
  'Better skin and hair': { 'GHK-Cu': 2, 'Sermorelin': 1 },
  'Improved drive and vitality': { 'Sermorelin': 1, 'CJC/Ipam': 1, 'MOTS-c': 1, 'PT-141': 2, 'Epitalon': 1 },
};

// ── Score computation ───────────────────────────────────────────────────────

function initScores(): Scores {
  return PEPTIDES.reduce((acc, p) => ({ ...acc, [p]: 0 }), {} as Scores);
}

function applyMatrix(scores: Scores, matrix: Record<string, PeptideMap>, answer: string | string[]): void {
  const keys = Array.isArray(answer) ? answer : [answer];
  for (const key of keys) {
    const map = matrix[key];
    if (!map) continue;
    for (const [peptide, points] of Object.entries(map)) {
      scores[peptide as Peptide] = (scores[peptide as Peptide] || 0) + (points || 0);
    }
  }
}

export function computeScores(answers: Answers): Scores {
  const scores = initScores();

  if (answers.q1_goal) applyMatrix(scores, Q1_MATRIX, answers.q1_goal);
  if (answers.q2_barrier) applyMatrix(scores, Q2_MATRIX, answers.q2_barrier);
  if (answers.q3_recovery) applyMatrix(scores, Q3_MATRIX, answers.q3_recovery);
  if (answers.q4_energy) applyMatrix(scores, Q4_MATRIX, answers.q4_energy);
  // Q5 is multi-select — applyMatrix handles arrays
  if (answers.q5_issues) applyMatrix(scores, Q5_MATRIX, answers.q5_issues);
  if (answers.q6_age) applyMatrix(scores, Q6_MATRIX, answers.q6_age);
  if (answers.q7_lifestyle) applyMatrix(scores, Q7_MATRIX, answers.q7_lifestyle);
  if (answers.q8_vision) applyMatrix(scores, Q8_MATRIX, answers.q8_vision);

  return scores;
}

// ── Stack detection ─────────────────────────────────────────────────────────

export type Stack = 'recovery-stack' | 'gh-stack' | null;

export function detectStack(scores: Scores, answers: Answers): Stack {
  const isAge40Plus =
    answers.q6_age === '40–49' ||
    answers.q6_age === '50–59' ||
    answers.q6_age === '60+';

  // Recovery Stack: BPC ≥ 3 AND TB-500 ≥ 3
  if (scores['BPC-157'] >= 3 && scores['TB-500'] >= 3) {
    return 'recovery-stack';
  }

  // GH Stack preference: CJC ≥ 4 AND age 40+
  if (scores['CJC/Ipam'] >= 4 && isAge40Plus) {
    return 'gh-stack';
  }

  return null;
}

// ── Tiebreaker priority order ───────────────────────────────────────────────
// Commercial priority (search volume × CPC) per RECOMMENDATION_MATRIX.md
const TIEBREAKER_ORDER: Peptide[] = [
  'BPC-157',
  'Sermorelin',
  'GHK-Cu',
  'CJC/Ipam',
  'TB-500',
  'PT-141',
  'AOD-9604',
  'MOTS-c',
  'IGF-1 LR3',
  'Epitalon',
];

// ── Rank recommendations ────────────────────────────────────────────────────

export function rankRecommendations(scores: Scores): Peptide[] {
  return [...PEPTIDES].sort((a, b) => {
    const diff = scores[b] - scores[a];
    if (diff !== 0) return diff;
    // Tiebreaker: commercial priority
    return TIEBREAKER_ORDER.indexOf(a) - TIEBREAKER_ORDER.indexOf(b);
  });
}

export type TopRecommendations = {
  primary: Peptide | 'recovery-stack';
  secondary: Peptide | null;
  tertiary: Peptide | null;
  stack: Stack;
  ranked: Peptide[];
  scores: Scores;
};

export function getTopRecommendations(answers: Answers): TopRecommendations {
  const scores = computeScores(answers);
  const stack = detectStack(scores, answers);
  const ranked = rankRecommendations(scores);

  let primary: Peptide | 'recovery-stack' = ranked[0];
  let secondary: Peptide | null = ranked[1] ?? null;
  let tertiary: Peptide | null = ranked[2] ?? null;

  if (stack === 'recovery-stack') {
    primary = 'recovery-stack';
    // Still surface next best after BPC/TB as secondary
    const nonRecovery = ranked.filter((p) => p !== 'BPC-157' && p !== 'TB-500');
    secondary = nonRecovery[0] ?? null;
    tertiary = nonRecovery[1] ?? null;
  }

  return { primary, secondary, tertiary, stack, ranked, scores };
}
