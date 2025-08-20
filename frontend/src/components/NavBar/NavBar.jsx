import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Leads from '../../images/logo.webp';

const NavBar = () => {
  const navRef = useRef(null);

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      const navbarToggler = document.querySelector('.navbar-toggler');
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarToggler && navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={navRef}>
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={Leads} alt="Logo" className="navbar-logo" /><b>UnSaid</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
            <span className="navbar-toggler-icon"></span>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ml-auto">
              <Link to="/" className="btn">Home</Link>
              <Link to="/create-post" className="btn">Post</Link>
              <Link to="/aboutus" className="btn">About Us</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
