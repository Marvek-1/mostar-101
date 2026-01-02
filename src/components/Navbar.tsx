import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

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

  const handleMostarAIClick = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    toast("Accessing MoStar AI Hub...", {
      icon: <Zap className="h-5 w-5 text-mostar-cyan" />,
    });
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glassmorphism shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-mostar-blue to-mostar-cyan flex items-center justify-center">
            <span className="font-display font-bold text-lg text-white">M</span>
          </div>
          <span className="font-display font-bold text-xl text-white">
            MOSTAR <span className="text-mostar-light-blue">INDUSTRIES</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link font-display text-sm tracking-wide text-white/80 hover:text-mostar-light-blue transition-colors">
            Home
          </Link>
          <Link to="/technologies" className="nav-link font-display text-sm tracking-wide text-white/80 hover:text-mostar-light-blue transition-colors">
            Technologies
          </Link>
          <a href="/#dashboard" className="nav-link font-display text-sm tracking-wide text-white/80 hover:text-mostar-light-blue transition-colors">
            Dashboard
          </a>
          <a href="/#vision" className="nav-link font-display text-sm tracking-wide text-white/80 hover:text-mostar-light-blue transition-colors">
            Vision
          </a>
          <Link to="/hub" className="nav-link font-display text-sm tracking-wide text-white/80 hover:text-mostar-light-blue transition-colors">
            AI Hub
          </Link>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 text-white hover:text-mostar-cyan">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mostar-blue to-mostar-cyan flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-display text-sm">{user.email?.split('@')[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glassmorphism border-mostar-blue/30">
                <DropdownMenuItem onClick={handleSignOut} className="text-white hover:text-mostar-cyan cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth" className="button-cyber">
              Sign In
            </Link>
          )}
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
          <Link
            to="/"
            className="text-white/80 hover:text-mostar-light-blue py-3 border-b border-white/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/technologies"
            className="text-white/80 hover:text-mostar-light-blue py-3 border-b border-white/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Technologies
          </Link>
          <a
            href="/#dashboard"
            className="text-white/80 hover:text-mostar-light-blue py-3 border-b border-white/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </a>
          <a
            href="/#vision"
            className="text-white/80 hover:text-mostar-light-blue py-3 border-b border-white/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Vision
          </a>
          <Link
            to="/hub"
            className="text-white/80 hover:text-mostar-light-blue py-3 border-b border-white/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            AI Hub
          </Link>
          
          {user ? (
            <>
              <div className="text-mostar-cyan py-3 border-b border-white/10 flex items-center">
                <User className="h-4 w-4 mr-2" />
                {user.email?.split('@')[0]}
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="text-white/80 hover:text-red-400 py-3 flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="button-cyber w-full text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
