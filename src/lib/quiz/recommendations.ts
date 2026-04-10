// Peptide Station — Recommendation Templates
// Per docs/quiz/RECOMMENDATION_MATRIX.md — Results Output Templates

import type { Peptide } from './scoring';

export type RecommendationTemplate = {
  id: Peptide | 'recovery-stack';
  headline: string;
  tagline: string;
  body: string;
  hookFact: string;
  cta: string;
  teaserLine: string; // shown on ResultsTeaser before email gate
};

export const RECOMMENDATION_TEMPLATES: Record<
  Peptide | 'recovery-stack',
  RecommendationTemplate
> = {
  'recovery-stack': {
    id: 'recovery-stack',
    headline: 'Your Protocol: The Complete Recovery Stack',
    tagline: "You're built for healing. This combination works on two levels.",
    body: "Based on your answers, BPC-157 + TB-500 together is your strongest match. BPC-157 initiates repair at the cellular level; TB-500 mobilises your body's recovery machinery system-wide. Together, they're what the biohacking community calls the Wolverine Stack — and for good reason.",
    hookFact:
      "BPC-157 was literally discovered in your stomach — it's derived from a protein in human gastric juice, evolved to protect the gut from its own acid.",
    cta: 'Build Your Recovery Stack',
    teaserLine: "You look like a strong match for our most popular healing protocol.",
  },
  'BPC-157': {
    id: 'BPC-157',
    headline: 'Your Protocol: The Healer',
    tagline: 'Your body knows how to repair itself. BPC-157 turns up the volume.',
    body: "BPC-157 is the most researched healing peptide in the catalogue — 100+ peer-reviewed studies and counting. Whether it's gut repair, tendon healing, or reducing chronic inflammation, the evidence points in one direction.",
    hookFact:
      "BPC-157 was literally discovered in your stomach — it's derived from a protein in human gastric juice.",
    cta: 'Start with BPC-157',
    teaserLine: "Your profile is a strong match for the most researched healing peptide in the catalogue.",
  },
  'Sermorelin': {
    id: 'Sermorelin',
    headline: 'Your Protocol: The Age Reset',
    tagline: "This isn't about fighting ageing. It's about restoring what you already have.",
    body: "Sermorelin stimulates your pituitary gland to produce more of your own growth hormone — the way it did when you were younger. More GH means better sleep, better body composition, more energy, and sharper cognition. The difference is most people start noticing within 4–6 weeks.",
    hookFact:
      "When telehealth clinics prescribe 'GH therapy,' sermorelin is often what they're actually giving you — at $200–400/month. Same molecule.",
    cta: 'Start Your GH Reset',
    teaserLine: "Your profile points toward a growth hormone and energy restoration stack.",
  },
  'GHK-Cu': {
    id: 'GHK-Cu',
    headline: 'Your Protocol: The Skin Signal',
    tagline: 'Your skin used to repair itself effortlessly. GHK-Cu helps it remember how.',
    body: "GHK-Cu is a copper-binding peptide your body produces naturally — but levels drop by 60–70% between your twenties and sixties. It tells your cells to produce collagen, elastin, and hyaluronic acid. Not in a moisturiser way — at the gene expression level.",
    hookFact:
      "GHK-Cu appears to influence the expression of up to 47% of human genes related to cell maintenance, ageing, and repair — making it one of the most pleiotropic small molecules known.",
    cta: 'Begin Your Skin Protocol',
    teaserLine: "Your skin and collagen profile is one of the clearer matches we see.",
  },
  'CJC/Ipam': {
    id: 'CJC/Ipam',
    headline: 'Your Protocol: The Performance Stack',
    tagline: 'Your body already knows how to build and burn. This unlocks the ceiling.',
    body: "CJC-1295 + Ipamorelin is the gold standard GH peptide combination in anti-aging and performance medicine. Two peptides, two receptor pathways, one goal: dramatically amplified growth hormone release in the way your body actually responds to — natural, pulsatile, and powerful.",
    hookFact:
      "Ipamorelin is the only GHRP that doesn't spike cortisol or appetite — it was literally designed to be the 'clean' version.",
    cta: 'Build Your GH Stack',
    teaserLine: "Your profile points toward the gold standard performance and body composition stack.",
  },
  'TB-500': {
    id: 'TB-500',
    headline: 'Your Protocol: The Recovery Accelerator',
    tagline: "Your body's repair crew needs reinforcements. TB-500 calls them in.",
    body: "TB-500 (Thymosin Beta-4) is a naturally occurring protein that promotes healing and recovery across muscles, tendons, ligaments, and connective tissue. It's used by athletes and biohackers looking to compress recovery time and restore full function after injury.",
    hookFact:
      "TB-500 is derived from Thymosin Beta-4 — a peptide so central to healing that it's present in nearly every cell in the human body.",
    cta: 'Start Your Recovery Protocol',
    teaserLine: "Your profile matches our most effective recovery and tissue repair protocol.",
  },
  'PT-141': {
    id: 'PT-141',
    headline: 'Your Protocol: The Drive Protocol',
    tagline: "This one works differently. And that's exactly the point.",
    body: "PT-141 is the only peptide that works on sexual response at the level of the brain — through melanocortin receptors — rather than blood flow. It was developed from a suntan peptide, and researchers were surprised by what else it did. In clinical trials for female sexual dysfunction, results were significant enough for FDA approval (as Vyleesi®).",
    hookFact:
      'PT-141 was accidentally discovered when researchers developing a suntan peptide noticed unexpected arousal as a side effect.',
    cta: 'Explore the Drive Protocol',
    teaserLine: "Your profile points toward a protocol that works at the source — not downstream.",
  },
  'AOD-9604': {
    id: 'AOD-9604',
    headline: 'Your Protocol: The Fat Metabolism Signal',
    tagline: 'Your metabolism already knows what to do. AOD-9604 tells it to do it.',
    body: "AOD-9604 is a modified fragment of human growth hormone specifically engineered for fat metabolism. It stimulates lipolysis (fat breakdown) and inhibits lipogenesis (fat storage) without the anabolic effects of full GH. A precision tool for body composition.",
    hookFact:
      "AOD-9604 was originally developed as a potential obesity drug — the FDA granted it GRAS (Generally Recognized as Safe) status in 2014.",
    cta: 'Start Your Metabolism Reset',
    teaserLine: "Your profile is a clear match for our targeted fat metabolism protocol.",
  },
  'MOTS-c': {
    id: 'MOTS-c',
    headline: 'Your Protocol: The Cellular Energy Reset',
    tagline: "Your mitochondria are the engine. MOTS-c is the tune-up.",
    body: "MOTS-c is a mitochondria-derived peptide — meaning it's encoded directly in mitochondrial DNA, not nuclear DNA. It regulates metabolic homeostasis, improves insulin sensitivity, and has shown striking effects on energy metabolism, exercise tolerance, and cognitive performance in research settings.",
    hookFact:
      'MOTS-c was only discovered in 2015, making it one of the newest peptides in research — and one of the most exciting for longevity science.',
    cta: 'Reset Your Cellular Energy',
    teaserLine: "Your profile points toward a mitochondrial energy and metabolic clarity protocol.",
  },
  'IGF-1 LR3': {
    id: 'IGF-1 LR3',
    headline: 'Your Protocol: The Anabolic Signal',
    tagline: 'This is where serious muscle building starts.',
    body: "IGF-1 LR3 is a long-acting analogue of Insulin-like Growth Factor 1 — the primary downstream signal of growth hormone for muscle protein synthesis. It promotes muscle cell hyperplasia (new cells, not just bigger cells) and is used by advanced athletes looking to push beyond natural limits.",
    hookFact:
      "IGF-1 LR3 has a 13-hour half-life — roughly 10 times longer than natural IGF-1 — giving it a uniquely potent and sustained anabolic effect.",
    cta: 'Explore the Anabolic Protocol',
    teaserLine: "Your profile matches our most potent muscle growth and performance protocol.",
  },
  'Epitalon': {
    id: 'Epitalon',
    headline: 'Your Protocol: The Longevity Peptide',
    tagline: 'This is about the long game. Cellular health at the deepest level.',
    body: "Epitalon is a tetrapeptide derived from the pineal gland, studied extensively by Russian gerontologist Vladimir Khavinson. It activates telomerase — the enzyme that maintains telomere length — and has demonstrated extraordinary effects on lifespan extension, sleep quality, and immune function in long-term research.",
    hookFact:
      "In one of the most remarkable longevity studies ever conducted, Epitalon extended lifespan by 25% in animal models and showed significant effects in long-term human cohort studies.",
    cta: 'Begin Your Longevity Protocol',
    teaserLine: "Your profile is a strong match for our deepest cellular longevity protocol.",
  },
};

// ── Archetype teaser copy ───────────────────────────────────────────────────
// Used on Results Teaser screen. Returns the primary recommendation's teaser line.

export function getTeaserLine(primary: Peptide | 'recovery-stack'): string {
  return RECOMMENDATION_TEMPLATES[primary]?.teaserLine ??
    "Based on your answers, we've identified the right peptide protocol for your profile.";
}

// ── Count helper ────────────────────────────────────────────────────────────
// Returns how many meaningful recommendations exist (score > 0)

export function countRecommendations(
  ranked: Peptide[],
  scores: Record<string, number>
): number {
  const meaningful = ranked.filter((p) => scores[p] > 0);
  return Math.min(meaningful.length, 3);
}
