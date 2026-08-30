/**
 * Maps course slugs to thumbnail images in /images/courses/
 * Falls back to category-based image, then default.
 */

const COURSE_IMAGES = {
  'data-science-ai': '/images/courses/data-science-ai.svg',
  'generative-ai': '/images/courses/generative-ai.svg',
  'full-stack-development': '/images/courses/full-stack-development.svg',
  'data-engineering': '/images/courses/data-engineering.svg',
  'cloud-devops': '/images/courses/cloud-devops.svg',
  'software-testing': '/images/courses/software-testing.svg',
  'java-enterprise': '/images/courses/java-enterprise.svg',
  'digital-marketing': '/images/courses/digital-marketing.svg',
  'python-programming': '/images/courses/python-programming.svg',
  'business-intelligence': '/images/courses/business-intelligence.svg',
};

const CATEGORY_IMAGES = {
  'ai-data': '/images/courses/data-science-ai.svg',
  development: '/images/courses/full-stack-development.svg',
  'cloud-devops': '/images/courses/cloud-devops.svg',
  testing: '/images/courses/software-testing.svg',
  enterprise: '/images/courses/java-enterprise.svg',
  marketing: '/images/courses/digital-marketing.svg',
};

export const getCategoryImage = (category) => {
  if (category?.slug && CATEGORY_IMAGES[category.slug]) {
    return CATEGORY_IMAGES[category.slug];
  }
  return '/images/courses/default.svg';
};

export const getCourseImage = (course) => {
  if (course?.thumbnail) return course.thumbnail;
  if (course?.slug && COURSE_IMAGES[course.slug]) return COURSE_IMAGES[course.slug];
  if (course?.categorySlug && CATEGORY_IMAGES[course.categorySlug]) {
    return CATEGORY_IMAGES[course.categorySlug];
  }
  return '/images/courses/default.svg';
};

export default getCourseImage;
