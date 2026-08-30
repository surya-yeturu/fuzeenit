import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCourseImage } from '../utils/courseImages';

const CourseCard = ({ course }) => (
  <motion.article
    className="group flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white transition-shadow duration-300 hover:shadow-card-hover dark:border-white/10 dark:bg-surface-100 dark:hover:shadow-nav-dark"
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2 }}
  >
    <div className="relative aspect-[5/3] overflow-hidden bg-surface-100">
      <img
        src={getCourseImage(course)}
        alt={`${course.title} program`}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = '/images/courses/default.svg';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface/30 to-transparent" />
      <span className="absolute left-4 top-4 rounded-md bg-white/95 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-brand-red shadow-sm dark:bg-surface-200/95 dark:text-brand-red-light">
        {course.category}
      </span>
    </div>

    <div className="flex flex-1 flex-col p-6">
      <h3 className="mb-2 text-lg font-semibold text-primary transition-colors group-hover:text-brand-red dark:text-white dark:group-hover:text-brand-red-light">
        {course.title}
      </h3>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-brand line-clamp-2 dark:text-white/60">
        {course.shortDescription}
      </p>

      <div className="mb-4 flex flex-wrap gap-3 text-xs text-gray-brand dark:text-white/50">
        <span className="flex items-center gap-1">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {course.level}
        </span>
        <span className="flex items-center gap-1">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {course.duration}
        </span>
        <span>{course.mode}</span>
      </div>

      <Link
        to={`/courses/${course.slug}`}
        className="inline-flex items-center text-sm font-medium text-brand-red link-hover"
        aria-label={`View ${course.title} program`}
      >
        View Program
        <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  </motion.article>
);

export default CourseCard;
