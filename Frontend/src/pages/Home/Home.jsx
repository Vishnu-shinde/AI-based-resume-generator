import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button/Button';
import styles from './Home.module.css';

const Home = memo(function Home() {
  const navigate = useNavigate();
  const authorized = useSelector((state) => state.auth.authorized);

  return (
    <div className="container py-4 py-md-5">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <div className={`${styles.heroPanel} pt-5 mt-5 d-flex justify-content-center gap-2`}>
            <div className="d-flex justify-content-center align-items-center align-self-center">
                <h1 className="d-flex justify-content-center heading text-center align-items-center mb-2 fw-medium title">Build a Professional Resume <br /> using Your Coding and Social Profiles</h1>
            </div>
            <p className="d-flex justify-content-center text-secondary">Generate a polished and professional resume from GitHub, CodeChef, Codeforces, and LeetCode profile links in one click.</p>
            <div className="d-flex justify-content-center align-items-center mt-4">
              {authorized ? (
                <Button className="rounded-5 fw-medium pt-2 pb-2 px-4 " onClick={() => navigate('/form')}>
                    Create Resume
                </Button>
              ) : (
                <Button className="rounded-5 fw-medium pt-2 pb-2 px-4 " onClick={() => navigate('/login')}>
                    Get Started
                </Button>
              )}
            </div>
            <p className="mb-5 text-primary d-flex justify-content-center fw-medium text-18 mt-1 text-secondary">
                Integrated with Gemini AI
            </p>
        </div>
      </motion.div>
    </div>
  );
});

export default Home;
