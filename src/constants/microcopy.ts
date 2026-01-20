// Meme-native microcopy for SlopGPT
// Self-aware, chaotic, and terminally online

export const MICROCOPY = {
  // Loading States
  loading: {
    default: "summoning the slop...",
    thinking: "the blob is thinking...",
    processing: "consulting the chaos council...",
    generating: "cooking up some chaos...",
    uploading: "yeeting files to the void...",
  },

  // Error States
  error: {
    default: "oops. the blob broke something.",
    generic: "skill issue (ours, not yours)",
    network: "the internet is a lie. try again?",
    notFound: "404: this page touched grass",
    serverError: "our servers are having an existential crisis",
    tryAgain: "try again (the blob promises to behave)",
  },

  // Empty States
  empty: {
    default: "the void is empty. for now.",
    noResults: "nothing here yet. touch grass?",
    noImages: "no slop here. be the change.",
    noMessages: "say something. don't be shy.",
  },

  // Button Text
  buttons: {
    getStarted: "let's get weird",
    learnMore: "explain like I'm 5",
    contactUs: "yell into the void",
    submit: "send it",
    tryNow: "unleash the slop",
    viewMore: "show me the goods",
    goBack: "nope, go back",
    confirm: "yes, commit to the bit",
    cancel: "actually, never mind",
    retry: "one more time",
    close: "make it stop",
  },

  // Rotating CTA text (chaos mode)
  ctaRotations: [
    "let's get weird",
    "unleash the slop",
    "embrace the chaos",
    "make some questionable decisions",
    "start the unhinged journey",
    "vibe with the blob",
  ],

  // Success States
  success: {
    default: "we did it! (somehow)",
    submitted: "your chaos has been received",
    saved: "saved to the cloud (probably)",
    sent: "message yeeted successfully",
    copied: "copied! (you're welcome)",
  },

  // Form Labels
  forms: {
    name: "what do we call you?",
    email: "where do we spam you?",
    phone: "digits (optional)",
    message: "spill the tea",
    eventType: "what's the vibe?",
    date: "when's the chaos?",
    budget: "how much coin you got?",
  },

  // Placeholder Text
  placeholders: {
    name: "your name (or alias)",
    email: "your@email.com",
    phone: "+1 234 567 8900",
    message: "tell us about your event...",
    search: "search the slop archives...",
  },

  // Navigation
  nav: {
    home: "home (safety)",
    chat: "talk to the blob",
    about: "wtf is this?",
    pricing: "how much?",
    examples: "the hall of slop",
  },

  // Footer
  footer: {
    copyright: "© 2026 or whatever. all wrongs reserved.",
    privacy: "privacy policy (it's chill)",
    terms: "terms (don't sue us)",
    builtWith: "built with questionable decisions",
  },

  // Chat Interface
  chat: {
    welcomeMessage: "hey! i'm the slop blob. let's make your event absolutely unhinged.",
    inputPlaceholder: "type something... anything...",
    thinking: "blob is thinking...",
    typing: "blob is typing...",
    newChat: "start over (fresh chaos)",
    clearHistory: "burn it all",
  },

  // Tooltips & Hints
  hints: {
    scrollDown: "there's more chaos below ↓",
    clickMe: "psst... click me",
    hoverMe: "(hover for surprise)",
    secretFeature: "congrats, you found an easter egg",
    betaWarning: "this feature is held together with duct tape",
  },

  // Status Messages
  status: {
    online: "blob is awake",
    offline: "blob is sleeping (or dead)",
    maintenance: "we're fixing stuff. be back soon.",
    rateLimit: "woah there, slow down cowboy",
    unauthorized: "nice try, hacker",
  },

  // Call to Actions
  cta: {
    hero: "transform your event into chaos",
    heroSubtext: "ai-powered photo experiences that make people go 'wait, WHAT?'",
    finalCta: "ready to embrace the slop?",
    finalCtaSubtext: "let's make something weird together",
  },

  // Feature Descriptions
  features: {
    instant: {
      title: "instant chaos",
      description: "ai-generated scenes in seconds. no waiting, no excuses.",
    },
    custom: {
      title: "your vibe, amplified",
      description: "birthday? wedding? product launch? we make it weird (in a good way).",
    },
    unlimited: {
      title: "unlimited slop",
      description: "as many photos as your guests can handle. probably too many, tbh.",
    },
  },

  // Social Proof
  social: {
    reviewPlaceholder: '"this was unhinged. loved it."',
    statPrefix: "we've created",
    statSuffix: "pieces of certified slop",
  },
} as const;

// Type-safe access
export type MicrocopyKey = keyof typeof MICROCOPY;
export type LoadingKey = keyof typeof MICROCOPY.loading;
export type ErrorKey = keyof typeof MICROCOPY.error;
export type ButtonKey = keyof typeof MICROCOPY.buttons;

// Marquee prompt variations (more unhinged)
export const MARQUEE_PROMPTS = [
  "plan a DnD campaign in post-apocalyptic IKEA",
  "explain quantum physics like I'm a medieval peasant",
  "design AI photos for my kid's dinosaur party",
  "write a sincere apology to my houseplant",
  "help me plan a chaos goblin birthday bash",
  "generate 90s nostalgia party themes",
  "create a resignation letter that's professional but satisfying",
  "what to cook with just eggs and shame",
  "medieval tech support explaining WiFi",
  "help me brainstorm a mystery box cooking challenge",
  // NEW UNHINGED ADDITIONS
  "rate my minecraft base like Gordon Ramsay",
  "explain my job to my cat",
  "write a strongly worded letter to the sun",
  "draft a LinkedIn post but make it unhinged",
  "roast my spotify wrapped like a disappointed parent",
  "write a breakup text for my gym membership",
  "explain NFTs to my grandma using only soup metaphors",
  "create a workout routine for my emotional baggage",
  "write a passive-aggressive note to my neighbor's leaf blower",
  "plan a wedding for two houseplants",
]

// Helper function for random variations
export function getRandomVariation<T>(variations: T[]): T {
  return variations[Math.floor(Math.random() * variations.length)];
}

// Helper function for random rotations (chaotic energy)
// Returns a random rotation value for inline styles
export function getRandomRotation(intensity: 'subtle' | 'medium' | 'wild' = 'subtle'): string {
  const ranges = {
    subtle: [-1.5, 1.5],   // -1.5deg to 1.5deg
    medium: [-3, 3],       // -3deg to 3deg
    wild: [-5, 5],         // -5deg to 5deg
  };
  const [min, max] = ranges[intensity];
  const rotation = Math.random() * (max - min) + min;
  return `rotate(${rotation}deg)`;
}

// Loading state variations (for variety)
export const LOADING_VARIATIONS = [
  MICROCOPY.loading.default,
  MICROCOPY.loading.thinking,
  MICROCOPY.loading.processing,
  MICROCOPY.loading.generating,
];

// Error state variations
export const ERROR_VARIATIONS = [
  MICROCOPY.error.default,
  MICROCOPY.error.generic,
];
