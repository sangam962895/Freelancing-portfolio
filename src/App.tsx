import Navbar, { type NavItem } from './components/Navbar';
import Footer from './components/Footer';
import GitHubShowcase from './components/GitHubShowcase';
import {
  Home, About, Skills, AITraining, DataCollection, Projects,
  Experience, PaidProof, Education, Certifications, Resume, Contact, hasPaidProof,
} from './sections/Sections';

const nav: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  {
    id: 'experience',
    label: 'Experience',
    children: [
      { id: 'ai-training', label: 'AI Training' },
      { id: 'data-collection', label: 'Data Collection' },
      ...(hasPaidProof ? [{ id: 'paid-proof', label: 'Paid Proof' }] : []),
    ],
  },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export default function App() {
  return (
    <>
      <Navbar items={nav} />
      <main id="main">
        <Home />
        <About />
        <Skills />
        <AITraining />
        <DataCollection />
        <Projects />
        <Experience />
        <PaidProof />
        <Education />
        <Certifications />
        <Resume />
        <Contact />
        <GitHubShowcase />
      </main>
      <Footer />
    </>
  );
}
