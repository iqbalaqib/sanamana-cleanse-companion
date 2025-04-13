
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Logo from '../Logo';

interface AuthFormProps {
  isLogin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // This is a mock authentication - in a real app, you'd connect to an auth API
      setTimeout(() => {
        localStorage.setItem('sanamana-user', JSON.stringify({ 
          email,
          isNewUser: !isLogin 
        }));
        
        toast.success(isLogin ? 'Login successful!' : 'Account created!');
        
        if (!isLogin) {
          navigate('/onboarding');
        } else {
          const userData = localStorage.getItem('sanamana-user-data');
          if (userData) {
            navigate('/');
          } else {
            navigate('/onboarding');
          }
        }
        
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Authentication failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6">
      <Logo className="mb-12" />
      
      <div className="sanamana-card w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-medium text-center mb-6">
          {isLogin ? 'Welcome Back' : 'Create Your Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="sanamana-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="sanamana-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          
          <button 
            type="submit" 
            className="sanamana-btn sanamana-btn-primary w-full mt-6"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => navigate(isLogin ? '/signup' : '/login')}
              className="text-sanamana-green font-medium"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
