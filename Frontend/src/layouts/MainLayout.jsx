import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar/Navbar';
import Footer from '../components/common/Footer/Footer';

const MainLayout = memo(function MainLayout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-fill w-100">{children}</main>
      {isHomePage && <Footer />}
    </div>
  );
});

export default MainLayout;
