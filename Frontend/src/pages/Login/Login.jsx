import { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { setAuthorized, setUserEmail } from '../../features/auth/authSlice';
import styles from './Login.module.css';

const Login = memo(function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const handleLogin = async () => {
    setMessage('');
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.text();
      if (response.status === 200) {
        dispatch(setAuthorized(true));
        dispatch(setUserEmail(username));
        navigate('/');
        return;
      }
      toast.error(data || response.statusText || 'Login failed.');
    } catch (error) {
      toast.error('Failed to connect to the backend server.');
    }
  };

  return (
    <div className={`d-flex align-items-start justify-content-center px-3 py-5 my-5 ${styles.pageShell}`}>
      <motion.div
        className={`w-100 mx-auto ${styles.loginCard}`}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <h1 className={`text-center mb-5 ${styles.title}`}>User Login</h1>

        <form className="d-flex flex-column" onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}>
          <div className="mb-4">
            <label className="text-14 fw-semibold" htmlFor="login-username">Username</label>
            <input
              id="login-username"
              name="username"
              type="text"
              className="form-control"
              placeholder="https://example@domain.com"
              onChange={(e) => setUsername(e.target.value)} 
              aria-label="Username"
            />
          </div>

          <div className="mb-4">
            <label className="text-14 fw-semibold" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} 
              aria-label="Password"
            />
          </div>

          <div className="d-flex justify-content-between align-items-center gap-3 my-2">
            <label className={`form-check d-flex align-items-center gap-2 mb-0 ${styles.mutedText}`}>
              <input className="form-check-input mt-0" type="checkbox" defaultChecked />
              <span className="small">Remember me</span>
            </label>
            <button type="button" className={`btn btn-link p-0 ${styles.mutedLink} ${styles.forgotLink}`}>
              Forgot Password?
            </button>
          </div>

          <button type="submit" className={`btn btn-primary rounded-5 fw-medium py-2 px-4 w-100 my-2 ${styles.loginButton}`}>LOGIN</button>
          {message && (
            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
              <strong>Status:</strong> {message}
            </div>
          )}

          <div className={`d-flex align-items-center my-3 ${styles.dividerWrap}`}>
            <div className={styles.dividerLine} />
            <span className={`mx-3 ${styles.dividerText}`}>or</span>
            <div className={styles.dividerLine} />
          </div>

          <button type="button" className={`btn w-100 d-flex align-items-center justify-content-center gap-2 rounded-5 fw-medium py-2 ${styles.googleButton}`}>
            <svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true" className={styles.googleIconSvg}>
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20c10.493 0 19.438-7.666 19.438-18 0-1.341-.138-2.64-.401-3.917z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.335 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-.98 13.611-2.708l-6.273-5.293C29.743 37.23 26.975 38 24 38c-5.223 0-9.654-3.343-11.303-8l-6.571 5.082C9.656 39.665 16.318 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.287 3.641-4.597 6.36-8.303 6.36-1.542 0-2.978-.395-4.233-1.082l-6.273 5.293C16.9 40.095 20.263 42 24 42c10.493 0 19.438-7.666 19.438-18 0-1.341-.138-2.64-.401-3.917z"/>
            </svg>
            Continue with Google
          </button>

          <div className="text-center mt-2">
            <span className="text-secondary small">Don't have an account? </span>
            <Link to="/signup" className="text-primary fw-semibold text-decoration-none">Sign up</Link>
          </div>
        </form>

      </motion.div>
    </div>
  );
});

export default Login;
