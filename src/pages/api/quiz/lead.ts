// Placeholder API route — Peptide Station Quiz Lead Capture
// Current: logs lead data to console and returns 200.
// TODO: Replace with real backend integration:
//   - Write lead to MongoDB via Cloud Function
//   - Trigger n8n webhook for email automation
//   - Store Firebase auth uid if signed in
//
// Body shape: { email, firstName?, answers, scores, topPeptide }

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, firstName, answers, scores, topPeptide } = req.body ?? {};

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'email is required' });
  }

  // Log for now — replace with real persistence
  console.log('[quiz/lead]', {
    email,
    firstName: firstName ?? null,
    topPeptide: topPeptide ?? null,
    scoreKeys: scores ? Object.keys(scores) : [],
    answerCount: answers ? Object.keys(answers).length : 0,
    timestamp: new Date().toISOString(),
  });

  return res.status(200).json({ ok: true });
}
