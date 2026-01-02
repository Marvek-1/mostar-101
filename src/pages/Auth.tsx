import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Mail, Lock, Eye, EyeOff, Zap, ArrowLeft } from 'lucide-react';
import { z } from 'zod';

// Validation schemas
const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});

  const { signIn, signUp, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; confirmPassword?: string } = {};

    try {
      emailSchema.parse(email);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.email = e.errors[0].message;
      }
    }

    try {
      passwordSchema.parse(password);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.password = e.errors[0].message;
      }
    }

    if (!isLogin && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Welcome back to the Grid!');
          navigate(from, { replace: true });
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('This email is already registered. Please sign in.');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Account created! Welcome to MoStar Grid.');
          navigate(from, { replace: true });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error('Google sign-in failed. Please try again.');
      setIsLoading(false);
    }
    // Don't set loading false on success - page will redirect
  };

  return (
    <div className="min-h-screen bg-mostar-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mostar-blue/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mostar-cyan/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="w-full max-w-md relative z-10">
        {/* Back to home link */}
        <Link 
          to="/" 
          className="inline-flex items-center text-mostar-light-blue hover:text-mostar-cyan transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Auth card */}
        <div className="glassmorphism p-8 rounded-xl border border-mostar-blue/30">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-mostar-blue to-mostar-cyan flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-display font-bold text-center text-white mb-2">
            {isLogin ? 'Access the Grid' : 'Join the Grid'}
          </h1>
          <p className="text-center text-white/60 mb-8 font-mono text-xs">
            {isLogin ? 'AUTHENTICATION REQUIRED' : 'REGISTRATION PROTOCOL'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mostar-light-blue/50" />
                <Input
                  id="email"
                  type="email"
                  placeholder="operator@mostar.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-mostar-dark-blue/50 border-mostar-blue/30 text-white placeholder:text-white/30 focus:border-mostar-cyan"
                  disabled={isLoading}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mostar-light-blue/50" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-mostar-dark-blue/50 border-mostar-blue/30 text-white placeholder:text-white/30 focus:border-mostar-cyan"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mostar-light-blue/50 hover:text-mostar-cyan"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white/80">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mostar-light-blue/50" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 bg-mostar-dark-blue/50 border-mostar-blue/30 text-white placeholder:text-white/30 focus:border-mostar-cyan"
                    disabled={isLoading}
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-xs">{errors.confirmPassword}</p>}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-mostar-blue to-mostar-cyan hover:opacity-90 text-white font-display"
            >
              {isLoading ? 'PROCESSING...' : isLogin ? 'AUTHENTICATE' : 'REGISTER'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-mostar-blue/30"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-mostar-dark-blue px-2 text-white/50 font-mono">OR</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full border-mostar-blue/30 text-white hover:bg-mostar-blue/20 hover:text-mostar-cyan"
          >
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-white/60 text-sm">
            {isLogin ? "Don't have access?" : 'Already registered?'}{' '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
              className="text-mostar-cyan hover:text-mostar-light-blue transition-colors"
            >
              {isLogin ? 'Request Access' : 'Sign In'}
            </button>
          </p>
        </div>

        <p className="text-center text-white/40 text-xs mt-6 font-mono">
          MOSTAR GRID • SECURE AUTHENTICATION PROTOCOL
        </p>
      </div>
    </div>
  );
};

export default Auth;
