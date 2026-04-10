// Peptide Station — Interstitial Config
// All A/B education cards per docs/quiz/QUESTION_FRAMEWORK.md

import type { Answers } from './questions';

export type Interstitial = {
  id: string;
  position: 'after-q2' | 'after-q6';
  showIf: (answers: Answers) => boolean;
  headline: string;
  body: string;
};

// ── Interstitial A — triggered by Q1 goal ──────────────────────────────────
// Shown after Q2, before Q3

export const INTERSTITIALS_A: Interstitial[] = [
  {
    id: 'A1',
    position: 'after-q2',
    showIf: (a) => a.q1_goal === 'Heal an injury or recover from surgery',
    headline: 'Most healing stalls at the same bottleneck.',
    body: "The reason many injuries plateau — even with physio and rest — is poor local circulation and insufficient cellular signalling to trigger repair. Certain peptides work specifically on this mechanism, used in research settings to accelerate tissue healing by orders of magnitude. That's what we're going to identify for you.",
  },
  {
    id: 'A2',
    position: 'after-q2',
    showIf: (a) => a.q1_goal === 'Feel younger, slow down ageing',
    headline: "Growth hormone doesn't decline because you age. You age partly because it declines.",
    body: "By your late 30s, pituitary GH output has typically fallen 50% from its peak. This affects sleep, body composition, energy, and cellular repair simultaneously. The interesting part: specific peptides can restore this output without ever touching the hormone itself.",
  },
  {
    id: 'A3',
    position: 'after-q2',
    showIf: (a) => a.q1_goal === 'Better skin, hair and appearance',
    headline: 'Your skin has a natural renewal programme. It just needs the signal.',
    body: "A naturally occurring copper-binding peptide in your body controls collagen synthesis, skin remodelling, and hair follicle activity — but its concentration drops 60–70% between your twenties and sixties. By your next question, we'll know if replenishing it is your best next step.",
  },
  {
    id: 'A4',
    position: 'after-q2',
    showIf: (a) => a.q1_goal === 'Lose fat / improve body composition',
    headline: "There's a specific fat-burning mechanism that almost nobody talks about.",
    body: "Growth hormone drives lipolysis — the breakdown of stored fat for energy — independently of diet. A peptide class called growth hormone secretagogues specifically stimulates this mechanism, which is why telehealth clinics charge $200–400/month for them. We'll find out which version fits your profile.",
  },
  {
    id: 'A5',
    position: 'after-q2',
    showIf: (a) => a.q1_goal === 'Build muscle / improve performance',
    headline: "There's a ceiling to what training alone can do. It's not your effort — it's your signalling.",
    body: "The cascade that drives muscle repair and growth starts with IGF-1 — and IGF-1 is downstream of growth hormone. Certain peptides specifically amplify this chain, which is why they're prohibited by WADA. We're going to map exactly where you are in that system.",
  },
  {
    id: 'A6',
    position: 'after-q2',
    showIf: (a) => a.q1_goal === 'More energy and better sleep',
    headline: "Deep sleep isn't just recovery. It's your GH release window.",
    body: "70–80% of daily growth hormone secretion happens during slow-wave (deep) sleep. If your sleep quality has declined, so has your GH output — which explains declining energy, body composition, and recovery simultaneously. Some of the peptides we'll show you were specifically designed to restore this.",
  },
  {
    id: 'A7',
    position: 'after-q2',
    showIf: (a) => a.q1_goal === 'Fix gut or digestive issues',
    headline: 'The peptide most studied for gut healing was discovered in your stomach.',
    body: "BPC-157 was originally isolated from a protein found in human gastric juice — evolved to protect the gut from its own acid. It's now one of the most researched peptides for intestinal healing, tight junction repair, and gut-brain axis regulation. The science behind it is genuinely fascinating.",
  },
  {
    id: 'A8',
    position: 'after-q2',
    showIf: (a) => a.q1_goal === 'Boost libido / sexual wellness',
    headline: "This particular solution works differently to anything you've tried.",
    body: "Most approaches to libido work on blood flow. The peptide that best matches your goal works directly on the brain's melanocortin receptors — the neurological pathway that initiates desire at its source, not downstream. It's the same mechanism behind an FDA-approved women's sexual health drug.",
  },
];

// ── Interstitial B — triggered by Q1 + Q5 combination ─────────────────────
// Shown after Q6, before Q7

const hasIssue = (answers: Answers, issue: string): boolean => {
  const issues = answers.q5_issues;
  if (!issues) return false;
  return Array.isArray(issues) ? issues.includes(issue) : issues === issue;
};

export const INTERSTITIALS_B: Interstitial[] = [
  {
    id: 'B1',
    position: 'after-q6',
    showIf: (a) =>
      a.q1_goal === 'Heal an injury or recover from surgery' &&
      hasIssue(a, 'Joint pain or old injuries'),
    headline: "The cells your body needs to heal an injury can't get there without the right signal.",
    body: "Tendon and ligament repair stalls because these tissues have poor blood supply. What research on a specific class of peptides has shown, across more than 100 animal studies, is that the vascular signalling pathway can be switched back on — allowing the repair cascade to complete what the body started but couldn't finish.",
  },
  {
    id: 'B2',
    position: 'after-q6',
    showIf: (a) =>
      a.q1_goal === 'Feel younger, slow down ageing' && hasIssue(a, 'Sleep problems'),
    headline: 'If your sleep has gotten worse, your growth hormone has too.',
    body: "Growth hormone is released in pulses during deep sleep. As sleep quality declines — which happens naturally from your late 30s — so does GH output. The fascinating part: restoring the GH signal actually improves sleep quality in return. The protocol we're likely to recommend for you works directly on this cycle.",
  },
  {
    id: 'B3',
    position: 'after-q6',
    showIf: (a) =>
      a.q1_goal === 'Better skin, hair and appearance' &&
      (hasIssue(a, 'Skin concerns (fine lines, loss of firmness)') ||
        hasIssue(a, 'Hair thinning')),
    headline: "Collagen doesn't just decline — it stops being signalled.",
    body: "After 25, collagen production drops around 1–2% per year. The reason isn't that fibroblasts stop working — it's that the biological signal telling them to produce collagen weakens. The peptide most studied for this specific mechanism can influence the expression of genes involved in skin renewal, elastin production, and hair follicle reactivation.",
  },
  {
    id: 'B4',
    position: 'after-q6',
    showIf: (a) =>
      a.q1_goal === 'Lose fat / improve body composition' &&
      hasIssue(a, 'Stubborn weight or slow metabolism'),
    headline: 'Growth hormone is the most underappreciated fat-burning hormone in medicine.',
    body: "GH directly activates lipolysis — breaking fat cells down for energy — independently of insulin or caloric restriction. This is why people who restore optimal GH levels lose visceral fat without changing their diet. Several peptides stimulate this pathway specifically. We'll show you the most appropriate one for your profile.",
  },
  {
    id: 'B5',
    position: 'after-q6',
    showIf: (a) =>
      a.q1_goal === 'Build muscle / improve performance' &&
      (hasIssue(a, 'Feeling of chronic inflammation or aching') ||
        a.q3_recovery === 'Very slow — takes several days' ||
        a.q3_recovery === 'Slower than it used to be'),
    headline: "You can't build over inflammation. You have to clear it first.",
    body: "Chronic low-grade inflammation suppresses the anabolic signalling needed for muscle growth and recovery. The most efficient protocols for body recomposition address both problems in sequence — which is why the combination you're most likely to be matched with includes both an anabolic signal and an anti-inflammatory one.",
  },
  {
    id: 'B6',
    position: 'after-q6',
    showIf: (a) =>
      a.q1_goal === 'More energy and better sleep' &&
      hasIssue(a, 'Brain fog or poor concentration'),
    headline: 'Mitochondria are the link between cellular age and felt energy.',
    body: "Brain fog and fatigue often share a single upstream cause: declining mitochondrial efficiency. A relatively new class of peptides — derived from mitochondrial DNA itself — has shown in research to restore mitochondrial function in ways that affect both energy metabolism and cognitive clarity. This may feature in your results.",
  },
  {
    id: 'B7',
    position: 'after-q6',
    showIf: (a) =>
      a.q1_goal === 'Fix gut or digestive issues' &&
      (hasIssue(a, 'Gut issues (IBS, bloating, reflux)') ||
        hasIssue(a, 'Feeling of chronic inflammation or aching')),
    headline: 'Your gut and your immune system are the same conversation.',
    body: "70–80% of the immune system resides in the gut lining. When that lining is compromised — by NSAIDs, stress, antibiotic overuse, or dysbiosis — the inflammatory signal spreads systemically. The peptide most studied for gut repair also shows striking effects on systemic inflammation markers. This is almost certainly where your protocol begins.",
  },
];

// ── Selector helpers ────────────────────────────────────────────────────────

export function selectInterstitialA(answers: Answers): Interstitial {
  return (
    INTERSTITIALS_A.find((i) => i.showIf(answers)) ??
    INTERSTITIALS_A.find((i) => i.id === 'A2')!
  );
}

export function selectInterstitialB(answers: Answers): Interstitial {
  return (
    INTERSTITIALS_B.find((i) => i.showIf(answers)) ??
    INTERSTITIALS_B.find((i) => i.id === 'B2')!
  );
}
