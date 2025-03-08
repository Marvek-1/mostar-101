
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glassmorphism shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-mostar-blue to-mostar-cyan flex items-center justify-center">
            <span className="font-display font-bold text-lg text-white">M</span>
          </div>
          <span className="font-display font-bold text-xl text-white">
            MOSTAR <span className="text-mostar-light-blue">INDUSTRIES</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="nav-link font-display text-sm tracking-wide text-white/80 hover:text-mostar-light-blue transition-colors">
            Home
          </a>
          <a href="#technologies" className="nav-link font-display text-sm tracking-wide text-white/80 hover:text-mostar-light-blue transition-colors">
            Technologies
          </a>
          <a href="#dashboard" className="nav-link font-display text-sm tracking-wide text-white/80 hover:text-mostar-light-blue transition-colors">
            Dashboard
          </a>
          <a href="#vision" className="nav-link font-display text-sm tracking-wide text-white/80 hover:text-mostar-light-blue transition-colors">
            Vision
          </a>
          <a href="#get-involved" className="button-cyber">
            Join the Future
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-mostar-light-blue" />
          ) : (
            <Menu className="h-6 w-6 text-mostar-light-blue" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full glassmorphism shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="container mx-auto py-6 px-4 flex flex-col space-y-4">
          <a
            href="#"
            className="text-white/80 hover:text-mostar-light-blue py-3 border-b border-white/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#technologies"
            className="text-white/80 hover:text-mostar-light-blue py-3 border-b border-white/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Technologies
          </a>
          <a
            href="#dashboard"
            className="text-white/80 hover:text-mostar-light-blue py-3 border-b border-white/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </a>
          <a
            href="#vision"
            className="text-white/80 hover:text-mostar-light-blue py-3 border-b border-white/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Vision
          </a>
          <a
            href="#get-involved"
            className="button-cyber w-full text-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Join the Future
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
