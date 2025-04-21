import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { register } from '../State/Auth/Action';

const Signup = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(formData));
    };

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#1E293B] shadow-md rounded-xl p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#F1F5F9]">TradeX</h1>
                    <p className="text-sm text-[#F1F5F9]">Secure Crypto Trading Platform</p>
                </div>

                <h2 className="text-xl font-semibold text-[#F1F5F9] text-center">Create a New Account</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Input
                        name="fullName"
                        type="text"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="bg-[#1a1a1a] text-[#F1F5F9] border-gray-700 placeholder-gray-500"
                    />
                    <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-[#1a1a1a] text-[#F1F5F9] border-gray-700 placeholder-gray-500"
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-[#1a1a1a] text-[#F1F5F9] border-gray-700 placeholder-gray-500"
                    />

                    <Button type="submit" className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]">
                        Sign Up
                    </Button>
                </form>

                <p className="text-sm text-center text-[#F1F5F9]">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#38BDF8] underline hover:text-[#3B82F6]">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
