import {
  AudioLines,
  BookOpen,
  Flame,
  Flower2,
  HandHeart,
  HeartHandshake,
  Leaf,
  MoonStar,
  Sparkles,
  Sprout,
  SunMedium,
  Users,
  Waves,
  Wind,
  type LucideIcon,
} from "lucide-react";

export type ElementType = {
  name: string;
  tone: string;
  gift: string;
  className: string;
  Icon: LucideIcon;
};

export type SkillTree = {
  name: string;
  short: string;
  level: number;
  progress: number;
  nextQuest: string;
  description: string;
  className: string;
  Icon: LucideIcon;
};

export const elements: ElementType[] = [
  {
    name: "Earth",
    tone: "Grounded guardian",
    gift: "Steady rituals and herbal roots",
    className: "from-earth/35 to-leaf-glow/20 text-earth",
    Icon: Sprout,
  },
  {
    name: "Water",
    tone: "Intuitive flow",
    gift: "Emotional healing and release",
    className: "from-water/35 to-cyan-glow/20 text-water",
    Icon: Waves,
  },
  {
    name: "Fire",
    tone: "Radiant catalyst",
    gift: "Courage, vitality, transformation",
    className: "from-fire/35 to-sun-glow/20 text-fire",
    Icon: Flame,
  },
  {
    name: "Air",
    tone: "Clear breath",
    gift: "Mindful movement and spacious focus",
    className: "from-air/35 to-orchid-glow/20 text-air",
    Icon: Wind,
  },
  {
    name: "Spirit",
    tone: "Luminous witness",
    gift: "Inner wisdom and subtle energy",
    className: "from-spirit/35 to-coral-glow/20 text-spirit",
    Icon: Sparkles,
  },
];

export const skillTrees: SkillTree[] = [
  {
    name: "Herbal Wisdom",
    short: "Herbs",
    level: 7,
    progress: 72,
    nextQuest: "Blend a calm evening tea",
    description: "Herbs, teas, tinctures, and plant ally rituals.",
    className: "text-earth bg-earth/10 border-earth/30",
    Icon: Leaf,
  },
  {
    name: "Energy Mastery",
    short: "Energy",
    level: 9,
    progress: 84,
    nextQuest: "Open a seven-breath chakra scan",
    description: "Reiki, breathwork, chakra work, and meditation.",
    className: "text-spirit bg-spirit/10 border-spirit/30",
    Icon: MoonStar,
  },
  {
    name: "Movement Arts",
    short: "Motion",
    level: 6,
    progress: 58,
    nextQuest: "Complete a sunrise qigong flow",
    description: "Yoga, Tai Chi, Qigong, stretching, and mobility.",
    className: "text-air bg-air/10 border-air/30",
    Icon: Wind,
  },
  {
    name: "Healing Touch",
    short: "Touch",
    level: 5,
    progress: 49,
    nextQuest: "Practice a hand-warming sequence",
    description: "Massage, acupressure, and hands-on healing.",
    className: "text-fire bg-fire/10 border-fire/30",
    Icon: HandHeart,
  },
  {
    name: "Mind & Spirit",
    short: "Spirit",
    level: 8,
    progress: 77,
    nextQuest: "Journal through a shadow prompt",
    description: "Mindfulness, emotional healing, and shadow work.",
    className: "text-water bg-water/10 border-water/30",
    Icon: Flower2,
  },
];

export const dailyQuests = [
  { title: "Five-minute breath shrine", tree: "Energy Mastery", xp: 20, status: "Ready" },
  {
    title: "Drink one mindful herbal infusion",
    tree: "Herbal Wisdom",
    xp: 15,
    status: "In progress",
  },
  { title: "Stretch the spine in four directions", tree: "Movement Arts", xp: 15, status: "Ready" },
];

export const weeklyQuests = [
  { title: "Create a Sunday reset ritual", tree: "Mind & Spirit", xp: 90, status: "2 days left" },
  { title: "Practice shoulder acupressure", tree: "Healing Touch", xp: 70, status: "Unlocked" },
  { title: "Join the group moon check-in", tree: "Community", xp: 60, status: "Tonight" },
];

export const mainQuests = [
  { title: "Chapter I: Awaken the Inner Grove", tree: "Herbal Wisdom", xp: 220, status: "Active" },
  {
    title: "Chapter II: The Radiant Center",
    tree: "Energy Mastery",
    xp: 260,
    status: "Locked soon",
  },
  { title: "Chapter III: Hands of Light", tree: "Healing Touch", xp: 300, status: "Preview" },
];

export const resources = [
  { title: "Beginner Herb Companion", type: "Guide", duration: "18 pages", Icon: BookOpen },
  { title: "Root Chakra Grounding", type: "Audio", duration: "11 min", Icon: AudioLines },
  { title: "Daily Ascension Practice", type: "Practice", duration: "5 min", Icon: SunMedium },
  { title: "Circle of Support", type: "Community", duration: "Weekly", Icon: Users },
];

export const communityPosts = [
  {
    name: "Maya",
    element: "Water adept",
    message: "Completed my first 7-day breathwork streak and felt calmer before work today.",
    glow: "+42 glow",
  },
  {
    name: "Jonah",
    element: "Earth guardian",
    message: "Shared a lemon balm tea ritual with my family. Small, simple, beautiful.",
    glow: "+28 glow",
  },
  {
    name: "Sol",
    element: "Spirit seeker",
    message: "The shadow prompt was gentle but powerful. Grateful for this sanctuary.",
    glow: "+35 glow",
  },
];

export const stats = [
  { label: "Ascension Level", value: "24", helper: "Balanced healer path" },
  { label: "Current Streak", value: "18", helper: "days of gentle practice" },
  { label: "Glow Earned", value: "8.7k", helper: "across every tree" },
];

export const navItems = [
  { to: "/" as const, label: "Home" },
  { to: "/sanctuary" as const, label: "Sanctuary" },
  { to: "/quests" as const, label: "Quests" },
  { to: "/skill-trees" as const, label: "Skill Trees" },
  { to: "/library" as const, label: "Library" },
  { to: "/community" as const, label: "Community" },
];

export { HeartHandshake };
