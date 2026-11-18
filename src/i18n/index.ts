// Tiny i18n: English at the root, French under /fr/. No library, just strings and two path helpers.
export type Lang = 'en' | 'fr';
export const langOf = (astro: { currentLocale?: string }): Lang => (astro.currentLocale === 'fr' ? 'fr' : 'en');
export const baseUrl = () => import.meta.env.BASE_URL.replace(/\/$/, '');
/** Link to a page in a language: href('fr', '/work/meetric') */
export const href = (l: Lang, path = '/') => `${baseUrl()}${l === 'fr' ? '/fr' : ''}${path}`;
/** The same page in the other language, from the current pathname. */
export function switchHref(pathname: string, to: Lang) {
  const b = baseUrl();
  let p = pathname.startsWith(b) ? pathname.slice(b.length) : pathname;
  p = p.replace(/^\/fr(?=\/|$)/, '');
  if (!p.startsWith('/')) p = '/' + p;
  return `${b}${to === 'fr' ? '/fr' : ''}${p}`;
}

/** Overlay a project's French copy on the English data. Arrays are replaced; shots and video merge by position. */
export function localizeProject<T extends Record<string, any>>(p: T, lang: Lang): T {
  if (lang === 'en' || !p.fr) return p;
  const { fr, ...rest } = p as any;
  const { shots, video, ...text } = fr;
  const out: any = { ...rest, ...text };
  if (shots) out.shots = (p as any).shots.map((s: any, i: number) => ({ ...s, ...(shots[i] ?? {}) }));
  if (video && (p as any).video) out.video = { ...(p as any).video, ...video };
  return out;
}

const en = {
  skip: 'Skip to content',
  nav: { about: 'about', work: 'work', experiments: 'experiments', contact: 'contact', primary: 'Primary' },
  theme: { aria: 'Switch colour theme', dark: 'dark', light: 'light' },
  switchTo: { label: 'Français', aria: 'Lire ce site en français', code: 'FR' },
  hero: {
    h1a: 'I like taking problems apart, understanding how they work, and ', h1hl: 'building my way toward a solution.',
    role: 'Creative Builder',
    curveAria: 'A curve with four points: noticed, taken apart, understood, built',
    points: ['noticed', 'taken apart', 'understood', 'built'],
    moods: ['hmm?', 'inspect!', 'aha!', 'told ya.'],
    reaction: 'Show cat reaction: ',
    go: 'the work',
  },
  about: {
    h: 'About',
    lead: 'I love turning problems into systems, one brick at a time.',
    p1: 'It usually starts with something that bothers me: a downloader I don’t trust, an answer a chatbot should or shouldn’t give, a boring task that begs to be automated, a journal that never fit the way I handle my own inputs, from tasks to habits to finances.',
    p2a: 'So I plan it, work out the logic, and build the solution piece by piece. Logic and mathematics are part of how I think, and a creative mind keeps them playful. I love planning, and I love how ', p2hl: 'unstoppable', p2b: ' I feel once it starts to work.',
  },
  sketch: {
    alt: 'Four hand-drawn stages of a cat building a pyramid from blocks marked with mathematical symbols. The cat finishes proudly on top and says, ‘yayy, told you I’m unspobbable!’',
    steps: [
      '1 / 4 · Hmm… every good idea needs a foundation.',
      '2 / 4 · Almost… one clever brick at a time.',
      '3 / 4 · One more… the pyramid is taking shape.',
      '4 / 4 · Astro did it. Yayy, told you I’m unspobbable!',
    ],
    cap: 'A little reminder: build it one brick at a time. Even the maths ones.',
    add: 'add a brick', again: 'build it again',
  },
  work: { h: 'Work', cats: { 'ai-automation': 'AI AUTOMATION', 'web-products': 'WEB + PRODUCTS' } as Record<string, string>, experiments: 'Experiments' },
  spread: { problem: 'The problem', built: 'What I built', decision: 'One decision' },
  links: { story: 'Read the story', live: 'Try it live', github: 'Source on GitHub' },
  tech: { builtWith: 'Built with' },
  status: { live: 'LIVE', dev: 'IN DEVELOPMENT', exp: 'EXPERIMENT', desktop: 'DESKTOP APP', archived: 'ARCHIVED' } as Record<string, string>,
  tag: { showLink: 'live. Show link', tryIt: 'Try it', tryAria: 'live' },
  catDance: 'Make the cat dance',
  video: { play: 'play', pause: 'pause' },
  tools: { h: 'Tools I build with', used: 'used in my projects', learned: 'learned in courses' },
  certs: { h: 'Certifications', inProgress: 'IN PROGRESS' },
  contact: { h: 'Contact' },
  notice: {
    waking: (s: number | string) => `Waking the server in the background… ${s}s`,
    wakingSub: 'Usually 30–60s. Open it whenever you like; until it is up the page may show a loading screen.',
    wakingLive: 'Waking the server. This usually takes 30 to 60 seconds.',
    ready: 'It should be awake by now. Go on, open it.',
    readySub: 'That is an estimate, not a health check. If the page still spins, give it a few more seconds.',
    readyLive: 'The server should be awake now.',
  },
  case: {
    back: 'back to work', chaptersAria: 'Chapters of this story',
    cats: { 'ai-automation': '01 / AI AUTOMATION', 'web-products': '02 / WEB + PRODUCTS' } as Record<string, string>,
    strongest: 'The strongest screen',
    roles: { strongest: 'The strongest screen', workflow: 'The workflow', edge: 'The edge case', result: 'The result', context: 'Context' } as Record<string, string>,
    evidence: { demo: 'Recorded demo', test: 'Tested', measured: 'Measured', behaviour: 'Shown in the screenshots' } as Record<string, string>,
    ch: { problem: 'The problem', thinking: 'The thinking', decisions: 'Decisions along the way', solution: 'The solution', result: 'The result', build: 'Under the hood', proof: 'The proof', limits: 'Honest limits' } as Record<string, string>,
    proofH: 'The proof, as it actually looks',
    bridge: {
      thinking: 'so what had to be true?', decisions: 'which came down to a few real choices', solution: 'and the finished thing behaves like this',
      result: 'does it hold up?', build: 'for the curious: under the hood', proof: 'and here it is, for real', limits: 'and what it does not do (yet)',
    } as Record<string, string>,
    origin: 'How it started', who: 'Who', when: 'When', why: 'Why it matters',
    chose: 'I chose', over: 'over', tradeoffAria: (a: string, b: string) => `Trade-off: chose ${a} over ${b}`,
    built: 'What I built', moves: 'What moves through it',
    moreDec: (n: number) => `${n} more ${n === 1 ? 'decision' : 'decisions'}`,
    deep: 'Architecture and technology, for readers who want to go deeper',
    real: 'Real limits', realSub: 'How it is designed to behave, today.', todo: 'Not built yet', todoSub: 'Unfinished, and on the list.',
    flowAria: (t: string) => `Data flow for ${t}`,
  },
  scrollGroup: 'Diagram, scrollable',
  shot: { open: 'Open full size: ', then: ', then ' },
  e404: { h: 'We seem to have lost this point.', home: 'GO HOME' },
};

const fr: typeof en = {
  skip: 'Aller au contenu',
  nav: { about: 'à propos', work: 'projets', experiments: 'expériences', contact: 'contact', primary: 'Principale' },
  theme: { aria: 'Changer le thème de couleur', dark: 'sombre', light: 'clair' },
  switchTo: { label: 'English', aria: 'Read this site in English', code: 'EN' },
  hero: {
    h1a: 'J’aime démonter les problèmes, comprendre comment ils fonctionnent et ', h1hl: 'construire mon chemin vers une solution.',
    role: 'Creative Builder',
    curveAria: 'Une courbe avec quatre points : remarqué, démonté, compris, construit',
    points: ['remarqué', 'démonté', 'compris', 'construit'],
    moods: ['hmm ?', 'j’inspecte !', 'aha !', 'je te l’avais dit.'],
    reaction: 'Voir la réaction du chat : ',
    go: 'les projets',
  },
  about: {
    h: 'À propos',
    lead: 'J’aime transformer les problèmes en systèmes, une brique à la fois.',
    p1: 'Tout part généralement de quelque chose qui me dérange : un téléchargeur auquel je ne fais pas confiance, une réponse qu’un chatbot devrait (ou ne devrait pas) donner, une tâche ennuyeuse qui ne demande qu’à être automatisée, un journal qui n’a jamais collé à ma façon de traiter ce que je lui confie, des tâches aux habitudes jusqu’aux finances.',
    p2a: 'Alors je planifie, je réfléchis à la logique, et je construis la solution pièce par pièce. La logique et les mathématiques font partie de ma façon de penser, et un esprit créatif les garde ludiques. J’adore planifier, et j’adore me sentir ', p2hl: 'inarrêtable', p2b: ' dès que ça se met à fonctionner.',
  },
  sketch: {
    alt: 'Quatre étapes dessinées à la main : un chat construit une pyramide avec des blocs marqués de symboles mathématiques. Il termine fièrement au sommet et dit, en anglais dans le dessin : « yayy, told you I’m unspobbable! »',
    steps: [
      '1 / 4 · Hmm… toute bonne idée a besoin de fondations.',
      '2 / 4 · Presque… une brique astucieuse à la fois.',
      '3 / 4 · Encore une… la pyramide prend forme.',
      '4 / 4 · Astro l’a fait. Youpi, je vous l’avais dit : je suis inarrêtable !',
    ],
    cap: 'Un petit rappel : construis-le une brique à la fois. Même les briques de maths.',
    add: 'ajouter une brique', again: 'reconstruire',
  },
  work: { h: 'Projets', cats: { 'ai-automation': 'IA ET AUTOMATISATION', 'web-products': 'WEB ET PRODUITS' }, experiments: 'Expériences' },
  spread: { problem: 'Le problème', built: 'Ce que j’ai construit', decision: 'Une décision' },
  links: { story: 'Lire l’histoire', live: 'Essayer en ligne', github: 'Code source sur GitHub' },
  tech: { builtWith: 'Construit avec' },
  status: { live: 'EN LIGNE', dev: 'EN DÉVELOPPEMENT', exp: 'EXPÉRIENCE', desktop: 'APPLICATION DE BUREAU', archived: 'ARCHIVÉ' },
  tag: { showLink: 'en ligne. Afficher le lien', tryIt: 'Essayer', tryAria: 'en ligne' },
  catDance: 'Faire danser le chat',
  video: { play: 'lecture', pause: 'pause' },
  tools: { h: 'Les outils avec lesquels je construis', used: 'utilisés dans mes projets', learned: 'appris en formation' },
  certs: { h: 'Certifications', inProgress: 'EN COURS' },
  contact: { h: 'Contact' },
  notice: {
    waking: (s: number | string) => `Réveil du serveur en arrière-plan… ${s} s`,
    wakingSub: 'En général 30 à 60 s. Ouvrez-le quand vous voulez ; tant qu’il n’est pas réveillé, la page peut afficher un écran de chargement.',
    wakingLive: 'Réveil du serveur. Cela prend en général 30 à 60 secondes.',
    ready: 'Il devrait être réveillé maintenant. Allez, ouvrez-le.',
    readySub: 'C’est une estimation, pas une vérification. Si la page tourne encore, laissez-lui quelques secondes de plus.',
    readyLive: 'Le serveur devrait être réveillé maintenant.',
  },
  case: {
    back: 'retour aux projets', chaptersAria: 'Chapitres de cette histoire',
    cats: { 'ai-automation': '01 / IA ET AUTOMATISATION', 'web-products': '02 / WEB ET PRODUITS' },
    strongest: 'L’écran le plus parlant',
    roles: { strongest: 'L’écran le plus parlant', workflow: 'Le parcours', edge: 'Le cas limite', result: 'Le résultat', context: 'Contexte' },
    evidence: { demo: 'Démo enregistrée', test: 'Testé', measured: 'Mesuré', behaviour: 'Visible dans les captures' },
    ch: { problem: 'Le problème', thinking: 'La réflexion', decisions: 'Décisions en chemin', solution: 'La solution', result: 'Le résultat', build: 'Sous le capot', proof: 'La preuve', limits: 'Limites honnêtes' },
    proofH: 'La preuve, telle qu’elle est vraiment',
    bridge: {
      thinking: 'alors, qu’est-ce qui devait être vrai ?', decisions: 'ce qui s’est résumé à quelques vrais choix', solution: 'et le résultat final se comporte ainsi',
      result: 'est-ce que ça tient ?', build: 'pour les curieux : sous le capot', proof: 'et le voici, pour de vrai', limits: 'et ce qu’il ne fait pas (encore)',
    },
    origin: 'Comment c’est né', who: 'Qui', when: 'Quand', why: 'Pourquoi c’est important',
    chose: 'J’ai choisi', over: 'plutôt que', tradeoffAria: (a: string, b: string) => `Compromis : ${a} plutôt que ${b}`,
    built: 'Ce que j’ai construit', moves: 'Ce qui y circule',
    moreDec: (n: number) => `${n} ${n === 1 ? 'autre décision' : 'autres décisions'}`,
    deep: 'Architecture et technologies, pour celles et ceux qui veulent aller plus loin',
    real: 'Limites réelles', realSub: 'La façon dont il est conçu pour se comporter, aujourd’hui.', todo: 'Pas encore construit', todoSub: 'Inachevé, et sur la liste.',
    flowAria: (t: string) => `Flux de données de ${t}`,
  },
  scrollGroup: 'Schéma, défilable',
  shot: { open: 'Ouvrir en taille réelle : ', then: ', puis ' },
  e404: { h: 'On dirait qu’on a perdu ce point.', home: 'RETOUR À L’ACCUEIL' },
};

export const ui = { en, fr };
export const useT = (lang: Lang) => ui[lang];

/** French for the few data-file strings that are words rather than names. Anything not listed stays as written. */
export const frData = {
  groups: { 'Languages': 'Langages', 'Front end': 'Front end', 'Back end': 'Back end', 'Data': 'Données', 'AI': 'IA', 'Automation + services': 'Automatisation et services', 'Desktop + media': 'Bureau et média', 'Shipping': 'Mise en ligne' } as Record<string, string>,
  certs: {
    'Machine Learning Specialization': 'Spécialisation en Machine Learning',
    'Web development': 'Développement web',
    'Flutter & Dart': 'Flutter et Dart',
    'Mathematics for Machine Learning: calculus, algebra, probability & statistics': 'Mathématiques pour le Machine Learning : analyse, algèbre, probabilités et statistiques',
    'Mobile application development': 'Développement d’applications mobiles',
    'Website development with PHP and related technologies': 'Développement de sites web avec PHP et technologies associées',
    'Software development with WinDev': 'Développement logiciel avec WinDev',
  } as Record<string, string>,
  dates: { 'June 2025': 'juin 2025', 'March 2021': 'mars 2021', 'December 2020': 'décembre 2020' } as Record<string, string>,
};
export const tr = (lang: Lang, map: Record<string, string>, s: string) => (lang === 'fr' ? map[s] ?? s : s);
