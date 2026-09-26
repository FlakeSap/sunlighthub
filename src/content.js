// Everything the hub shows, in one place. Every link here points at something
// that exists today; nothing is a placeholder.

export const SUNSET_URL = 'https://sunset-public.onrender.com'
export const SUNSCRIPT_URL = 'https://sunscript.onrender.com'
export const SUNGUARD_URL = 'https://sunguard-mpxl.onrender.com'
export const WINDOWS_URL =
  'https://github.com/FlakeSap/sunset-downloads/releases/latest/download/Sunset-Setup.exe'

export const PROJECTS = [
  {
    id: 'sunset',
    name: 'Sunset',
    year: '2026',
    status: 'live',
    tagline: 'One AI companion, two moods.',
    description:
      'Chat with Sunset or Sunshine — two personas, one AI companion — from the web, or right from the sidebar in VS Code without leaving the editor.',
    href: SUNSET_URL,
  },
  {
    id: 'sunscript',
    name: 'SunScript',
    year: '2026',
    status: 'live',
    tagline: 'Idea, research, and code — one exclusive mode at a time.',
    description:
      'Instant for fast ideas, Deep Analysis grounded in live web search, or Coding for a straight answer on what to build with. Conversations save as starrable, shareable projects.',
    href: SUNSCRIPT_URL,
  },
  {
    id: 'sunguard',
    name: 'SunGuard',
    year: '2026',
    status: 'live',
    tagline: 'AI that holds up like a guardrail should.',
    description:
      'Redteam your system prompts for vulnerabilities, scan content for harm, and learn AI safety fundamentals — everything you need to ship safely, in one place.',
    href: SUNGUARD_URL,
  },
  {
    id: 'sunstudy',
    name: 'SunStudy',
    year: '2026',
    status: 'progress',
    tagline: 'Prepare for exams smarter with AI.',
    description:
      "A free AI study companion — snap a problem for a step-by-step solution, turn your notes into flashcards and quizzes, and get a briefing on the exam you're preparing for.",
    href: null,
  },
]

// Taken from Sunset's own changelog (the News view inside the app), newest first.
export const NEWS = [
  {
    id: 'rename',
    title: 'The SunLight hub is now Sunovo Labs',
    summary: 'A new name for the place that lists everything we build. The projects are unchanged.',
    category: 'Company',
    date: 'Sep 26, 2026',
    tone: 'ember',
  },
  {
    id: 'photos',
    title: 'Photos are made smaller on your device before they are sent',
    summary:
      'Pictures upload and get answered faster, and Sunset now tells you plainly if it cannot read a file instead of guessing.',
    category: 'Sunset',
    date: 'Sep 24, 2026',
    tone: 'dusk',
  },
  {
    id: 'incognito',
    title: 'Incognito chats in Sunset',
    summary:
      "Tap the ghost in the top right. An incognito chat isn't saved, doesn't use Memory, and is gone when you leave it.",
    category: 'Sunset',
    date: 'Sep 23, 2026',
    tone: 'violet',
  },
  {
    id: 'nova',
    title: 'Introducing Nova 5.5, our most careful mode',
    summary:
      'One model writes a draft, a second independent model checks the facts and the working and fixes what it finds.',
    category: 'Sunset',
    date: 'Sep 21, 2026',
    tone: 'gold',
  },
  {
    id: 'windows',
    title: 'Sunset for Windows',
    summary: 'Download Sunset for Windows. Google sign-in opens your browser and brings you straight back to the app.',
    category: 'Sunset',
    date: 'Sep 21, 2026',
    tone: 'rose',
  },
  {
    id: 'interior',
    title: 'A new look inside Sunset',
    summary:
      'A wider sidebar, a calmer home screen, chats in a centered column, and an orange light that follows the time of day.',
    category: 'Sunset',
    date: 'Sep 21, 2026',
    tone: 'peach',
  },
]

// The top bar. Each item opens a panel: a column of big "Explore" links and,
// optionally, a column of smaller ones. A link is one of:
//   { label, to }                 a page on this site (may end in #section)
//   { label, href, external }     another site, opens in a new tab
//   { label, action: 'chat' }     opens the helper chat
export const MENU = [
  {
    key: 'products',
    label: 'Products',
    to: '/#projects',
    explore: [
      { label: 'Sunset', href: SUNSET_URL, external: true },
      { label: 'SunScript', href: SUNSCRIPT_URL, external: true },
      { label: 'SunGuard', href: SUNGUARD_URL, external: true },
      { label: 'SunStudy', to: '/#sunstudy', note: 'In development' },
    ],
    groups: [
      {
        title: 'Get the apps',
        links: [
          { label: 'Sunset for Windows', href: WINDOWS_URL, external: true },
          { label: 'Sunset on the web', href: SUNSET_URL, external: true },
        ],
      },
      {
        title: 'Latest',
        links: [{ label: 'Recent news', to: '/#news' }],
      },
    ],
  },
  {
    key: 'solutions',
    label: 'Solutions',
    to: '/solutions',
    explore: [
      { label: 'Sunset', to: '/solutions#sunset' },
      { label: 'SunScript', to: '/solutions#sunscript' },
      { label: 'SunGuard', to: '/solutions#sunguard' },
    ],
    groups: [
      {
        title: 'Not sure where to start?',
        links: [
          { label: 'Ask the helper', action: 'chat' },
          { label: 'All solutions', to: '/solutions' },
        ],
      },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    to: '/resources',
    explore: [
      { label: 'Sunset manual', to: '/resources#sunset' },
      { label: 'SunScript manual', to: '/resources#sunscript' },
      { label: 'SunGuard manual', to: '/resources#sunguard' },
      { label: 'SunStudy manual', to: '/resources#sunstudy' },
    ],
    groups: [
      {
        title: 'Open in Sunset',
        links: [{ label: 'The Sunset manual', href: SUNSET_URL + '/?manual=1', external: true }],
      },
    ],
  },
  {
    key: 'features',
    label: 'Features',
    to: '/features',
    explore: [
      { label: 'Project showcase', to: '/features#showcase' },
      { label: 'Shared account', to: '/features#account' },
      { label: 'AI helper', to: '/features#helper' },
    ],
    groups: [],
  },
  {
    key: 'company',
    label: 'Company',
    to: '/about',
    explore: [
      { label: 'About', to: '/about' },
      { label: 'News', to: '/#news' },
    ],
    groups: [
      {
        title: 'Support',
        links: [{ label: 'Ask the helper', action: 'chat' }],
      },
    ],
  },
]

export const OPEN_CHAT_EVENT = 'sunovo:ask'

// Ask the helper chat to open, optionally sending a first message.
export function askHelper(text) {
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT, { detail: { text } }))
}
