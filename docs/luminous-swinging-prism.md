# Onboarding Flow Technical & Design Brief
## Longevity Direct Portal — Complete Reference for Replication

> **Purpose:** This document is an exhaustive reference for replicating the LD Portal onboarding registration flow in a new brand/repo. Every detail — architecture, UI, UX patterns, state management, backend, and analytics — is captured here. The new product is for peptides, not longevity treatments, but the _mechanism_ is identical.

---

## 1. Project Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 18, Tailwind CSS, shadcn/ui (CVA) |
| State | Zustand 5 (quiz), Redux Toolkit + redux-persist (auth) |
| Animation | Framer Motion 12 |
| Auth | Firebase (Google + Apple OAuth) + Firebase Admin SDK |
| Database | MongoDB + Mongoose 8 |
| Email | SendGrid |
| Analytics | GA4 (`pushEvent`), Meta CAPI (`sendMetaCapiBeacon`) |
| Monitoring | Sentry, OpenReplay |
| Rate Limiting | Upstash Redis |
| 3rd-party EHR | Healthie GraphQL (exclude this — replace with your own) |

---

## 2. File Structure — All Onboarding Files

```
src/app/onboarding/
  page.tsx                        — Main orchestrator
  layout.tsx                      — Metadata + header wrapper
  questions.ts                    — ALL question/interstitial config (~780 lines)
  excluded/page.tsx               — Eligibility exclusion landing page
  components/
    Question.tsx                  — Renders all input types
    TitlePage.tsx                 — Welcome screen (privacy gate)
    ConsentPage.tsx               — Telehealth + ToS checkboxes
    StatementPage.tsx             — Rich interstitial pages
    FinalStepsPage.tsx            — Account creation (social auth + name/email/phone)
    Header.tsx                    — Progress bar + logo
    Logo.tsx                      — Logo image
    AnimatedText.tsx              — Word/letter-by-letter animated text
    SocialProofToast.tsx          — Bottom-left social proof notification
    SectionTitlePage.tsx          — Section transition pages
  hooks/
    useOnboardingSubmit.ts        — Submission logic + user registration
  testimonials/
    buildTestimonial.ts           — Testimonial selection algorithm
    personas.ts                   — User persona database
    quotes.ts                     — Quote database (protocol + tone indexed)

src/store/
  onboardingStore.ts              — Zustand quiz store

src/models/
  Onboarding.ts                   — MongoDB onboarding schema
  User.ts                         — MongoDB user schema

src/app/api/
  auth/register/route.ts          — User registration (3 modes)
  onboarding/route.ts             — GET onboarding by userId/email
  onboarding/save/route.ts        — POST/GET save onboarding record
  onboarding/submit-existing/route.ts — Re-onboarding existing users
  admin/onboardings/route.ts      — Admin listing

src/lib/
  saga/userCreationSaga.ts        — Distributed transaction (Firebase + DB + email)
  firebase.ts                     — Firebase client init
  auth.ts                         — Firebase Admin server-side verification
  mongodb.ts                      — MongoDB connection

src/utils/
  heroDecision.ts                 — Product slug routing logic
  health-calculations.ts          — BMI calculator
  analytics.ts                    — GA4 + Meta CAPI helpers
```

---

## 3. The Complete User Journey (Screen by Screen)

### Screen -1: Welcome / TitlePage
- **Component:** `TitlePage.tsx`
- **URL:** `/onboarding`
- **Content:**
  - Heading (word-by-word animated): `"Reach your health goals with confidence"`
  - Subtitle (slower word-by-word, delay 1s): "Answer a few questions so we can determine if you qualify for treatment. ⏱️ Takes under 3 minutes. 🔒 HIPAA-compliant and LegitScript certified. Your data stays private."
  - Privacy consent checkbox (fades in at 2s): "I understand and accept the data privacy policy"
  - CTA button (fades in at 2.5s): Red gradient pill "CONTINUE" — **disabled until checkbox checked**
- **Store state:** `currentQuestion = -1`

### Section A: Health Goals (Questions 1–3)
1. `specific_health_goal` — multi-choice, 14 options in 2-col grid (General Longevity, Weight Management, Heart Health, Glucose Control, Cognitive Function, Diabetes Prevention, Mood Support, Energy & Fatigue, Autoimmune Support, Blood Pressure, Chronic Pain & Arthritis, Aging Skin, Men's Aging, Women's Aging)
2. `treatment_interest` — multi-choice, 1-col, with `exclusiveOption: 'Not sure'` (GLP-1, Microdose GLP-1, Rapamycin, Metformin, Not sure)
3. `glp1_priority` — single-select, only shown if GLP-1 selected (Affordability, Efficacy)

### Interstitial 2.5: Treatment Education
- **Component:** `StatementPage.tsx`
- **Type:** `statement` question with `showIf` predicate per treatment
- One interstitial per treatment selection (GLP-1, Microdose GLP-1, Rapamycin, Metformin, Not sure, Multi-treatment)
- **Content blocks:** Image (top), Badge, Animated heading with italic Lora highlight, Subtext paragraphs, Bullet list, "Your plan includes" box
- **Social proof toast** fires here (toast #1: "X people completed assessment in last few hours")

### Section B: Personal Details (Questions 4–8)
4. `gender` — single-select (Male, Female)
5. `state` — dropdown (all US states)
6. `dob` — date input (age gate: 30–75 years, shown inline error)
7. `ethnicity` — single-select (9 options)
8. `other_ethnicity` — text input, only if ethnicity = "Other"

### Interstitial 3.5: Social Proof
- **Component:** `StatementPage.tsx`
- One per treatment selection
- **Content blocks:** Two testimonial cards (persona-matched by gender + ethnicity), "How it works" 3-step section with images
- No heading text — pure social proof

### Section C: Body Composition (Questions 9–10)
9. `height` — two number inputs (ft + in), validated 1–8 ft, 0–11 in
10. `weight_pound` — number input, validated 50–500 lbs

### Interstitial 4.5: Eligibility Prep ("You're on track for...")
- **Component:** `StatementPage.tsx`
- Shown conditionally based on treatment + BMI
- GLP-1/Microdose only shows if BMI ≥ 27
- Content: heading with italic highlight of protocol name, subtext about upcoming health checks, hero image (bottom position)

### Section D: Health Conditions (Questions 11–12)
11. `health_conditions_1` — multi-choice, 1-col, list layout (6 serious conditions + "None of the above")
12. `health_conditions_2` — multi-choice, 1-col, list layout (5 more conditions + "None of the above")

Also: `blood_tests` — single-select Yes/No

### Interstitial 5.5: "You're on track"
- **Component:** `StatementPage.tsx`
- Only shown if both health condition screens = "None of the above"
- Per-treatment + per-blood-test variant (6 variants total)
- Content: heading, subtext, bullet list about lab testing
- **Social proof toast** fires here (toast #2: "X physicians online now")

### Interstitial 5.75: Wearable Check
- `wearable_check` — single-select (only shown if health conditions clear)
  - "Yes, I currently use a wearable"
  - "No, I don't track health metrics"

### Section E: Lifestyle & Mental Health (Question 13)
13. `mental_health` — multi-choice, 1-col, `hideCheckmarks: true` (eating disorder, suicidal thoughts, substance use disorder, recent/upcoming surgery, "None of the above")

### Interstitial 6.5a: Process ("Here's what happens next")
- **Component:** `StatementPage.tsx`
- Only shown if: health conditions clear AND mental health = "None of the above"
- Content: Guarantee callout (green box, above image), 3-step ordered list with red numbered circles, hero image (bottom)

### Interstitial 6.5b: blēo wearable reveal
- Only shown if: no wearable + health conditions clear + mental health clear
- Content: FREE badge (red), heading with "blēo" italic highlight, image (bottom), subtext about the wearable

### Section F: Consent (Question 14)
- `combined_consent` — consent type, 2 checkboxes
  - Telehealth Consent policy
  - Terms of Use and Limitation of Liability

### Interstitial 7.5: Confidence Boost
- Gender-specific hero image (male/female, from `genderImages` field)
- Heading: "You're one step from starting your journey." (with "your journey." italic)
- Subtext: physician review explanation + privacy assurance

### Section G: Account Creation (Questions 15–18)
15. `social-auth` — **FinalStepsPage component** with heading "Your personalized plan is ready, let's make it yours" (italic Lora highlight on "let's make it yours", color = treatment-specific)
    - Name inputs (First Name, Last Name)
    - Divider: "or continue faster with"
    - Google + Apple OAuth buttons (pill shaped, gray, equal width)
    - OAuth fills name/email automatically and skips next steps
16. `name` — shown only if name not yet filled via OAuth
17. `email` — shown only if not filled via OAuth (`showIf: answers => !answers.social_auth_provider`)
18. `phone` — always shown, subtext "Your number is only ever used by our care team..."

---

## 4. Zustand Store — onboardingStore.ts

### State Shape
```typescript
interface QuizState {
  activeQuiz: string | null;
  quizzes: {
    [quizId: string]: {
      currentQuestion: number;  // -1 = welcome screen
      answers: Record<string, any>;
    };
  };
  progress: number;       // current progress %
  maxProgress: number;    // highest reached (never goes backward)
}
```

### Key Methods
- `startQuiz(quizId)` — initializes quiz, rehydrates from `localStorage` key `onboarding_quiz_${quizId}` (for OAuth redirect recovery)
- `nextQuestion(quizId, questions)` — advances to next question that passes `doesConditionPass()`, skipping invisible ones. From -1 → 0 sets progress to 15%
- `previousQuestion(quizId, questions)` — walks backward skipping invisible questions
- `submitAnswer(quizId, questionId, value, questions)` — saves answer + advances (single atomic operation, uses new answers for condition check so the next question can depend on what was just answered)
- `setAnswer(quizId, questionId, value)` — saves answer without advancing (used for social auth pre-fill)
- `updateProgressBasedOnAnswers()` — computes % = (visible questions answered so far / total visible). Minimum 15% after welcome. Progress is one-directional (uses `maxProgress` — never decreases)
- `clearPersistedQuiz(quizId)` — removes localStorage on completion

### Condition System
```typescript
const doesConditionPass = (answers, question) => {
  // Legacy: single field equality check
  if (question.condition) {
    const { questionId, value } = question.condition;
    // checks answers[questionId] includes/equals value
  }
  // Modern: full predicate function
  if (question.showIf) {
    return question.showIf(answers);
  }
  return true; // always visible if no condition
};
```

---

## 5. Question Type System — questions.ts

### QuestionType Interface (all fields)
```typescript
type QuestionType = {
  id: string;
  type: 'multiple-choice' | 'text' | 'section-title' | 'date' | 'multi-choice' 
      | 'dropdown' | 'height' | 'slider' | 'name' | 'email' | 'password' 
      | 'number' | 'statement' | 'consent' | 'phone' | 'social-auth';
  text: string;
  subtext?: string;
  citation?: string;
  options?: any[];
  columns?: 1 | 2;           // grid columns for multi-choice
  badge?: string;            // text badge above heading (statement)
  image?: string;            // image URL
  genderImages?: { male: string; female: string }; // gender-specific image
  consents?: Array<{ id: string; text: string; link: string; linkText: string }>;
  condition?: { questionId: string; value: any };  // legacy condition
  showIf?: (answers: Record<string, any>) => boolean; // modern condition
  min?: number;
  max?: number;
  sliderLabels?: string[];
  ga4StepNumber?: number;    // e.g. 2.5, 3.5, 4.5 for interstitials
  // statement-only fields:
  bullets?: string[];
  planIncludes?: string[];
  buttonText?: string;
  titleHighlight?: string;   // substring of text to render in Lora italic
  testimonialQuoteSelector?: QuoteSelector;
  testimonial2QuoteSelector?: QuoteSelector;
  howItWorks?: Array<{ title: string; subtext: string; duration?: string }>;
  stepImages?: string[];
  steps?: Array<{ title: string; subtext: string }>;
  guarantee?: string;
  listLayout?: boolean;      // forces single column for multi-choice
  singleSelect?: boolean;    // single select for multi-choice type
  exclusiveOption?: string;  // option that clears all others when selected
  hideCheckmarks?: boolean;  // hide checkmarks on multi-choice
  imagePosition?: 'bottom';  // default is top
  badgeVariant?: 'red';      // red gradient badge instead of blue
  guaranteeAboveImage?: boolean; // show guarantee callout before the image
};
```

### Helper Functions in questions.ts
```typescript
const calcBMI = (answers) => (weight / totalInches²) × 703;
const includes = (answers, key, val) => Array.isArray(v) ? v.includes(val) : v === val;
const multiTreatmentSelected = (answers) => real selections > 1 (excludes 'Not sure');
const healthConditionsClear = (answers) => both hc1 + hc2 = 'None of the above';
```

---

## 6. Component-Level Specifications

### Question.tsx
- Handles all input rendering via `renderInput()` switch
- Local `value` state, initialized from `answers[questionId]` or `getInitialValue(type)`
- **Multi-choice logic:** tracks array of selections; `exclusiveOption` and `'None of the above'` always clear all others; `singleSelect` limits to 1 choice
- **Submit:** `handleSubmit` → calls `submitAnswer(quizId, questionId, value, questions)`
- **Layout:** `flex flex-col flex-1` wrapper, sticky footer with back + continue buttons
- **Back button:** red gradient circle 48×48px
- **Continue button:** red gradient pill, uppercase Inter 0.875rem, letterSpacing 0.08em, disabled = gray

### TitlePage.tsx
- Heading: AnimatedText word-by-word, Almarai font, 34/46px, font-light
- Subtitle: slower AnimatedText (delay 1s, stagger 0.0625, duration 0.375)
- Checkbox: `motion.div` fade-in at 2s
- CTA button: `motion.div` fade-in at 2.5s; disabled until checkbox checked
- Footer: `bg-white/80 backdrop-blur-sm` (frosted glass)

### StatementPage.tsx
- **Delay system:** all content blocks have precisely sequenced delays computed in `delays` object
- Content render order + typical delays:
  1. Guarantee top (0s)
  2. Image top (0s or +0.3)
  3. Badge (+0.22)
  4. Heading (AnimatedText word-by-word OR motion.span word stagger for titleHighlight)
  5. Testimonials (+0.3 from heading end)
  6. Subtext (+0.45)
  7. Steps (stagger 0.12 each)
  8. Guarantee bottom (after steps)
  9. Bullets (stagger 0.1 each)
  10. Plan includes box (stagger 0.08 each)
  11. How it works steps (stagger 0.12 each)
  12. Image bottom
  13. CTA button
- **titleHighlight:** renders heading as flat word list where highlight words get `fontFamily: var(--font-lora), serif; fontStyle: italic; color: tColor`
- **Treatment color:** passed as `tColor`, used for: bullet dots, italic highlight color

### FinalStepsPage.tsx
- Fixed heading: "Your personalized plan is ready, **let's make it yours**" (Lora italic for last 4 words, color = `tColor`)
- Fixed subtext: "We just need a few details and it's all yours." fades in at 1.1s
- Input area: `AnimatePresence mode="wait"` cross-fades between steps with `inputAreaVariants`
- **Social auth step:** shows name inputs + divider + Google/Apple buttons below
- OAuth flow: `signInWithPopup` → populates `name`, `email`, `firebase_uid`, `social_auth_provider` in store → calls `nextQuestion` (skipping email step)

### Header.tsx
- Blue (`#424bac`) linear progress bar: `transition-all duration-500 ease-in-out`
- Progress minimum 15% after welcome screen, never decreases
- Only shown on `/onboarding` pathname (not on product pages)

### SocialProofToast.tsx
- Two trigger points: `'first'` (treatment interstitial) and `'ontrack'` (eligibility interstitial)
- Each fires only once per session (sessionStorage key: `ld_spt_first`, `ld_spt_ontrack`)
- Shows after 2500ms delay, auto-hides after 5000ms
- Position: `fixed bottom-[94px] left-4 z-50` (above sticky footer)
- Content: dynamic text ("X people completed assessment" or "X physicians online now")
- Physician count is time-of-day aware (Eastern time): 15–30 daytime, 5–15 evening, 0–5 overnight
- Styling: frosted glass `bg rgba(255,255,255,0.92)`, `backdropFilter: blur(12px)`, blue shadow
- Animation: `initial={{ opacity: 0, y: 24, scale: 0.96 }}`

---

## 7. Testimonial System

### buildTestimonial.ts
```typescript
type QuoteSelector = {
  protocol?: 'GLP-1' | 'Rapamycin' | 'Metformin' | 'Microdose GLP-1';
  tone?: 'results' | 'physician' | 'metabolic' | 'longevity';
};

buildTestimonial({
  answers,          // used to match gender + ethnicity
  quoteSelector,
  excludePersonaIds,
  requireDifferentEthnicity,  // for 2nd testimonial
}) => { personaId, testimonial: ResolvedTestimonial }
```

### Persona Shape (personas.ts)
```typescript
{ id, name, state, age, gender, ethnicity, avatarImage }
```

### Quote Shape (quotes.ts)
```typescript
{ protocol?, tone, text }
```

### Selection Algorithm
1. Filter quotes by `protocol` (if specified) and `tone`
2. Pick a random quote
3. Filter personas by gender (from `answers.gender`)
4. Pick a persona not in `excludePersonaIds`
5. If `requireDifferentEthnicity`, pick persona with different ethnicity from result1

### TestimonialCard UI
```
┌─────────────────────────────────────┐
│ [avatar 48px] Name • State ★★★★★   │
│              42 years old           │
│ "Quote text in Almarai font..."     │
└─────────────────────────────────────┘
```
- `rounded-2xl`, blue-tinted border + shadow
- Name: `#424bac` Inter
- Stars: `text-amber-400 text-[1.5rem]`
- Quote: Almarai font, `text-gray-500 text-[15px]`

---

## 8. Visual Design System

### Typography
| Role | Font | Weight | Size |
|---|---|---|---|
| Headings | Almarai (var(--font-almarai)) | 300 (font-light) | 28–46px |
| Body/labels | Inter (var(--font-inter)) | 400–600 | 13–15px |
| Badges/emphasis | Syne (var(--font-syne)) | 600–700 | 10–12px |
| Italic highlights | Lora (var(--font-lora)) | 400 italic | same as surrounding |

All fonts from Google Fonts with `display: swap`.

### Color Tokens
| Purpose | Value |
|---|---|
| Primary blue (selected, links) | `#424bac` |
| CTA / back button | `linear-gradient(135deg, #e0453c 0%, #d7332a 50%, #a82a24 100%)` |
| Dark text | `#1a1a2e` |
| Muted text | `text-gray-500` |
| Borders (default) | `#e5e7eb` |
| Borders (selected) | `#424bac` |
| Success/guarantee | `rgba(74,147,99,...)` |
| Treatment: GLP-1 / Microdose | `#d38965` |
| Treatment: Rapamycin | `#ae5a5c` |
| Treatment: Metformin | `#7c88c7` |
| Treatment: default/teal | `#4a7c8a` |
| Checkmark color | `#4a9363` |

### Layout
- Max width: `max-w-[650px] mx-auto`
- Padding: `px-6 md:px-8`
- Full viewport height: `height: 100dvh` (dynamic viewport, iOS safe)
- Scrollable content: `overflow-y: auto; scrollbar-gutter: stable`
- Sticky footer: `sticky bottom-0 bg-white`
- Safe area: `paddingBottom: max(1.5rem, env(safe-area-inset-bottom))`

### Border Radius Convention
| Shape | Value |
|---|---|
| Pill (inputs, buttons) | `rounded-full` |
| Choice options | `rounded-xl` (12px) |
| Cards, testimonials | `rounded-2xl` (16px) |
| Badges | `rounded-full` |
| Checkbox icon | `rounded-sm` |
| Guarantee callout | `rounded-xl` |

### Framer Motion Patterns
```typescript
// Standard fade-up (all interstitial content)
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay },
  }),
};

// Question options (stagger children)
const containerAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
};
const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// FinalStepsPage cross-fade
const inputAreaVariants = {
  enter: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// Social proof toast
initial={{ opacity: 0, y: 24, scale: 0.96 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: 12, scale: 0.97 }}
transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
```

### Primary CTA Button (exact implementation)
```tsx
<button
  style={{
    fontFamily: 'var(--font-inter), sans-serif',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    fontSize: '0.875rem',
    backgroundImage: isDisabled ? undefined : [
      'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 30%)',
      'linear-gradient(135deg, #e0453c 0%, #d7332a 50%, #a82a24 100%)',
    ].join(', '),
    backgroundColor: isDisabled ? '#9ca3af' : undefined,
    boxShadow: isDisabled ? 'none' : '0 2px 8px rgba(215,51,42,0.25), 0 1px 3px rgba(0,0,0,0.1)',
  }}
  className="flex-1 text-white font-semibold py-[0.9375rem] px-8 rounded-full
             transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
             active:scale-[0.98]"
>
  {isLastQuestion ? 'Submit' : 'Continue'}
</button>
```

### Multi-choice Option Button (exact implementation)
```tsx
<button
  className={`px-4 py-3 border-2 rounded-xl text-left transition-all duration-200
    flex items-center justify-between w-full
    ${isSelected
      ? 'border-[#424bac] bg-[rgba(66,75,172,0.05)] -translate-y-0.5 shadow-[0_4px_12px_-2px_rgba(88,95,158,0.15)]'
      : 'border-[#e5e7eb] bg-white text-gray-700 hover:border-[#d1d5db] hover:-translate-y-px hover:shadow-md'
    }`}
  style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
>
  <span className="leading-tight">{option}</span>
  {isSelected && !singleSelect && !hideCheckmarks && showCheckmark && (
    <svg style={{ color: '#4a9363' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
    </svg>
  )}
</button>
```
Note: Checkmarks shown only for `listLayout: true` or `options.length <= 5`, and not when `hideCheckmarks: true`.

### Plan Includes Box (exact implementation)
```tsx
// Multi-radial gradient background
const planIncludesBackground = [
  'radial-gradient(ellipse at top right, rgba(158,168,192,0.45) 0%, transparent 50%)',
  'radial-gradient(ellipse at bottom right, rgba(193,214,235,0.5) 0%, transparent 55%)',
  'radial-gradient(ellipse at bottom left, rgba(244,219,227,0.5) 0%, transparent 55%)',
  'radial-gradient(ellipse at top left, rgba(198,205,220,0.45) 0%, transparent 50%)',
].join(', ');

// Label
<p className="text-xs font-semibold uppercase tracking-[0.1em] mb-3"
   style={{ color: '#1a1a2e', fontFamily: 'var(--font-inter)' }}>
  Your plan includes:
</p>
```

### "How it Works" Step Highlighting
- First step only gets highlighted border+background:
```tsx
style={i === 0 ? {
  border: '1.5px solid rgba(88,95,158,0.35)',
  borderRadius: '16px',
  padding: '10px 12px',
  background: 'rgba(88,95,158,0.04)',
} : undefined}
```

---

## 9. State Management — Redux Auth Slice

After successful registration, `dispatch(login({...}))` sets:
```typescript
{
  helToken: "",         // not used in new flow
  firebaseAuth: true,
  firebaseToken: string,
  user: {
    id: string,
    healthieUserId: string,
    firebaseUserId: string,
    email, firstName, lastName, phone, state,
    eligibility: "async" | "sync" | "exclude",
    role: "client" | "admin",
    createdAt, updatedAt,
  }
}
```
Redux persisted via `redux-persist` to localStorage + cookies.

---

## 10. Submission Flow — useOnboardingSubmit.ts

The complete 12-step flow on form submit:

```
1. Merge health_conditions_1 + health_conditions_2 → health_conditions[]
2. Normalize: name (title case), email (lowercase), phone → E.164
3. Calculate age from DOB
4. Calculate BMI from height + weight (imperial formula: lbs/in² × 703)
5. Build hero routing: eligibleSlugs (state + BMI) → heroCandidates → heroRedirectSlug
6. Eligibility checks:
   - age < 30 → reject: "age_under_30"
   - age > 75 → reject: "age_over_75"
   - health_conditions not 'None' → reject: "health_conditions"
   - mental_health not 'None' → reject: "mental_health"
7. Check email exists → POST /api/users/email-exist
8. If email exists:
   - Save via /api/onboarding/submit-existing
   - Send Firebase password reset email
   - Redirect to /login?reason=existing-email
9. If rejection reasons:
   - Save via /api/onboarding/save (criteriaMet: false)
   - Redirect to /criteria-not-met
10. Register new user → POST /api/auth/register
    - Social mode: firebase_uid provided, no password generated
    - Onboarding mode: server generates password, sends welcome email
    → Returns: { user, customToken }
11. Save onboarding record → POST /api/onboarding/save (criteriaMet: true)
12. Firebase auth:
    - Social: currentUser.getIdToken()
    - Manual: signInWithCustomToken(auth, customToken) → getIdToken()
13. dispatch(login({...})) → Redux auth state
14. Submit to EHR (Healthie or replacement) → POST /api/[ehr]/form-submission
15. Analytics:
    - syncMetaCookiesToUser(email)
    - pushEvent("onboarding_complete", {...}) with GA4 callback
    - sendMetaCapiBeacon({ event_name: "CompleteRegistration", ... })
16. Redirect to /products/${heroRedirectSlug} (or /products fallback)
```

---

## 11. Hero Product Routing — heroDecision.ts

### Logic (for peptide brand: replace product slugs)
```
computeHeroCandidates({ treatmentInterest, glp1Priority, specificHealthGoal, bmi })
→ ordered candidate slugs

getEligibleProductSlugs({ userState, bmi, hasBMI })
→ filtered slugs by state/BMI restrictions

pickHeroFromEligible(desired, eligible, allCandidates)
→ best match from eligible list
```

### Eligibility Rules (adapt for your products)
- GLP-1 / Semaglutide / Tirzepatide: BMI ≥ 25 required, no Louisiana
- Microdose GLP-1: BMI ≥ 20 required, no Louisiana
- Rapamycin: no Louisiana, BMI ≤ 30
- Metformin: no restrictions

---

## 12. MongoDB Schemas

### Onboarding Model
```javascript
{
  userId: String,
  firebaseUserId: String,
  email: String (required, indexed),
  name: String,
  phone: String,
  dob: String,
  height: { feet: Number, inches: Number },
  weight: Number,
  formData: Mixed,           // complete form answers
  criteriaMet: Boolean,
  treatmentInterest: [String],
  specificHealthGoal: [String],
  glp1Priority: String,
  bmi: { value, category, isValid },
  heroProductSlug: String,
  rejectionReasons: [String],
  rejectionDetails: Mixed,
  createdAt, updatedAt,
}
```

### User Model
```javascript
{
  firebaseUserId: String,
  healthieUserId: String,
  firstName: String,
  lastName: String,
  email: String (required, unique indexed),
  phone: String,
  state: String,
  tempPassword: String,      // server-generated, sent via email
  eligibility: 'sync' | 'async' | 'exclude',
  role: 'admin' | 'client',
  active: Boolean,
  unsubscribe: Boolean,
  fbp: String, fbc: String,  // Meta pixel cookies
  createdAt, updatedAt,
}
```

---

## 13. User Creation Saga Pattern

The registration uses a distributed transaction pattern with compensation (rollback on failure):

```
Steps (in order):
1. firebase_create — create Firebase user (server-side Admin SDK) — skipped for social auth
2. [ehr]_create     — create EHR patient record
3. mongodb_create  — insert User document
4. onboarding_link — update Onboarding record with user IDs
5. timeline_create — create timeline entry
6. email_send      — SendGrid welcome email (skipped for social auth users)

Compensation (reverse order on any failure):
← Delete Firebase user
← Deactivate EHR user (deletion not supported)
← Delete MongoDB user
← Unlink onboarding record
← Skip timeline (acceptable orphan)
← No email compensation
```

This ensures no partial user state in any system.

---

## 14. API Routes Reference

| Method | Path | Purpose |
|---|---|---|
| POST | /api/auth/register | Create user (3 modes: social, onboarding, register) |
| POST | /api/onboarding/save | Save onboarding record + compute hero |
| GET | /api/onboarding/save | Fetch by email/criteria |
| GET | /api/onboarding | Fetch by userId/firebaseUserId |
| POST | /api/onboarding/submit-existing | Handle existing user re-onboarding |
| GET | /api/users/email-exist | Check if email is registered |

---

## 15. Analytics Integration

### GA4 Events
- `onboarding_start` — on welcome screen pass
- `onboarding_step` — on each question/interstitial (uses `ga4StepNumber` field: 1, 2, 2.5, 3, 3.5...)
- `eligibility_excluded` — on rejection
- `onboarding_complete` — on successful registration

### Meta CAPI
```typescript
sendMetaCapiBeacon({
  event_name: 'CompleteRegistration',
  event_id: crypto.randomUUID(),
  email,
  event_source_url: `${origin}/onboarding`,
  fbp, fbc,  // from cookies
})
```

### Event Callback Pattern
```typescript
pushEvent("onboarding_complete", data, {
  eventCallback: redirect,  // fires after GA4 confirms
  eventTimeout: 1200,       // fallback if GA4 fails
});
setTimeout(redirect, 1500); // hard fallback
```

---

## 16. Authentication Architecture

### Firebase Client (lib/firebase.ts)
- Initializes with `NEXT_PUBLIC_FIREBASE_*` env vars
- Exports: `auth`, `googleProvider`, `appleProvider`
- Optional Analytics via `NEXT_PUBLIC_ENABLE_FIREBASE_ANALYTICS`

### Firebase Admin (lib/auth.ts)
- Server-side token verification: `verifyToken(token)`
- Route guards: `requireAuth()`, `requireAdminAuth()`
- API middleware: `verifyApiAuth(req)` — checks Bearer header

### Auth Middleware (middleware.ts)
- Rate limiting: auth routes 10 req/min, others 60 req/min (Upstash Redis)
- Protected API routes: require valid JWT
- Admin/client page routes: role-based redirect enforcement

---

## 17. Environment Variables Required

```bash
# Core
NEXT_PUBLIC_ENV=staging|production
NEXT_PUBLIC_ONBOARDING_VERSION=2025-12

# MongoDB
MONGODB_URI=
MONGODB_DB_NAME=

# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# SendGrid
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=

# Rate Limiting
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# EHR (replace Healthie with your system)
NEXT_PUBLIC_EHR_FORM_ID=
NEXT_PUBLIC_EHR_ENDPOINT=
NEXT_PUBLIC_PROVIDER_ID=

# Analytics
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

---

## 18. Key UX Principles (What Makes This Form Engaging)

1. **Endowed progress:** Progress bar starts at 15% (never zero), creating instant momentum
2. **Conditional question skipping:** Users never see irrelevant questions — the form adapts in real time
3. **Interstitial pacing:** After every 2–3 input questions, there's a statement page that educates, reassures, or builds excitement. This breaks up the "quiz fatigue" cycle.
4. **Personalization signals:** Treatment color changes throughout the form based on the user's selection; testimonials match gender + ethnicity; eligibility interstitials name the user's specific protocol ("Your profile is a strong match for the GLP-1 protocol")
5. **Progressive social proof:** Two toast notifications fire at strategic moments (after treatment education, after eligibility pass) showing real-time signals
6. **The confidence boost:** Before account creation, a gender-appropriate hero image with "You're one step from starting your journey" creates a moment of arrival
7. **Animated text:** Every heading fades in word-by-word, giving the user time to read and creating a sense of the form "speaking" to them
8. **Fast social auth:** Google/Apple sign-in skips name/email collection entirely, reducing the final account creation to just a phone number
9. **Never-backward progress bar:** `maxProgress` ensures the progress bar never drops even when going back, preserving the sense of accomplishment
10. **Qualification framing:** The form is framed as "qualification for treatment" (not a signup), which increases perceived value and reduces abandonment
11. **Money-back guarantee** appears prominently in the process interstitial to reduce purchase anxiety
12. **Clinical credibility:** Every treatment interstitial leads with published trial data and specific statistics
13. **LocalStorage persistence:** If user navigates away or OAuth redirect happens, quiz state is fully recovered

---

## 19. Loading / Submission State

When the form is submitted, the page shows a full-screen loading state using a preloaded WebM animation:

```tsx
// Preloaded in page.tsx useEffect:
const link = document.createElement('link');
link.rel = 'preload';
link.as = 'video';
link.href = '/lottie-loader-white.webm';

// Shown during submission:
<video
  src="/lottie-loader-white.webm"
  autoPlay muted playsInline loop
  className="w-full rounded-xl"
/>
```

Two variants exist: `lottie-loader-white.webm` (white bg) and `lottie-loader-transparent.webm`.

---

## 20. Replication Checklist

For a new peptide brand, these are the elements to replace/adapt:

- [ ] `questions.ts` — replace treatment names, health goals, condition lists, interstitial content
- [ ] Product images in `/public/images/package/`
- [ ] Step images in `/public/images/steps/`
- [ ] Testimonial personas and quotes (personas.ts, quotes.ts)
- [ ] Brand colors (replace `#424bac` blue, `#e0453c` red gradient, treatment colors)
- [ ] Fonts (Almarai + Inter + Lora + Syne is the current stack)
- [ ] `heroDecision.ts` — replace product slugs and eligibility rules
- [ ] MongoDB schema fields for your product-specific data
- [ ] EHR integration — replace Healthie with your system
- [ ] Email templates — welcome email, rejection email
- [ ] Privacy policy and terms of use links in consent steps
- [ ] Age gate range (currently 30–75)
- [ ] State eligibility restrictions
- [ ] GA4 event names and Meta pixel ID

Elements that stay **identical**:
- All animation patterns and timing
- Zustand store architecture
- Redux auth slice
- Firebase auth integration (Google + Apple)
- User creation saga pattern
- API route structure
- Progress bar logic
- Multi-choice exclusive option logic
- FinalStepsPage social auth + cross-fade pattern
- SocialProofToast timing and position
- All layout/spacing/border-radius conventions
- CTA button exact styles
- Plan includes box gradient
- "How it works" step highlight pattern
