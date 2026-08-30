import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCategoryImage } from '../utils/courseImages';

const CategoryCard = ({ category }) => (
  <motion.article
    className="group flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white transition-shadow duration-300 hover:shadow-card-hover dark:border-white/10 dark:bg-surface-100 dark:hover:shadow-nav-dark"
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2 }}
  >
    <div className="aspect-[16/9] overflow-hidden bg-surface-100">
      <img
        src={getCategoryImage(category)}
        alt={`${category.name} programs`}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
    </div>

    <div className="flex flex-1 flex-col p-6">
      <h3 className="mb-2 text-lg font-semibold text-primary transition-colors group-hover:text-brand-red dark:text-white dark:group-hover:text-brand-red-light">
        {category.name}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-brand dark:text-white/60">
        {category.description}
      </p>
      <p className="mb-4 text-xs font-medium text-gray-brand dark:text-white/50">
        {category.programCount} programs available
      </p>
      <Link
        to={`/courses?category=${category.slug}`}
        className="inline-flex items-center text-sm font-medium text-brand-red link-hover"
      >
        View Programs
        <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  </motion.article>
);

export default CategoryCard;
