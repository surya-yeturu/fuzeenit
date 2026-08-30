import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import SearchBar from '../components/SearchBar';
import CourseFilters from '../components/CourseFilters';
import CourseCard from '../components/CourseCard';
import Loading, { SkeletonGrid } from '../components/Loading';
import ErrorState from '../components/ErrorState';
import Button from '../components/Button';
import { FadeIn } from '../utils/animations';
import { CATEGORY_FILTERS } from '../utils/constants';
import { useDebounce } from '../hooks/useReducedMotion';
import { courseAPI } from '../services/api';

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'newest';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 400);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, limit: 9, sort };
      if (debouncedSearch) params.search = debouncedSearch;
      if (category !== 'all') params.category = category;

      const res = await courseAPI.getAll(params);
      setCourses(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, category, sort, page]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    if (debouncedSearch !== search) {
      const params = new URLSearchParams(searchParams);
      if (debouncedSearch) {
        params.set('search', debouncedSearch);
      } else {
        params.delete('search');
      }
      params.set('page', '1');
      setSearchParams(params, { replace: true });
    }
  }, [debouncedSearch, search, searchParams, setSearchParams]);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'all' && value !== 'newest') {
      params.set(key, value);
    } else if (key === 'category' || key === 'sort') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    if (key !== 'page') params.set('page', '1');
    setSearchParams(params);
  };

  return (
    <>
      <SEO
        title="Explore Courses"
        description="Find the right technology program for your career goals. Browse AI, development, cloud, testing and more."
        path="/courses"
      />

      <section className="section-padding page-section">
        <div className="container-main">
          <SectionHeading
            title="Explore Courses"
            description="Find the right technology program for your career goals."
            align="left"
            className="mb-10"
          />

          <div className="mb-8 space-y-4">
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
            />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CourseFilters
                filters={CATEGORY_FILTERS}
                activeFilter={category}
                onFilterChange={(val) => updateParam('category', val)}
              />
              <select
                value={sort}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="input-field w-full sm:w-auto sm:min-w-[160px]"
                aria-label="Sort courses"
              >
                <option value="newest">Newest</option>
                <option value="title">Title A-Z</option>
                <option value="level">Level</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>

          {loading && <SkeletonGrid count={6} />}

          {error && !loading && (
            <ErrorState message={error} onRetry={fetchCourses} />
          )}

          {!loading && !error && courses.length === 0 && (
            <div className="py-20 text-center">
              <h3 className="text-lg font-semibold text-primary">No courses found</h3>
              <p className="mt-2 text-sm text-gray-brand">
                Try adjusting your search or filters.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setSearchInput('');
                  setSearchParams({});
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {!loading && !error && courses.length > 0 && (
            <>
              <p className="mb-6 text-sm text-gray-brand">
                Showing {courses.length} of {pagination.total} programs
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course, i) => (
                  <FadeIn key={course._id} delay={i * 0.03}>
                    <CourseCard course={course} />
                  </FadeIn>
                ))}
              </div>

              {pagination.pages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => updateParam('page', String(page - 1))}
                  >
                    Previous
                  </Button>
                  <span className="px-4 text-sm text-gray-brand">
                    Page {page} of {pagination.pages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= pagination.pages}
                    onClick={() => updateParam('page', String(page + 1))}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Courses;
