import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { adminLogin, login, verifyLoginOtp } from "@/page/State/Auth/Action";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('user');
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [otp, setOtp] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [showOtpDialog, setShowOtpDialog] = useState(false);

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
            let result;
            if (activeTab === 'admin') {
                result = await dispatch(adminLogin({ ...formData, navigate }));
            } else {
                result = await dispatch(login({ ...formData, navigate }));
                if (result?.twoFactorAuthEnable) {
                    setSessionId(result.session);
                    setShowOtpDialog(true);
                }
            }

            if (result?.error) {
                setErrorMessage("Email or password is incorrect.");
                setTimeout(() => setErrorMessage(""), 3000);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Email or password is incorrect.");
            setTimeout(() => setErrorMessage(""), 3000);
        } finally {
            setLoginLoading(false);
        }
    };

    const handleOtpVerify = async () => {
        setErrorMessage("");
        try {
            await dispatch(verifyLoginOtp(otp, sessionId, navigate));
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#1E293B] shadow-md rounded-xl p-8 space-y-6">
                <div className="flex justify-center space-x-4 mb-6">
                    <button
                        onClick={() => setActiveTab('user')}
                        className={`text-lg font-semibold px-4 py-2 rounded-md ${
                            activeTab === 'user'
                                ? 'bg-[#3B82F6] text-white'
                                : 'text-[#F1F5F9] hover:text-[#3B82F6]'
                        }`}
                    >
                        User Login
                    </button>
                    <button
                        onClick={() => setActiveTab('admin')}
                        className={`text-lg font-semibold px-4 py-2 rounded-md ${
                            activeTab === 'admin'
                                ? 'bg-[#3B82F6] text-white'
                                : 'text-[#F1F5F9] hover:text-[#3B82F6]'
                        }`}
                    >
                        Admin Login
                    </button>
                </div>

                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#F1F5F9]">TradeX</h1>
                    <p className="text-sm text-[#F1F5F9]">
                        {activeTab === 'admin' ? 'Secure Crypto Trading Platform - Admin Login' : 'Secure Crypto Trading Platform - User Login'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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

                    <Button
                        type="submit"
                        className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]">
                        {loginLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </div>

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
                        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                        <div className="flex justify-end space-x-2">
                            <Button onClick={() => setShowOtpDialog(false)} className="bg-gray-600 text-white hover:bg-gray-500">Cancel</Button>
                            <Button onClick={handleOtpVerify} className="bg-[#3B82F6] text-white hover:bg-[#2563EB]">
                                Verify
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
