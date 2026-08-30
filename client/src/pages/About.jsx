import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import { FadeIn } from '../utils/animations';

const aboutSections = [
  {
    title: 'Who We Are',
    content: 'FUZEN IT is a technology education company focused on delivering practical, career-oriented training programs. We help professionals and aspiring technologists build the skills needed to succeed in today\'s technology industry.',
  },
  {
    title: 'Our Mission',
    content: 'To provide accessible, high-quality technology education that bridges the gap between learning and professional readiness — empowering individuals to build meaningful careers in technology.',
  },
  {
    title: 'Our Vision',
    content: 'To become a trusted platform for technology education, recognized for producing skilled professionals who contribute meaningfully to the industry.',
  },
  {
    title: 'Our Approach',
    content: 'We combine structured learning modules, hands-on projects, and expert mentorship to create an education experience that mirrors real-world professional environments. Every program is designed with employability and practical application in mind.',
  },
];

const whyPoints = [
  'Programs aligned with current industry requirements',
  'Hands-on projects integrated into every learning path',
  'Experienced mentors and instructors',
  'Career support including portfolio and interview preparation',
  'Flexible learning formats to suit working professionals',
  'Focus on practical skills over theoretical knowledge alone',
];

const About = () => (
  <>
    <SEO
      title="About Us"
      description="Learn about FUZEN IT — technology education built around real-world skills and career-focused training programs."
      path="/about"
    />

    <section className="section-padding bg-surface">
      <div className="container-main">
        <FadeIn>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-red-light">
            About FUZEN IT
          </p>
          <h1 className="max-w-3xl text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Technology Education Built Around Real-World Skills.
          </h1>
        </FadeIn>
      </div>
    </section>

      <section className="section-padding page-section">
      <div className="container-main">
        <div className="grid gap-12 lg:grid-cols-2">
          {aboutSections.map((section, i) => (
            <FadeIn key={section.title} delay={i * 0.08}>
              <div>
                <h2 className="mb-3 text-xl font-bold text-primary">{section.title}</h2>
                <p className="text-sm leading-relaxed text-secondary md:text-base">
                  {section.content}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding page-section-muted">
      <div className="container-main">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <SectionHeading
              title="Why FUZEN IT"
              align="left"
            />
            <ul className="mt-8 space-y-4">
              {whyPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-primary">{point}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="aspect-[4/3] overflow-hidden rounded-xl bg-surface-100">
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-surface-100 to-surface-200">
                <div className="text-center p-8">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-red/20">
                    <svg className="h-8 w-8 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-sm text-white/60">Professional technology education</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  </>
);

export default About;
