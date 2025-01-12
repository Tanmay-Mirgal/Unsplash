import React, { useState } from 'react';
import { Facebook } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from '@/components/components/ui/card';
import { Button } from '@/components/components/ui/button';
import { Input } from '@/components/components/ui/input';
import { Label } from '@/components/components/ui/label';
import logo from '../../assets/unsplash-logo.jpeg';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../Store/useUserStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState(null);
    const { signup } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateInputs = () => {
        if (!formData.name || !formData.email || !formData.password) {
            setError("All fields are required.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;
        setError(null);
        setIsLoading(true);
        try {
            const user = await signup(formData);
            if (user) {
                toast.success("Signup successful!");
                window.location.reload();
            }
        } catch (error) {
            const message = error.response?.data?.message || "Failed to register. Please try again.";
            setError(message);
            toast.error(message);
        }
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {/* Background */}
            <div
                className="absolute top-0 z-[-2] h-screen w-screen dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)]
                dark:bg-[size:20px_20px] bg-[#ffffff] bg-[radial-gradient(#00000033_1px,#ffffff_1px)] bg-[size:20px_20px]"
                aria-hidden="true"
            />
            {/* Form Card */}
            <Card className="w-full max-w-md md:max-w-[370px]">
                <CardHeader className="sm:px-6 sm:py-4">
                    <img src={logo} alt="Logo" className="w-[50px] h-[50px] ml-[19.5vh] rounded-lg sm:ml-0" />
                    <h2 className="text-2xl font-bold text-center sm:text-3xl">Signup</h2>
                </CardHeader>
                <CardContent className="space-y-6 sm:px-6 sm:py-4">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 sm:space-y-6">
                            <div className="space-y-2 sm:space-y-3">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="sm:text-lg"
                                />
                            </div>
                            <div className="space-y-2 sm:space-y-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="sm:text-lg"
                                />
                            </div>
                            <div className="space-y-2 sm:space-y-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="sm:text-lg"
                                />
                            </div>
                        </div>
                        <Button className="w-full mt-6 sm:mt-8" size="lg" type="submit" disabled={isLoading}>
                            {isLoading ? "Signing Up..." : "Signup"}
                        </Button>
                    </form>
                    {error && <p className="text-sm text-red-500 sm:text-base">{error}</p>}
                </CardContent>
                <CardFooter className="text-center sm:px-6 sm:py-4">
                    <p className="text-sm text-gray-600 sm:text-base">
                        Already have an account?{" "}
                        <Link to="/login">
                            <Button variant="link" className="text-sm px-1">Login</Button>
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Signup;

