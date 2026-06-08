export interface Skill {
  name: string;
  level: number; // 0 to 100
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  details?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface SocialLinks {
  email: string;
  linkedin: string;
  github: string;
  location: string;
}

export const portfolioData = {
  personalInfo: {
    name: "Amisha Usanga",
    title: "Full-Stack Developer | Cloud & Networking Enthusiast",
    tagline: "Building secure, scalable, and practical technology solutions.",
    bio: "I am a dedicated Computer Science undergraduate specializing in Computer Networking at the University of Staffordshire. With a robust passion for bridge-building between software engineering and systems engineering, I focus on full-stack development, cloud systems, secure infrastructure, and networking. I enjoy solving complex structural problems and designing user-centric, secure web solutions that scale efficiently in production.",
  },
  
  skillGroups: [
    {
      category: "Programming and Web",
      skills: [
        { name: "TypeScript / JavaScript", level: 88 },
        { name: "React.js", level: 85 },
        { name: "Node.js & Express.js", level: 82 },
        { name: "C# / .NET", level: 78 },
        { name: "HTML5 & CSS3", level: 90 },
      ]
    },
    {
      category: "Databases and APIs",
      skills: [
        { name: "MySQL", level: 82 },
        { name: "RESTful APIs", level: 88 },
        { name: "JSON Parsing & Protocols", level: 85 },
        { name: "Query Optimization", level: 75 },
      ]
    },
    {
      category: "Cloud and Infrastructure",
      skills: [
        { name: "Azure Functions & Serverless", level: 75 },
        { name: "AWS S3 & Cloud Storage", level: 78 },
        { name: "Ubuntu Linux & Hardening", level: 82 },
        { name: "NGINX & Reverse Proxies", level: 80 },
        { name: "UFW, SSH & Fail2Ban", level: 85 },
      ]
    },
    {
      category: "Development Concepts",
      skills: [
        { name: "Git & Version Control", level: 88 },
        { name: "TCP/IP Networking", level: 85 },
        { name: "Secure IT Infrastructure", level: 82 },
        { name: "Multi-threading & Concurrency", level: 75 },
        { name: "Responsive Web Design", level: 90 },
      ]
    },
    {
      category: "Professional Skills",
      skills: [
        { name: "Analytical Problem Solving", level: 88 },
        { name: "Technical Communication", level: 85 },
        { name: "Project Management", level: 80 },
        { name: "Team Collaboration", level: 85 },
      ]
    }
  ] as SkillGroup[],

  projects: [
    {
      title: "Formula 1 Analytics Dashboard",
      description: "A comprehensive analytics visualizer for Formula 1 racing, giving users real-time insights and comparisons of driver stats, constructor records, and historically curated Grand Prix records.",
      tech: ["React.js", "Node.js", "Express.js", "MySQL", "Chart.js", "REST APIs"],
      features: [
        "Interactive Chart.js visualizations showing lap time progressions and speed profiles.",
        "Custom SQL queries optimized to fetch historical driver stats across 50+ seasons instantly.",
        "Secure RESTful API backend handling robust queries and caching third-party data.",
        "Modern dark mode dashboard with responsive grid elements."
      ],
      githubUrl: "https://github.com/amishausanga/f1-analytics-dashboard",
      liveUrl: undefined, // Coming Soon
      caseStudyUrl: undefined, // Coming Soon
    },
    {
      title: "Cloud-Based Job Application and Contractor Onboarding System",
      description: "A secure, serverless cloud platform engineered to automate applicant routing and speed up the verification and onboarding of contractors.",
      tech: ["HTML", "CSS", "JavaScript", "Node.js", "Azure Functions", "AWS S3", "JSON", "Nodemailer"],
      features: [
        "Serverless Node.js backend using Azure Functions to scale seamlessly with applicant load.",
        "AWS S3 integrations for secure, encrypted resume uploads and access control.",
        "Automated Nodemailer triggers for real-time application tracking updates.",
        "Responsive applicant dashboard with secure validation processes."
      ],
      githubUrl: "https://github.com/amishausanga/cloud-onboarding-system",
      liveUrl: undefined,
      caseStudyUrl: undefined,
    },
    {
      title: "Concurrent Multi-User Library Management System",
      description: "A high-performance Desktop application leveraging concurrent TCP connections to orchestrate books, active checkouts, and student profiles.",
      tech: ["C#/.NET", "Windows Forms", "TCP", "MySQL", "JSON"],
      features: [
        "Multi-threaded TCP socket server managing concurrent user requests without blocking.",
        "Thread-safe MySQL database connection pooling to handle peak catalog searching.",
        "Custom JSON-based communication protocol for secure, lightweight packet parsing.",
        "Intuitive admin interface for checking out items and monitoring active connections."
      ],
      githubUrl: "https://github.com/amishausanga/library-management-system",
      liveUrl: undefined,
      caseStudyUrl: undefined,
    },
    {
      title: "Sakura Breeze Restaurant Website",
      description: "A modern, responsive marketing and reservations website built for a premium dining restaurant, showcasing interactive menus and booking elements.",
      tech: ["HTML", "CSS", "JavaScript", "Responsive Web Design"],
      features: [
        "Sleek visual layouts blending Japanese aesthetics with micro-interactions.",
        "Fully responsive layout utilizing CSS grids and flexbox designed for mobile-first users.",
        "Dynamic menu filtering using vanilla JavaScript.",
        "Smooth scroll transitions and visual animations for elevated UX."
      ],
      githubUrl: "https://github.com/amishausanga/sakura-breeze",
      liveUrl: undefined,
      caseStudyUrl: undefined,
    }
  ] as Project[],

  education: [
    {
      degree: "BSc (Hons) Computer Science",
      institution: "University of Staffordshire",
      duration: "2023 – 2026",
      details: "Focusing on software systems architecture, databases, secure routing algorithms, and distributed computing."
    },
    {
      degree: "International Diploma in ICT",
      institution: "ICBT Campus",
      duration: "2024",
      details: "Comprehensive training in software development, web architecture, and database management systems."
    },
    {
      degree: "General ICT Foundation Programme",
      institution: "APIIT Sri Lanka",
      duration: "2022 – 2023",
      details: "Introductory studies in algorithms, object-oriented concepts, and basic systems operation."
    },
    {
      degree: "Certificate in Computer Networking",
      institution: "BCI Campus",
      duration: "2022",
      details: "Hands-on foundation covering Cisco routing protocols, network topologies, subnets, and standard topologies."
    },
    {
      degree: "G.C.E. Ordinary Level",
      institution: "St. Joseph’s College",
      duration: "2017 – 2018",
      details: "Secondary education with a strong focus on mathematics, sciences, and information technology."
    }
  ] as Education[],

  certifications: [
    {
      title: "Networking Foundations: Networking Basics",
      issuer: "LinkedIn Learning",
      date: "May 2025",
      credentialUrl: "https://www.linkedin.com/learning/certificates/288fd44d1846eb36c0e0848a6ef980ddfb3eb02ebf13867671f1d099dd4bda59"
    }
  ] as Certification[],

  socialLinks: {
    email: "amishausanga23@gmail.com",
    linkedin: "https://linkedin.com/in/jagodage-amisha-usanga-a64609345",
    github: "https://github.com/amishausanga2002",
    location: "United Kingdom"
  } as SocialLinks
};
