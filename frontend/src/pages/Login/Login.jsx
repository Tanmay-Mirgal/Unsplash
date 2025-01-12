import React, { useState } from 'react';

import { Facebook } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from '@/components/components/ui/card';
import { Button } from '@/components/components/ui/button';
import { Input } from '@/components/components/ui/input';
import { Label } from '@/components/components/ui/label';
import logo from '../../assets/unsplash-logo.jpeg'
import { Link } from 'react-router-dom';
import { useUserStore } from '../../Store/useUserStore';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const { login, isLoading } = useUserStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await login(formData);
      if (user) {
        window.location.reload();
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <div
          className='absolute top-0 z-[-2] h-screen w-screen dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] 
			dark:bg-[size:20px_20px] bg-[#ffffff] bg-[radial-gradient(#00000033_1px,#ffffff_1px)] bg-[size:20px_20px]'
          aria-hidden='true'
        />

        <div className="min-h-screen -mt-10 flex flex-col">


          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="flex-1 flex items-center justify-center p-4 md:p-6">
              <Card className="w-full max-w-md md:max-w-[400px]">
                <CardHeader>
                  <img src={logo} alt=""
                    className='w-[50px] h-[50px] ml-[19.5vh] rounded-lg' />
                  <h2 className="text-2xl font-bold text-center">Login</h2>
                  <p className="text-center text-gray-600 mt-2">Welcome back.</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Social Login Buttons */}
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full" size="lg">
                      <Facebook className="mr-2 h-4 w-4" />
                      Continue with Facebook
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or</span>
                      </div>
                    </div>
                  </div>

                  {/* Email/Password Form */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        autoComplete="off"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Button variant="link" className="text-sm px-0">
                          Forgot password?
                        </Button>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="w-full"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                  <Button className="w-full" size="lg" disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                  </Button>

                  {error && (
                    <div className="text-red-600 text-center">{error}</div>
                  )}
                  <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup">
                      <Button variant="link" className="text-sm px-1">
                        Join Unsplash
                      </Button>
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </div>
          </form>

          {/* Footer */}
          <footer className=" -mt-10 py-6 text-center text-sm text-gray-600">
            <p>
              By logging in, you agree to our{' '}
              <Button variant="link" className="text-sm px-1">
                Terms of Service
              </Button>{' '}and{' '}
              <Button variant="link" className="text-sm px-1">
                Privacy Policy
              </Button>
            </p>
          </footer>
        </div>
      </div>
    </>
  )
}

export default Login;

