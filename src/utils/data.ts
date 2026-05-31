// Seed data and schemas for the EduNexta Premium CMS

export interface Module {
  week: string;
  title: string;
  topics: string[];
  practicalAssignment: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  duration: string;
  level: string; // 'Beginner' | 'Intermediate' | 'Advanced'
  modulesCount: number;
  rating: number;
  enrolledStudents: number;
  price: string;
  originalPrice: string;
  skillsAcquired: string[];
  features: string[];
  curriculum: Module[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  story: string;
  salaryGrowth: string; // e.g. "+150% Growth"
  beforeSalary: string; // e.g. "3.5 LPA"
  afterSalary: string;  // e.g. "8.8 LPA"
  beforeRole: string;   // e.g. "Sales Executive"
  afterRole: string;    // e.g. "AI Growth Marketer"
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Placements' | 'Curriculum' | 'AI Tools';
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  bio: string;
  skills: string[];
}

// Initial seed data that acts as a mock database
export const initialCourses: Course[] = [
  {
    id: 'c1',
    slug: 'ai-powered-digital-marketing-executive',
    title: 'AI-Powered Digital Marketing Executive Program',
    category: 'Full-Stack Marketing',
    tagline: 'Master AI-driven campaigns, programmatic ads, and hyper-growth strategies.',
    description: 'The industry-standard program designed in collaboration with Google & Meta experts. Learn to leverage OpenAI, Midjourney, and CRM automation to double conversion rates and automate 80% of manual marketing tasks.',
    duration: '6 Months',
    level: 'Intermediate',
    modulesCount: 24,
    rating: 4.9,
    enrolledStudents: 14205,
    price: '₹49,999',
    originalPrice: '₹89,999',
    skillsAcquired: ['OpenAI API for Copy', 'Programmatic Advertising', 'HubSpot Marketing Automation', 'SEO Schema & SEM', 'Midjourney Visual Design', 'Conversion Rate Optimization (CRO)'],
    features: ['100% Placement Guarantee', '10+ Live AI Projects', '1-on-1 Mentor Mentorship', 'Google & Meta Certifications'],
    curriculum: [
      {
        week: 'Weeks 1-4',
        title: 'Foundations of Growth & Marketing Psychology',
        topics: ['Consumer Behavior in the AI Era', 'Premium Brand Positioning', 'High-Converting Copywriting Basics', 'Landing Page Anatomy & CRO Theory'],
        practicalAssignment: 'Redesign a low-converting SaaS landing page using psychology principles.'
      },
      {
        week: 'Weeks 5-8',
        title: 'AI Content Generation & Automation Matrix',
        topics: ['Prompt Engineering for Copywriting (ChatGPT/Claude)', 'AI Image Generation (Midjourney/Stable Diffusion)', 'Video Production Automation', 'Dynamic Scale SEO Content Pipelines'],
        practicalAssignment: 'Build an automated SEO content engine that generates 30 high-quality blog posts in 1 hour.'
      },
      {
        week: 'Weeks 9-12',
        title: 'Performance Marketing & Programmatic Ads',
        topics: ['Meta Advanced Pixel & CAPI Setup', 'Google Search & PMax Campaigns', 'Programmatic DSP Bidding', 'Retargeting funnels that convert cold traffic'],
        practicalAssignment: 'Draft and launch a mock Meta Ads Campaign with a target ROAS of 4.5x using AI creatives.'
      },
      {
        week: 'Weeks 13-16',
        title: 'CRM Systems, Webhooks & Lead Nurturing',
        topics: ['HubSpot & Zapier Automated Workflows', 'Lead Scoring Algorithms', 'WhatsApp Business API campaigns', 'Advanced Email Funnels'],
        practicalAssignment: 'Construct a multi-channel lead validation and nurturing sequence connecting a landing page to a Google Sheet CRM via Zapier.'
      },
      {
        week: 'Weeks 17-20',
        title: 'Advanced Analytics, Cohorts & CRO Testing',
        topics: ['Google Analytics 4 (GA4) custom dimensions', 'Hotjar Heatmap Analysis', 'A/B Testing with VWO', 'Data Studio / Looker Dashboards'],
        practicalAssignment: 'Analyze a user session dataset, identify bottlenecks, and execute a winning A/B test.'
      },
      {
        week: 'Weeks 21-24',
        title: 'Capstone Project & Placement Preparation',
        topics: ['Portfolio Building', 'Resume Optimization with AI', 'Mock Interviews with Industry Experts', 'Client Pitching Simulations'],
        practicalAssignment: 'Create a comprehensive digital marketing growth plan for an actual product and pitch it live.'
      }
    ]
  },
  {
    id: 'c2',
    slug: 'performance-marketing-accelerator',
    title: 'Performance Marketing & Growth Hacking Accelerator',
    category: 'Advanced Performance',
    tagline: 'Scale campaigns from $1k to $100k daily budgets with predictive AI analytics.',
    description: 'Designed exclusively for experienced marketers looking to scale paid ads, automate bidding strategies, and build programmatic setups. Learn advanced data-driven growth strategies that drive massive ROAS.',
    duration: '3 Months',
    level: 'Advanced',
    modulesCount: 12,
    rating: 4.8,
    enrolledStudents: 8740,
    price: '₹34,999',
    originalPrice: '₹59,999',
    skillsAcquired: ['Predictive AI Bidding', 'Meta Conversion API (CAPI)', 'Media Buying Frameworks', 'SQL for Marketers', 'LTV & Cohort Analytics'],
    features: ['Live Ad Budget Grants', 'Premium Growth Tools Suite', 'Private Discord Group', 'Scaler-Alumni Networking'],
    curriculum: [
      {
        week: 'Weeks 1-4',
        title: 'Media Buying & Hyper-Scaling Frameworks',
        topics: ['Scaling Meta campaigns without fatigue', 'Search Engine Marketing programmatic optimization', 'Creative testing matrix structures'],
        practicalAssignment: 'Develop a media budget scaling plan for a D2C brand targeting 3x revenue growth.'
      },
      {
        week: 'Weeks 5-8',
        title: 'Data Infrastructures & Server-Side Tracking',
        topics: ['Setting up Meta Conversions API (CAPI)', 'Google Tag Manager server-side triggers', 'First-party data strategies'],
        practicalAssignment: 'Implement complete server-side tracking using Google Cloud platform.'
      },
      {
        week: 'Weeks 9-12',
        title: 'LTV Optimization & Predictive Modeling',
        topics: ['Cohort Analysis using Excel/Python', 'Predictive Customer Lifetime Value', 'Churn reduction funnels'],
        practicalAssignment: 'Analyze a raw transactional dataset and build a predictive LTV model.'
      }
    ]
  },
  {
    id: 'c3',
    slug: 'social-commerce-influencer-growth',
    title: 'AI Social Commerce & Brand Building Masterclass',
    category: 'Brand Strategy',
    tagline: 'Create viral AI-assisted social funnels and build a powerful consumer brand.',
    description: 'A complete blueprint to build viral organic social channels, manage creator partnerships, and automate short-form content pipelines (Reels, TikTok, YouTube Shorts) utilizing predictive content analytics.',
    duration: '4 Months',
    level: 'Beginner',
    modulesCount: 16,
    rating: 4.7,
    enrolledStudents: 11300,
    price: '₹24,999',
    originalPrice: '₹44,999',
    skillsAcquired: ['Viral Organic Funnels', 'CapCut & Premiere Automation', 'Influencer Campaign ROI', 'Pinterest & TikTok Ads', 'AI Avatars & Voiceovers'],
    features: ['Creator Sandbox Studio Access', 'Weekly Live Creative Reviews', 'Content Engine Kit', 'Influencer Database Access'],
    curriculum: [
      {
        week: 'Weeks 1-4',
        title: 'Viral Hooks & Social Algorithms Decoded',
        topics: ['Understanding Instagram, YouTube, and TikTok algorithms', 'AI sentiment analysis for trends', 'Dynamic storytelling formulas'],
        practicalAssignment: 'Produce a 60-second video using AI tools that garners over 10k mock organic views.'
      },
      {
        week: 'Weeks 5-8',
        title: 'Automated Content Pipeline Engineering',
        topics: ['Faceless channel systems using AI voices', 'Auto-subtitle setups', 'Batch creation routines'],
        practicalAssignment: 'Set up an automated content publishing calendar using Buffer/Hootsuite with AI.'
      },
      {
        week: 'Weeks 9-12',
        title: 'Influencer Marketing & Dynamic Commerce',
        topics: ['Creator outreach templates', 'Affiliate network architectures', 'Live stream shopping execution'],
        practicalAssignment: 'Draft an influencer campaign strategy with an end-to-end ROI tracker model.'
      },
      {
        week: 'Weeks 13-16',
        title: 'Monetization & Conversion Funnels',
        topics: ['Converting social followers into newsletter signups', 'Shopify social commerce integration', 'Community building strategies'],
        practicalAssignment: 'Design a social-to-store funnel that generates premium discount conversions.'
      }
    ]
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Aishwarya Nair',
    role: 'Growth Marketing Lead',
    company: 'Nykaa',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    story: 'EduNexta completely shifted my career. I was working in basic offline sales with a very stagnant growth trajectory. The program taught me meta paid ads, performance metrics, and cutting-edge generative AI tools. Before the course ended, I cracked an interview at Nykaa with a 150% package hike!',
    salaryGrowth: '150% Hike',
    beforeSalary: '₹3.6 LPA',
    afterSalary: '₹9.0 LPA',
    beforeRole: 'Offline Sales Specialist',
    afterRole: 'Growth Marketing Executive'
  },
  {
    id: 't2',
    name: 'Rahul Sharma',
    role: 'AI Performance Consultant',
    company: 'GrowthSchool',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    story: 'The AI Content Generation pipeline we built in week 6 is something I use every day at my work now. It literally saves us over 30 hours a week. The course is incredibly practical, and the placement support works with you closely until you succeed. Highly recommend to everyone.',
    salaryGrowth: '120% Hike',
    beforeSalary: '₹5.0 LPA',
    afterSalary: '₹11.0 LPA',
    beforeRole: 'Junior SEO Associate',
    afterRole: 'AI Performance Lead'
  },
  {
    id: 't3',
    name: 'Karan Mehra',
    role: 'Founder & CEO',
    company: 'PixelForge Agency',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    story: 'Instead of looking for a job, I used the capstone module to launch my own full-fledged digital marketing agency. The mentors helped me acquire my first three high-ticket international clients. Our agency now pulls in over $12,000 in monthly recurring revenues.',
    salaryGrowth: 'Entrepreneur',
    beforeSalary: '₹0 LPA',
    afterSalary: '₹14.0 LPA Equivalent',
    beforeRole: 'College Student',
    afterRole: 'Agency Founder & CEO'
  }
];

export const initialFAQs: FAQ[] = [
  {
    id: 'f1',
    question: 'Do I need a coding or technical background to enroll?',
    answer: 'Absolutely not! Our curriculum starts from the absolute fundamentals of digital marketing. While we cover AI automation tools, webhooks, and integrations, everything is taught through user-friendly, no-code/low-code tools such as Zapier, HubSpot, and ChatGPT.',
    category: 'General'
  },
  {
    id: 'f2',
    question: 'How does the 100% Placement Guarantee work?',
    answer: 'Our placement program features a robust network of 350+ hiring partners including Nykaa, Google, Meta, Simplilearn, and top-tier agencies. If you complete all course modules, assignments, and capstone projects and pass our mock interviews, you will get guaranteed interview opportunities. If you do not land a placement within 6 months of graduation, we refund your complete tuition fee.',
    category: 'Placements'
  },
  {
    id: 'f3',
    question: 'What AI tools are covered in this program?',
    answer: 'You will gain hand-on expertise in advanced AI marketing tools: ChatGPT/Claude for dynamic copy, Midjourney/Stable Diffusion for visual creatives, Synthesia/HeyGen for video production, Zapier/Make for operations automation, and predictive modeling algorithms for paid search.',
    category: 'AI Tools'
  },
  {
    id: 'f4',
    question: 'Can I attend the live sessions while working full-time?',
    answer: 'Yes! The programs are built specifically for working professionals. We offer weekend cohorts (Saturday & Sunday live sessions) as well as self-paced flexible models where you can watch session recordings and connect with mentors on our support desk.',
    category: 'General'
  },
  {
    id: 'f5',
    question: 'What certifications will I receive?',
    answer: 'You will receive the premium EduNexta Certified AI Digital Marketing Expert Diploma, plus you will be fully guided to crack and secure 8+ industry certificates including Google Search, Google Display, Google Analytics, Meta Certified Digital Marketing Associate, and HubSpot Email Automation.',
    category: 'Curriculum'
  }
];

export const initialMentors: Mentor[] = [
  {
    id: 'm1',
    name: 'Siddharth Roy',
    role: 'Ex-Senior Director of Growth',
    company: 'Meta APAC',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
    bio: 'Spent 8+ years scaling performance marketing and client growth frameworks at Meta. Sid has guided over 50 D2C brands to achieve $10M+ annual run rates.',
    skills: ['Paid Ads Scale', 'Meta Algorithm Optimization', 'Hyper-Growth Models']
  },
  {
    id: 'm2',
    name: 'Priyanka Sen',
    role: 'Lead Data Analytics Scientist',
    company: 'Google India',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    bio: 'Priyanka is an expert in predictive attribution mapping, GA4 customizations, and programmatic advertising campaigns.',
    skills: ['Predictive Attribution', 'Google Analytics 4', 'BigQuery Analytics']
  },
  {
    id: 'm3',
    name: 'Vikram Malhotra',
    role: 'AI Operations & Product Strategist',
    company: 'OpenAI Consultant',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250',
    bio: 'Passionate about integrating large language models into daily marketing operations. Vikram consults global Fortune 500 companies on generative AI pipelines.',
    skills: ['Prompt Engineering', 'Operations Automation', 'AI Video Pipelines']
  }
];
