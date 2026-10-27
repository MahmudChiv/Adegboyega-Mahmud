export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  badge?: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  details?: string;
  coursework?: string[];
}

export interface LeetCodeStats {
  username: string;
  profileUrl: string;
  totalSolved: number;
  easy: { solved: number; total: number };
  medium: { solved: number; total: number };
  hard: { solved: number; total: number };
}

export interface Milestone {
  id: string;
  title: string;
  issuer: string;
  period?: string;
  description: string;
  badge?: string;
}

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: "swift-trust-mfb",
    role: "Frontend Engineer (Contract)",
    company: "Swift Trust Microfinance Bank",
    location: "Remote (Abuja, Nigeria)",
    period: "Oct 2025 – Feb 2026",
    badge: "CONTRACT • REMOTE",
    achievements: [
      "Built the bank's public landing page, giving new customers clear information about the bank's products and services.",
      "Implemented a responsive, accessible interface focused on clarity and conversion for first-time visitors.",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "hng-internship",
    role: "Software Engineer, Backend",
    company: "HNG Internship",
    location: "Remote",
    period: "Apr 2026 – May 2026",
    badge: "INTERNSHIP • REMOTE",
    achievements: [
      "Worked on backend features in a structured, cohort-based internship focused on real-world engineering practices.",
      "Collaborated with a distributed team using Git workflows, code review, and API design conventions.",
    ],
    technologies: ["Node.js", "Express", "PostgreSQL", "REST APIs", "Git Workflows"],
  },
];

export const EDUCATION: Education = {
  institution: "Federal University of Technology, Akure (FUTA)",
  degree: "B.Tech in Software Engineering",
  period: "2024 – 2029",
  location: "Akure, Nigeria",
  details: "Undergraduate degree program in Software Engineering.",
  coursework: [
    "Data Structures & Algorithms",
    "Operating Systems & Architecture",
    "Database Management Systems",
    "Object-Oriented Analysis & Design",
    "Discrete Mathematics",
    "Computer Networks",
  ],
};

export const LEETCODE_DATA: LeetCodeStats = {
  username: "mahmud_chiv",
  profileUrl: "https://leetcode.com/u/mahmud_chiv/",
  totalSolved: 3,
  easy: { solved: 3, total: 974 },
  medium: { solved: 0, total: 2135 },
  hard: { solved: 0, total: 986 },
};

export const MILESTONES: Milestone[] = [
  {
    id: "team-lead-yauwa",
    title: "Team Lead & PR Reviewer",
    issuer: "Yauwa AI Project",
    description:
      "Serving as team lead and code reviewer for a team of 4 engineers building voice-first WhatsApp AI tooling for West African informal commerce.",
  },
  {
    id: "euphrates-hackathon",
    title: "Euphrates Tech Hackathon",
    issuer: "Euphrates Tech",
    period: "Apr 2025",
    description:
      "Placed 3rd with team in a virtual hackathon building tech solutions.",
    badge: "3RD PLACE",
  },
];
