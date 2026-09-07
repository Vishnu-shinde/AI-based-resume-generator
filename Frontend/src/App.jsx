import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Loader from './components/common/Loader/Loader';
import ProtectedRoute from './routes/ProtectedRoute';
import ResumePreview from './components/resume/ResumePreview';

const Home = lazy(() => import('./pages/Home/Home'));
const Form = lazy(() => import('./pages/Form/Form'));
const Login = lazy(() => import('./pages/Login/Login'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  return (
    <MainLayout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/preview" element={<ProtectedRoute><ResumePreview /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}

export default App;
