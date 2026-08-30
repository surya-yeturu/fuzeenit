import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import Button from '../components/Button';
import FAQ from '../components/FAQ';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import { FadeIn } from '../utils/animations';
import { useExpertModal } from '../context/ExpertModalContext';
import { courseAPI } from '../services/api';
import { SITE_URL } from '../utils/constants';
import { getCourseImage } from '../utils/courseImages';

const CurriculumAccordion = ({ modules }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {modules.map((mod, index) => (
        <div key={index} className="rounded-lg border border-gray-100 overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-light/50 transition-colors"
            aria-expanded={openIndex === index}
          >
            <div>
              <span className="text-xs font-medium text-brand-red">{mod.title.split('—')[0]?.trim()}</span>
              <h4 className="text-sm font-semibold text-primary md:text-base">
                {mod.title.split('—')[1]?.trim() || mod.title}
              </h4>
            </div>
            <motion.svg
              className="h-5 w-5 flex-shrink-0 text-gray-brand"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-t border-gray-100 px-6 py-4">
                  {mod.description && (
                    <p className="mb-4 text-sm text-gray-brand">{mod.description}</p>
                  )}
                  <ul className="space-y-2">
                    {mod.lessons?.map((lesson, li) => (
                      <li key={li} className="flex items-start justify-between gap-4 text-sm">
                        <span className="text-primary">{lesson.title}</span>
                        {lesson.duration && (
                          <span className="flex-shrink-0 text-xs text-gray-brand">{lesson.duration}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const CourseDetails = () => {
  const { slug } = useParams();
  const { openModal } = useExpertModal();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await courseAPI.getBySlug(slug);
        setCourse(res.data.data);
      } catch (err) {
        setError(err.response?.status === 404 ? 'Course not found' : err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  if (loading) return <Loading message="Loading program details..." />;
  if (error) {
    return (
      <ErrorState
        title={error === 'Course not found' ? 'Program Not Found' : 'Error'}
        message={error === 'Course not found'
          ? 'The program you are looking for does not exist or has been removed.'
          : error}
      />
    );
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.shortDescription,
    provider: { '@type': 'Organization', name: 'FUZEN IT', url: SITE_URL },
    educationalLevel: course.level,
    timeRequired: course.duration,
    url: `${SITE_URL}/courses/${course.slug}`,
  };

  return (
    <>
      <SEO
        title={course.title}
        description={course.shortDescription}
        path={`/courses/${course.slug}`}
        type="article"
        structuredData={structuredData}
      />

      {/* Hero */}
      <section className="bg-surface py-16 md:py-20">
        <div className="container-main">
          <FadeIn>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <Link to="/courses" className="mb-6 inline-flex items-center text-sm text-white/60 hover:text-white transition-colors">
                  <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Courses
                </Link>
                <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-brand-red-light">
                  {course.category}
                </span>
                <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">{course.title}</h1>
                <p className="mt-4 text-base leading-relaxed text-white/70">{course.description}</p>

                <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/60">
                  <span>{course.duration}</span>
                  <span>•</span>
                  <span>{course.level}</span>
                  <span>•</span>
                  <span>{course.mode}</span>
                  <span>•</span>
                  <span>{course.projects?.length || 0} Projects</span>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button onClick={() => openModal(course.title)} size="lg">
                    Talk to an Expert
                  </Button>
                  <Button variant="outline-light" size="lg" onClick={() => openModal(course.title)}>
                    Download Curriculum
                  </Button>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                <img
                  src={getCourseImage(course)}
                  alt={`${course.title} program`}
                  className="aspect-[5/3] w-full object-cover"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="section-padding page-section">
        <div className="container-main">
          <FadeIn>
            <h2 className="mb-8 text-2xl font-bold text-primary md:text-3xl">What You&apos;ll Learn</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {course.learningOutcomes?.map((outcome, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-primary">{outcome}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Curriculum */}
      <section className="section-padding page-section-muted">
        <div className="container-main">
          <FadeIn>
            <h2 className="mb-8 text-2xl font-bold text-primary md:text-3xl">Curriculum</h2>
            <CurriculumAccordion modules={course.curriculum || []} />
          </FadeIn>
        </div>
      </section>

      {/* Technologies */}
      <section className="section-padding page-section">
        <div className="container-main">
          <FadeIn>
            <h2 className="mb-8 text-2xl font-bold text-primary md:text-3xl">Tools & Technologies</h2>
            <div className="flex flex-wrap gap-3">
              {course.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-gray-100 bg-white px-4 py-2 text-sm font-medium text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding page-section-muted">
        <div className="container-main">
          <FadeIn>
            <h2 className="mb-8 text-2xl font-bold text-primary md:text-3xl">Projects</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {course.projects?.map((project, i) => (
                <div key={i} className="rounded-lg border border-gray-100 bg-white p-6">
                  <h3 className="mb-2 text-lg font-semibold text-primary">{project.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-brand">{project.description}</p>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {project.technologies?.map((t) => (
                      <span key={t} className="rounded bg-gray-light px-2 py-0.5 text-xs text-gray-brand">{t}</span>
                    ))}
                  </div>
                  <p className="text-xs font-medium text-brand-red">Outcome: {project.outcome}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Career Outcomes */}
      <section className="section-padding page-section">
        <div className="container-main">
          <FadeIn>
            <h2 className="mb-2 text-2xl font-bold text-primary md:text-3xl">
              Where can this program take you?
            </h2>
            <p className="mb-8 text-sm text-gray-brand">
              Relevant career paths for graduates of this program. Outcomes depend on individual effort and market conditions.
            </p>
            <div className="flex flex-wrap gap-3">
              {course.careerOutcomes?.map((role) => (
                <span
                  key={role}
                  className="rounded-lg border border-gray-100 bg-white px-5 py-3 text-sm font-medium text-primary"
                >
                  {role}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding page-section-muted">
        <div className="container-main max-w-3xl">
          <FadeIn>
            <h2 className="mb-8 text-2xl font-bold text-primary md:text-3xl">Frequently Asked Questions</h2>
            <FAQ items={course.faqs || []} />
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-surface py-16">
        <div className="container-main text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Have questions about this program?
            </h2>
            <Button onClick={() => openModal(course.title)} className="mt-6" size="lg">
              Talk to an Expert
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default CourseDetails;
