import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import ProjectOverview from './components/ProjectOverview';
import Amenities from './components/Amenities';
import AboutUs from './components/AboutUs';
import FAQ from './components/FAQ';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminRegister from './pages/AdminRegister';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import AboutPage from './pages/AboutPage';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen  bg-gray-100/50">
      <Navbar />
      <div className="max-w-[1440px] px-4 md:px-20 mx-auto bg-white shadow-2xl relative">
        <HeroSection />
        <AboutUs />
        <Amenities />
        <ProjectOverview />
        <AboutPage />
        <FAQ />
        <div id="contact">
          <ContactSection />
        </div>
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
