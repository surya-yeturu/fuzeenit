import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Button from '../components/Button';

const NotFound = () => (
  <>
    <SEO title="Page Not Found" description="The page you are looking for does not exist." />
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-brand-red">404</p>
      <h1 className="mt-4 text-2xl font-bold text-primary">Page Not Found</h1>
      <p className="mt-2 max-w-md text-sm text-gray-brand">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Button as={Link} to="/">Go Home</Button>
        <Button as={Link} to="/courses" variant="outline">Explore Courses</Button>
      </div>
    </div>
  </>
);

export default NotFound;
