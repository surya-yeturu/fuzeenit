import { getCourseImage } from '../utils/courseImages';

const CourseImage = ({ course, className = 'h-40 w-full object-cover' }) => {
  const src = getCourseImage(course);
  const alt = `${course?.title || 'Course'} program thumbnail`;

  return (
    <div className="relative overflow-hidden rounded-lg bg-surface-100">
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = '/images/courses/default.svg';
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/20 to-transparent" />
    </div>
  );
};

export default CourseImage;
