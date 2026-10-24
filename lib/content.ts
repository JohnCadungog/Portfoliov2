import { asset } from "./asset";

export type CareerId = "engineer" | "design" | "automation";

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  name: string;
  summary: string;
  role?: string;
  stack: string[];
  links: ProjectLink[];
  /** Real images. When empty the card shows a "photo coming" swatch. */
  images: string[];
  /** Short label printed on the swatch strip, e.g. "Branding". */
  kind: string;
  details?: string[];
};

export type Job = {
  company: string;
  role: string;
  dates: string;
  points: string[];
};

export type Career = {
  id: CareerId;
  label: string;
  title: string;
  ink: string;
  inkName: string;
  onInk: string;
  headline: string;
  pitch: string;
  resume: string;
  projects: Project[];
  skills: { group: string; items: string[] }[];
  jobs: Job[];
};

export const person = {
  name: "John Cadungog",
  location: "Mandaue City, Cebu, Philippines",
  email: "johnlocay2@gmail.com",
  phone: "+63 946 247 9239",
  links: [
    { label: "GitHub", href: "https://github.com/JohnCadungog" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/john-cadungog-480a5430a" },
    { label: "Behance", href: "https://www.behance.net/johncadungog1" },
    { label: "Peak Status", href: "https://peak-status.com" },
  ],
  education: {
    school: "Cebu Institute of Technology – University",
    degree: "BS Computer Science",
    dates: "2020 – 2025",
    honors: "First Year Parangal Awardee",
  },
};

const RESUME = asset("/documents/john-cadungog-software-engineer.pdf");
const gh = (repo: string): ProjectLink => ({
  label: "GitHub",
  href: `https://github.com/JohnCadungog/${repo}`,
});

const atpImages = [
  asset("/work/atp/06-teal-billboard-aframe.webp"),
  asset("/work/atp/09-logo-blue-on-white.png"),
  asset("/work/atp/10-logo-white-on-blue.png"),
  asset("/work/atp/08-teal-hanging-sign.webp"),
  asset("/work/atp/07-teal-stationery.webp"),
  asset("/work/atp/02-logo-color-schemes.png"),
  asset("/work/atp/03-fonts-concept-signage.webp"),
  asset("/work/atp/04-billboard-aframe-mockups.webp"),
  asset("/work/atp/05-stationery-gold.webp"),
  asset("/work/atp/01-stationery-orange.webp"),
];

const leaveDesk: Project = {
  slug: "leavedesk",
  name: "LeaveDesk",
  kind: "Web app + n8n",
  summary:
    "Leave requests without the email chain. Employees submit, a manager approves or rejects, and everyone sees one shared dashboard and calendar.",
  stack: ["React 19", "TypeScript", "Vite", "shadcn/ui", "TanStack Query", "Supabase", "n8n"],
  links: [gh("leave-dashboard")],
  images: [],
  details: [
    "Supabase Postgres with Auth and Row Level Security.",
    "n8n Cloud posts a Microsoft Teams message whenever a request is submitted or decided.",
    "Webhook secrets keep the automation endpoint closed to outsiders.",
  ],
};

const peakStatusOS: Project = {
  slug: "peak-status-os",
  name: "Peak Status OS",
  kind: "Internal platform",
  role: "Co-founder, full-stack",
  summary:
    "The operating system for my studio: sprint boards, Kanban, project tracking, a client directory, a shared calendar and team workload views.",
  stack: ["Next.js", "React", "TypeScript", "MCP"],
  links: [{ label: "Peak Status", href: "https://peak-status.com" }],
  images: [],
  details: [
    "Weekly sprint boards and a customizable Kanban with automatic project completion.",
    "Admin and member accounts with team workload views.",
    "AI task automation through MCP tools, with a preview and confirmation step.",
  ],
};

export const careers: Record<CareerId, Career> = {
  engineer: {
    id: "engineer",
    label: "Engineer",
    title: "Software Engineer",
    ink: "#2B3BE5",
    inkName: "2B3BE5 U",
    onInk: "#FFFFFF",
    headline: "I build the system behind the screen.",
    pitch:
      "Software Engineer at Accenture, shipping Spring Boot and .NET APIs. I plan with Claude Code, build with Codex, and review every change by hand.",
    resume: RESUME,
    projects: [
      peakStatusOS,
      {
        slug: "lime",
        name: "Lime",
        kind: "Booking app",
        summary:
          "Court booking for tennis, pickleball and events. Designed first, then built with Claude Code guided by design.md and agents.md.",
        stack: ["Claude Code", "design.md", "agents.md"],
        links: [],
        images: [],
      },
      {
        slug: "qr-fbs-dtsk",
        name: "QR-FBS Simulation Kit",
        kind: "Education platform",
        role: "Lead developer",
        summary:
          "A web simulation platform for Lazi Technical Institute with CRM and Reservation Management modules.",
        stack: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL"],
        links: [],
        images: [],
      },
      leaveDesk,
      {
        slug: "thenotesai",
        name: "TheNotesAI",
        kind: "AI notes app",
        summary: "A notes web app with AI built in, split into a Vue frontend and a JavaScript backend.",
        stack: ["Vue", "JavaScript"],
        links: [gh("thenotesAI_frontend"), { label: "Backend", href: "https://github.com/JohnCadungog/thenotesAI_backend" }],
        images: [],
      },
      {
        slug: "bird-bone",
        name: "Bird Bone Classifier",
        kind: "Machine learning",
        summary: "A CNN that identifies a bird from its bone measurements, tuned to about 98% accuracy.",
        stack: ["Python", "Keras", "scikit-learn"],
        links: [],
        images: [],
      },
      {
        slug: "code-interpreter",
        name: "CODE Interpreter",
        kind: "Language tooling",
        summary: "An interpreter for a custom language: lexer, parser and tokens, written in Java and again in C#.",
        stack: ["Java", "C#"],
        links: [gh("interpreter-CODE-language-"), { label: "C# version", href: "https://github.com/JohnCadungog/InterpreterApp-Code-Language-" }],
        images: [],
      },
      {
        slug: "expense-tracker",
        name: "Expense Tracker API",
        kind: "Backend",
        summary: "A budgeting backend built to support AI-powered spending recommendations later.",
        stack: ["REST API"],
        links: [gh("expense-tracker-backend")],
        images: [],
      },
    ],
    skills: [
      { group: "Languages", items: ["Java", "C#", "TypeScript", "JavaScript", "Python", "SQL", "Go", "PHP", "C/C++"] },
      { group: "Backend", items: ["Spring Boot", "ASP.NET Core", "Hibernate / JPA", "REST APIs", "Microservices"] },
      { group: "Frontend", items: ["React", "Next.js", "Angular", "Vue"] },
      { group: "Data", items: ["PostgreSQL", "MySQL", "SQL Server", "Supabase", "Firebase"] },
      { group: "DevOps", items: ["Docker", "Kubernetes", "Jenkins CI/CD", "Git"] },
      { group: "AI", items: ["Claude Code", "Codex", "MCP", "Copilot", "Cursor", "Keras", "scikit-learn"] },
    ],
    jobs: [
      {
        company: "Accenture",
        role: "Software Engineer, Spring & Java",
        dates: "May 2025 – now",
        points: [
          "REST APIs in Spring Boot for the internal CIO Legal platform, in an Agile Scrum team.",
          "Hibernate and JPA on PostgreSQL and MySQL; services shipped in Docker on Kubernetes.",
          "C# and ASP.NET Core Web APIs on SQL Server, integrated with Angular frontends.",
          "Proposed an agents.md standard so every AI-assisted change follows team rules.",
        ],
      },
      {
        company: "Peak Status",
        role: "Co-founder, full-stack & UI/UX",
        dates: "2026 – now",
        points: [
          "Built Peak Status OS, the studio's operations platform.",
          "Led the QR-FBS Simulation Kit for Lazi Technical Institute.",
        ],
      },
      {
        company: "Pixel8 Web Consultancy",
        role: "Full-stack developer intern",
        dates: "Jul – Aug 2024",
        points: [
          "Backend architecture for the CQFS project and secure API work.",
          "Promoted to quality assurance for testing and code review.",
        ],
      },
    ],
  },

  design: {
    id: "design",
    label: "Designer",
    title: "Graphic & UI/UX Designer",
    ink: "#D4006E",
    inkName: "D4006E U",
    onInk: "#FFFFFF",
    headline: "I design brands and the screens they live on.",
    pitch:
      "Freelance since 2019: logos, brand systems, social creatives and interfaces in Figma, Illustrator and Photoshop. Then I build the site too.",
    resume: RESUME,
    projects: [
      {
        slug: "atp-construction",
        name: "ATP Construction LLC",
        kind: "Brand identity",
        summary:
          "A, T and P fold into a house outline. Draft lines and half-painted strokes show a building in progress, around the idea “All Things Possible.”",
        stack: ["Illustrator", "Photoshop", "Montserrat"],
        links: [],
        images: atpImages,
        details: [
          "Two logo directions: solid teal and gold, and a draft-line version.",
          "Seven color schemes, from navy and gold to forest green and stone.",
          "Mockups for signage, a billboard, an A-frame and stationery.",
        ],
      },
      {
        slug: "social-creatives",
        name: "Social media creatives",
        kind: "Social",
        summary: "Campaign posts and marketing graphics for clients. Photos coming soon.",
        stack: ["Canva", "Photoshop"],
        links: [],
        images: [],
      },
      {
        slug: "ui-case-study",
        name: "UI/UX case study",
        kind: "Interface",
        summary: "A Figma case study from research to final screens. Photos coming soon.",
        stack: ["Figma"],
        links: [{ label: "Behance", href: "https://www.behance.net/johncadungog1" }],
        images: [],
      },
      {
        slug: "web-design",
        name: "Client websites",
        kind: "Web design",
        summary: "Sites built in WordPress, Elementor, Webflow and Wix with custom components. Photos coming soon.",
        stack: ["WordPress", "Webflow", "Wix"],
        links: [],
        images: [],
      },
    ],
    skills: [
      { group: "Design", items: ["Figma", "Illustrator", "Photoshop", "Canva"] },
      { group: "Motion", items: ["CapCut", "Remotion"] },
      { group: "Web", items: ["WordPress", "Elementor", "Webflow", "Wix", "HTML/CSS"] },
      { group: "Practice", items: ["Brand identity", "Logo design", "Social creatives", "UI/UX", "Design systems"] },
    ],
    jobs: [
      {
        company: "Freelance",
        role: "Web & UI/UX designer",
        dates: "Oct 2019 – now",
        points: [
          "Branding, social creatives, marketing graphics and UI/UX for clients.",
          "Websites in WordPress, Elementor, Wix and Webflow with custom HTML, CSS and JS.",
          "Video and motion content with CapCut and AI-assisted tools.",
        ],
      },
      {
        company: "Peak Status",
        role: "Co-founder, UI/UX designer",
        dates: "2026 – now",
        points: ["Design-first delivery: every client build starts as a design, then a design.md the code follows."],
      },
    ],
  },

  automation: {
    id: "automation",
    label: "Automation",
    title: "Automation & AI Workflows",
    ink: "#C6E400",
    inkName: "C6E400 U",
    onInk: "#11140A",
    headline: "I automate the busywork.",
    pitch:
      "Workflows that run themselves: n8n pipelines, MCP tools that let AI act safely inside real apps, and agentic coding setups teams can trust.",
    resume: RESUME,
    projects: [
      {
        ...peakStatusOS,
        slug: "peak-status-mcp",
        name: "AI task automation",
        kind: "MCP tools",
        summary:
          "MCP tools inside Peak Status OS let AI read options, search tasks and create up to 100 tasks in one batch.",
        details: [
          "Every batch shows a preview and waits for the user to confirm.",
          "Duplicate-request protection stops the same batch from landing twice.",
        ],
      },
      { ...leaveDesk, slug: "leavedesk-automation", kind: "n8n workflow", summary: "Every leave request and decision posts to Microsoft Teams on its own, through an n8n Cloud workflow." },
      {
        slug: "agentic-workflow",
        name: "Agentic coding standard",
        kind: "AI workflow",
        summary:
          "agents.md and design.md files that make AI coding agents follow a team's real rules. Proposed at Accenture and used on every Peak Status build.",
        stack: ["Claude Code", "Codex", "agents.md", "design.md"],
        links: [],
        images: [],
      },
      {
        slug: "remotion-video",
        name: "Motion graphics by prompt",
        kind: "Remotion",
        summary: "A full motion graphics video generated as Remotion (React) code from prompts, with concept, style and timing directed by me.",
        stack: ["Remotion", "Claude", "React"],
        links: [],
        images: [],
      },
    ],
    skills: [
      { group: "Automation", items: ["n8n", "Webhooks", "Microsoft Teams", "Jenkins CI/CD"] },
      { group: "AI tooling", items: ["Model Context Protocol", "Claude Code", "Codex", "Prompt & context engineering"] },
      { group: "Platforms", items: ["Supabase", "Docker", "Kubernetes", "Vercel"] },
    ],
    jobs: [
      {
        company: "Peak Status",
        role: "Co-founder, full-stack",
        dates: "2026 – now",
        points: ["Built MCP-based task automation into the studio's operations platform."],
      },
      {
        company: "Accenture",
        role: "Software Engineer",
        dates: "May 2025 – now",
        points: [
          "Support Jenkins CI/CD pipelines that cut manual deployment work.",
          "Proposed an agents.md standard for AI coding agents across the team.",
        ],
      },
    ],
  },
};

export const careerOrder: CareerId[] = ["engineer", "design", "automation"];

export function isCareer(value: string): value is CareerId {
  return (careerOrder as string[]).includes(value);
}
