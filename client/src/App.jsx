import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ExpertModalProvider } from './context/ExpertModalContext';
import MainLayout from './layouts/MainLayout';
import Loading from './components/Loading';
import ScrollToTop from './components/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetails = lazy(() => import('./pages/CourseDetails'));
const Career = lazy(() => import('./pages/Career'));
const About = lazy(() => import('./pages/About'));
const Resources = lazy(() => import('./pages/Resources'));
const ResourceDetails = lazy(() => import('./pages/ResourceDetails'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));

const App = () => {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;

  return (
  <BrowserRouter basename={basename}>
    <ScrollToTop />
    <ThemeProvider>
      <ExpertModalProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:slug" element={<CourseDetails />} />
            <Route path="career" element={<Career />} />
            <Route path="about" element={<About />} />
            <Route path="resources" element={<Resources />} />
            <Route path="resources/:slug" element={<ResourceDetails />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      </ExpertModalProvider>
    </ThemeProvider>
  </BrowserRouter>
  );
};

export default App;
