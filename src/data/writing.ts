export interface Article {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishedAt: string;
  excerpt: string;
  keyTakeaways: string[];
  mediumUrl: string;
  tags: string[];
}

export const ARTICLES: Article[] = [
  {
    id: "whatsapp-voice-latency",
    number: "01",
    title: "Taming Latency in Voice-First WhatsApp AI for Nigerian Market Traders",
    subtitle: "How we brought a Pidgin-speaking LLM pipeline down to sub-2.5s end-to-end.",
    category: "SYSTEMS ARCHITECTURE",
    readTime: "6 min read",
    publishedAt: "Oct 2025",
    excerpt:
      "When market women in Lagos send audio notes to log sales, every 500ms of lag feels like a dropped call. Standard chain-of-thought LLMs take 8+ seconds to process raw audio, extract structured accounting schema, and synthesize verbal replies. Here is how we orchestrated asynchronous Twilio webhooks, Groq hardware acceleration, and streaming ElevenLabs TTS to achieve near real-time conversational turnaround...",
    keyTakeaways: [
      "Decoupling webhook acknowledgement from speech transcription to prevent Twilio HTTP timeouts.",
      "Fine-tuned phonetic prompting for West African Pidgin English variations.",
      "Streaming audio chunks to bypass browser buffer overhead.",
    ],
    mediumUrl: "https://medium.com/@mahmud.adegboyega",
    tags: ["FastAPI", "Twilio", "Groq", "ElevenLabs", "Audio Pipelines"],
  },
  {
    id: "three-wallet-escrow-architecture",
    number: "02",
    title: "Designing a 3-Wallet Escrow Engine with Dispute Resolution for Informal Artisans",
    subtitle: "State-machine design patterns for multi-party financial reconciliation.",
    category: "FINTECH & DATABASE DESIGN",
    readTime: "8 min read",
    publishedAt: "Jan 2026",
    excerpt:
      "The fundamental barrier to hiring informal plumbers and electricians in African cities isn't discovery — it's trust. Artisans fear non-payment upon completion, while clients fear job abandonment. To solve this, we modeled a deterministic 3-wallet ledger (Client Vault, Artisan Escrow, Platform Treasury) using Supabase and PostgreSQL row-level locks, coupled with cryptographic before-and-after photo verification...",
    keyTakeaways: [
      "ACID transactional guarantees across simulated multi-wallet states.",
      "Handling edge-case cancellations and partial milestone releases.",
      "Preventing race conditions during simultaneous dispute triggers.",
    ],
    mediumUrl: "https://medium.com/@mahmud.adegboyega",
    tags: ["PostgreSQL", "Supabase", "State Machines", "Financial Ledgers"],
  },
  {
    id: "postgresql-n-plus-one-optimization",
    number: "03",
    title: "Debugging and Eliminating N+1 Query Cascades Under Simulated Traffic Bursts",
    subtitle: "Practical database query auditing and indexing strategies learned during HNG.",
    category: "BACKEND RIGOR",
    readTime: "5 min read",
    publishedAt: "Apr 2026",
    excerpt:
      "Under 1,000 requests per second, a subtle ORM relationship mapping can rapidly exhaust PostgreSQL connection pools. While building microservice endpoints during the HNG backend cohort, we diagnosed database CPU spikes to an uncontrolled recursive relation fetch. Here is the step-by-step audit, `EXPLAIN ANALYZE` breakdown, and composite index strategy that restored sub-40ms response times...",
    keyTakeaways: [
      "Identifying hidden eager vs. lazy fetch antipatterns in nested serializers.",
      "Leveraging composite B-tree indices on high-cardinality foreign keys.",
      "Benchmarking connection pooling resilience under sudden traffic surges.",
    ],
    mediumUrl: "https://medium.com/@mahmud.adegboyega",
    tags: ["PostgreSQL", "Query Optimization", "Node.js", "Performance Tuning"],
  },
];

