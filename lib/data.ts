import {
  Bug,
  Cloud,
  Code2,
  Crosshair,
  FlaskConical,
  GitBranch,
  Layers,
  Network,
  Rocket,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  TestTube2,
  Trophy
} from "lucide-react";

// ---------------------------------------------------------------------------
// Identity & contact
// ---------------------------------------------------------------------------

export const identity = {
  name: "Sahan Chamod",
  headline: "DevSecOps Engineer · Cybersecurity Researcher · Security Engineer",
  location: "Colombo, Sri Lanka",
  email: "Sahanchamod245@gmail.com",
  phone: "+94 70 211 0688",
  phoneHref: "tel:+94702110688",
  currentRole: "DevSecOps Engineer at Port City BPO"
};

export const email = identity.email;

// `verified` marks profile URLs that point at a specific account rather than a platform homepage.
// Only verified profiles are emitted into the Person JSON-LD `sameAs` list.
export const socials = [
  { label: "GitHub", href: "https://github.com/sahachamod", external: true, verified: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sahan-chamod-64153a22b", external: true, verified: true },
  { label: "Medium", href: "https://medium.com/@sahanchamod", external: true, verified: true },
  { label: "Email", href: `mailto:${identity.email}`, external: false, verified: false }
];

export const github = socials[0].href;
export const linkedin = socials[1].href;
export const medium = socials[2].href;

// ---------------------------------------------------------------------------
// Professional experience
// ---------------------------------------------------------------------------

export const experience = [
  {
    company: "Port City BPO",
    role: "DevSecOps Engineer",
    period: "April 2026 – Present",
    type: "Full-time",
    points: [
      "Integrate security practices into software development, CI/CD, deployment, and operational workflows.",
      "Work across secure CI/CD, cloud and containerized environments, application security, security testing, and operational security.",
      "Apply DevSecOps and security engineering principles to identify, assess, and reduce application and infrastructure risks.",
      "Support security automation, source-control workflows, deployment practices, and secure engineering processes."
    ],
    stack: ["CI/CD Security", "AWS", "Azure", "Docker", "Kubernetes", "GitHub Actions", "AppSec"]
  },
  {
    company: "Freelance",
    role: "DevSecOps & Cybersecurity Consultant",
    period: "2025 – 2026",
    type: "Consulting",
    points: [
      "Provided consulting support across DevSecOps, application security, cloud security, vulnerability assessment, and secure software delivery.",
      "Advised on CI/CD security, container security, security testing, source-code review, deployment security, and practical risk reduction.",
      "Supported development and engineering teams in applying secure-by-design practices and security-focused automation.",
      "Worked across software engineering and cybersecurity requirements to strengthen application and infrastructure security."
    ],
    stack: ["DevSecOps", "Cloud Security", "Container Security", "Code Review", "Vulnerability Assessment"]
  },
  {
    company: "Adventa Holdings",
    role: "Junior Full-Stack Software Developer",
    period: "2023 – 2024",
    type: "Full-time",
    points: [
      "Implemented RESTful backend services using Node.js/Express and Python; optimized MySQL queries and used AWS/Azure services, contributing to a reported 20% reduction in average API response time.",
      "Built React components and integrated frontend applications with backend APIs.",
      "Developed AI bots and automated workflows using no-code platforms such as Bubble.io.",
      "Maintained feature branches, participated in pull-request reviews, supported unit testing and CI/CD workflows, and assisted with production deployments and troubleshooting."
    ],
    stack: ["Node.js", "Express", "Python", "React", "MySQL", "AWS", "Azure", "Bubble.io"]
  },
  {
    company: "Adventa Holdings",
    role: "Full-Stack Software Developer Intern",
    period: "2022 – 2023",
    type: "Internship",
    points: [
      "Developed RESTful APIs using Node.js/Express and Python, optimized MySQL queries, and deployed services on AWS/Azure.",
      "Built React components and integrated frontend applications with backend APIs.",
      "Supported testing, CI/CD workflows, deployments, troubleshooting, AI bots, and automated workflows."
    ],
    stack: ["Node.js", "Express", "Python", "React", "MySQL", "AWS", "Azure"]
  }
];

export const bugBounty = {
  title: "Bug Bounty Researcher — Bugcrowd & HackerOne",
  period: "2022 – Present",
  summary: "Security research and responsible vulnerability disclosure across web applications and technology platforms.",
  points: [
    "Conduct web application security testing, vulnerability research, reconnaissance, source-code analysis, and security validation within authorized programs.",
    "Research interests include web application vulnerabilities, authentication and authorization, injection vulnerabilities, infrastructure security, Linux security, reverse engineering, and applied cryptography."
  ],
  platforms: ["Bugcrowd", "HackerOne"]
};

// ---------------------------------------------------------------------------
// Education & certifications
// ---------------------------------------------------------------------------

export const education = [
  {
    degree: "BSc (Hons) Computer Science (Software Engineering)",
    institution: "Kingston University",
    period: "2024 – 2025",
    details: "Major: Web and Mobile · Minor: Machine Learning"
  },
  {
    degree: "Higher National Diploma in Computing",
    institution: "",
    period: "2022 – 2024",
    details: "Major: Software Development and Database · Minor: Computer Science"
  },
  {
    degree: "Diploma in Information Technology",
    institution: "",
    period: "2019",
    details: ""
  }
];

export const certifications = [
  { name: "HackerRank Python", year: "2023" },
  { name: "HackerRank Angular", year: "2023" },
  { name: "TryHackMe", year: "2022 – 2024" },
  { name: "PicoCTF", year: "2022 – 2024" },
  { name: "Hack The Box", year: "Active" },
  { name: "Bugcrowd", year: "Active" },
  { name: "HackerOne", year: "Active" }
];

export const languages = [
  ["English", "Fluent"],
  ["Sinhala", "Native proficiency"]
];

// ---------------------------------------------------------------------------
// Competitive achievements
// ---------------------------------------------------------------------------

export const achievements = [
  {
    title: "NASA Hall of Fame",
    result: "Letter of Recognition",
    detail: "Recognised by NASA for responsibly disclosing a security vulnerability through its Vulnerability Disclosure Program, with a letter of recognition and Hall of Fame listing.",
    stat: "NASA",
    icon: Rocket
  },
  {
    title: "Hack The Box Cyber Apocalypse 2026",
    result: "Global Rank #45",
    detail: "Competed as part of a team that achieved 45th place globally among 6,744 teams.",
    stat: "#45 / 6,744",
    icon: Trophy
  },
  {
    title: "Black Hat CTF",
    result: "Global Top 150",
    detail: "Achieved a top-150 global placement in a Black Hat CTF event.",
    stat: "Top 150",
    icon: ShieldCheck
  },
  {
    title: "Bug Bounty Programs",
    result: "Bugcrowd & HackerOne",
    detail: "Security research and responsible vulnerability disclosure across web applications and technology platforms since 2022.",
    stat: "Since 2022",
    icon: Bug
  }
];

export const ctfPlatforms = ["Hack The Box", "TryHackMe", "PicoCTF"];

export const ctfCategories = ["Web Security", "OSINT", "Digital Forensics", "Cloud Security", "Active Directory", "Reverse Engineering", "Exploitation", "Cryptography"];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const projects = [
  {
    title: "Network Traffic Analysis & Intrusion Detection",
    summary: "Designed an ML-based malicious-activity detection system that analyses network traffic to flag suspicious behaviour.",
    stack: ["Wireshark", "Python", "Machine Learning"],
    category: "Security Research",
    icon: Network
  },
  {
    title: "Dyslexia Support Mobile App",
    summary: "Developed an ML-powered literacy support application for learners with dyslexia.",
    stack: ["Flutter", "Firebase", "TensorFlow Lite"],
    category: "Mobile · ML",
    icon: Smartphone
  },
  {
    title: "School Management System",
    summary: "Administrative platform for school operations, tested by more than 100 users.",
    stack: ["Angular", "Node.js", "MySQL"],
    category: "Full-Stack",
    icon: Layers
  },
  {
    title: "Security Research",
    summary: "Ongoing work across web application security, vulnerability discovery, Linux binary exploitation, secure infrastructure, cryptography, threat modelling, and DevSecOps security automation.",
    stack: ["AppSec", "Binary Exploitation", "Cryptography", "Threat Modelling", "DevSecOps"],
    category: "Research",
    icon: FlaskConical
  }
];

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export const skills = [
  { group: "DevSecOps / Cloud", icon: Cloud, items: ["AWS", "Azure", "Docker", "Kubernetes", "Git", "GitHub Actions", "CI/CD", "Secure Software Delivery", "Container Security"] },
  { group: "Cybersecurity", icon: ShieldAlert, items: ["Web Application Security", "Penetration Testing", "Vulnerability Assessment", "OWASP", "Threat Modelling", "Network Security", "Security Testing", "Reverse Engineering"] },
  { group: "Security Tools", icon: Crosshair, items: ["Burp Suite", "Nmap", "Wireshark", "Linux", "Git", "Source-Code Review", "Security-Focused CI/CD"] },
  { group: "Programming", icon: Code2, items: ["JavaScript", "TypeScript", "Python", "C#", "PHP"] },
  { group: "Backend / Data", icon: GitBranch, items: ["Node.js", "Express", "Laravel", "MySQL", "MongoDB", "Firebase"] },
  { group: "Frontend / Mobile", icon: Smartphone, items: ["React", "Angular", "Flutter"] },
  { group: "Testing", icon: TestTube2, items: ["Jest", "Mocha", "Cypress", "Selenium", "Integration Testing", "TDD"] }
];

// ---------------------------------------------------------------------------
// Research tracks
// ---------------------------------------------------------------------------

export const researchCategories = ["ALL", "WEB", "DEVSECOPS", "CLOUD", "PWN", "RE", "CRYPTO"];

export const researchTracks = [
  {
    title: "Web Application Security",
    category: "WEB",
    date: "Ongoing",
    target: "Authentication, authorization, APIs, and session boundaries",
    methodology: "Manual testing, reconnaissance, source-code analysis, proxy-assisted validation",
    impact: "Account integrity, data exposure, authorization bypass",
    status: "Bug bounty · Responsible disclosure",
    tags: ["Authentication", "Authorization", "Injection", "XSS", "CSRF", "SSRF", "IDOR", "OWASP", "API Security"]
  },
  {
    title: "DevSecOps & CI/CD Security",
    category: "DEVSECOPS",
    date: "Ongoing",
    target: "Pipelines, source-control workflows, build and deployment systems",
    methodology: "Pipeline review, secrets and dependency analysis, security automation",
    impact: "Supply-chain exposure, secret leakage, insecure deployment paths",
    status: "Professional practice",
    tags: ["GitHub Actions", "CI/CD", "Secrets Management", "SAST", "Dependency Scanning", "Secure Delivery"]
  },
  {
    title: "Cloud & Container Security",
    category: "CLOUD",
    date: "Ongoing",
    target: "AWS and Azure identity, containers, Kubernetes, and deployment edges",
    methodology: "Configuration review, IAM analysis, container hardening, attack path mapping",
    impact: "Privilege escalation, exposed services, misconfiguration risk",
    status: "Professional practice · Research",
    tags: ["AWS", "Azure", "IAM", "Docker", "Kubernetes", "Cloud Misconfiguration"]
  },
  {
    title: "Linux Binary Exploitation",
    category: "PWN",
    date: "Ongoing",
    target: "Linux ELF binaries and memory safety controls",
    methodology: "GDB, crash triage, exploit prototyping, mitigation analysis",
    impact: "Memory corruption, control-flow hijacking, mitigation bypass",
    status: "Lab and CTF research",
    tags: ["ELF", "Stack Overflow", "Heap", "ROP", "ASLR", "NX", "PIE", "Canary"]
  },
  {
    title: "Reverse Engineering",
    category: "RE",
    date: "Ongoing",
    target: "Compiled software, protocols, and opaque workflows",
    methodology: "Static analysis, dynamic tracing, debugger workflows",
    impact: "Behaviour recovery, hidden logic, attack surface mapping",
    status: "Research notes",
    tags: ["Assembly", "Binary Analysis", "Static Analysis", "Dynamic Analysis", "Debugging"]
  },
  {
    title: "Applied Cryptography & Threat Modelling",
    category: "CRYPTO",
    date: "Ongoing",
    target: "Cryptographic implementations and system trust boundaries",
    methodology: "Primitive and protocol review, threat modelling, misuse analysis",
    impact: "Weak implementations, broken trust assumptions, design-level risk",
    status: "Research",
    tags: ["Cryptography", "Protocols", "Threat Modelling", "Secure Design"]
  }
];

export const disclosureSteps = ["Discovery", "Validation", "Report", "Vendor Communication", "Remediation", "Recognition"];

export const writing = [
  ["Securing GitHub Actions Pipelines", "DevSecOps", "Intermediate", "10 min", "[DATE]"],
  ["Practical Web Security Testing", "Web", "Intermediate", "10 min", "[DATE]"],
  ["Linux Binary Exploitation Notes", "PWN", "Advanced", "18 min", "[DATE]"],
  ["Cloud IAM Attack Paths", "Cloud", "Intermediate", "11 min", "[DATE]"],
  ["ML-Based Intrusion Detection with Wireshark", "Network", "Intermediate", "12 min", "[DATE]"],
  ["Getting Started with CTFs", "Education", "Beginner", "7 min", "[DATE]"]
];

// ---------------------------------------------------------------------------
// Structured data
// ---------------------------------------------------------------------------

export const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.name,
  jobTitle: "DevSecOps Engineer and Cybersecurity Researcher",
  email: `mailto:${identity.email}`,
  telephone: identity.phone,
  worksFor: { "@type": "Organization", name: "Port City BPO" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Kingston University" },
  award: ["NASA Hall of Fame - Letter of Recognition", "Hack The Box Cyber Apocalypse 2026 - Global Rank #45", "Black Hat CTF - Global Top 150"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Colombo",
    addressCountry: "Sri Lanka"
  },
  knowsAbout: [
    "DevSecOps",
    "Cybersecurity Research",
    "Vulnerability Research",
    "Bug Bounty",
    "Penetration Testing",
    "Web Application Security",
    "Cloud Security",
    "Container Security",
    "CI/CD Security",
    "Reverse Engineering",
    "Binary Exploitation",
    "Network Security",
    "Applied Cryptography",
    "Threat Modelling"
  ],
  sameAs: socials.filter((link) => link.external && link.verified).map((link) => link.href)
};

const isPlaceholder = (value: string) => /^\[.*\]$/.test(value);

// Articles with placeholder dates are not published yet, so they are excluded from structured data.
export const jsonLdArticles = writing
  .filter(([, , , , date]) => !isPlaceholder(date))
  .map(([headline, category, difficulty, timeRequired, date]) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    author: { "@type": "Person", name: identity.name },
    articleSection: category,
    educationalLevel: difficulty,
    timeRequired,
    datePublished: date
  }));

