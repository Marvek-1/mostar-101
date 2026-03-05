import { useState } from 'react';
import { Menu, X, Globe, Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavigationProps {
  scrollY: number;
}

const Navigation = ({ scrollY }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Guardians', href: '/guardians', icon: Shield },
    { label: 'Agents', href: '/agents', icon: Users },
    { label: 'Doctrine', href: '/#doctrine', icon: null },
    { label: 'Artifacts', href: '/#artifacts', icon: null },
  ];

  const isScrolled = scrollY > 100;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-mostar-dark-900/90 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 border-2 border-mostar-yellow-500 rounded-sm rotate-45 flex items-center justify-center group-hover:border-mostar-gold-400 transition-colors">
                <span className="font-cinzel-decorative text-lg text-mostar-yellow-400 -rotate-45 group-hover:text-mostar-gold-400 transition-colors">
                  M
                </span>
              </div>
            </div>
            <span className="font-cinzel text-xl font-semibold tracking-wider text-white group-hover:text-mostar-yellow-300 transition-colors">
              Mostar
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="font-cinzel text-sm tracking-wider text-white/70 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-mostar-yellow-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors">
              <Globe className="w-4 h-4" />
              <span className="font-cinzel tracking-wider">EN</span>
            </button>
            <Link to="/agents" className="btn-primary text-sm">Enter Grid</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-mostar-dark-900/95 backdrop-blur-md border-b border-white/10 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="container-custom py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="block font-cinzel text-lg tracking-wider text-white/70 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/agents" className="btn-primary w-full mt-4 block text-center">Enter Grid</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

