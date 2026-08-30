import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import { FadeIn } from '../utils/animations';
import { formatDate, SITE_URL } from '../utils/constants';
import { resourceAPI } from '../services/api';

const ResourceDetails = () => {
  const { slug } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResource = async () => {
      setLoading(true);
      try {
        const res = await resourceAPI.getBySlug(slug);
        setResource(res.data.data);
      } catch (err) {
        setError(err.response?.status === 404 ? 'Resource not found' : err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResource();
  }, [slug]);

  if (loading) return <Loading message="Loading resource..." />;
  if (error) {
    return (
      <ErrorState
        title={error === 'Resource not found' ? 'Resource Not Found' : 'Error'}
        message={error}
      />
    );
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: resource.title,
    description: resource.shortDescription,
    author: { '@type': 'Person', name: resource.author },
    datePublished: resource.publishedAt,
    url: `${SITE_URL}/resources/${resource.slug}`,
  };

  return (
    <>
      <SEO
        title={resource.title}
        description={resource.shortDescription}
        path={`/resources/${resource.slug}`}
        type="article"
        structuredData={structuredData}
      />

      <article className="section-padding page-section">
        <div className="container-main max-w-3xl">
          <FadeIn>
            <Link to="/resources" className="mb-6 inline-flex items-center text-sm text-secondary link-hover">
              <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Resources
            </Link>

            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-brand-red dark:text-brand-red-light">
              {resource.category}
            </span>
            <h1 className="text-3xl font-bold text-primary md:text-4xl">{resource.title}</h1>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-secondary">
              <span>{resource.author}</span>
              <span>•</span>
              <time dateTime={resource.publishedAt}>{formatDate(resource.publishedAt)}</time>
              <span>•</span>
              <span>{resource.readingTime}</span>
            </div>

            <div className="mt-8 max-w-none">
              {resource.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-4 text-base leading-relaxed text-secondary">
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </article>
    </>
  );
};

export default ResourceDetails;
