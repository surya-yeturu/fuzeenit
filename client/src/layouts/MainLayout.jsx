import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ExpertModal from '../components/ExpertModal';

const MainLayout = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1 pt-16 md:pt-18 lg:pt-20">
      <Outlet />
    </main>
    <Footer />
    <ExpertModal />
  </div>
);

export default MainLayout;
