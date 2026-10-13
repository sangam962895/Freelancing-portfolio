/*
 * CENTRAL PORTFOLIO CONTENT
 * ---------------------------------------------------------------
 * Edit this file to change what the site shows. Rules:
 *  - Any value that starts with "[" (for example "[YOUR EMAIL]") is a placeholder.
 *    Placeholder links are hidden automatically, so nothing broken is published.
 *  - Entries marked "[CONFIRM ...]" are drafts. Confirm or replace them before publishing.
 *  - Empty arrays hide their whole section (for example paidProof).
 * Asset paths are relative to /public, for example "assets/projects/plantcareai.jpg".
 */

export interface Profile {
  name: string;
  title: string;
  headline: string;
  intro: string;
  summary: string[];
  email: string;
  photo: string;
  resumeFile: string;
  resumeSummary: string;
  links: { label: string; url: string }[];
}

export const profile: Profile = {
  name: 'Sangam Kumar Gupt',
  title: 'AI Data Specialist | AI Training | Data Collection | AI/ML',
  headline: 'AI Data Specialist Focused on AI Training, Data Collection & Quality',
  intro:
    'I work on AI-related data tasks, including audio recording and AI training workflows. I also build AI/ML and generative AI projects, and I completed an AI/ML Engineer internship in 2026.',
  summary: [
    'Generative AI and ML engineer and B.Tech (Data Science) graduate, 2026.',
    'Builds RAG pipelines, CNN-based ML systems, and LLM-integrated applications end to end.',
    'Freelance AI data work: audio recording for voice-recognition and anti-spoofing datasets, and image annotation on an English image project.',
  ],
  email: 'info.sangamgupta@gmail.com',
  photo: 'assets/profile/profile-photo.jpg',
  resumeFile: 'assets/resume/sangam-gupt-resume.pdf',
  resumeSummary:
    'Generative AI and ML engineer with hands-on experience in RAG pipelines, CNN-based ML systems, LLM integration, and an AI/ML internship.',
  links: [
    { label: 'LinkedIn', url: '[YOUR LINKEDIN URL]' },
    { label: 'GitHub', url: 'https://github.com/sangam962895' },
    { label: 'Instagram', url: '[YOUR INSTAGRAM URL]' },
    { label: 'Portfolio', url: '' },
  ],
};

export const aboutMe = {
  bio: [
    'I am a 2026 B.Tech graduate in Computer Science (Data Science) from Noida Institute of Engineering and Technology. My work sits where data, machine learning, and language models meet.',
    'Freelancing has taught me how AI training data is made. I have recorded audio sessions for a voice-recognition and anti-spoofing project, following strict setup and quality rules, and I have completed productivity work on an English image project.',
    'During my AI/ML Engineer internship at SmartBridge (Jan to Mar 2026), I built data preprocessing and ML inference pipelines and deployed a capstone project. My academic projects cover retrieval-augmented generation, document Q&A, and a Chrome extension for video Q&A.',
  ],
  interests: [
    'AI training and evaluation data quality',
    'Data collection workflows and dataset organization',
    'Retrieval-augmented generation and LLM applications',
    'Practical computer vision and ML deployment',
  ],
  goals:
    'I want to work in AI data operations, AI data specialist, or AI/ML roles where careful data work and practical engineering both matter.',
};

export interface SkillGroup {
  title: string;
  items: string[];
}

// Technical skills come from the resume. Add or remove items as needed.
export const skillGroups: SkillGroup[] = [
  {
    title: 'AI and Data Tasks',
    items: [
      'Audio Recording (dataset sessions)',
      'Data Collection and session metadata logging',
      'Image annotation (English image project)',
      'Data quality review of own submissions [CONFIRM]',
      // Not yet confirmed. Add only after you verify them: image captioning,
      // AI audio labeling, prompting tasks, AI evaluation and scoring.
    ],
  },
  {
    title: 'Languages',
    items: ['Python', 'SQL'],
  },
  {
    title: 'AI/ML',
    items: ['TensorFlow', 'Keras', 'Scikit-learn', 'Transfer Learning', 'NLP', 'Computer Vision', 'OpenCV'],
  },
  {
    title: 'Generative AI and LLMs',
    items: ['RAG Pipelines', 'Prompt Engineering', 'LLM Integration', 'Embeddings', 'Hugging Face', 'Google Gemini API', 'Groq API'],
  },
  {
    title: 'Vector Databases',
    items: ['FAISS', 'ChromaDB'],
  },
  {
    title: 'Frameworks and APIs',
    items: ['LangChain', 'FastAPI', 'Flask', 'Streamlit', 'REST APIs'],
  },
  {
    title: 'Data and Tools',
    items: ['Pandas', 'NumPy', 'Jupyter Notebook'],
  },
  {
    title: 'DevOps and Platforms',
    items: ['Git', 'GitHub', 'Docker (basic)', 'Vercel', 'Chrome Extension APIs', 'Model Deployment', 'Agile'],
  },
];

export interface FreelanceEntry {
  title: string;
  platform: string;
  description: string;
  responsibilities: string[];
  tools: string[];
  duration: string;
  deliverables: string[];
}

export const freelanceExperience: FreelanceEntry[] = [
  {
    title: 'Multilingual Audio Transcription & Speech Data Annotation (Hindi and English)',
    platform: 'Alignerr',
    description:
      'Completed audio annotation work involving transcription, transcript correction, and word-level labeling for Hindi and English audio clips.',
    responsibilities: [
      'Reviewed audio clips and transcribed the spoken content in Hindi and English.',
      'Corrected pre-labeled transcript text and adjusted word-level boundaries to match the audio.',
      'Added or removed segments and allowed tags according to the project labeling rules.',
      'Performed quality checks to confirm transcript accuracy and audio-to-word alignment.',
    ],
    tools: ['Labelbox', 'Audio annotation editor', 'Browser-based QA workflow', 'Chrome'],
    duration: 'Project-based work',
    deliverables: ['Completed transcript corrections and labeled audio segments for Hindi and English clips', 'Submitted final annotation outputs after QA review'],
  },
  {
    title: 'Image Annotation: English Image Project (Origami)',
    platform: 'CrowdGen by Appen',
    description:
      'Completed productivity work on an English image project within the CrowdGen by Appen workflow.',
    responsibilities: [
      'Followed assignment instructions and quality requirements for each task.',
      'Reviewed task requirements before submission and completed the assigned image work.',
      'Submitted the final outputs according to platform and project guidelines.',
    ],
    tools: ['CrowdGen platform'],
    duration: 'Project-based work',
    deliverables: ['Completed image project submissions in line with the assigned requirements'],
  },
];

export interface Internship {
  organization: string;
  title: string;
  duration: string;
  responsibilities: string[];
  technologies: string[];
  projects: string[];
  certificateUrl: string;
}

export const internship: Internship = {
  organization: 'SmartBridge',
  title: 'Artificial Intelligence and Machine Learning Engineer Intern',
  duration: 'Jan 2026 to Mar 2026',
  responsibilities: [
    'Developed a data preprocessing pipeline that cut model training time by 40% through feature selection and cleaning.',
    'Designed end-to-end ML pipelines covering image preprocessing, model inference, and API integration with Flask and TensorFlow.',
    'Deployed PlantCareAI as the capstone project, using transfer learning, CNN inference, and LLM-based treatment generation with Google Gemini Pro.',
  ],
  technologies: ['Python', 'TensorFlow', 'Keras', 'Flask', 'Google Gemini Pro', 'Transfer Learning'],
  projects: ['PlantCareAI'],
  certificateUrl: '[YOUR INTERNSHIP CERTIFICATE URL]',
};

export interface Project {
  id: string;
  title: string;
  category: 'AI/ML' | 'Generative AI' | 'Data';
  image?: string;
  objective: string;
  contribution: string;
  technologies: string[];
  details: string[];
  results: string[];
  github?: string;
  demo?: string;
  video?: string;
  date: string;
}

export const projects: Project[] = [
  {
    id: 'plantcareai',
    title: 'PlantCareAI: AI Plant Disease Detection and Assistant',
    category: 'AI/ML',
    date: 'Jan 2026 to Mar 2026',
    objective: 'Help farmers identify plant diseases from leaf images and get treatment guidance.',
    contribution: 'Built the full-stack ML web application, the inference pipeline, and the LLM assistant.',
    technologies: ['Python', 'Flask', 'TensorFlow', 'Transfer Learning', 'Google Gemini Pro', 'REST API'],
    details: [
      'Transfer learning with a TensorFlow/Keras CNN to detect 40+ plant diseases across 10 crops.',
      'Pipeline: image upload, preprocessing at 224x224 px, CNN prediction, then disease-specific treatment generated by an LLM.',
      'Gemini Pro with session-based context for personalized Q&A.',
      'Mobile-ready Bootstrap UI with drag-and-drop upload, diagnosis history, and chatbot panel. Deployed on Vercel.',
    ],
    results: ['95%+ accuracy and sub-1-second inference time, as reported in project testing.'],
    github: 'https://github.com/sangam962895/-AI-Plant-Disease-Detection',
    video: 'https://youtu.be/sQQ6Sm6ZxMI',
    // Add a screenshot at public/assets/projects/plantcareai.jpg, then uncomment:
    // image: 'assets/projects/plantcareai.jpg',
  },
  {
    id: 'summaraize',
    title: 'SummarAIze: Smart Assistant for Research Documents',
    category: 'Generative AI',
    date: 'Oct 2024',
    objective: 'Let readers summarize and question long research documents.',
    contribution: 'Built the RAG pipeline, FastAPI backend, and Streamlit frontend.',
    technologies: ['LangChain', 'Streamlit', 'Groq API', 'FastAPI', 'FAISS', 'Embeddings', 'Python'],
    details: [
      'Supports 50+ page PDFs and TXT files with a RAG architecture.',
      'FAISS vector store and sentence embeddings for sub-second semantic retrieval across 100k+ token corpora.',
      'Modular FastAPI backend with chunking, embedding generation, and context-aware responses via Groq API.',
      'Streamlit UI with summaries, source-cited Q&A, and auto-generated quizzes.',
    ],
    results: [
      'Reduced API latency to under 2 seconds.',
      'Improved document review efficiency by 60%+, as reported in project testing.',
    ],
    github: 'https://github.com/sangam962895/SummarAIze',
    video: 'https://youtu.be/kzRCwWFEZGk',
  },
  {
    id: 'talk2tube',
    title: 'Talk2Tube: YouTube Q&A Assistant (RAG-Based)',
    category: 'Generative AI',
    date: 'Nov 2024',
    objective: 'Ask natural-language questions about a YouTube video without watching it.',
    contribution: 'Built the Chrome extension, transcript indexing, and retrieval pipeline.',
    technologies: ['Python', 'LangChain', 'ChromaDB', 'FastAPI', 'JavaScript', 'Chrome Extension APIs'],
    details: [
      'Chrome extension for natural-language Q&A on YouTube videos using a RAG pipeline.',
      'LangChain and ChromaDB for transcript indexing and semantic search across videos up to 3 hours.',
      'Side-panel UI with chat history persistence. Embeds 10k+ token transcripts in under 5 seconds on average.',
    ],
    results: [
      'Timestamped retrieval accuracy of 90%+ on benchmark Q&A tests, after tuning chunk size and embedding overlap.',
    ],
    github: 'https://github.com/sangam962895/Talk-to-tube',
  },
];

export interface PaidProofItem {
  title: string;
  image?: string; // optional redacted image; must never show IDs, tax numbers, contact details, or addresses
  note: string;
  points: string[];
}

// Summary only: amounts, dates, and project type. The original invoices and
// transaction records are NOT published because they contain IDs, a tax number,
// phone, email, and home address. Remove this entry to hide the section.
// Each slug maps to public/assets/payments/<slug>.pdf. Use REDACTED copies only.
export const paymentProofFiles: string[] = ['payment-1', 'payment-2'];

export const paidProof: PaidProofItem[] = [
  {
    title: 'Freelance AI data work: payment summary',
    note: 'Summary of paid work. Original invoices and payment records are kept private.',
    points: [
      'Productivity work on an English image project, through CrowdGen by Appen.',
      'Invoice for work dated 2026-09-30: 12.71 hours, total $52.11 USD. Status: ready for payout.',
      'Earlier productivity transaction (Aug 2026): $19.68 USD, added to invoice.',
      'Audio recording work on a separate project is listed under Experience.',
    ],
  },
];

export interface Education {
  degree: string;
  institution: string;
  specialization?: string;
  period: string;
  status: string;
}

export const education: Education[] = [
  {
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'Noida Institute of Engineering and Technology, Greater Noida, Uttar Pradesh',
    specialization: 'Data Science',
    period: 'Nov 2022 to 2026',
    status: 'Graduated 2026 (CGPA 7.25)',
  },
  {
    degree: 'Intermediate',
    institution: 'CRTSVMICS, Maharajganj, Uttar Pradesh',
    period: 'May 2018 to Jun 2020',
    status: 'Completed',
  },
];

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  certificateUrl?: string;
  // File name without ".pdf". Put the PDF at public/assets/certificates/<slug>.pdf
  // and the View button appears automatically. No code change needed.
  slug: string;
}

export const certifications: Certification[] = [
  {
    title: 'Introduction to Artificial Intelligence',
    issuer: 'SmartBridge',
    date: '2026',
    slug: 'smartbridge-ai-intro',
  },
  {
    title: 'Introduction to Large Language Models',
    issuer: 'IBM SkillsBuild',
    date: '2026',
    slug: 'ibm-intro-llm',
  },
  {
    title: 'Data Analysis with Python',
    issuer: 'IBM (Coursera)',
    date: 'Dec 2023',
    slug: 'ibm-data-analysis-python',
  },
  {
    title: 'Python for Data Science, AI & Development',
    issuer: 'IBM (Coursera)',
    date: 'May 2023',
    slug: 'ibm-python-data-science',
  },
  {
    title: 'Building Machine Learning Systems with TensorFlow',
    issuer: 'Coursera / Infosys',
    date: 'Oct 2024',
    slug: 'tensorflow-ml-systems',
  },
];

export const academicAchievements: string[] = [
  // Add awards, competitions, and academic honors you can verify. Left empty so nothing is invented.
];

export const contactOptions = [
  { label: 'Freelance projects', text: 'AI training, audio recording, and data collection work.' },
  { label: 'Job opportunities', text: 'AI/ML, data operations, AI data specialist, and data collection roles.' },
  { label: 'AI/ML internships', text: 'Practical roles in machine learning and generative AI.' },
  { label: 'Professional networking', text: 'Happy to connect about AI data and ML work.' },
];

// EmailJS settings for the contact form. Create a free account at emailjs.com, add an
// email service, and create a template with variables: from_name, reply_to, subject, message.
// The public key is designed for browser use. Never put a private key or password here.
// Until all three values are filled in, the site shows the email link instead of a form.
// Values come from the .env file (VITE_EMAILJS_* keys). Only PUBLIC values belong there.
export const emailJs = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
};

export const emailJsReady = Object.values(emailJs).every((v) => v !== '' && !v.startsWith('['));

// GitHub showcase. Repo count, stars, followers, latest repo, and top repos are fetched
// live from GitHub's public API. The values below are saved fallbacks shown if GitHub
// cannot be reached. Set `commits` to your total commit count (GitHub does not expose it
// through the public API, so enter it from your profile).
export const github = {
  username: 'sangam962895',
  profileUrl: 'https://github.com/sangam962895',
  commits: undefined as number | undefined,
  fallback: { publicRepos: 18, followers: 19, stars: 9 },
  pinned: [
    { name: '-AI-Plant-Disease-Detection', url: 'https://github.com/sangam962895/-AI-Plant-Disease-Detection', language: 'HTML' },
    { name: 'SummarAIze', url: 'https://github.com/sangam962895/SummarAIze', language: 'Python' },
    { name: 'Talk-to-tube', url: 'https://github.com/sangam962895/Talk-to-tube', language: 'Python' },
    { name: 'python', url: 'https://github.com/sangam962895/python', language: 'Jupyter Notebook' },
    { name: 'Movies-recommendation-System-react', url: 'https://github.com/sangam962895/Movies-recommendation-System-react', language: 'TypeScript' },
    { name: 'movies-recommendation-system', url: 'https://github.com/sangam962895/movies-recommendation-system', language: 'Python' },
  ],
};
