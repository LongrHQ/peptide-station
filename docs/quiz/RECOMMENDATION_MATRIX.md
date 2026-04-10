# Peptide Station — Quiz Recommendation Matrix

**Version:** 1.0  
**Date:** 2026-04-09  
**Purpose:** Maps quiz answer patterns to peptide recommendations for the Peptide Station lead generator

---

## How the Matrix Works

Each quiz answer adds points to one or more peptide "buckets." At the end of the quiz, the top 1–3 scoring peptides are surfaced as personalised recommendations.

**Scoring scale:**
- `+2` — Strong signal: this answer is a highly specific indicator for this peptide
- `+1` — Moderate signal: this answer is relevant but not definitive
- `—` — No meaningful signal

**Stack trigger:** The BPC-157 + TB-500 "Recovery Stack" is recommended when BPC-157 ≥3 points **AND** TB-500 ≥3 points. The stack replaces individual recommendations in this case and is treated as a single "super-recommendation" in Tier 1.

**Tiebreaker:** When two peptides are within 1 point, commercial priority (search volume × CPC) determines the primary recommendation. Priority order: BPC-157 → Sermorelin → GHK-Cu → CJC/Ipamorelin → TB-500 → PT-141 → AOD-9604 → MOTS-c → IGF-1 LR3.

**Maximum total possible points per peptide** (across all 8 questions): ~14 points

---

## Peptide Products in Scope

### Tier 1 — Primary Recommendations (Highest Quiz Weight)

| Peptide | Priority | Core Signal |
|---------|----------|-------------|
| BPC-157 | 1 | Injury, gut, healing, inflammation |
| Sermorelin | 2 | Anti-aging, GH decline, sleep, energy, body comp |
| GHK-Cu | 3 | Skin aging, hair, collagen, appearance |
| CJC-1295 + Ipamorelin Stack | 4 | Performance, body comp, GH, recovery |
| TB-500 | 5 | Muscle injury, flexibility, scar tissue, recovery |
| PT-141 | 6 | Libido, sexual wellness |
| BPC+TB500 Recovery Stack | Stack trigger | Multi-tissue injury, surgical recovery, chronic inflammation |

### Tier 2 — Secondary Recommendations

| Peptide | Core Signal |
|---------|-------------|
| AOD-9604 | Fat loss, metabolic, joint health |
| MOTS-c | Energy, metabolic, mitochondria, longevity |
| IGF-1 LR3 | Advanced muscle growth, performance |
| Epitalon | Deep longevity, telomeres, sleep |
| SS-31 | Cardiac, mitochondrial, age-related fatigue |

### Tier 3 — Specialty (Niche Signals Only)

| Peptide | Trigger Condition |
|---------|------------------|
| VIP | CIRS, chronic inflammation, post-COVID, mast cell |
| Thymalin / Tymogen | Immune decline, age 55+, post-illness recovery |
| Follistatin 344 | Extreme muscle goals, advanced user |
| Bronchogen / Cardiogen | Organ-specific Khavinson stacks only |
| GcMAF | Immune modulation, niche — flag only when highly specific |

---

## Question-to-Peptide Scoring Map

### Q1: What's your #1 health goal right now?

| Answer Option | BPC-157 | TB-500 | GHK-Cu | Sermorelin | CJC/Ipam | AOD-9604 | MOTS-c | PT-141 | IGF-1 LR3 | Epitalon |
|--------------|---------|--------|--------|------------|----------|----------|--------|--------|-----------|---------|
| Heal an injury or recover from surgery | +2 | +2 | — | — | +1 | — | — | — | — | — |
| Feel younger, slow down ageing | +1 | — | +1 | +2 | +1 | — | +1 | — | — | +2 |
| Better skin, hair and appearance | — | — | +2 | +1 | — | — | — | — | — | — |
| Lose fat / improve body composition | — | — | — | +1 | +2 | +2 | +1 | — | +1 | — |
| Build muscle / improve performance | — | +1 | — | +1 | +2 | — | — | — | +2 | — |
| More energy and better sleep | — | — | — | +2 | +1 | — | +2 | — | — | +1 |
| Fix gut or digestive issues | +2 | — | — | — | — | — | — | — | — | — |
| Boost libido / sexual wellness | — | — | — | +1 | — | — | — | +2 | — | — |

---

### Q2: What's the #1 thing holding you back right now?

| Answer Option | BPC-157 | TB-500 | GHK-Cu | Sermorelin | CJC/Ipam | AOD-9604 | MOTS-c | PT-141 | IGF-1 LR3 | Epitalon |
|--------------|---------|--------|--------|------------|----------|----------|--------|--------|-----------|---------|
| A nagging injury that won't fully heal | +2 | +2 | — | — | — | — | — | — | — | — |
| Low energy, feeling older than I should | — | — | — | +2 | +1 | — | +2 | — | — | +1 |
| My skin and hair look older than I feel | — | — | +2 | +1 | — | — | — | — | — | — |
| Stubborn fat I can't shift | — | — | — | +1 | +1 | +2 | +1 | — | — | — |
| Difficulty building or keeping muscle | — | +1 | — | +1 | +2 | — | — | — | +2 | — |
| Poor sleep ruining my recovery | — | — | — | +2 | +1 | — | +1 | — | — | +1 |
| Low drive or loss of motivation | — | — | — | +1 | +1 | — | +1 | +2 | — | — |
| Gut problems, bloating or discomfort | +2 | — | — | — | — | — | — | — | — | — |

---

### Q3: How would you describe your recovery from exercise or physical activity?

| Answer Option | BPC-157 | TB-500 | GHK-Cu | Sermorelin | CJC/Ipam | AOD-9604 | MOTS-c | PT-141 | IGF-1 LR3 | Epitalon |
|--------------|---------|--------|--------|------------|----------|----------|--------|--------|-----------|---------|
| Very fast — I bounce back quickly | — | — | — | — | — | — | — | — | — | — |
| Normal — takes a day or two | — | — | — | — | — | — | — | — | — | — |
| Slower than it used to be | +1 | +1 | — | +2 | +1 | — | +1 | — | — | — |
| Very slow — takes days, sometimes a week | +2 | +2 | — | +1 | +2 | — | +1 | — | — | — |
| I barely exercise but feel run-down anyway | +1 | — | — | +2 | +1 | — | +2 | — | — | +1 |

---

### Q4: How would you describe your energy levels day-to-day?

| Answer Option | BPC-157 | TB-500 | GHK-Cu | Sermorelin | CJC/Ipam | AOD-9604 | MOTS-c | PT-141 | IGF-1 LR3 | Epitalon |
|--------------|---------|--------|--------|------------|----------|----------|--------|--------|-----------|---------|
| High — consistently good all day | — | — | — | — | — | — | — | — | — | — |
| Good most days, occasional dips | — | — | — | +1 | — | — | +1 | — | — | — |
| Low — I rely on caffeine to function | — | — | — | +2 | +1 | — | +2 | — | — | +1 |
| Very low — affecting quality of life | +1 | — | — | +2 | +1 | — | +2 | — | — | +1 |

---

### Q5: Do you have any of these ongoing issues? (Multi-select)

*Each selected option scores independently.*

| Selected Issue | BPC-157 | TB-500 | GHK-Cu | Sermorelin | CJC/Ipam | AOD-9604 | MOTS-c | PT-141 | IGF-1 LR3 | Epitalon |
|---------------|---------|--------|--------|------------|----------|----------|--------|--------|-----------|---------|
| Joint pain or old injuries | +2 | +2 | — | — | +1 | — | — | — | — | — |
| Gut issues (IBS, bloating, reflux) | +2 | — | — | — | — | — | — | — | — | — |
| Skin concerns (fine lines, loss of firmness) | — | — | +2 | +1 | — | — | — | — | — | — |
| Hair thinning | — | +1 | +2 | — | — | — | — | — | — | — |
| Sleep problems | — | — | — | +2 | +1 | — | +1 | — | — | +1 |
| Brain fog or poor concentration | +1 | — | — | +1 | +1 | — | +2 | — | — | +1 |
| Stubborn weight or slow metabolism | — | — | — | +1 | +1 | +2 | +1 | — | — | — |
| Low libido or sexual function concerns | — | — | — | +1 | — | — | — | +2 | — | — |
| Feeling of chronic inflammation or aching | +2 | +2 | — | — | — | — | +1 | — | — | — |

---

### Q6: What's your age range?

| Answer Option | BPC-157 | TB-500 | GHK-Cu | Sermorelin | CJC/Ipam | AOD-9604 | MOTS-c | PT-141 | IGF-1 LR3 | Epitalon |
|--------------|---------|--------|--------|------------|----------|----------|--------|--------|-----------|---------|
| Under 30 | — | — | — | — | +1 | — | — | +1 | +2 | — |
| 30–39 | +1 | +1 | — | +1 | +2 | +1 | — | +1 | +1 | — |
| 40–49 | +1 | +1 | +1 | +2 | +2 | +1 | +1 | +1 | — | +1 |
| 50–59 | +1 | +1 | +2 | +2 | +1 | +1 | +2 | — | — | +2 |
| 60+ | — | — | +2 | +2 | — | — | +2 | — | — | +2 |

---

### Q7: How would you describe your typical week?

| Answer Option | BPC-157 | TB-500 | GHK-Cu | Sermorelin | CJC/Ipam | AOD-9604 | MOTS-c | PT-141 | IGF-1 LR3 | Epitalon |
|--------------|---------|--------|--------|------------|----------|----------|--------|--------|-----------|---------|
| Elite or competitive athlete | +2 | +2 | — | +1 | +2 | — | — | — | +2 | — |
| Regular gym or active training (3–5×/week) | +1 | +1 | — | +1 | +2 | +1 | — | — | +2 | — |
| Active lifestyle — sport, outdoors, movement | +1 | +1 | — | +1 | +1 | +1 | +1 | — | — | — |
| Desk job with some exercise | — | — | +1 | +2 | +1 | +1 | +1 | — | — | +1 |
| High stress, mostly sedentary | +1 | — | +1 | +2 | — | +1 | +2 | — | — | +1 |

---

### Q8: What does success look like in 3 months?

| Answer Option | BPC-157 | TB-500 | GHK-Cu | Sermorelin | CJC/Ipam | AOD-9604 | MOTS-c | PT-141 | IGF-1 LR3 | Epitalon |
|--------------|---------|--------|--------|------------|----------|----------|--------|--------|-----------|---------|
| Fully healed from injury or surgery | +2 | +2 | — | — | — | — | — | — | — | — |
| Looking and feeling 10 years younger | +1 | — | +2 | +2 | +1 | — | +1 | — | — | +2 |
| Noticeably leaner and more defined | — | — | — | +1 | +2 | +2 | +1 | — | +1 | — |
| More muscle, stronger physique | — | +1 | — | +1 | +2 | — | — | — | +2 | — |
| More energy and mental sharpness | — | — | — | +2 | +1 | — | +2 | — | — | +1 |
| Better skin and hair | — | — | +2 | +1 | — | — | — | — | — | — |
| Improved drive and vitality | — | — | — | +1 | +1 | — | +1 | +2 | — | +1 |

---

## Recommendation Archetypes

### 1. The Athlete Rebuilding
**Score pattern:** BPC-157 ≥4, TB-500 ≥4 → **Recovery Stack**  
**Profile:** 30–50, high training load, recurring or slow-healing injury preventing full performance. Frustrated by conventional physio.  
**Primary:** BPC-157 + TB-500 Recovery Stack  
**Secondary:** CJC-1295 + Ipamorelin (if age 35+)  
**Tone on results page:** Direct, practical, evidence-forward

---

### 2. The Longevity Seeker
**Score pattern:** Sermorelin ≥4, Epitalon ≥2, MOTS-c ≥2  
**Profile:** 45–60, health-conscious professional. Driven by metrics and biological age. Interested in a sustainable protocol, not a quick fix.  
**Primary:** Sermorelin  
**Secondary:** Epitalon or MOTS-c  
**Tone:** Scientific, aspirational, protocol-focused

---

### 3. The Skin Optimizer
**Score pattern:** GHK-Cu ≥5, Sermorelin ≥2  
**Profile:** Predominantly female, 40–55. Skin and hair are primary concern. Existing skincare user, looking for the next level.  
**Primary:** GHK-Cu  
**Secondary:** Sermorelin (anti-aging synergy)  
**Tone:** Premium, results-focused, confidence-building

---

### 4. The Body Recomposer
**Score pattern:** CJC/Ipamorelin ≥4, AOD-9604 ≥2, IGF-1 LR3 ≥2  
**Profile:** 35–50 male, active gym-goer. Stuck at a body composition plateau. Has tried nutrition and training optimisation. Ready to go further.  
**Primary:** CJC-1295 + Ipamorelin Stack  
**Secondary:** AOD-9604  
**Tone:** Performance-forward, no-nonsense

---

### 5. The Gut Healer
**Score pattern:** BPC-157 ≥5, gut or inflammation signals dominant  
**Profile:** Mixed age and gender. Digestive issues, possibly long-term NSAID use or antibiotic history. Gut health is the primary concern.  
**Primary:** BPC-157  
**Secondary:** BPC-157 solo (not stack — TB-500 not indicated here unless musculoskeletal co-signals)  
**Tone:** Empathetic, science-backed, hopeful

---

### 6. The Energy Seeker
**Score pattern:** MOTS-c ≥3, Sermorelin ≥3  
**Profile:** 40–60, high stress, sedentary or lightly active. Primary complaint is fatigue and brain fog. Not a gym person but wants to function better.  
**Primary:** Sermorelin (sleep + GH → energy)  
**Secondary:** MOTS-c (mitochondrial energy)  
**Tone:** Relatable, accessible, life-quality focused

---

### 7. The Drive Restorer
**Score pattern:** PT-141 ≥4  
**Profile:** 35–55, libido and sexual wellness as a primary or co-primary concern. Often also scoring on Sermorelin/CJC (hormonal context).  
**Primary:** PT-141  
**Secondary:** Sermorelin or CJC/Ipamorelin (hormonal foundation)  
**Tone:** Discreet but direct, evidence-grounded

---

### 8. The Performance Edge
**Score pattern:** CJC/Ipamorelin ≥5, IGF-1 LR3 ≥3  
**Profile:** 25–40, serious athlete or high-performer. Already optimising everything. Wants the edge.  
**Primary:** CJC-1295 + Ipamorelin Stack  
**Secondary:** IGF-1 LR3 (advanced user disclosure)  
**Tone:** High-performance, detailed, advanced

---

### 9. The Graceful Ageing Protocol
**Score pattern:** Epitalon ≥4, MOTS-c ≥3, Sermorelin ≥3  
**Profile:** 55+, longevity-focused. Less concerned with aesthetics or performance, more with quality years. Interested in cellular health.  
**Primary:** Epitalon  
**Secondary:** Sermorelin + MOTS-c  
**Tone:** Thoughtful, research-grounded, long-term

---

### 10. The Post-Surgery Rebuilder
**Score pattern:** BPC-157 ≥4, TB-500 ≥3 (surgery-specific triggers)  
**Profile:** Any age, post-surgical (joint replacement, cardiac, GI, cosmetic). Wants to compress recovery time.  
**Primary:** BPC-157 + TB-500 Recovery Stack  
**Secondary:** GHK-Cu (if surgical scar or skin healing is a factor)  
**Tone:** Clinical confidence, hope-building

---

## Stack Trigger Logic

**Primary stack trigger (Recovery Stack):**  
→ BPC-157 total ≥ 3 points **AND** TB-500 total ≥ 3 points  
→ Output: "Recovery Stack" replaces individual BPC/TB recommendations

**Secondary stack trigger (GH stack over Sermorelin):**  
→ CJC/Ipamorelin total ≥ 4 **AND** age 40+ (Q6)  
→ Output: CJC/Ipamorelin Stack preferred over Sermorelin alone

**Sermorelin vs CJC decision:**  
→ If Sermorelin and CJC/Ipamorelin within 1 point AND age < 40 → recommend Sermorelin (gentler entry)  
→ If age ≥ 40 AND CJC/Ipamorelin ≥ Sermorelin → recommend CJC/Ipamorelin stack  
→ If "already tried sermorelin" signal present → recommend CJC/Ipamorelin as step-up

---

## Tiebreaker Priority Order

When two peptides are within 1 point:

1. BPC-157
2. Sermorelin
3. GHK-Cu
4. CJC/Ipamorelin Stack
5. TB-500
6. PT-141
7. AOD-9604
8. MOTS-c
9. IGF-1 LR3
10. Epitalon

---

## Results Output Templates

### Template: Recovery Stack
**Headline:** "Your Protocol: The Complete Recovery Stack"  
**Tagline:** "You're built for healing. This combination works on two levels."  
**Primary rec copy:** "Based on your answers, BPC-157 + TB-500 together is your strongest match. BPC-157 initiates repair at the cellular level; TB-500 mobilises your body's recovery machinery system-wide. Together, they're what the biohacking community calls the Wolverine Stack — and for good reason."  
**Hook facts:** Include 2 from BPC157-TB500-Stack.md Education Hook Facts section  
**CTA:** "Build Your Recovery Stack →"

---

### Template: BPC-157 (solo)
**Headline:** "Your Protocol: The Healer"  
**Tagline:** "Your body knows how to repair itself. BPC-157 turns up the volume."  
**Primary rec copy:** "BPC-157 is the most researched healing peptide in the catalogue — 100+ peer-reviewed studies and counting. Whether it's gut repair, tendon healing, or reducing chronic inflammation, the evidence points in one direction."  
**Hook fact:** "BPC-157 was literally discovered in your stomach — it's derived from a protein in human gastric juice."  
**CTA:** "Start with BPC-157 →"

---

### Template: Sermorelin
**Headline:** "Your Protocol: The Age Reset"  
**Tagline:** "This isn't about fighting ageing. It's about restoring what you already have."  
**Primary rec copy:** "Sermorelin stimulates your pituitary gland to produce more of your own growth hormone — the way it did when you were younger. More GH means better sleep, better body composition, more energy, and sharper cognition. The difference is most people start noticing within 4–6 weeks."  
**Hook fact:** "When telehealth clinics prescribe 'GH therapy,' sermorelin is often what they're actually giving you — at $200–400/month. Same molecule."  
**CTA:** "Start Your GH Reset →"

---

### Template: GHK-Cu
**Headline:** "Your Protocol: The Skin Signal"  
**Tagline:** "Your skin used to repair itself effortlessly. GHK-Cu helps it remember how."  
**Primary rec copy:** "GHK-Cu is a copper-binding peptide your body produces naturally — but levels drop by 60–70% between your twenties and sixties. It tells your cells to produce collagen, elastin, and hyaluronic acid. Not in a moisturiser way — at the gene expression level."  
**Hook fact:** "GHK-Cu appears to influence the expression of up to 47% of human genes related to cell maintenance, ageing, and repair — making it one of the most pleiotropic small molecules known."  
**CTA:** "Begin Your Skin Protocol →"

---

### Template: CJC-1295 + Ipamorelin
**Headline:** "Your Protocol: The Performance Stack"  
**Tagline:** "Your body already knows how to build and burn. This unlocks the ceiling."  
**Primary rec copy:** "CJC-1295 + Ipamorelin is the gold standard GH peptide combination in anti-aging and performance medicine. Two peptides, two receptor pathways, one goal: dramatically amplified growth hormone release in the way your body actually responds to — natural, pulsatile, and powerful."  
**Hook fact:** "Ipamorelin is the only GHRP that doesn't spike cortisol or appetite — it was literally designed to be the 'clean' version."  
**CTA:** "Build Your GH Stack →"

---

### Template: PT-141
**Headline:** "Your Protocol: The Drive Protocol"  
**Tagline:** "This one works differently. And that's exactly the point."  
**Primary rec copy:** "PT-141 is the only peptide that works on sexual response at the level of the brain — through melanocortin receptors — rather than blood flow. It was developed from a suntan peptide, and researchers were surprised by what else it did. In clinical trials for female sexual dysfunction, results were significant enough for FDA approval (as Vyleesi®)."  
**Hook fact:** "PT-141 was accidentally discovered when researchers developing a suntan peptide noticed unexpected arousal as a side effect."  
**CTA:** "Explore the Drive Protocol →"

---

*Last updated: 2026-04-09 | Peptide Station*
