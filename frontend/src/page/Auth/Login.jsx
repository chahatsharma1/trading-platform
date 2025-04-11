import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#111] shadow-md rounded-xl p-8 space-y-6">
                {/* Brand Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">TradeX</h1>
                    <p className="text-sm text-gray-400">Secure Crypto Trading Platform</p>
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-white text-center">Log in to Your Account</h2>

                {/* Inputs */}
                <Input type="email" placeholder="Email" className="bg-[#1a1a1a] text-white border-gray-700 placeholder-gray-500" />
                <Input type="password" placeholder="Password" className="bg-[#1a1a1a] text-white border-gray-700 placeholder-gray-500" />

                {/* Forgot Password */}
                <div className="text-right">
                    <Link to="/forgot-password" className="text-sm text-gray-300 hover:underline">
                        Forgot password?
                    </Link>
                </div>

                {/* Login Button */}
                <Button className="w-full bg-white text-black hover:bg-gray-200">Login</Button>

                {/* Signup Link */}
                <p className="text-sm text-center text-gray-400">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="text-white underline hover:text-gray-300">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
