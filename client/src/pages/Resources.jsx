import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import Loading, { SkeletonGrid } from '../components/Loading';
import ErrorState from '../components/ErrorState';
import { FadeIn } from '../utils/animations';
import { RESOURCE_CATEGORIES } from '../utils/constants';
import { resourceAPI } from '../services/api';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const fetchResources = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const params = category !== 'All' ? { category } : {};
      const res = await resourceAPI.getAll(params);
      setResources(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources(activeCategory);
  }, [activeCategory]);

  return (
    <>
      <SEO
        title="Resources"
        description="Technology resources, guides, and articles on AI, data, development, cloud, career, and interview preparation."
        path="/resources"
      />

      <section className="section-padding page-section">
        <div className="container-main">
          <SectionHeading
            title="Technology Resources"
            description="Guides and articles to support your learning and career development."
            align="left"
            className="mb-10"
          />

          <div className="mb-8 flex flex-wrap gap-2">
            {RESOURCE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-surface text-white dark:bg-brand-red'
                    : 'bg-gray-light text-gray-brand hover:text-primary dark:bg-surface-200 dark:text-white/70 dark:hover:text-white'
                }`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading && <SkeletonGrid count={6} />}
          {error && !loading && <ErrorState message={error} onRetry={() => fetchResources(activeCategory)} />}

          {!loading && !error && resources.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-sm text-secondary">No resources found in this category.</p>
            </div>
          )}

          {!loading && !error && resources.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource, i) => (
                <FadeIn key={resource._id} delay={i * 0.03}>
                  <article className="surface-card group flex flex-col p-6 transition-shadow hover:shadow-card-hover dark:hover:shadow-nav-dark">
                    <span className="mb-2 text-xs font-medium uppercase tracking-wide text-brand-red dark:text-brand-red-light">
                      {resource.category}
                    </span>
                    <h3 className="mb-2 text-lg font-semibold text-primary transition-colors group-hover:text-brand-red dark:group-hover:text-brand-red-light">
                      <Link to={`/resources/${resource.slug}`}>{resource.title}</Link>
                    </h3>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-secondary line-clamp-2">
                      {resource.shortDescription}
                    </p>
                    <div className="flex items-center justify-between text-xs text-secondary">
                      <span>{resource.author}</span>
                      <span>{resource.readingTime}</span>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Resources;
