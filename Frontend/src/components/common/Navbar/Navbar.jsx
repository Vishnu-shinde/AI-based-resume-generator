import { memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { logout } from '../../../features/auth/authSlice';
import logo from '../../../assets/logo.png';

const Navbar = memo(function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authorized, userEmail } = useSelector((state) => state.auth);
    const profileName = userEmail?.split('@')[0] || 'Profile';
    const profileInitial = profileName.charAt(0).toUpperCase();
    const [theme, setTheme] = useState(() => {
        try {
            return document.documentElement.getAttribute('data-theme') || localStorage.getItem('theme') || 'light';
        } catch {
            return 'light';
        }
    });

    useEffect(() => {
        try {
            document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
            localStorage.setItem('theme', theme);
        } catch {
            // ignore
        }
    }, [theme]);

    function toggleTheme() {
        setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
    }

    function handleLogout() {
        dispatch(logout());
        navigate('/');
    }

    return (
        <nav className="navbar navbar-expand-lg sticky-top px-5 py-3 position-relative">
        <a className="navbar-brand ms-5" href="#">
            <img src={logo} width="30" height="30" className="d-inline-block align-top mx-2 rounded-circle" alt="Automated Resume Builder Logo"/>
            <span className="fs-5 fw-medium title">
                Automated Resume Builder
            </span>
        </a>
        
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav position-absolute gap-4 start-50 translate-middle-x">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                {authorized ? (
                    <>
                        <li className="nav-item">
                            <a className="nav-link" href="#features">Features</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/preview">My Resume</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                        </li>
                    </>
                )}
            </ul>
        </div>

        <div className="d-flex align-items-center gap-2 ms-auto me-5">
            
            <button type="button" onClick={toggleTheme} className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', padding: 0 }} id="theme-toggle" aria-label="Toggle theme" aria-pressed={theme === 'dark'}>
                {theme === 'dark' ? <LightModeOutlinedIcon fontSize="xsmall" /> : <DarkModeOutlinedIcon fontSize="xsmall" />}
            </button>

            <button type="button" className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', padding: 0 }} id="share-btn" aria-label="Share">
                <IosShareOutlinedIcon fontSize="xsmall" />
            </button>

            {authorized && (
                <>
                    <div className="d-flex align-items-center gap-2 ms-2" title={userEmail || 'Signed-in user'}>
                    <span
                        className="rounded-circle d-flex align-items-center justify-content-center bg-primary text-white fw-semibold"
                        style={{ width: '32px', height: '32px' }}
                        aria-hidden="true"
                    >
                        {profileInitial}
                    </span>
                    <span className="small text-truncate" style={{ maxWidth: '220px' }}>
                        {profileName}
                    </span>
                    </div>
                    <button
                        type="button"
                        className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-1"
                        style={{ height: '32px', padding: '0 10px' }}
                        onClick={handleLogout}
                        aria-label="Log out"
                    >
                        <LogoutOutlinedIcon fontSize="xsmall" />
                        <span className="small">Logout</span>
                    </button>
                </>
            )}
        </div>
    </nav>

  );
});

export default Navbar;
