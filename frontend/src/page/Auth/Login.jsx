import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, verifyLoginOtp } from "@/page/State/Auth/Action";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [otp, setOtp] = useState("");
    const [showOtpDialog, setShowOtpDialog] = useState(false);
    const [sessionId, setSessionId] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(login({ ...formData, navigate }));

        if (result?.twoFactorAuthEnable) {
            setSessionId(result.session);
            setShowOtpDialog(true);
        }
    };

    const handleOtpVerify = async () => {
        await dispatch(verifyLoginOtp(otp, sessionId, navigate));
    };

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-[#1E293B] shadow-md rounded-xl p-8 space-y-6"
            >
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#F1F5F9]">TradeX</h1>
                    <p className="text-sm text-[#F1F5F9]">Secure Crypto Trading Platform</p>
                </div>

                <h2 className="text-xl font-semibold text-[#F1F5F9] text-center">Log in to Your Account</h2>

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
                <Button type="submit" className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]">
                    Login
                </Button>

                <p className="text-sm text-center text-[#F1F5F9]">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="text-[#38BDF8] underline hover:text-[#3B82F6]">Sign up</Link>
                </p>
            </form>

            {showOtpDialog && (
                <div className="fixed inset-0 bg-[#0F172A] bg-opacity-90 flex items-center justify-center z-50">
                <div className="bg-[#1E293B] p-6 rounded-xl shadow-lg space-y-4 w-full max-w-sm">
                        <h2 className="text-xl font-bold text-[#F1F5F9] text-center">Enter OTP</h2>
                        <Input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            className="bg-[#1a1a1a] text-[#F1F5F9] border-gray-700 placeholder-gray-500"
                            maxLength={6}
                        />
                        <div className="flex justify-end space-x-2">
                            <Button onClick={() => setShowOtpDialog(false)} className="bg-gray-600 text-white hover:bg-gray-500">Cancel</Button>
                            <Button onClick={handleOtpVerify} className="bg-[#3B82F6] text-white hover:bg-[#2563EB]">Verify</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
