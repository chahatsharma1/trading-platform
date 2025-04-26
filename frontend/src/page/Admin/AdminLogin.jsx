import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import {adminLogin} from "@/page/State/Auth/Action";

const AdminLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loginLoading, setLoginLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        setErrorMessage("");

        try {
            await dispatch(adminLogin({ ...formData, navigate}));
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoginLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-[#1E293B] shadow-md rounded-xl p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#F1F5F9]">TradeX</h1>
                    <p className="text-sm text-[#F1F5F9]">Secure Crypto Trading Platform - Admin Login</p>
                </div>

                <h2 className="text-xl font-semibold text-[#F1F5F9] text-center">Log in to Admin Account</h2>

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

                <div className="text-right">
                    <Link to="/forgot-password" className="text-sm text-[#38BDF8] hover:underline">
                        Forgot password?
                    </Link>
                </div>

                {errorMessage && (
                    <p className="text-red-500 text-center">{errorMessage}</p>
                )}

                <Button type="submit" className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]">
                    {loginLoading ? "Logging in..." : "Login"}
                </Button>
            </form>
        </div>
    );
};

export default AdminLogin;
