// Peptide Station — Quiz Question Config
// All 8 questions per docs/quiz/QUESTION_FRAMEWORK.md

export type AnswerOption = {
  icon?: string;
  label: string;
  subtext?: string;
};

export type QuestionType = {
  id: string;
  type: 'single' | 'multi' | 'scale';
  text: string;
  subtext?: string;
  options: AnswerOption[];
  skipLabel?: string; // only on Q5
  progress: number; // display "X of 8"
};

export const QUESTIONS: QuestionType[] = [
  {
    id: 'q1_goal',
    type: 'single',
    text: "What's your #1 health goal right now?",
    progress: 1,
    options: [
      { icon: '🩹', label: 'Heal an injury or recover from surgery', subtext: 'Tendons, joints, muscles, post-op' },
      { icon: '⏳', label: 'Feel younger, slow down ageing', subtext: 'Energy, vitality, biological age' },
      { icon: '✨', label: 'Better skin, hair and appearance', subtext: 'Collagen, tone, thickness' },
      { icon: '🔥', label: 'Lose fat / improve body composition', subtext: 'Body fat, metabolic health' },
      { icon: '💪', label: 'Build muscle / improve performance', subtext: 'Strength, lean mass, athleticism' },
      { icon: '⚡', label: 'More energy and better sleep', subtext: 'Beat fatigue, improve deep sleep' },
      { icon: '🫃', label: 'Fix gut or digestive issues', subtext: 'IBS, bloating, gut repair' },
      { icon: '🌶️', label: 'Boost libido / sexual wellness', subtext: 'Drive, performance, desire' },
    ],
  },
  {
    id: 'q2_barrier',
    type: 'single',
    text: "What's the #1 thing holding you back right now?",
    progress: 2,
    options: [
      { icon: '🦴', label: "A nagging injury that won't fully heal", subtext: 'Something that keeps coming back' },
      { icon: '😴', label: 'Low energy, feeling older than I should', subtext: 'Running on empty most days' },
      { icon: '🪞', label: 'My skin and hair look older than I feel', subtext: 'Losing what I used to have' },
      { icon: '⚖️', label: "Stubborn fat I can't shift", subtext: 'Despite diet and exercise' },
      { icon: '📉', label: 'Difficulty building or keeping muscle', subtext: 'Hard to make or maintain gains' },
      { icon: '🌙', label: 'Poor sleep ruining my recovery', subtext: "Can't get into deep, restorative sleep" },
      { icon: '😶', label: 'Low drive or loss of motivation', subtext: 'Less interest in things that used to excite me' },
      { icon: '🫃', label: 'Gut problems, bloating or discomfort', subtext: 'Something is off and it affects everything' },
    ],
  },
  {
    id: 'q3_recovery',
    type: 'scale',
    text: 'How would you describe your recovery from exercise or physical activity?',
    progress: 3,
    options: [
      { label: 'Very fast — I bounce back quickly', subtext: 'Back to full capacity within 24 hours' },
      { label: 'Normal — takes a day or two', subtext: 'Standard recovery, nothing remarkable' },
      { label: 'Slower than it used to be', subtext: "I've noticed a clear change in recent years" },
      { label: 'Very slow — takes several days', subtext: 'Training is limited by how long recovery takes' },
      { label: "I barely exercise but still feel run-down", subtext: 'Fatigue without obvious cause' },
    ],
  },
  {
    id: 'q4_energy',
    type: 'scale',
    text: 'How would you describe your energy levels day-to-day?',
    progress: 4,
    options: [
      { label: 'High — consistently good all day', subtext: 'Rarely tired, focus is strong' },
      { label: 'Good most days, occasional dips', subtext: 'Generally fine but not optimal' },
      { label: 'Low — I rely on caffeine to function', subtext: 'Would struggle without stimulants' },
      { label: 'Very low — affecting quality of life', subtext: 'Fatigue is one of my main concerns' },
    ],
  },
  {
    id: 'q5_issues',
    type: 'multi',
    text: 'Do you have any of these ongoing issues?',
    subtext: 'Select all that apply — even if they seem minor.',
    progress: 5,
    skipLabel: 'None of these — skip →',
    options: [
      { icon: '🦴', label: 'Joint pain or old injuries' },
      { icon: '🫃', label: 'Gut issues (IBS, bloating, reflux)' },
      { icon: '🪞', label: 'Skin concerns (fine lines, loss of firmness)' },
      { icon: '💇', label: 'Hair thinning' },
      { icon: '🌙', label: 'Sleep problems' },
      { icon: '🧠', label: 'Brain fog or poor concentration' },
      { icon: '⚖️', label: 'Stubborn weight or slow metabolism' },
      { icon: '🌶️', label: 'Low libido or sexual function concerns' },
      { icon: '🔥', label: 'Feeling of chronic inflammation or aching' },
    ],
  },
  {
    id: 'q6_age',
    type: 'single',
    text: "What's your age range?",
    progress: 6,
    options: [
      { label: 'Under 30' },
      { label: '30–39' },
      { label: '40–49' },
      { label: '50–59' },
      { label: '60+' },
    ],
  },
  {
    id: 'q7_lifestyle',
    type: 'single',
    text: 'How would you describe your typical week?',
    progress: 7,
    options: [
      { icon: '🏆', label: 'Elite or competitive athlete', subtext: 'Train daily, compete at a high level' },
      { icon: '🏋️', label: 'Regular gym or active training', subtext: '3–5 sessions per week, structured' },
      { icon: '🚴', label: 'Active lifestyle', subtext: 'Sport, outdoors, movement — not formal training' },
      { icon: '💼', label: 'Desk job with some exercise', subtext: 'Mostly sedentary, gym 1–2x per week' },
      { icon: '😮‍💨', label: 'High stress, mostly sedentary', subtext: 'Work-heavy, low movement, high pressure' },
    ],
  },
  {
    id: 'q8_vision',
    type: 'single',
    text: 'What does success look like for you in 3 months?',
    progress: 8,
    options: [
      { icon: '🩹', label: 'Fully healed from injury or surgery' },
      { icon: '⏳', label: 'Looking and feeling 10 years younger' },
      { icon: '🔥', label: 'Noticeably leaner and more defined' },
      { icon: '💪', label: 'More muscle, stronger physique' },
      { icon: '⚡', label: 'More energy and mental sharpness' },
      { icon: '✨', label: 'Better skin and hair' },
      { icon: '🌶️', label: 'Improved drive and vitality' },
    ],
  },
];

export type Answers = Record<string, string | string[]>;
