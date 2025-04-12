import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/page/State/Auth/Action"; // adjust path if needed

const Login = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData)); // Trigger redux action
    };

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-[#1E293B] shadow-md rounded-xl p-8 space-y-6"
            >
                {/* Brand Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#F1F5F9]">TradeX</h1>
                    <p className="text-sm text-[#F1F5F9]">Secure Crypto Trading Platform</p>
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-[#F1F5F9] text-center">Log in to Your Account</h2>

                {/* Inputs */}
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="bg-[#1a1a1a] text-[#F1F5F9] border-gray-700 placeholder-gray-500"
                    required
                />
                <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="bg-[#1a1a1a] text-[#F1F5F9] border-gray-700 placeholder-gray-500"
                    required
                />

                {/* Forgot Password */}
                <div className="text-right">
                    <Link to="/forgot-password" className="text-sm text-[#38BDF8] hover:underline">
                        Forgot password?
                    </Link>
                </div>

                {/* Login Button */}
                <Button type="submit" className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]">
                    Login
                </Button>

                {/* Signup Link */}
                <p className="text-sm text-center text-[#F1F5F9]">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="text-[#38BDF8] underline hover:text-[#3B82F6]">Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
