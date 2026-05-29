import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dropdown on hover for desktop
  const handleMouseEnter = (name) => {
    setHoveredDropdown(name);
  };

  const handleMouseLeave = () => {
    setHoveredDropdown(null);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo">
        <img src="/assets/logo/Synthica Logo.png" alt="Synthica Logo" className="logo-icon" />
        <span className="logo-text">Synthica</span>
      </Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li 
          className={`nav-item-dropdown ${hoveredDropdown === 'about' ? 'active' : ''}`}
          onMouseEnter={() => handleMouseEnter('about')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/about" className="nav-link-dropdown">About</Link>
          <ul className="dropdown-menu">
            <li><Link to="/about#mission">Our Mission</Link></li>
            <li><Link to="/about#team">Our Team</Link></li>
          </ul>
        </li>
        <li>
          <a href="https://globalresearchchallenge.org" target="_blank" rel="noopener noreferrer">Competition</a>
        </li>
        <li
          className={`nav-item-dropdown ${hoveredDropdown === 'journal' ? 'active' : ''}`}
          onMouseEnter={() => handleMouseEnter('journal')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/journal" className="nav-link-dropdown">Journal</Link>
          <ul className="dropdown-menu">
            <li><Link to="/journal">Author Guidelines</Link></li>
            <li><Link to="/editorial-board">Editorial Board</Link></li>
          </ul>
        </li>
        <li
          className={`nav-item-dropdown ${hoveredDropdown === 'work' ? 'active' : ''}`}
          onMouseEnter={() => handleMouseEnter('work')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/work-with-us" className="nav-link-dropdown">Work with us</Link>
          <ul className="dropdown-menu">
            <li><Link to="/work-with-us#partnerships">Partnerships</Link></li>
          </ul>
        </li>
      </ul>
      <a href="https://discord.gg/8wPzZkGy5Z" target="_blank" rel="noopener noreferrer" className="join-btn">Join Us Now</a>
    </nav>
  );
};

export default Navbar;
