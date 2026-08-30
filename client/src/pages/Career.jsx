import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { FadeIn } from '../utils/animations';
import { useExpertModal } from '../context/ExpertModalContext';

const careerSteps = [
  { title: 'Learn', description: 'Build foundational and advanced skills through structured programs.' },
  { title: 'Practice', description: 'Apply concepts through exercises and guided practice sessions.' },
  { title: 'Build', description: 'Create portfolio-worthy projects that demonstrate your capabilities.' },
  { title: 'Prepare', description: 'Develop your resume, portfolio, and interview readiness.' },
  { title: 'Apply', description: 'Pursue opportunities with confidence and professional presentation.' },
  { title: 'Grow', description: 'Continue advancing your career with ongoing learning and mentorship.' },
];

const supportAreas = [
  {
    title: 'Learning',
    description: 'Structured programs designed to build practical, job-relevant technology skills.',
  },
  {
    title: 'Projects',
    description: 'Real-world projects that strengthen your portfolio and demonstrate applied knowledge.',
  },
  {
    title: 'Portfolio',
    description: 'Guidance on presenting your work professionally to potential employers.',
  },
  {
    title: 'Resume',
    description: 'Support in crafting a resume that highlights your technical skills and projects.',
  },
  {
    title: 'Interview Preparation',
    description: 'Preparation for technical and behavioral interviews in your target role.',
  },
  {
    title: 'Mentorship',
    description: 'Access to experienced professionals who guide your learning and career decisions.',
  },
];

const Career = () => {
  const { openModal } = useExpertModal();

  return (
    <>
      <SEO
        title="Career"
        description="Build skills that move your career forward with FUZEN IT's career-focused technology education programs."
        path="/career"
      />

      <section className="section-padding page-section">
        <div className="container-main">
          <SectionHeading
            title="Build Skills That Move Your Career Forward."
            description="Our programs are designed to help you develop the skills, projects, and confidence needed to advance in technology careers."
            align="left"
            className="mb-16"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {supportAreas.map((area, i) => (
              <FadeIn key={area.title} delay={i * 0.05}>
                <div className="surface-card p-6">
                  <h3 className="mb-2 text-base font-semibold text-primary">{area.title}</h3>
                  <p className="text-sm leading-relaxed text-secondary">{area.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding page-section-muted">
        <div className="container-main">
          <SectionHeading title="Your Career Journey" className="mb-16" />

          <div className="mx-auto max-w-md">
            {careerSteps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.08}>
                <div className="relative flex flex-col items-center">
                  <div className="surface-card flex h-14 w-full items-center gap-4 p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-sm font-bold text-brand-red">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-primary">{step.title}</h3>
                      <p className="text-xs text-secondary">{step.description}</p>
                    </div>
                  </div>
                  {i < careerSteps.length - 1 && (
                    <div className="flex h-8 items-center justify-center" aria-hidden="true">
                      <svg className="h-4 w-4 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-main text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Start building your career today
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-white/70">
              Speak with our team to find a program aligned with your career goals.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button onClick={() => openModal()} size="lg">Talk to an Expert</Button>
              <Button as={Link} to="/courses" variant="outline-light" size="lg">Explore Courses</Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default Career;
