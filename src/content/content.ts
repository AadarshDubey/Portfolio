// ============================================================
// PORTFOLIO CONTENT — Edit this file to update your portfolio
// ============================================================

export interface SiteConfig {
    name: string;
    title: string;
    tagline: string;
    description: string;
    url: string;
    email: string;
    resumeUrl: string;
    social: {
        github: string;
        linkedin: string;
        twitter?: string;
    };
}

export interface Project {
    id: string;
    title: string;
    outcome: string;
    description: string;
    problem?: string;
    solution?: string;
    features?: string[];
    tags: string[];
    stack: string[];
    links: {
        live?: string;
        github?: string;
        caseStudy?: string;
    };
    thumbnail?: string;
    featured: boolean;
    metrics?: string[];
    lessons?: string[];
}

export interface Certification {
    id: string;
    title: string;
    issuer: string;
    date: string;
    bullets?: string[];
    credentialUrl?: string;
    badgeImage?: string;
}

export interface TimelineItem {
    id: string;
    title: string;
    date: string;
    issuer?: string;
    bullets?: string[];
    icon: string;
    type: 'certification' | 'achievement';
    link?: string;
    description?: string;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    date: string;
    icon: string;
    link?: string;
}

export interface SkillCategory {
    category: string;
    skills: string[];
}

export interface Experience {
    id: string;
    role: string;
    organization: string;
    startDate: string;
    endDate: string;
    bullets: string[];
    tech: string[];
}

export interface Highlight {
    label: string;
    value: string;
    suffix?: string;
}

// ─── Site Config ──────────────────────────────────────────────
export const siteConfig: SiteConfig = {
    name: "Aadarsh Dubey",
    title: "GenAI Developer",
    tagline:
        "I build production-grade GenAI applications — RAG, agents, evaluation pipelines, and scalable deployments.",
    description:
        "Aadarsh Dubey is a GenAI Developer specializing in building production-grade AI applications including RAG systems, intelligent agents, LLM evaluation pipelines, and scalable deployments.",
    url: "https://aadarshdubey.com",
    email: "addydubey321@gmail.com",
    resumeUrl: "https://drive.google.com/file/d/19yGHjAKHIqNFjOcpB5j8MPGuFyGFxpuf/view?usp=drive_link",
    social: {
        github: "https://github.com/AadarshDubey",
        linkedin: "https://www.linkedin.com/in/aadarsh-dubey-551680164/",
        twitter: "https://x.com/Iam_Aady04",
    },
};

// ─── Highlights / Stats ───────────────────────────────────────
export const highlights: Highlight[] = [
    { label: "AI Projects Shipped", value: "3", suffix: "+" },
    { label: "Cloud Certifications", value: "2", suffix: "" },
    { label: "Bugs Squashed", value: "90", suffix: "%" },
    { label: "Code Reviews", value: "50", suffix: "+" },
];

// ─── Projects ─────────────────────────────────────────────────
export const projects: Project[] = [
    {
        id: "vibes",
        title: "VIBES",
        outcome: "Automated meeting analysis with structured AI-generated reports",
        description:
            "Flask-based toolkit that ingests meeting transcripts (VTT/Markdown) and video frames, sanitizes text, and uses Gemini or local Ollama models via LangGraph to extract structured insights—participants, roles, action items, technical details, and AI implementation summaries—automatically writing logs and organized output reports.",
        problem:
            "Meeting recordings and transcripts contained valuable insights buried in hours of unstructured content, making manual extraction tedious and error-prone.",
        solution:
            "Built an end-to-end pipeline using Flask + LangGraph that ingests VTT/Markdown transcripts and video frames, sanitizes text, and leverages Gemini or local Ollama models to extract structured insights automatically.",
        features: [
            "Multi-format transcript ingestion (VTT, Markdown)",
            "Video frame extraction and analysis",
            "Text sanitization and preprocessing pipeline",
            "LangGraph-powered multi-step AI extraction",
            "Automatic participant & role identification",
            "Action item and technical detail extraction",
            "AI implementation summary generation",
            "Structured output reports with logging",
        ],
        tags: ["GenAI", "NLP", "Automation"],
        stack: [
            "Python",
            "Flask",
            "LangGraph",
            "Gemini",
            "Ollama",
        ],
        links: {},
        thumbnail: "/projects/vibes.png",
        featured: true,
        metrics: [
            "Automated extraction of 7+ insight categories",
            "Supports both cloud (Gemini) and local (Ollama) models",
            "End-to-end pipeline from raw transcript to structured report",
        ],
        lessons: [
            "LangGraph's stateful workflows excel at multi-step document analysis",
            "Local model fallback (Ollama) is critical for offline/privacy-sensitive use cases",
        ],
    },
    {
        id: "crx-pipeline",
        title: "CRX-PIPELINE",
        outcome: "Real-time crypto market intelligence with RAG-powered analysis",
        description:
            "CRX Pipeline is a crypto market-intelligence system that ingests news and social signals, embeds them into a vector knowledge base (Chroma), and applies retrieval-augmented generation for grounded summaries and chat. FastAPI serves this pipeline, Redis accelerates access via caching/queueing, and a Next.js dashboard presents feed, analytics, and pricing.",
        problem:
            "Crypto traders lacked a unified tool to aggregate, search, and analyze scattered news and social media signals in real time.",
        solution:
            "Designed a full-stack RAG pipeline that ingests crypto news/social signals into ChromaDB, applies retrieval-augmented generation for grounded analysis, and serves everything through a FastAPI backend with Redis caching and a Next.js dashboard.",
        features: [
            "News and social signal ingestion pipeline",
            "Vector knowledge base with ChromaDB embeddings",
            "RAG-powered grounded summaries and conversational chat",
            "FastAPI backend with structured API endpoints",
            "Redis caching and queueing for performance",
            "Next.js dashboard with feed, analytics, and pricing",
        ],
        tags: ["RAG", "Full-Stack", "Data"],
        stack: [
            "Python",
            "FastAPI",
            "ChromaDB",
            "Redis",
            "Next.js",
            "TypeScript",
        ],
        links: {},
        thumbnail: "/projects/crx.png",
        featured: true,
        metrics: [
            "Real-time ingestion of crypto news and social signals",
            "Sub-second retrieval via Redis caching layer",
            "Full-stack dashboard with analytics and pricing",
        ],
        lessons: [
            "Redis caching/queueing dramatically reduces latency for RAG queries",
            "ChromaDB provides a lightweight but powerful vector store for mid-scale data",
        ],
    },
    {
        id: "sow-assistant",
        title: "SoW Assistant",
        outcome: "AI-powered contract auditing with detailed redline suggestions",
        description:
            "SoW Audit Assistant is an AI-powered contract analysis tool built with Streamlit and Google Gemini API. It audits Statement of Work (SoW) documents for fixed-price projects, detecting vague language, scope creep risks, missing sections, and quality issues, then generates detailed audit reports with redline suggestions.",
        problem:
            "Reviewing Statement of Work documents for fixed-price projects was a manual, time-consuming process prone to overlooking vague language, scope creep risks, and missing sections.",
        solution:
            "Built an AI-powered audit tool using Streamlit and Google Gemini API that automatically analyzes SoW documents, flags risks, detects quality issues, and generates comprehensive audit reports with actionable redline suggestions.",
        features: [
            "Automated SoW document ingestion and parsing",
            "Vague language detection and flagging",
            "Scope creep risk identification",
            "Missing section analysis",
            "Quality issue detection",
            "Detailed audit report generation with redline suggestions",
        ],
        tags: ["GenAI", "NLP", "Enterprise"],
        stack: [
            "Python",
            "Streamlit",
            "Google Gemini API",
        ],
        links: {},
        thumbnail: "/projects/sow.png",
        featured: true,
    },
];

// ─── Skills ───────────────────────────────────────────────────
export const skills: SkillCategory[] = [
    {
        category: "GenAI / LLM",
        skills: [
            "Prompt Engineering",
            "RAG & Embeddings",
            "Tool/Function Calling",
            "Agents & Orchestration",
            "Reranking & Context Management",
            "Structured Output",
            "Safety & Guardrails",
            "Fine-tuning & Adapters",
        ],
    },
    {
        category: "Frameworks & Libraries",
        skills: [
            "LangChain",
            "LangGraph",
            "LlamaIndex",
            "Hugging Face",
            "Ragas",
            "DeepEval",
            "CrewAI",
        ],
    },
    {
        category: "Backend",
        skills: [
            "Python",
            "FastAPI",
            "Node.js",
            "REST APIs",
            "WebSockets",
            "Authentication",
        ],
    },
    {
        category: "Data & Storage",
        skills: [
            "Pinecone",
            "FAISS",
            "ChromaDB",
            "PostgreSQL",
            "MongoDB",
            "Redis",
        ],
    },
    {
        category: "MLOps / LLMOps",
        skills: [
            "Evaluation Pipelines",
            "Tracing & Monitoring",
            "CI/CD",
            "Model Deployment",
            "Cost Optimization",
        ],
    },
    {
        category: "Cloud & DevOps",
        skills: ["Docker", "AWS", "GCP", "Vercel", "GitHub Actions"],
    },
    {
        category: "Frontend",
        skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Dashboards"],
    },
];

export const currentlyExploring =
    "Exploring agentic RAG patterns, multi-modal AI, and LLM-powered code generation.";

// ─── Experience ───────────────────────────────────────────────
export const experiences: Experience[] = [
    {
        id: "ltm-genai",
        role: "GenAI Engineer",
        organization: "LTM",
        startDate: "June 2025",
        endDate: "Present",
        bullets: [
            "Built a LangGraph-based RAG system integrated with Azure AI Search to retrieve and analyze LTM's financial earnings call data, improving contextual search accuracy by ~40% and reducing manual lookup time by ~60%.",
            "Developed an automated financial data ingestion pipeline using Crawl4AI to extract and structure LTI data from Yahoo Finance, processing 1000+ records per run.",
            "Engineered a Neo4j-based supervisor agent for graph-driven access control and authorization management, improving permission traceability and reducing conflicts.",
        ],
        tech: [
            "LangGraph",
            "Azure AI Search",
            "RAG",
            "Crawl4AI",
            "Neo4j",
        ],
    },
    {
        id: "outlier-remote",
        role: "AI and Code Reviewer",
        organization: "Outlier",
        startDate: "December 2024",
        endDate: "July 2025",
        bullets: [
            "Extensively evaluated and fine-tuned Large Language Models (LLMs) and agent-based systems, ensuring high accuracy, logical consistency, and hallucination reduction across diverse technical domains.",
            "Conducted rigorous code reviews of AI-generated solutions, proactively identifying and resolving complex bugs, security vulnerabilities, and performance bottlenecks to deliver robust, production-ready code.",
            "Engineered advanced, adversarial prompts to push model boundaries, systematically exposing edge cases and enhancing overall response quality and reasoning capabilities.",
            "Leveraged deep domain expertise in capital markets (crypto) and healthcare to rigorously verify factual correctness and provide actionable, high-impact feedback in a fast-paced environment.",
        ],
        tech: [
            "LLM Evaluation",
            "Prompt Engineering",
            "Code Review",
            "Agentic AI",
            "Python",
        ],
    },
];

// ─── Certifications ───────────────────────────────────────────
export const certifications: Certification[] = [
    {
        id: "aws-cloud-practitioner",
        title: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "January 21, 2024",
        bullets: [
            "Gained foundational knowledge in AWS cloud services, including core services like EC2, S3, and RDS",
            "Learned how to navigate the AWS Management Console and utilize key AWS services for cloud solutions",
        ],
    },
    {
        id: "gcp-digital-leader",
        title: "Google Cloud Digital Leader",
        issuer: "Google Cloud",
        date: "January 10, 2024",
        bullets: [
            "Acquired essential understanding of Google Cloud services, covering topics like cloud infrastructure and data storage solutions",
            "Built introductory skills in utilizing Google Cloud technologies to enhance business operations and productivity",
        ],
    },
    {
        id: "azure-ai-102",
        title: "Azure AI Engineer Associate (AI-102)",
        issuer: "Microsoft",
        date: "December 26, 2025",
        bullets: [
            "Demonstrated proficiency in building, managing, and deploying AI solutions that leverage Azure Cognitive Services and Azure Applied AI Services.",
            "Gained practical experience in natural language processing, computer vision, and conversational AI within the Azure ecosystem."
        ],
    },
    {
        id: "azure-ai-900",
        title: "Azure AI Fundamentals (AI-900)",
        issuer: "Microsoft",
        date: "September 12, 2025",
        bullets: [
            "Validated foundational knowledge of machine learning and artificial intelligence concepts, along with related Microsoft Azure services.",
            "Understood core principles of computer vision, natural language processing, and conversational AI workloads on Azure."
        ],
    },
];

// ─── Achievements ─────────────────────────────────────────────
export const achievements: Achievement[] = [];

// ─── Combined Timeline ───────────────────────────────────────
export const timelineItems: TimelineItem[] = [
    ...certifications.map((cert): TimelineItem => ({
        id: cert.id,
        title: cert.title,
        date: cert.date,
        issuer: cert.issuer,
        bullets: cert.bullets,
        icon: 'award',
        type: 'certification',
        link: cert.credentialUrl,
    })),
    ...achievements.map((ach): TimelineItem => ({
        id: ach.id,
        title: ach.title,
        date: ach.date,
        bullets: [ach.description],
        icon: ach.icon,
        type: 'achievement',
        link: ach.link,
        description: ach.description,
    })),
].sort((a, b) => {
    // Sort by date descending (most recent first)
    const dateA = a.date.includes('–') ? a.date.split('–')[0] : a.date;
    const dateB = b.date.includes('–') ? b.date.split('–')[0] : b.date;
    return dateB.localeCompare(dateA);
});

// ─── About ────────────────────────────────────────────────────
export const about = {
    summary:
        "I'm a GenAI Developer focused on building production-grade AI applications that solve real problems. From RAG systems and intelligent agents to evaluation pipelines and scalable deployments, I turn research into reliable, measurable products.",
    values: [
        "Building reliable systems that work in production, not just demos",
        "Measurable impact — every project should have quantifiable outcomes",
        "Clarity in architecture — clean code, clear documentation, maintainable systems",
        "Continuous learning — staying current with the rapidly evolving AI landscape",
    ],
    workflow: [
        "Requirements analysis & problem framing",
        "Rapid prototyping & proof of concept",
        "Evaluation & benchmarking",
        "Iterative improvement & optimization",
        "Production deployment & monitoring",
    ],
};

// ─── Hero Frame Config ────────────────────────────────────────
export const heroConfig = {
    frameCount: 240,
    framePathPattern: "/frames/ezgif-frame-{index}.jpg",
    heroScrollLength: "300vh",
    frameIndexPad: 3, // zero-pad to 3 digits: 001, 002, ...
};
