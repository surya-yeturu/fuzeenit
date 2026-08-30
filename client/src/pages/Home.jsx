import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import CategoryCard from '../components/CategoryCard';
import CourseCard from '../components/CourseCard';
import { FadeIn } from '../utils/animations';
import { useExpertModal } from '../context/ExpertModalContext';
import { categoryAPI, courseAPI } from '../services/api';

const trustItems = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Industry-Focused Learning',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Real-World Projects',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Expert Guidance',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Career Support',
  },
];

const whyFeatures = [
  {
    icon: (
      <svg className="h-6 w-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Practical Learning',
    description: 'Hands-on exercises and projects that mirror real workplace challenges.',
  },
  {
    icon: (
      <svg className="h-6 w-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Industry-Relevant Curriculum',
    description: 'Programs aligned with current technology industry requirements and tools.',
  },
  {
    icon: (
      <svg className="h-6 w-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: 'Expert Mentorship',
    description: 'Guidance from experienced professionals throughout your learning journey.',
  },
  {
    icon: (
      <svg className="h-6 w-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Career Support',
    description: 'Portfolio guidance, interview preparation, and career path planning.',
  },
];

const journeySteps = [
  { num: '01', title: 'Learn' },
  { num: '02', title: 'Practice' },
  { num: '03', title: 'Build' },
  { num: '04', title: 'Prepare' },
  { num: '05', title: 'Grow' },
];

const Home = () => {
  const { openModal } = useExpertModal();
  const [categories, setCategories] = useState([]);
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, courseRes] = await Promise.all([
          categoryAPI.getAll(),
          courseAPI.getFeatured(),
        ]);
        setCategories(catRes.data.data);
        setFeaturedCourses(courseRes.data.data);
      } catch (err) {
        console.error('Failed to load home data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <SEO
        title="Technology Education"
        description="Learn practical technology skills through structured programs, real-world projects and expert guidance at FUZEN IT."
        path="/"
      />

      {/* Hero */}
      <section className="section-padding page-section">
        <div className="container-main">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-red">
                Technology Education
              </p>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-primary md:text-5xl lg:text-[3.25rem]">
                Build Skills. Build Your Future.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-gray-brand dark:text-white/60 md:text-lg">
                Learn practical technology skills through structured programs, real-world projects and expert guidance.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button as={Link} to="/courses" size="lg">
                  Explore Courses
                </Button>
                <Button variant="outline" size="lg" onClick={() => openModal()}>
                  Talk to an Expert
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-card-hover">
                <img
                  src="/images/hero-home.png"
                  alt="Professional learning technology workspace"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-surface/40 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 h-1 w-24 bg-brand-red" />

                <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-white/10 bg-surface/80 p-4 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-red-light">
                    Structured Programs
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Data Science · Full Stack · Cloud · AI
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-y border-gray-100 bg-gray-light/50 py-8 dark:border-white/10 dark:bg-surface-100/60">
        <div className="container-main">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {trustItems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.05}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-brand-red">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-primary">{item.title}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section-padding page-section">
        <div className="container-main">
          <SectionHeading
            title="Explore Our Programs"
            description="Choose a learning path designed around the skills used in today's technology industry."
            className="mb-12"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <FadeIn key={cat._id} delay={i * 0.05}>
                <CategoryCard category={cat} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="section-padding page-section-muted">
        <div className="container-main">
          <SectionHeading
            title="Popular Programs"
            className="mb-12"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course, i) => (
              <FadeIn key={course._id} delay={i * 0.05}>
                <CourseCard course={course} />
              </FadeIn>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button as={Link} to="/courses" variant="outline">
              View All Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Why FUZEN IT */}
      <section className="section-padding page-section">
        <div className="container-main">
          <SectionHeading
            title="Learning Designed Around Real Skills."
            className="mb-12"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyFeatures.map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.08}>
                <div className="text-center lg:text-left">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-red/5">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-primary">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-brand dark:text-white/60">{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Journey */}
      <section className="section-padding page-section-muted">
        <div className="container-main">
          <SectionHeading title="Your Learning Journey" className="mb-16" />
          <div className="relative">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-brand-red/30 md:block" aria-hidden="true" />
            <div className="grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-4">
              {journeySteps.map((step, i) => (
                <FadeIn key={step.title} delay={i * 0.1}>
                  <div className="relative text-center">
                    <div className="relative z-10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-red bg-white text-sm font-bold text-brand-red dark:bg-surface-100 dark:text-brand-red-light">
                      {step.num}
                    </div>
                    <h3 className="text-sm font-semibold text-primary md:text-base">{step.title}</h3>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Career CTA */}
      <section className="bg-surface py-16 md:py-20">
        <div className="container-main text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Ready to take the next step?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-white/70">
              Talk to our team and find a learning path that matches your goals.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button onClick={() => openModal()} size="lg">
                Talk to an Expert
              </Button>
              <Button as={Link} to="/courses" variant="outline-light" size="lg">
                Explore Courses
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default Home;
