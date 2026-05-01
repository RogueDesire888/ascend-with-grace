import {
  Flame,
  Sparkles,
  Wind,
  Leaf,
  Sprout,
  Waves,
  HeartHandshake,
  MoonStar,
  SunMedium,
  Users,
  Crown,
  type LucideIcon,
} from "lucide-react";

// ─── Ranks ──────────────────────────────────────────────────────────────────
export type Rank = {
  id: string;
  name: string;
  xpRequired: number;
  blurb: string;
  Icon: LucideIcon;
};

export const ranks: Rank[] = [
  { id: "ember", name: "Ember", xpRequired: 0, blurb: "A first warmth — you've arrived.", Icon: Sparkles },
  { id: "spark", name: "Spark", xpRequired: 50, blurb: "You light small fires for others.", Icon: Sparkles },
  { id: "flame", name: "Flame", xpRequired: 150, blurb: "Steady, visible, generous.", Icon: Flame },
  { id: "beacon", name: "Beacon", xpRequired: 350, blurb: "Newcomers steer by your replies.", Icon: SunMedium },
  { id: "lantern", name: "Lantern", xpRequired: 700, blurb: "You carry light into dim corners.", Icon: MoonStar },
  { id: "hearth", name: "Hearth", xpRequired: 1200, blurb: "A gathering place. People stay near you.", Icon: HeartHandshake },
  { id: "keeper", name: "Keeper of the Flame", xpRequired: 2000, blurb: "Stewards of the circle.", Icon: Crown },
];

// ─── Daily intention chips ──────────────────────────────────────────────────
export const intentionChips = [
  { id: "breathe", label: "Breathe deeper today", Icon: Wind },
  { id: "ground", label: "Stay grounded", Icon: Sprout },
  { id: "soften", label: "Soften where I'm tight", Icon: Waves },
  { id: "show-up", label: "Show up for someone", Icon: HeartHandshake },
  { id: "rest", label: "Honor my rest", Icon: MoonStar },
  { id: "begin", label: "Begin again", Icon: SunMedium },
];

// ─── Group challenges ───────────────────────────────────────────────────────
export type Challenge = {
  id: string;
  title: string;
  modality: string;
  days: number;
  joined: number;
  daysLeft: number;
  collectiveProgress: number; // 0-100
  blurb: string;
  dailyAction: string;
};

export const challenges: Challenge[] = [
  {
    id: "morning-breath-7",
    title: "Seven Mornings of Breath",
    modality: "Breathwork",
    days: 7,
    joined: 412,
    daysLeft: 4,
    collectiveProgress: 64,
    blurb: "A single coherent breath session before your phone — together, every morning.",
    dailyAction: "5 minutes of 4-6 breathing within 30 min of waking.",
  },
  {
    id: "green-daily-21",
    title: "21 Days of Greens",
    modality: "Smoothies",
    days: 21,
    joined: 287,
    daysLeft: 12,
    collectiveProgress: 41,
    blurb: "One green smoothie a day. Log it, share variations, learn from the lab.",
    dailyAction: "Build any green-base smoothie and post one swap or note.",
  },
  {
    id: "tea-ritual-14",
    title: "The Tea Ritual",
    modality: "Herbal",
    days: 14,
    joined: 196,
    daysLeft: 9,
    collectiveProgress: 37,
    blurb: "A nightly nervine infusion — tulsi, chamomile, lemon balm, your choice.",
    dailyAction: "Brew, sit with it for 10 minutes, no screen.",
  },
];

// ─── Posts ──────────────────────────────────────────────────────────────────
export type PostTab = "for-you" | "wins" | "questions" | "logs" | "field-notes";

export type Post = {
  id: string;
  tab: PostTab;
  author: string;
  rank: string; // rank name
  modality: string;
  body: string;
  postedAgo: string;
  reactions: { glow: number; resonate: number; bow: number; amplify: number };
  replies: number;
};

export const seedPosts: Post[] = [
  // For You / Wins
  {
    id: "p1",
    tab: "wins",
    author: "Maya",
    rank: "Beacon",
    modality: "Breathwork",
    body: "Day 30 of nightly 4-7-8. Dropped from 45 minutes of falling asleep to under 10. The 4-second inhale was the unlock — I was rushing it before.",
    postedAgo: "12m ago",
    reactions: { glow: 47, resonate: 22, bow: 14, amplify: 6 },
    replies: 9,
  },
  {
    id: "p2",
    tab: "wins",
    author: "Jonah",
    rank: "Flame",
    modality: "Smoothies",
    body: "Three coffees down to one. The matcha + cacao + maca stack at 10am replaces the second cup completely. Steady all afternoon for the first time in years.",
    postedAgo: "38m ago",
    reactions: { glow: 63, resonate: 41, bow: 8, amplify: 11 },
    replies: 14,
  },
  {
    id: "p3",
    tab: "wins",
    author: "Sol",
    rank: "Lantern",
    modality: "Herbal",
    body: "Six weeks on a tulsi + ashwagandha decoction. My HRV is up 18 points. I don't claim causation, but I'm not stopping.",
    postedAgo: "1h ago",
    reactions: { glow: 88, resonate: 32, bow: 21, amplify: 17 },
    replies: 22,
  },
  // Questions
  {
    id: "p4",
    tab: "questions",
    author: "Amara",
    rank: "Spark",
    modality: "Breathwork",
    body: "I get lightheaded on the second round of Wim Hof. Backing off the depth or backing off the rounds — what would you try first?",
    postedAgo: "20m ago",
    reactions: { glow: 12, resonate: 31, bow: 2, amplify: 3 },
    replies: 18,
  },
  {
    id: "p5",
    tab: "questions",
    author: "Ren",
    rank: "Ember",
    modality: "Tai Chi",
    body: "My knees ache after 20 minutes in low stance. Is it alignment or am I just not strong enough yet? Both?",
    postedAgo: "1h ago",
    reactions: { glow: 8, resonate: 19, bow: 4, amplify: 2 },
    replies: 11,
  },
  {
    id: "p6",
    tab: "questions",
    author: "Priya",
    rank: "Flame",
    modality: "Smoothies",
    body: "Anyone successfully hidden cauliflower in a kid smoothie without the texture giving it away? Mine clocks it every time.",
    postedAgo: "2h ago",
    reactions: { glow: 14, resonate: 27, bow: 1, amplify: 5 },
    replies: 24,
  },
  // Practice logs
  {
    id: "p7",
    tab: "logs",
    author: "Noor",
    rank: "Beacon",
    modality: "Yoga",
    body: "60 min — standing series + 20 min restorative. Tight right hip is finally giving. Pigeon held 4 minutes per side without bracing.",
    postedAgo: "2h ago",
    reactions: { glow: 19, resonate: 8, bow: 5, amplify: 1 },
    replies: 4,
  },
  {
    id: "p8",
    tab: "logs",
    author: "Theo",
    rank: "Hearth",
    modality: "Breathwork",
    body: "Session 142. Box 6-6-6-6 for 12 minutes. Resting HR ended at 51. The plateau is breaking.",
    postedAgo: "3h ago",
    reactions: { glow: 33, resonate: 14, bow: 9, amplify: 4 },
    replies: 7,
  },
  // Field notes
  {
    id: "p9",
    tab: "field-notes",
    author: "Esme",
    rank: "Lantern",
    modality: "Herbal",
    body: "Foraged nettle this morning. Two notes: (1) the very tip leaves are sweetest. (2) blanching 30 sec longer than you think kills every sting reliably.",
    postedAgo: "4h ago",
    reactions: { glow: 41, resonate: 11, bow: 18, amplify: 12 },
    replies: 13,
  },
  {
    id: "p10",
    tab: "field-notes",
    author: "Diego",
    rank: "Beacon",
    modality: "Tai Chi",
    body: "30 days of practicing in the same park. The regulars now bring tea. I came for the form and stayed for the bench conversations.",
    postedAgo: "6h ago",
    reactions: { glow: 72, resonate: 38, bow: 24, amplify: 19 },
    replies: 16,
  },
  {
    id: "p11",
    tab: "field-notes",
    author: "Hana",
    rank: "Flame",
    modality: "Yoga",
    body: "The teacher I almost quit over has become my favorite. Turns out the corrections that stung were the ones I needed.",
    postedAgo: "8h ago",
    reactions: { glow: 56, resonate: 44, bow: 12, amplify: 9 },
    replies: 21,
  },
  {
    id: "p12",
    tab: "wins",
    author: "Kai",
    rank: "Spark",
    modality: "Smoothies",
    body: "Made the Cacao Velvet for my dad. He's 68 and skeptical of 'health drinks'. He asked for the recipe.",
    postedAgo: "10h ago",
    reactions: { glow: 94, resonate: 18, bow: 22, amplify: 14 },
    replies: 11,
  },
];

// ─── Circles ────────────────────────────────────────────────────────────────
export type Circle = {
  id: string;
  name: string;
  members: number;
  focus: string;
  cadence: string;
  Icon: LucideIcon;
};

export const circles: Circle[] = [
  { id: "breath-daily", name: "Breathwork Daily", members: 1840, focus: "A single breath practice, every morning.", cadence: "Daily check-in 6–9am", Icon: Wind },
  { id: "herbal-apothecary", name: "Herbal Apothecary", members: 1112, focus: "Recipe-trading, foraging logs, monograph deep-dives.", cadence: "Weekly thread Sundays", Icon: Leaf },
  { id: "tai-chi-mornings", name: "Tai Chi Mornings", members: 690, focus: "Park-bench accountability for the long form.", cadence: "Daily form video", Icon: Sprout },
  { id: "yoga-recovery", name: "Yoga Recovery", members: 945, focus: "Restorative, yin, prop-heavy, injury-aware.", cadence: "Weekly sequencing share", Icon: Waves },
  { id: "smoothie-lab", name: "Smoothie Lab", members: 1287, focus: "Recipe iteration with macro and glycemic notes.", cadence: "Weekly experiment", Icon: Sparkles },
  { id: "shadow-work", name: "Shadow Work", members: 612, focus: "Slow, held space for the harder inner work.", cadence: "Bi-weekly prompt", Icon: MoonStar },
  { id: "sleep-reset", name: "Sleep Reset", members: 824, focus: "Wind-down rituals that actually work.", cadence: "Nightly check-in", Icon: MoonStar },
  { id: "family-practice", name: "Family Practice", members: 538, focus: "Practicing alongside kids without making it a project.", cadence: "Weekly Sunday share", Icon: HeartHandshake },
  { id: "beginners-hearth", name: "Beginners' Hearth", members: 2104, focus: "Every question welcome. No belt required.", cadence: "Always open", Icon: SunMedium },
  { id: "mastery-path", name: "The Mastery Path", members: 318, focus: "Long-haul practitioners — 5+ years in any modality.", cadence: "Monthly call", Icon: Crown },
];

// ─── Mentors ────────────────────────────────────────────────────────────────
export type Mentor = {
  id: string;
  name: string;
  title: string;
  modality: string;
  bio: string;
  officeHours: string;
  available: boolean;
};

export const mentors: Mentor[] = [
  { id: "m1", name: "Anya Vasquez", title: "Senior Breath Guide", modality: "Breathwork", bio: "12 years teaching coherent and pranayama work. Specializes in nervous system regulation.", officeHours: "Tue · 7pm UTC", available: true },
  { id: "m2", name: "Dr. Idris Chen", title: "Clinical Herbalist", modality: "Herbal", bio: "ND with 18 years in Western and TCM herbalism. Adaptogen and nervine focus.", officeHours: "Wed · 4pm UTC", available: true },
  { id: "m3", name: "Mei-Lin Zhao", title: "Yang-Style Inheritor", modality: "Tai Chi", bio: "5th-generation lineage holder. Park-style teaching, 30+ years.", officeHours: "Sat · 9am UTC", available: false },
  { id: "m4", name: "Sarah O'Donnell", title: "Yoga Therapist", modality: "Yoga", bio: "C-IAYT. Restorative and trauma-informed work. 22 years.", officeHours: "Thu · 6pm UTC", available: true },
  { id: "m5", name: "Marcus Reed", title: "Performance Nutritionist", modality: "Smoothies", bio: "MS Nutrition. Worked with endurance athletes for 14 years.", officeHours: "Mon · 5pm UTC", available: true },
  { id: "m6", name: "Yuki Watanabe", title: "Zen Practitioner", modality: "Stillness", bio: "Ordained Soto-shu priest. Holds the silent threads.", officeHours: "Fri · 8am UTC", available: false },
];

// ─── Events ─────────────────────────────────────────────────────────────────
export type Event = {
  id: string;
  title: string;
  host: string;
  when: string;
  format: string;
  spots: string;
};

export const events: Event[] = [
  { id: "e1", title: "Group Breath Sit", host: "Anya Vasquez", when: "Mon · 7pm UTC", format: "Live audio · 45 min", spots: "Open" },
  { id: "e2", title: "Adaptogens AMA", host: "Dr. Idris Chen", when: "Wed · 4pm UTC", format: "Live text Q&A · 60 min", spots: "Open" },
  { id: "e3", title: "Full Moon Ritual", host: "Circle keepers", when: "Sat · 9pm local", format: "Async ritual · self-paced", spots: "Open" },
  { id: "e4", title: "Form Lab — Yang 24", host: "Mei-Lin Zhao", when: "Sat · 9am UTC", format: "Live video · 60 min", spots: "12 / 30" },
  { id: "e5", title: "Sunday Field Notes", host: "Community", when: "Sun · 6pm UTC", format: "Async share thread", spots: "Open" },
  { id: "e6", title: "Beginner's Welcome Circle", host: "Hearth team", when: "Daily · 12pm UTC", format: "Drop-in · 20 min", spots: "Open" },
];

// ─── Leaderboards ───────────────────────────────────────────────────────────
export type LeaderRow = { name: string; rank: string; value: string };

export const leaderboards: { title: string; subtitle: string; rows: LeaderRow[] }[] = [
  {
    title: "Most generous",
    subtitle: "Replies given this week",
    rows: [
      { name: "Theo", rank: "Hearth", value: "47 replies" },
      { name: "Sol", rank: "Lantern", value: "39 replies" },
      { name: "Esme", rank: "Lantern", value: "34 replies" },
      { name: "Diego", rank: "Beacon", value: "28 replies" },
      { name: "Hana", rank: "Flame", value: "22 replies" },
    ],
  },
  {
    title: "Longest streaks",
    subtitle: "Daily check-ins",
    rows: [
      { name: "Anya", rank: "Keeper", value: "412 days" },
      { name: "Marcus", rank: "Hearth", value: "287 days" },
      { name: "Noor", rank: "Beacon", value: "146 days" },
      { name: "Maya", rank: "Beacon", value: "92 days" },
      { name: "Kai", rank: "Spark", value: "44 days" },
    ],
  },
  {
    title: "Quest finishers",
    subtitle: "Challenges completed",
    rows: [
      { name: "Sol", rank: "Lantern", value: "23 quests" },
      { name: "Theo", rank: "Hearth", value: "19 quests" },
      { name: "Jonah", rank: "Flame", value: "14 quests" },
      { name: "Priya", rank: "Flame", value: "11 quests" },
      { name: "Amara", rank: "Spark", value: "6 quests" },
    ],
  },
];

// ─── Badges ─────────────────────────────────────────────────────────────────
export type Badge = {
  id: string;
  name: string;
  hint: string;
  Icon: LucideIcon;
};

export const badges: Badge[] = [
  { id: "first-reply", name: "First Reply", hint: "Reply to anyone in the circle.", Icon: HeartHandshake },
  { id: "first-post", name: "First Light", hint: "Post your first share.", Icon: Sparkles },
  { id: "seven-day-sit", name: "Seven-Day Sit", hint: "A 7-day check-in streak.", Icon: Flame },
  { id: "thirty-day", name: "Thirty Days In", hint: "A 30-day streak.", Icon: Flame },
  { id: "pollinator", name: "Pollinator", hint: "Reply to 10 different members.", Icon: Sprout },
  { id: "lineage-bridge", name: "Lineage Bridge", hint: "Engage across 3+ modalities.", Icon: Leaf },
  { id: "challenge-keeper", name: "Challenge Keeper", hint: "Finish a group challenge.", Icon: Crown },
  { id: "deep-listener", name: "Deep Listener", hint: "10 'Bow' reactions received.", Icon: HeartHandshake },
  { id: "ember-bearer", name: "Ember Bearer", hint: "Welcome a newcomer.", Icon: Sparkles },
  { id: "field-noter", name: "Field Noter", hint: "Share 5 field notes.", Icon: Leaf },
  { id: "morning-rite", name: "Morning Rite", hint: "Practice before 8am, 10 days.", Icon: SunMedium },
  { id: "night-keeper", name: "Night Keeper", hint: "Wind-down ritual, 14 nights.", Icon: MoonStar },
];

// ─── Rituals ────────────────────────────────────────────────────────────────
export const rituals: { day: string; ritual: string; blurb: string; Icon: LucideIcon }[] = [
  { day: "Mon", ritual: "Set the week's intention", blurb: "One sentence, one chip. Keep it small.", Icon: SunMedium },
  { day: "Wed", ritual: "Practice swap", blurb: "Trade a technique with someone in another modality.", Icon: HeartHandshake },
  { day: "Fri", ritual: "Gratitude thread", blurb: "Name one person whose post moved you.", Icon: Sparkles },
  { day: "Sun", ritual: "Field notes", blurb: "What did the week teach your body?", Icon: Leaf },
];

// ─── Live pulse seed ────────────────────────────────────────────────────────
export const livePulse = {
  online: 247,
  todayCheckIns: 1842,
  collectiveGlow: 78, // 0-100
  newcomersThisWeek: 64,
};

// ─── XP rules ───────────────────────────────────────────────────────────────
export const xpRules = {
  post: 10,
  reply: 15,
  challengeDay: 20,
  mentorReply: 25,
  dailyIntention: 5,
};

// ─── Reactions ──────────────────────────────────────────────────────────────
export type ReactionKey = "glow" | "resonate" | "bow" | "amplify";
export const reactionMeta: Record<ReactionKey, { label: string; meaning: string; Icon: LucideIcon }> = {
  glow: { label: "Glow", meaning: "Warm acknowledgment.", Icon: Sparkles },
  resonate: { label: "Resonate", meaning: "This matched my experience.", Icon: Waves },
  bow: { label: "Bow", meaning: "Gratitude for what you shared.", Icon: HeartHandshake },
  amplify: { label: "Amplify", meaning: "Boost into For You.", Icon: Flame },
};

export const tabMeta: Record<PostTab, { label: string; blurb: string; Icon: LucideIcon }> = {
  "for-you": { label: "For You", blurb: "Curated by your modalities and rank.", Icon: Sparkles },
  wins: { label: "Wins", blurb: "Small and large. All counted.", Icon: Flame },
  questions: { label: "Questions", blurb: "Where the circle's brain pools.", Icon: Users },
  logs: { label: "Practice Logs", blurb: "Just the work, plainly stated.", Icon: Leaf },
  "field-notes": { label: "Field Notes", blurb: "Observations from the path.", Icon: MoonStar },
};

export function rankByXp(xp: number): { current: Rank; next?: Rank; progress: number } {
  let current = ranks[0];
  for (const r of ranks) if (xp >= r.xpRequired) current = r;
  const idx = ranks.indexOf(current);
  const next = ranks[idx + 1];
  const progress = next
    ? Math.min(100, ((xp - current.xpRequired) / (next.xpRequired - current.xpRequired)) * 100)
    : 100;
  return { current, next, progress };
}
