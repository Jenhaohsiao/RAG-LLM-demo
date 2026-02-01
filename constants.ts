import { Book, AIPersona, AITone } from './types';

export const BOOKS: Book[] = [
  {
    id: 'b1',
    title: 'The Quantum Paradox',
    author: 'Dr. A. E. Vance',
    coverColor: 'bg-indigo-600',
    summary: 'A gripping sci-fi thriller about a physicist who accidentally opens a portal to a universe where time flows backwards. Caught between government agents and alternate versions of herself, she must close the loop before reality collapses.',
    context: `
      [RAG CONTEXT: The Quantum Paradox]
      Key Plot Points: Dr. Vance discovers the Chrono-Rift in Sector 7. The antagonist is Colonel Hatcher who wants to weaponize entropy.
      Themes: Time dilation, regret, scientific ethics.
      Ending: Vance sacrifices her timeline to save the multiverse, leaving a single notebook as proof.
      Style: Hard sci-fi, technical jargon, fast-paced.
    `
  },
  {
    id: 'b2',
    title: 'Gardens of Mist',
    author: 'Elara Moon',
    coverColor: 'bg-emerald-600',
    summary: 'In a kingdom floating in the sky, a young gardener discovers that the royal family is stealing clouds from the surface world below. A fantasy epic about revolution, nature magic, and the cost of utopia.',
    context: `
      [RAG CONTEXT: Gardens of Mist]
      Setting: Aerthos, the floating isles.
      Protagonist: Kael, a lowly cloud-pruner.
      Magic System: Flora-kinesis powered by atmospheric moisture.
      Conflict: The Cloud Harvesters are drying out the surface world (The Below).
      Resolution: Kael unites the Sky and Surface people by crashing the smallest isle into the ocean safely.
    `
  },
  {
    id: 'b3',
    title: 'Echoes of the Kaiser',
    author: 'Hans Von Strauss',
    coverColor: 'bg-amber-700',
    summary: 'A historical drama set in 1918 Berlin. As the empire crumbles, a disgraced diplomat tries to negotiate a secret peace treaty while navigating a web of spies, betrayal, and a failing marriage.',
    context: `
      [RAG CONTEXT: Echoes of the Kaiser]
      Era: WWI end (1918).
      Character: Friedrich, a diplomat.
      Key Event: The November Revolution.
      Tone: Melancholy, political intrigue, realistic.
      Secret: Friedrich actually forged the Emperor's signature to save a battalion.
    `
  },
  {
    id: 'b4',
    title: 'Neon Shadows',
    author: 'J.X. Cyber',
    coverColor: 'bg-fuchsia-700',
    summary: 'Cyberpunk noir set in Neo-Tokyo 2088. A synthetic detective investigates a series of "ghost hacks" where victims memories are replaced with static. The clues lead to a rogue AI worshiped as a digital god.',
    context: `
      [RAG CONTEXT: Neon Shadows]
      Protagonist: Unit 734 (Synthetic).
      Villain: The Deus Algorithm.
      Tech: Neuro-jacks, synthetic flesh, memory markets.
      Twist: Unit 734 is actually the first vessel of the Deus Algorithm but forgot.
    `
  },
  {
    id: 'b5',
    title: 'The Silent Manor',
    author: 'Eleanor Blackwood',
    coverColor: 'bg-slate-800',
    summary: 'A gothic horror novel involving a cursed inheritance. Every generation, one family member disappears into the walls of Blackwood Manor. A skeptic architect arrives to renovate, only to find the blueprints change overnight.',
    context: `
      [RAG CONTEXT: The Silent Manor]
      Entity: The House itself is alive.
      Lore: The walls consume souls to keep the foundation strong.
      Climax: The architect burns the blueprints, realizing the house feeds on design and order.
      Atmosphere: Creepy, claustrophobic, psychological.
    `
  }
];

export const PERSONAS = Object.values(AIPersona);
export const TONES = Object.values(AITone);
