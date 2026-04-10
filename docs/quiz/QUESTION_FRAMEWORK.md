# Peptide Station — Quiz Question Framework

**Version:** 1.0  
**Date:** 2026-04-09  
**Purpose:** Full question logic, answer options, scoring, interstitial placement, and email gate for the Peptide Station lead generator quiz

---

## Design Principles

1. **Feelings over facts.** Every question is answerable from lived experience — no measurements, no clinical knowledge, no homework required.
2. **Mobile-first.** Full-screen tap-target cards with icons. Never dropdowns, never open text fields.
3. **One thing per screen.** One question per view. No cognitive overload.
4. **Reward curiosity.** Educational interstitials feel like a bonus, not a hurdle. They make users feel smarter for taking the quiz.
5. **Personalisation illusion.** The quiz should feel like it's responding to the person, not just collecting data. Reference their previous answers in interstitials.
6. **Early exit options.** Every screen includes a gentle "skip to results" path for users who disengage. Don't force completion.
7. **Email gate is a value exchange, not a barrier.** The gate copy is about what they're about to receive — not about capturing their data.

---

## Quiz Flow Overview

```
[Entry / Landing Page]
        ↓
[Q1: Primary Goal]       — Group 1: Goals
[Q2: Holding You Back]
        ↓
[Interstitial A]         — Personalised to Q1 answer
        ↓
[Q3: Recovery Speed]     — Group 2: Current Situation
[Q4: Energy Levels]
[Q5: Ongoing Issues]     — Multi-select
[Q6: Age Range]
        ↓
[Interstitial B]         — Personalised to Q1 + Q5 combination
        ↓
[Q7: Typical Week]       — Group 3: Lifestyle
[Q8: Success Vision]
        ↓
[Results Teaser]         — "Your results are ready" without revealing specifics
        ↓
[Email Gate]             — Unlock full results + personalised protocol
        ↓
[Full Results Page]      — Primary recommendation + secondary + education + CTA
        ↓
[Checkout / Product Page]
```

**Total questions:** 8  
**Estimated completion time:** 2.5–3 minutes  
**Target drop-off rate:** <30% (between Q1 and email gate)

---

## Entry / Landing Page

**Headline:** "Find Your Peptide Protocol"  
**Sub-headline:** "Answer 8 quick questions. Get personalised peptide recommendations backed by real science."  
**Supporting copy:** "Used by athletes, biohackers, and longevity-focused professionals. Takes 3 minutes."  
**CTA button:** "Start My Assessment →"  
**Trust signals:** Lock icon + "Your answers are private" / "3,000+ protocols matched"

---

## Questions

---

### Group 1: Goals

---

#### Q1: What's your #1 health goal right now?

**Display:** Always shown  
**Format:** Full-screen icon cards (tap to select one)  
**Progress indicator:** 1 of 8

**Answer options:**

| Icon | Label | Sub-text |
|------|-------|----------|
| 🩹 | Heal an injury or recover from surgery | Tendons, joints, muscles, post-op |
| ⏳ | Feel younger, slow down ageing | Energy, vitality, biological age |
| ✨ | Better skin, hair and appearance | Collagen, tone, thickness |
| 🔥 | Lose fat / improve body composition | Body fat, metabolic health |
| 💪 | Build muscle / improve performance | Strength, lean mass, athleticism |
| ⚡ | More energy and better sleep | Beat fatigue, improve deep sleep |
| 🫃 | Fix gut or digestive issues | IBS, bloating, gut repair |
| 🌶️ | Boost libido / sexual wellness | Drive, performance, desire |

**Scoring:** See RECOMMENDATION_MATRIX.md Q1 table

---

#### Q2: What's the #1 thing holding you back right now?

**Display:** Always shown  
**Format:** Full-screen icon cards  
**Progress indicator:** 2 of 8

**Answer options:**

| Icon | Label | Sub-text |
|------|-------|----------|
| 🦴 | A nagging injury that won't fully heal | Something that keeps coming back |
| 😴 | Low energy, feeling older than I should | Running on empty most days |
| 🪞 | My skin and hair look older than I feel | Losing what I used to have |
| ⚖️ | Stubborn fat I can't shift | Despite diet and exercise |
| 📉 | Difficulty building or keeping muscle | Hard to make or maintain gains |
| 🌙 | Poor sleep ruining my recovery | Can't get into deep, restorative sleep |
| 😶 | Low drive or loss of motivation | Less interest in things that used to excite me |
| 🫃 | Gut problems, bloating or discomfort | Something is off and it affects everything |

**Scoring:** See RECOMMENDATION_MATRIX.md Q2 table

---

### Interstitial A — Education Card

**Placement:** Shown after Q2, before Q3  
**Format:** Full-screen card with headline, 2–3 sentences, and a "Continue →" button  
**Logic:** Card variant triggered by Q1 answer

**Variant A1 — triggered by Q1: Heal injury / recovery**
> **"Most healing stalls at the same bottleneck."**
> 
> The reason many injuries plateau — even with physio and rest — is poor local circulation and insufficient cellular signalling to trigger repair. Certain peptides work specifically on this mechanism, used in research settings to accelerate tissue healing by orders of magnitude. That's what we're going to identify for you.

**Variant A2 — triggered by Q1: Feel younger / slow ageing**
> **"Growth hormone doesn't decline because you age. You age partly because it declines."**
> 
> By your late 30s, pituitary GH output has typically fallen 50% from its peak. This affects sleep, body composition, energy, and cellular repair simultaneously. The interesting part: specific peptides can restore this output without ever touching the hormone itself.

**Variant A3 — triggered by Q1: Skin, hair and appearance**
> **"Your skin has a natural renewal programme. It just needs the signal."**
> 
> A naturally occurring copper-binding peptide in your body controls collagen synthesis, skin remodelling, and hair follicle activity — but its concentration drops 60–70% between your twenties and sixties. By your next question, we'll know if replenishing it is your best next step.

**Variant A4 — triggered by Q1: Lose fat / body composition**
> **"There's a specific fat-burning mechanism that almost nobody talks about."**
> 
> Growth hormone drives lipolysis — the breakdown of stored fat for energy — independently of diet. A peptide class called growth hormone secretagogues specifically stimulates this mechanism, which is why telehealth clinics charge $200–400/month for them. We'll find out which version fits your profile.

**Variant A5 — triggered by Q1: Build muscle / performance**
> **"There's a ceiling to what training alone can do. It's not your effort — it's your signalling."**
> 
> The cascade that drives muscle repair and growth starts with IGF-1 — and IGF-1 is downstream of growth hormone. Certain peptides specifically amplify this chain, which is why they're prohibited by WADA. We're going to map exactly where you are in that system.

**Variant A6 — triggered by Q1: Energy and sleep**
> **"Deep sleep isn't just recovery. It's your GH release window."**
> 
> 70–80% of daily growth hormone secretion happens during slow-wave (deep) sleep. If your sleep quality has declined, so has your GH output — which explains declining energy, body composition, and recovery simultaneously. Some of the peptides we'll show you were specifically designed to restore this.

**Variant A7 — triggered by Q1: Gut / digestive**
> **"The peptide most studied for gut healing was discovered in your stomach."**
> 
> BPC-157 was originally isolated from a protein found in human gastric juice — evolved to protect the gut from its own acid. It's now one of the most researched peptides for intestinal healing, tight junction repair, and gut-brain axis regulation. The science behind it is genuinely fascinating.

**Variant A8 — triggered by Q1: Libido / sexual wellness**
> **"This particular solution works differently to anything you've tried."**
> 
> Most approaches to libido work on blood flow. The peptide that best matches your goal works directly on the brain's melanocortin receptors — the neurological pathway that initiates desire at its source, not downstream. It's the same mechanism behind an FDA-approved women's sexual health drug.

---

### Group 2: Current Situation

---

#### Q3: How would you describe your recovery from exercise or physical activity?

**Display:** Always shown  
**Format:** Vertical scale cards (top to bottom = best to worst)  
**Progress indicator:** 3 of 8

**Answer options:**

| Label | Sub-text |
|-------|----------|
| Very fast — I bounce back quickly | Back to full capacity within 24 hours |
| Normal — takes a day or two | Standard recovery, nothing remarkable |
| Slower than it used to be | I've noticed a clear change in recent years |
| Very slow — takes several days | Training is limited by how long recovery takes |
| I barely exercise but still feel run-down | Fatigue without obvious cause |

**Scoring:** See RECOMMENDATION_MATRIX.md Q3 table

---

#### Q4: How would you describe your energy levels day-to-day?

**Display:** Always shown  
**Format:** Scale cards  
**Progress indicator:** 4 of 8

**Answer options:**

| Label | Sub-text |
|-------|----------|
| High — consistently good all day | Rarely tired, focus is strong |
| Good most days, occasional dips | Generally fine but not optimal |
| Low — I rely on caffeine to function | Would struggle without stimulants |
| Very low — affecting quality of life | Fatigue is one of my main concerns |

**Scoring:** See RECOMMENDATION_MATRIX.md Q4 table

---

#### Q5: Do you have any of these ongoing issues?

**Display:** Always shown  
**Format:** Multi-select grid cards (tick to select, multiple allowed)  
**Copy above question:** "Select all that apply — even if they seem minor."  
**Progress indicator:** 5 of 8  
**Skip option:** "None of these — skip →"

**Answer options:**

| Icon | Label |
|------|-------|
| 🦴 | Joint pain or old injuries |
| 🫃 | Gut issues (IBS, bloating, reflux) |
| 🪞 | Skin concerns (fine lines, loss of firmness) |
| 💇 | Hair thinning |
| 🌙 | Sleep problems |
| 🧠 | Brain fog or poor concentration |
| ⚖️ | Stubborn weight or slow metabolism |
| 🌶️ | Low libido or sexual function concerns |
| 🔥 | Feeling of chronic inflammation or aching |

**Scoring:** Each selected option scores independently — see RECOMMENDATION_MATRIX.md Q5 table

---

#### Q6: What's your age range?

**Display:** Always shown  
**Format:** Simple tap-target cards  
**Progress indicator:** 6 of 8

**Answer options:**
- Under 30
- 30–39
- 40–49
- 50–59
- 60+

**Scoring:** See RECOMMENDATION_MATRIX.md Q6 table  
**Logic note:** This question is particularly important for steering between Sermorelin (gentler, good for 35+) and CJC/Ipamorelin (more potent, optimal for 40+), and for surfacing longevity peptides (Epitalon, MOTS-c) for users 50+.

---

### Interstitial B — Education Card

**Placement:** Shown after Q6, before Q7  
**Format:** Full-screen card with headline, 2–3 sentences, "Continue →" button  
**Logic:** Card selected based on combination of Q1 goal + Q5 selections

**Variant B1 — Q1: Injury recovery + Q5 includes joint pain**
> **"The cells your body needs to heal an injury can't get there without the right signal."**
> 
> Tendon and ligament repair stalls because these tissues have poor blood supply. What research on a specific class of peptides has shown, across more than 100 animal studies, is that the vascular signalling pathway can be switched back on — allowing the repair cascade to complete what the body started but couldn't finish.

**Variant B2 — Q1: Anti-ageing + Q5 includes sleep problems**
> **"If your sleep has gotten worse, your growth hormone has too."**
> 
> Growth hormone is released in pulses during deep sleep. As sleep quality declines — which happens naturally from your late 30s — so does GH output. The fascinating part: restoring the GH signal actually improves sleep quality in return. The protocol we're likely to recommend for you works directly on this cycle.

**Variant B3 — Q1: Skin/appearance + Q5 includes skin concerns or hair**
> **"Collagen doesn't just decline — it stops being signalled."**
> 
> After 25, collagen production drops around 1–2% per year. The reason isn't that fibroblasts stop working — it's that the biological signal telling them to produce collagen weakens. The peptide most studied for this specific mechanism can influence the expression of genes involved in skin renewal, elastin production, and hair follicle reactivation.

**Variant B4 — Q1: Body comp + Q5 includes stubborn weight**
> **"Growth hormone is the most underappreciated fat-burning hormone in medicine."**
> 
> GH directly activates lipolysis — breaking fat cells down for energy — independently of insulin or caloric restriction. This is why people who restore optimal GH levels lose visceral fat without changing their diet. Several peptides stimulate this pathway specifically. We'll show you the most appropriate one for your profile.

**Variant B5 — Q1: Muscle + Q5 includes inflammation or slow recovery**
> **"You can't build over inflammation. You have to clear it first."**
> 
> Chronic low-grade inflammation suppresses the anabolic signalling needed for muscle growth and recovery. The most efficient protocols for body recomposition address both problems in sequence — which is why the combination you're most likely to be matched with includes both an anabolic signal and an anti-inflammatory one.

**Variant B6 — Q1: Energy + Q5 includes brain fog**
> **"Mitochondria are the link between cellular age and felt energy."**
> 
> Brain fog and fatigue often share a single upstream cause: declining mitochondrial efficiency. A relatively new class of peptides — derived from mitochondrial DNA itself — has shown in research to restore mitochondrial function in ways that affect both energy metabolism and cognitive clarity. This may feature in your results.

**Variant B7 — Q1: Gut + Q5 includes gut issues or inflammation**
> **"Your gut and your immune system are the same conversation."**
> 
> 70–80% of the immune system resides in the gut lining. When that lining is compromised — by NSAIDs, stress, antibiotic overuse, or dysbiosis — the inflammatory signal spreads systemically. The peptide most studied for gut repair also shows striking effects on systemic inflammation markers. This is almost certainly where your protocol begins.

---

### Group 3: Lifestyle & Commitment

---

#### Q7: How would you describe your typical week?

**Display:** Always shown  
**Format:** Full-screen icon cards  
**Progress indicator:** 7 of 8

**Answer options:**

| Icon | Label | Sub-text |
|------|-------|----------|
| 🏆 | Elite or competitive athlete | Train daily, compete at a high level |
| 🏋️ | Regular gym or active training | 3–5 sessions per week, structured |
| 🚴 | Active lifestyle | Sport, outdoors, movement — not formal training |
| 💼 | Desk job with some exercise | Mostly sedentary, gym 1–2x per week |
| 😮‍💨 | High stress, mostly sedentary | Work-heavy, low movement, high pressure |

**Scoring:** See RECOMMENDATION_MATRIX.md Q7 table

---

#### Q8: What does success look like for you in 3 months?

**Display:** Always shown  
**Format:** Tap-target cards (select one)  
**Progress indicator:** 8 of 8

**Answer options:**

| Icon | Label |
|------|-------|
| 🩹 | Fully healed from injury or surgery |
| ⏳ | Looking and feeling 10 years younger |
| 🔥 | Noticeably leaner and more defined |
| 💪 | More muscle, stronger physique |
| ⚡ | More energy and mental sharpness |
| ✨ | Better skin and hair |
| 🌶️ | Improved drive and vitality |

**Scoring:** See RECOMMENDATION_MATRIX.md Q8 table

---

## Results Teaser Screen

**Shown:** Immediately after Q8, before email gate

**Format:** Animated card with personalised category label

**Headline:** "Your results are ready."  
**Sub-headline:** "Based on your answers, we've identified [1/2/3] peptides that match your profile."  
**Teaser line (personalised to top archetype):**  
> Example: "You look like a match for our most popular healing protocol." (Recovery Stack result)  
> Example: "Your profile points toward a growth hormone and energy restoration stack." (Sermorelin/CJC result)  
> Example: "Your skin and collagen profile is one of the clearer matches we see." (GHK-Cu result)  

**CTA:** "Unlock My Results →" (leads to email gate)  
**Skip option:** Very small grey text — "Skip to general recommendations" (leads to generic non-personalised results page — this preserves a path for users resistant to the email gate)

---

## Email Gate

**Format:** Single-screen, minimal friction — name field (optional) + email (required) + CTA button

**Headline:** "Your personalised peptide protocol is waiting."

**Body copy:**  
> "Enter your email to receive:  
> ✦ Your personalised peptide match (with the science behind why)  
> ✦ A full protocol guide — dosing, timing, what to expect  
> ✦ A $15 first-order discount code  
>   
> We'll never spam you. One email, your results, done."

**CTA button:** "Send Me My Results →"

**Trust elements:** Lock icon + "No spam. Unsubscribe anytime." / "Used by 3,000+ protocol-seekers"

**Privacy micro-copy:** "By continuing you agree to our [Privacy Policy]. We handle your data with care."

---

## Scoring Summary Table

Maximum possible points achievable per peptide across all 8 questions (single selections, conservative scenario):

| Peptide | Max Points (approx) | Typical High-Scoring Profile |
|---------|--------------------|-----------------------------|
| BPC-157 | 14 | Injury, gut, inflammation across all questions |
| Sermorelin | 13 | Anti-ageing, sleep, energy, 40–59 age range |
| TB-500 | 12 | Muscle injury, flexibility, elite athlete |
| GHK-Cu | 11 | Skin/hair goals, appearance, female 45–55 |
| CJC/Ipamorelin | 12 | Performance, body comp, 40+ male |
| MOTS-c | 10 | Energy, brain fog, metabolic, 50+ |
| PT-141 | 8 | Libido-specific signals, drive |
| AOD-9604 | 9 | Fat loss, metabolic, active user |
| IGF-1 LR3 | 9 | Muscle growth, elite user, 25–40 |
| Epitalon | 9 | Longevity, sleep, 50+ age range |

*Note: Multi-select Q5 can significantly boost scores — a user selecting 4 issues relevant to BPC-157 could score +8 from Q5 alone. This is intentional: Q5 is the most discriminating question in the quiz.*

---

## Interstitial Content Library

Quick reference of all interstitial variants by trigger condition:

| ID | Trigger | Headline |
|----|---------|---------|
| A1 | Q1 = Injury/surgery | "Most healing stalls at the same bottleneck." |
| A2 | Q1 = Feel younger/ageing | "Growth hormone doesn't decline because you age." |
| A3 | Q1 = Skin/hair/appearance | "Your skin has a natural renewal programme." |
| A4 | Q1 = Fat loss/body comp | "There's a specific fat-burning mechanism that almost nobody talks about." |
| A5 | Q1 = Build muscle/performance | "There's a ceiling to what training alone can do." |
| A6 | Q1 = Energy/sleep | "Deep sleep isn't just recovery. It's your GH release window." |
| A7 | Q1 = Gut/digestive | "The peptide most studied for gut healing was discovered in your stomach." |
| A8 | Q1 = Libido/sexual wellness | "This particular solution works differently to anything you've tried." |
| B1 | Q1=Injury + Q5 includes joints | "The cells your body needs to heal can't get there without the right signal." |
| B2 | Q1=Ageing + Q5 includes sleep | "If your sleep has gotten worse, your growth hormone has too." |
| B3 | Q1=Skin + Q5 includes skin/hair | "Collagen doesn't just decline — it stops being signalled." |
| B4 | Q1=Body comp + Q5 includes weight | "Growth hormone is the most underappreciated fat-burning hormone in medicine." |
| B5 | Q1=Muscle + Q5 includes inflammation | "You can't build over inflammation. You have to clear it first." |
| B6 | Q1=Energy + Q5 includes brain fog | "Mitochondria are the link between cellular age and felt energy." |
| B7 | Q1=Gut + Q5 includes gut/inflammation | "Your gut and your immune system are the same conversation." |

**Default interstitial (if no variant matches):** Use A2 for Interstitial A, B2 for Interstitial B — these are the broadest-appeal variants.

---

## Implementation Notes

1. **Scoring engine** should be client-side (JS) for speed — no server round-trip until email gate
2. **Q5 multi-select** is the most data-rich question — weight its scoring appropriately
3. **Stack trigger** (BPC+TB500) should be evaluated client-side immediately after Q8 before showing results teaser
4. **Age gate for certain outputs:** IGF-1 LR3 and Follistatin 344 should only appear as recommendations for users under 50 — these are performance peptides not appropriate for the longevity-focused older demographic
5. **PT-141 disclaimer:** If PT-141 is the primary recommendation, include regulatory note on results page (FDA-approved drug, prescription status in US, etc.)
6. **Progress bar:** Visible throughout. Show percentage complete to reduce abandonment
7. **Back button:** Always visible. Users who go back don't restart — they return to the previous question with their answer preserved
8. **Mobile keyboard:** Never trigger keyboard on any question — all tap-target only

---

*Version 1.0 — April 2026 | Peptide Station*
