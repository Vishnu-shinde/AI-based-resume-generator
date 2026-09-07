import { memo } from 'react';

const Footer = memo(function Footer() {
  return (
    <footer className="pb-4 text-center text-secondary small">
        @Copyright Automated Resume Builder · Unified developer profile insights  
        <span className="badge bg-primary rounded-pill ms-2">Beta</span>
        <span className="badge bg-success rounded-pill ms-1">v1.0.0</span>
    </footer>
  );
});

export default Footer;
