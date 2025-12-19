// Navigation links
export const navLinks = [
  { id: "about", title: "About" },
  { id: "projects", title: "Projects" },
  { id: "testimonials", title: "Testimonials" },
  { id: "experience", title: "Work" },
  { id: "contact", title: "Contact" },
];

// Hero section content
export const heroContent = {
  greeting: "Dear Stranger",
  name: "Sai",
  title: "Software Engineer",
  description:
    "A Software Engineer with expertise in building distributed systems, microservices, and scalable backend solutions. I love to code stuff that makes a difference.",
};

// About section
export const aboutContent = {
  title: "About Me",
  description: `I'm a Software Engineer with 2+ years of experience building production-grade distributed systems. 
  Currently completing my MS in Computer Science at University at Buffalo, I specialize in Java, Spring Boot, 
  AWS, and designing systems that handle millions of records with high accuracy and performance.
  
  My passion lies in solving complex problems and building software that scales. Whether it's designing 
  event-driven architectures or optimizing database queries, I thrive on technical challenges that push 
  the boundaries of what's possible.`,
  skills: [
    "Java",
    "Python",
    "Spring Boot",
    "AWS",
    "Kafka",
    "Redis",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "React",
    "TypeScript",
    "System Design",
  ],
};

// Experience data
export const experiences = [
  {
    title: "Software Engineer",
    company: "ClearTax",
    date: "Jul 2021 - Jul 2023",
    description:
      "Built distributed systems and microservices handling 40K+ requests per minute. Developed invoice reconciliation engines processing 25M+ records with 99.9% accuracy. Implemented event-driven architectures using Kafka and Redis.",
    icon: "💼",
    iconBg: "#3b82f6",
  },
  {
    title: "Software Engineer Intern",
    company: "Priority Pulse",
    date: "Jan 2021 - Jun 2021",
    description:
      "Developed backend services and APIs for the core platform. Worked on optimizing database queries and improving system performance.",
    icon: "🚀",
    iconBg: "#8b5cf6",
  },
  {
    title: "MS in Computer Science",
    company: "University at Buffalo",
    date: "Aug 2023 - Dec 2025",
    description:
      "Focusing on Database Systems, Distributed Systems, and Advanced Algorithms. Working on projects involving B-tree implementations, query optimization, and distributed computing.",
    icon: "🎓",
    iconBg: "#10b981",
  },
];

// Projects data
export const projects = [
  {
    name: "Invoice Reconciliation Engine",
    description:
      "High-performance reconciliation system processing 25M+ invoices with 99.9% accuracy. Built with Java, Spring Boot, and optimized PostgreSQL queries.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "Redis"],
    image: "/project1.png",
    sourceCode: "https://github.com/sai",
    liveDemo: "",
  },
  {
    name: "Real-time Event Processing",
    description:
      "Event-driven architecture handling 40K+ requests/minute using Kafka, Redis, and microservices for tax filing platform during peak periods.",
    tags: ["Kafka", "Redis", "Microservices", "AWS"],
    image: "/project2.png",
    sourceCode: "https://github.com/sai",
    liveDemo: "",
  },
  {
    name: "Database Query Optimizer",
    description:
      "Custom B-tree implementation and query optimizer for TPC-H benchmark queries. Achieved significant performance improvements over baseline.",
    tags: ["Java", "Algorithms", "Database Systems"],
    image: "/project3.png",
    sourceCode: "https://github.com/sai",
    liveDemo: "",
  },
];

// Tech stack icons (using simple representations)
export const technologies = [
  { name: "Java", icon: "☕" },
  { name: "Python", icon: "🐍" },
  { name: "Spring Boot", icon: "🍃" },
  { name: "AWS", icon: "☁️" },
  { name: "Kafka", icon: "📨" },
  { name: "Redis", icon: "🔴" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Docker", icon: "🐳" },
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "📘" },
];

// Social links
export const socialLinks = {
  github: "https://github.com/sai",
  linkedin: "https://linkedin.com/in/sai",
  email: "sai@example.com",
};

// Contact content
export const contactContent = {
  title: "Get In Touch",
  description:
    "I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
};
