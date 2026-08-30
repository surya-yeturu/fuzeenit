import '../config/env.js';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Category from '../models/Category.js';
import Course from '../models/Course.js';
import Resource from '../models/Resource.js';

const categories = [
  {
    name: 'AI & Data',
    slug: 'ai-data',
    description: 'Build expertise in artificial intelligence, machine learning, and data analytics.',
    programCount: 4,
    order: 1,
  },
  {
    name: 'Software Development',
    slug: 'development',
    description: 'Master modern software development with industry-standard tools and frameworks.',
    programCount: 3,
    order: 2,
  },
  {
    name: 'Cloud & DevOps',
    slug: 'cloud-devops',
    description: 'Learn cloud infrastructure, deployment pipelines, and DevOps practices.',
    programCount: 2,
    order: 3,
  },
  {
    name: 'Testing & Automation',
    slug: 'testing',
    description: 'Develop skills in software testing, QA automation, and quality assurance.',
    programCount: 2,
    order: 4,
  },
  {
    name: 'Enterprise Technologies',
    slug: 'enterprise',
    description: 'Explore enterprise platforms and business technology solutions.',
    programCount: 2,
    order: 5,
  },
  {
    name: 'Digital Marketing',
    slug: 'marketing',
    description: 'Learn digital marketing strategies for technology-driven businesses.',
    programCount: 2,
    order: 6,
  },
];

const defaultCurriculum = [
  {
    title: 'Module 01 — Foundations',
    description: 'Core concepts and fundamentals to build a strong base.',
    lessons: [
      { title: 'Introduction & Setup', duration: '2 hours', description: 'Environment setup and overview' },
      { title: 'Core Principles', duration: '4 hours', description: 'Fundamental concepts and terminology' },
      { title: 'Tools & Workflow', duration: '3 hours', description: 'Essential tools and development workflow' },
    ],
  },
  {
    title: 'Module 02 — Core Concepts',
    description: 'Deep dive into essential skills and techniques.',
    lessons: [
      { title: 'Applied Techniques', duration: '6 hours', description: 'Hands-on application of core concepts' },
      { title: 'Best Practices', duration: '4 hours', description: 'Industry standards and conventions' },
      { title: 'Problem Solving', duration: '5 hours', description: 'Structured approach to technical challenges' },
    ],
  },
  {
    title: 'Module 03 — Advanced Concepts',
    description: 'Advanced topics for professional-level proficiency.',
    lessons: [
      { title: 'Advanced Patterns', duration: '6 hours', description: 'Complex patterns and architectures' },
      { title: 'Performance & Optimization', duration: '4 hours', description: 'Optimization strategies' },
    ],
  },
  {
    title: 'Module 04 — Projects',
    description: 'Build real-world projects to apply your skills.',
    lessons: [
      { title: 'Project Planning', duration: '2 hours', description: 'Scoping and planning project work' },
      { title: 'Project Implementation', duration: '12 hours', description: 'Hands-on project development' },
      { title: 'Project Review', duration: '3 hours', description: 'Code review and refinement' },
    ],
  },
  {
    title: 'Module 05 — Career Preparation',
    description: 'Prepare for interviews and professional opportunities.',
    lessons: [
      { title: 'Portfolio Development', duration: '4 hours', description: 'Building a professional portfolio' },
      { title: 'Interview Preparation', duration: '4 hours', description: 'Technical and behavioral interview prep' },
    ],
  },
];

const defaultFaqs = [
  {
    question: 'Who is this program designed for?',
    answer: 'This program is designed for professionals and aspiring technologists who want to build practical, industry-relevant skills. No prior experience is required for beginner-level programs.',
  },
  {
    question: 'What is the learning format?',
    answer: 'Programs combine structured learning modules, hands-on exercises, and guided projects. Live sessions and mentor support are included based on the program format.',
  },
  {
    question: 'How long does it take to complete?',
    answer: 'Program duration varies by track. Most programs range from 8 to 16 weeks depending on the depth of content and your pace of learning.',
  },
  {
    question: 'Will I receive a certificate?',
    answer: 'Upon successful completion of the program requirements, you will receive a certificate of completion from FUZEN IT.',
  },
  {
    question: 'Is there career support included?',
    answer: 'Yes. Programs include career guidance, portfolio review, and interview preparation support to help you present your skills effectively.',
  },
  {
    question: 'Can I speak with someone before enrolling?',
    answer: 'Absolutely. Use the "Talk to an Expert" option to schedule a consultation with our team to discuss your goals and find the right program.',
  },
];

const courses = [
  {
    title: 'Data Science & AI',
    slug: 'data-science-ai',
    category: 'AI & Data',
    categorySlug: 'ai-data',
    shortDescription: 'Learn data analysis, machine learning, and AI fundamentals with hands-on projects.',
    description: 'A comprehensive program covering data science workflows, statistical analysis, machine learning algorithms, and AI applications. Build practical skills through real-world datasets and projects.',
    duration: '16 weeks',
    level: 'Intermediate',
    mode: 'Online',
    featured: true,
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'Jupyter', 'SQL'],
    learningOutcomes: [
      'Analyze and visualize complex datasets using Python',
      'Build and evaluate machine learning models',
      'Apply statistical methods to solve business problems',
      'Implement AI solutions for real-world use cases',
      'Create data pipelines and automated workflows',
      'Present insights through professional data storytelling',
    ],
    projects: [
      {
        title: 'Customer Churn Prediction',
        description: 'Build a predictive model to identify customers at risk of churning using historical transaction data.',
        technologies: ['Python', 'Scikit-learn', 'Pandas'],
        outcome: 'Deployable ML model with evaluation metrics and business recommendations',
      },
      {
        title: 'Sales Analytics Dashboard',
        description: 'Create an interactive analytics dashboard to visualize sales trends and KPIs.',
        technologies: ['Python', 'SQL', 'Matplotlib'],
        outcome: 'Professional dashboard with actionable business insights',
      },
    ],
    careerOutcomes: ['Data Analyst', 'Data Scientist', 'ML Engineer', 'Business Analyst', 'AI Specialist'],
    faqs: defaultFaqs,
    curriculum: defaultCurriculum,
  },
  {
    title: 'Generative AI',
    slug: 'generative-ai',
    category: 'AI & Data',
    categorySlug: 'ai-data',
    shortDescription: 'Master generative AI, LLMs, prompt engineering, and AI application development.',
    description: 'Explore the rapidly evolving field of generative AI. Learn to work with large language models, build AI-powered applications, and implement responsible AI practices.',
    duration: '12 weeks',
    level: 'Intermediate',
    mode: 'Online',
    featured: true,
    technologies: ['Python', 'OpenAI API', 'LangChain', 'Hugging Face', 'Vector DBs', 'FastAPI'],
    learningOutcomes: [
      'Understand generative AI architecture and capabilities',
      'Design effective prompts and AI workflows',
      'Build applications using LLM APIs and frameworks',
      'Implement RAG systems for domain-specific AI',
      'Apply AI safety and responsible usage practices',
    ],
    projects: [
      {
        title: 'AI Document Assistant',
        description: 'Build a RAG-based document Q&A system for enterprise knowledge bases.',
        technologies: ['Python', 'LangChain', 'OpenAI API', 'Pinecone'],
        outcome: 'Functional AI assistant with document retrieval capabilities',
      },
      {
        title: 'Content Generation Pipeline',
        description: 'Create an automated content generation workflow with quality controls.',
        technologies: ['Python', 'FastAPI', 'OpenAI API'],
        outcome: 'Production-ready content pipeline with API endpoints',
      },
    ],
    careerOutcomes: ['AI Engineer', 'Prompt Engineer', 'AI Application Developer', 'ML Engineer'],
    faqs: defaultFaqs,
    curriculum: defaultCurriculum,
  },
  {
    title: 'Full Stack Development',
    slug: 'full-stack-development',
    category: 'Software Development',
    categorySlug: 'development',
    shortDescription: 'Build complete web applications with React, Node.js, and MongoDB.',
    description: 'A comprehensive full stack program covering frontend development, backend APIs, databases, authentication, and deployment. Build production-ready applications from scratch.',
    duration: '16 weeks',
    level: 'Beginner',
    mode: 'Hybrid',
    featured: true,
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'Git', 'REST APIs'],
    learningOutcomes: [
      'Build responsive web interfaces with React',
      'Create RESTful APIs with Node.js and Express',
      'Design and implement MongoDB database schemas',
      'Implement authentication and authorization',
      'Deploy full stack applications to cloud platforms',
      'Follow professional development workflows with Git',
    ],
    projects: [
      {
        title: 'E-Commerce Platform',
        description: 'Develop a full-featured e-commerce application with product catalog, cart, and checkout.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        outcome: 'Deployed full stack application with payment integration',
      },
      {
        title: 'Project Management Tool',
        description: 'Build a collaborative project management application with real-time updates.',
        technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
        outcome: 'Interactive web application with team collaboration features',
      },
    ],
    careerOutcomes: ['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Web Developer'],
    faqs: defaultFaqs,
    curriculum: defaultCurriculum,
  },
  {
    title: 'Data Engineering',
    slug: 'data-engineering',
    category: 'AI & Data',
    categorySlug: 'ai-data',
    shortDescription: 'Design and build scalable data pipelines and infrastructure.',
    description: 'Learn to architect, build, and maintain data pipelines that power analytics and AI systems. Cover ETL processes, data warehousing, and cloud data services.',
    duration: '14 weeks',
    level: 'Intermediate',
    mode: 'Online',
    featured: true,
    technologies: ['Python', 'Apache Spark', 'Airflow', 'SQL', 'AWS', 'Kafka', 'dbt'],
    learningOutcomes: [
      'Design scalable data pipeline architectures',
      'Implement ETL/ELT processes with modern tools',
      'Work with batch and streaming data processing',
      'Build and maintain data warehouses',
      'Monitor and optimize data infrastructure',
    ],
    projects: [
      {
        title: 'Real-Time Analytics Pipeline',
        description: 'Build an end-to-end streaming data pipeline for real-time analytics.',
        technologies: ['Python', 'Kafka', 'Spark', 'AWS'],
        outcome: 'Production-grade streaming pipeline with monitoring',
      },
    ],
    careerOutcomes: ['Data Engineer', 'Analytics Engineer', 'ETL Developer', 'Cloud Data Engineer'],
    faqs: defaultFaqs,
    curriculum: defaultCurriculum,
  },
  {
    title: 'Cloud & DevOps',
    slug: 'cloud-devops',
    category: 'Cloud & DevOps',
    categorySlug: 'cloud-devops',
    shortDescription: 'Master cloud platforms, CI/CD pipelines, and infrastructure automation.',
    description: 'Learn to deploy, manage, and scale applications on cloud platforms. Cover DevOps practices, containerization, orchestration, and infrastructure as code.',
    duration: '12 weeks',
    level: 'Intermediate',
    mode: 'Online',
    featured: true,
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions', 'Linux'],
    learningOutcomes: [
      'Deploy applications on AWS cloud services',
      'Containerize applications with Docker',
      'Orchestrate containers with Kubernetes',
      'Build CI/CD pipelines for automated deployment',
      'Implement infrastructure as code with Terraform',
      'Monitor and troubleshoot cloud infrastructure',
    ],
    projects: [
      {
        title: 'Cloud-Native Application Deployment',
        description: 'Deploy a microservices application on AWS with automated CI/CD.',
        technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
        outcome: 'Fully automated cloud deployment pipeline',
      },
    ],
    careerOutcomes: ['Cloud Engineer', 'DevOps Engineer', 'Site Reliability Engineer', 'Platform Engineer'],
    faqs: defaultFaqs,
    curriculum: defaultCurriculum,
  },
  {
    title: 'Software Testing',
    slug: 'software-testing',
    category: 'Testing & Automation',
    categorySlug: 'testing',
    shortDescription: 'Learn manual and automated testing strategies for modern applications.',
    description: 'Develop comprehensive testing skills covering manual testing, test automation, performance testing, and quality assurance best practices for web and mobile applications.',
    duration: '10 weeks',
    level: 'Beginner',
    mode: 'Online',
    featured: true,
    technologies: ['Selenium', 'Cypress', 'Jest', 'Postman', 'JIRA', 'TestNG', 'Java'],
    learningOutcomes: [
      'Design effective test cases and test plans',
      'Automate web application testing with Selenium and Cypress',
      'Perform API testing with Postman and REST Assured',
      'Execute performance and load testing',
      'Integrate testing into CI/CD pipelines',
    ],
    projects: [
      {
        title: 'Automated Test Suite',
        description: 'Build a comprehensive automated test suite for a web application.',
        technologies: ['Selenium', 'Cypress', 'Jest'],
        outcome: 'Complete test automation framework with reporting',
      },
    ],
    careerOutcomes: ['QA Engineer', 'Test Automation Engineer', 'SDET', 'Quality Analyst'],
    faqs: defaultFaqs,
    curriculum: defaultCurriculum,
  },
  {
    title: 'Java Enterprise Development',
    slug: 'java-enterprise',
    category: 'Enterprise Technologies',
    categorySlug: 'enterprise',
    shortDescription: 'Build enterprise applications with Java, Spring Boot, and microservices.',
    description: 'Master enterprise Java development with Spring Boot, microservices architecture, and enterprise integration patterns used in large-scale business applications.',
    duration: '14 weeks',
    level: 'Intermediate',
    mode: 'Hybrid',
    featured: false,
    technologies: ['Java', 'Spring Boot', 'Spring Security', 'Microservices', 'PostgreSQL', 'Maven'],
    learningOutcomes: [
      'Build RESTful APIs with Spring Boot',
      'Implement microservices architecture',
      'Apply enterprise security patterns',
      'Integrate with databases and messaging systems',
    ],
    projects: [
      {
        title: 'Enterprise HR Management System',
        description: 'Develop a microservices-based HR management platform.',
        technologies: ['Java', 'Spring Boot', 'PostgreSQL'],
        outcome: 'Scalable enterprise application with multiple services',
      },
    ],
    careerOutcomes: ['Java Developer', 'Backend Developer', 'Enterprise Developer', 'Software Engineer'],
    faqs: defaultFaqs,
    curriculum: defaultCurriculum,
  },
  {
    title: 'Digital Marketing & Analytics',
    slug: 'digital-marketing',
    category: 'Digital Marketing',
    categorySlug: 'marketing',
    shortDescription: 'Learn digital marketing strategies, SEO, and analytics for tech businesses.',
    description: 'Develop digital marketing skills tailored for technology companies. Cover SEO, content marketing, social media strategy, paid advertising, and marketing analytics.',
    duration: '8 weeks',
    level: 'Beginner',
    mode: 'Online',
    featured: false,
    technologies: ['Google Analytics', 'Google Ads', 'SEMrush', 'HubSpot', 'Meta Ads'],
    learningOutcomes: [
      'Develop data-driven marketing strategies',
      'Optimize websites for search engines',
      'Run effective paid advertising campaigns',
      'Analyze marketing performance with analytics tools',
    ],
    projects: [
      {
        title: 'Marketing Campaign Strategy',
        description: 'Plan and execute a complete digital marketing campaign with analytics tracking.',
        technologies: ['Google Analytics', 'Google Ads', 'SEMrush'],
        outcome: 'Documented campaign strategy with performance metrics',
      },
    ],
    careerOutcomes: ['Digital Marketing Specialist', 'SEO Analyst', 'Marketing Analyst', 'Growth Marketer'],
    faqs: defaultFaqs,
    curriculum: defaultCurriculum,
  },
  {
    title: 'Python Programming',
    slug: 'python-programming',
    category: 'Software Development',
    categorySlug: 'development',
    shortDescription: 'Master Python programming from fundamentals to advanced application development.',
    description: 'A structured Python program covering syntax, data structures, OOP, file handling, APIs, and application development. Ideal foundation for data science and web development tracks.',
    duration: '10 weeks',
    level: 'Beginner',
    mode: 'Online',
    featured: false,
    technologies: ['Python', 'Flask', 'SQLite', 'Git', 'pytest'],
    learningOutcomes: [
      'Write clean, efficient Python code',
      'Work with data structures and algorithms',
      'Build web applications with Flask',
      'Apply object-oriented programming principles',
    ],
    projects: [
      {
        title: 'Task Management API',
        description: 'Build a RESTful task management API with Flask and SQLite.',
        technologies: ['Python', 'Flask', 'SQLite'],
        outcome: 'Functional API with CRUD operations and testing',
      },
    ],
    careerOutcomes: ['Python Developer', 'Backend Developer', 'Automation Engineer'],
    faqs: defaultFaqs,
    curriculum: defaultCurriculum,
  },
  {
    title: 'Business Intelligence',
    slug: 'business-intelligence',
    category: 'AI & Data',
    categorySlug: 'ai-data',
    shortDescription: 'Transform data into actionable business insights with BI tools and techniques.',
    description: 'Learn to design dashboards, create reports, and deliver data-driven insights using leading business intelligence platforms and SQL.',
    duration: '10 weeks',
    level: 'Beginner',
    mode: 'Online',
    featured: false,
    technologies: ['Power BI', 'Tableau', 'SQL', 'Excel', 'DAX'],
    learningOutcomes: [
      'Create interactive dashboards and reports',
      'Write advanced SQL queries for analytics',
      'Design data models for business reporting',
      'Communicate insights to stakeholders effectively',
    ],
    projects: [
      {
        title: 'Executive Dashboard',
        description: 'Build an executive-level business dashboard with KPIs and drill-down capabilities.',
        technologies: ['Power BI', 'SQL'],
        outcome: 'Interactive dashboard with automated data refresh',
      },
    ],
    careerOutcomes: ['BI Analyst', 'Data Analyst', 'Reporting Analyst', 'Business Analyst'],
    faqs: defaultFaqs,
    curriculum: defaultCurriculum,
  },
];

const resources = [
  {
    title: 'Getting Started with Data Science',
    slug: 'getting-started-data-science',
    category: 'Data',
    shortDescription: 'A practical guide to beginning your data science learning journey with the right tools and mindset.',
    content: 'Data science combines statistics, programming, and domain knowledge to extract insights from data. This guide covers the foundational skills, tools, and learning path recommendations for aspiring data professionals.\n\nStart with Python fundamentals, then progress to data manipulation with Pandas, visualization with Matplotlib, and basic statistical analysis. Build projects early to apply what you learn.',
    author: 'FUZEN IT Team',
    readingTime: '8 min read',
  },
  {
    title: 'Understanding Generative AI',
    slug: 'understanding-generative-ai',
    category: 'AI',
    shortDescription: 'Learn what generative AI is, how it works, and how professionals are using it in their workflows.',
    content: 'Generative AI refers to artificial intelligence systems that can create new content — text, images, code, and more. Large Language Models (LLMs) like GPT have transformed how developers and analysts work.\n\nThis article covers the fundamentals of generative AI, practical applications, and responsible usage guidelines for professionals.',
    author: 'FUZEN IT Team',
    readingTime: '10 min read',
  },
  {
    title: 'Full Stack Development Roadmap',
    slug: 'full-stack-development-roadmap',
    category: 'Development',
    shortDescription: 'A structured roadmap for learning full stack web development from scratch.',
    content: 'Full stack development requires proficiency in both frontend and backend technologies. This roadmap outlines a logical progression: HTML/CSS fundamentals, JavaScript, React for frontend, Node.js for backend, databases, and deployment.\n\nFocus on building projects at each stage rather than consuming tutorials passively.',
    author: 'FUZEN IT Team',
    readingTime: '12 min read',
  },
  {
    title: 'Cloud Computing Fundamentals',
    slug: 'cloud-computing-fundamentals',
    category: 'Cloud',
    shortDescription: 'Essential concepts every technologist should understand about cloud computing.',
    content: 'Cloud computing delivers computing services over the internet. Understanding IaaS, PaaS, and SaaS models, along with major providers like AWS, Azure, and GCP, is essential for modern technology careers.\n\nThis guide covers core cloud concepts, common services, and a learning path for cloud professionals.',
    author: 'FUZEN IT Team',
    readingTime: '7 min read',
  },
  {
    title: 'Building a Technology Career Portfolio',
    slug: 'building-tech-career-portfolio',
    category: 'Career',
    shortDescription: 'How to create a portfolio that effectively showcases your technical skills to employers.',
    content: 'A strong portfolio demonstrates your ability to solve real problems with code. Include 3-5 quality projects that show different skills, write clear README files, and deploy your work so recruiters can see it live.\n\nQuality over quantity — one well-documented project beats ten incomplete ones.',
    author: 'FUZEN IT Team',
    readingTime: '6 min read',
  },
  {
    title: 'Technical Interview Preparation Guide',
    slug: 'technical-interview-preparation',
    category: 'Interview Preparation',
    shortDescription: 'Strategies and resources for preparing for technical interviews in software and data roles.',
    content: 'Technical interviews typically assess problem-solving ability, coding skills, and system design knowledge. Prepare by practicing coding problems, reviewing fundamentals, and preparing to discuss your projects in detail.\n\nMock interviews and structured preparation significantly improve outcomes.',
    author: 'FUZEN IT Team',
    readingTime: '9 min read',
  },
  {
    title: 'Introduction to DevOps Practices',
    slug: 'introduction-devops-practices',
    category: 'Cloud',
    shortDescription: 'Learn the core principles and practices of DevOps for modern software delivery.',
    content: 'DevOps bridges development and operations through automation, collaboration, and continuous improvement. Key practices include CI/CD, infrastructure as code, monitoring, and containerization.\n\nUnderstanding DevOps is increasingly essential for developers, operations engineers, and platform teams.',
    author: 'FUZEN IT Team',
    readingTime: '8 min read',
  },
  {
    title: 'SQL for Data Analysis',
    slug: 'sql-for-data-analysis',
    category: 'Data',
    shortDescription: 'Master SQL queries and techniques essential for data analysis and reporting.',
    content: 'SQL remains the most important skill for working with structured data. Learn SELECT queries, JOINs, aggregations, window functions, and subqueries to extract meaningful insights from databases.\n\nPractice with real datasets to build fluency and confidence.',
    author: 'FUZEN IT Team',
    readingTime: '11 min read',
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Promise.all([
      Category.deleteMany({}),
      Course.deleteMany({}),
      Resource.deleteMany({}),
    ]);

    console.log('Seeding categories...');
    await Category.insertMany(categories);

    console.log('Seeding courses...');
    await Course.insertMany(courses);

    console.log('Seeding resources...');
    await Resource.insertMany(resources);

    console.log('Database seeded successfully!');
    console.log(`  - ${categories.length} categories`);
    console.log(`  - ${courses.length} courses`);
    console.log(`  - ${resources.length} resources`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
