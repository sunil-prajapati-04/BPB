import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/bpb.png';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { label: 'Home', href: '/' },
    { label: 'Paans', href: '/#product-page' },
    { label: 'About us', href: '#' },
    { label: 'Order', href: '/#order-section' },
    { label: 'Reviews', href: '/#review-section' }
  ];

  const socialLinks = [
    {
      icon: FaInstagram,
      url: 'https://www.instagram.com/bhagatpaan_bhandar01/?hl=en',
      label: 'Instagram',
    },
    {
      icon: FaWhatsapp,
      url: 'https://wa.me/919414795960',
      label: 'WhatsApp',
    }
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);

    const scrollToSection = (id) => {
      const section = document.getElementById(id);
      if (section) {
        const navOffset = 90;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({ top: sectionTop, behavior: 'smooth' });
        return;
      }

      const fallback = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      setTimeout(fallback, 100);
    };

    if (tab === 'Home') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 80);
        return;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tab === 'Paans') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection('product-page'), 120);
        return;
      }

      scrollToSection('product-page');
    }

    if (tab === 'Order') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection('order-section'), 120);
        return;
      }

      scrollToSection('order-section');
    }

    if (tab === 'Reviews') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection('review-section'), 120);
        return;
      }

      scrollToSection('review-section');
    }
  };

  return (
    <nav className="navbar">
      {/* Animated Gradient Background */}
      <div className="navbar-gradient-bg"></div>

      <div className="navbar-container">
        {/* Left - Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="BPB Logo" className="logo-image" />
          </Link>
        </div>

        {/* Center - Navigation Tabs (Desktop Only) */}
        <div className="navbar-tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              to={tab.href}
              className={`nav-tab ${activeTab === tab.label ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.label)}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Right - Social Icons & Hamburger */}
        <div className="navbar-right">
          <div className="social-icons">
            {socialLinks.map(({ icon: Icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="social-link"
                title={label}
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
          <button className="contact-btn">Contact Us</button>

          {/* Hamburger Menu Button */}
          <button
            className="hamburger-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              to={tab.href}
              className={`sidebar-tab ${activeTab === tab.label ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.label)}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
