import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Tier, status, links, screenshots and copy all live in data. Pages render from these;
// nothing about a project is hardcoded in a composition.
// French copy lives beside the English in each project file, under `fr`. Anything missing falls back to English.
const frCopy = z.object({
  origin: z.string().optional(),
  summary: z.string().optional(), problem: z.string().optional(), thinking: z.string().optional(),
  decisions: z.array(z.object({ title: z.string(), text: z.string() })).optional(),
  facts: z.object({ who: z.string(), when: z.string(), why: z.string() }).optional(),
  tradeoff: z.object({ pick: z.string(), over: z.string() }).optional(),
  built: z.string().optional(), flow: z.array(z.string()).optional(), flowNotes: z.array(z.string()).optional(),
  solution: z.string().optional(), result: z.string().optional(),
  build: z.array(z.string()).optional(), limits: z.array(z.string()).optional(), unfinished: z.array(z.string()).optional(),
  wake: z.string().optional(),
  shots: z.array(z.object({ alt: z.string(), caption: z.string() })).optional(),
  video: z.object({ alt: z.string(), caption: z.string() }).optional(),
});
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,json}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum(['ai-automation', 'web-products']),
      tier: z.enum(['featured', 'supporting', 'experiment']),
      status: z.enum(['live', 'dev', 'exp', 'desktop', 'archived']),
      order: z.number().default(100),
      summary: z.string(),
      problem: z.string().optional(),
      thinking: z.string().optional(),
      decisions: z.array(z.object({ title: z.string(), text: z.string() })).optional(),
      // Who has the problem, when it bites, why it matters.
      facts: z.object({ who: z.string(), when: z.string(), why: z.string() }).optional(),
      // The actual trade-off: what I picked, and what I picked it over.
      tradeoff: z.object({ pick: z.string(), over: z.string() }).optional(),
      // Which decisions open expanded (indexes), and the single one shown on the homepage.
      keyDecisions: z.array(z.number()).optional(),
      homeDecision: z.number().optional(),
      // One concrete line about what was built, for the homepage and the Solution chapter.
      built: z.string().optional(),
      // What moves through each flow step, parallel to `flow`.
      flowNotes: z.array(z.string()).optional(),
      // What kind of proof the result is.
      evidence: z.enum(['demo', 'test', 'measured', 'behaviour']).optional(),
      solution: z.string().optional(),
      result: z.string().optional(),
      build: z.array(z.string()).optional(),
      // Real limits of the design vs. things not built yet.
      limits: z.array(z.string()).optional(),
      unfinished: z.array(z.string()).optional(),
      technologies: z.array(z.string()).default([]),
      github: z.string().url().optional(),
      live: z.string().url().optional(),
      // Shown beside a live link when the host sleeps (free-tier hosting).
      wake: z.string().optional(),
      cat: z.enum(['phones']).optional(),
      flow: z.array(z.string()).optional(),
      composition: z.string().optional(),
      // Real screenshots, in the order they should be read.
      shots: z.array(z.object({ src: image(), alt: z.string(), caption: z.string(), role: z.enum(['strongest', 'workflow', 'edge', 'result', 'context']).optional() })).default([]),
      leadShot: z.number().default(0),
      // Looping demo in public/media/<id>/demo.mp4 (+ demo.webp poster).
      video: z.object({ alt: z.string(), caption: z.string(), w: z.number(), h: z.number() }).optional(),
      origin: z.string().optional(),
      fr: frCopy.optional(),
    }),
});
export const collections = { projects };
