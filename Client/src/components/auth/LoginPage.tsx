import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingSpinner from '../common/LoadingSpinner';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface LoginPageProps {
  setCurrentPage: (page: 'products' | 'cart' | 'login' | 'orders') => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setCurrentPage }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!identifier || !password) {
        setError("Both username/email and password are required.");
        return;
    }
    try {
      const isEmail = identifier.includes('@');
      const credentials = isEmail ? { email: identifier, password } : { username: identifier, password };
      await login(credentials);

      setCurrentPage('products');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
      console.error(err);
    }
  };

  if (isAuthenticated) {
    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <p>You are already logged in.</p>
            <Button onClick={() => setCurrentPage('products')} className="mt-4">Go to Products</Button>
        </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login to Your Account</CardTitle>
          <CardDescription>Enter your credentials to access your cart and orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Login Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="identifier">Username or Email</Label>
              <Input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="yourname or user@example.com"
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <LoadingSpinner size={5} className="mr-2" /> : null}
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p>Don't have an account? <Button variant="link" className="p-0 h-auto" onClick={() => alert('Sign up functionality not implemented.')}>Sign Up</Button></p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;