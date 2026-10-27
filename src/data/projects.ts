export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  problem: string;
  audience: string;
  solution: string;
  architecture: string;
  metrics: string[];
  tags: string[];
  previewImage?: string;
  isPlaceholder?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  whatsappUrl?: string;
  statusBadge: string;
}

export const PROJECTS: Project[] = [
  {
    id: "yauwa-ai",
    number: "01",
    title: "Yauwa AI",
    tagline: "Voice-First WhatsApp Bookkeeping Assistant for African Traders",
    problem:
      "Low-literacy informal merchants and market traders in Nigeria lose up to 15% of daily revenue due to unrecorded credit sales, paper ledger loss, and language barriers in text-heavy accounting apps.",
    audience: "Market traders, informal SME retailers, and micro-business owners across Nigeria.",
    solution:
      "A voice-native WhatsApp assistant enabling merchants to log sales, track inventory, and trigger restocking alerts entirely by voice notes, receiving instant verbal replies in natural Nigerian Pidgin.",
    architecture:
      "Built with Python & FastAPI behind Twilio WhatsApp webhooks with PostgreSQL (SQLModel). Pipeline uses Google Gemini for high-accuracy pidgin audio transcription, Groq (gpt-oss-120b) for structured entity extraction, and ElevenLabs for natural Pidgin/English TTS voice synthesis deployed on Railway via GitHub Actions CI/CD.",
    metrics: [
      "Voice processing pipeline under 2.4s end-to-end",
      "100% voice-driven: Zero typing required",
    ],
    tags: ["PYTHON", "FASTAPI", "POSTGRESQL", "TWILIO", "GEMINI AI", "GROQ", "ELEVENLABS", "RAILWAY"],
    isPlaceholder: true,
    previewImage: "/images/projects/yauwa-preview.png",
    whatsappUrl: "https://wa.me/14155238886",
    statusBadge: "LANDING PAGE IN PROGRESS • BOT LIVE",
  },
  {
    id: "clarlink",
    number: "02",
    title: "ClarLink",
    tagline: "Voice-First Artisan Marketplace & Escrow System",
    problem:
      "Hiring informal artisans (electricians, carpenters, plumbers) in African cities suffers from rampant pricing opacity, work abandonment, and payment disputes with zero customer recourse.",
    audience: "Urban homeowners, commercial tenants, and vetted local tradespeople.",
    solution:
      "A mobile-first marketplace where clients dictate job needs by voice. AI extracts requirements into structured scopes, locks funds in a 3-wallet escrow contract, and verifies completion before payout release.",
    architecture:
      "Engineered on React and Supabase. Implements a three-wallet escrow engine (client, artisan, platform treasury) charging a 10% platform fee, with a cryptographic dispute pipeline backed by before/after image evidence.",
    metrics: [
      "Three-wallet financial escrow with automated 10% fee deduction",
      "Voice-to-job extraction using Gemini & Groq",
      "Fraud-resistant before/after image dispute workflow",
    ],
    tags: ["REACT", "SUPABASE", "GEMINI AI", "GROQ", "POSTGRESQL", "TAILWIND CSS"],
    previewImage: "/images/projects/clarlink.png",
    liveUrl: "https://clarlink-gt97.bolt.host",
    githubUrl: "https://github.com/MahmudChiv/clarlink",
    statusBadge: "PRODUCTION LIVE",
  },
  {
    id: "trumatch",
    number: "03",
    title: "TruMatch",
    tagline: "AI-Powered Commitment Verification & Team Matching",
    problem:
      "Hackathons and early-stage startup teams collapse 60% of the time due to 'ghosting' teammates whose self-reported availability never matches reality.",
    audience: "Hackathon organizers, technical co-founders, and engineering collaborators.",
    solution:
      "A full-stack verification engine that replaces self-reported claims with hard GitHub telemetry, scoring developer commitment and conducting automated AI interviews tailored to actual commit history.",
    architecture:
      "Next.js full-stack platform with GitHub OAuth integration. Analyzes commit consistency, PR turnaround, and issue close ratios into a normalized Commitment Score, with a Gemini AI adaptive interview flow.",
    metrics: [
      "Data-backed Commitment Score derived from live GitHub API telemetry",
      "Adaptive Gemini AI technical interviews",
      "Full-stack Next.js app with seamless GitHub OAuth",
    ],
    tags: ["NEXT.JS", "TYPESCRIPT", "GITHUB API", "GEMINI AI", "TAILWIND CSS", "VERCEL"],
    previewImage: "/images/projects/trumatch.png",
    liveUrl: "https://tru-match-frontend.vercel.app",
    githubUrl: "https://github.com/MahmudChiv/TruMatch",
    statusBadge: "PRODUCTION LIVE",
  },
];

