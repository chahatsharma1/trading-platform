import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [showOtpDialog, setShowOtpDialog] = useState(false);
    const [otp, setOtp] = useState('');

    const handleSendResetLink = () => {
        if (!email) return;
        setShowOtpDialog(true);
    };

    const handleOtpVerify = () => {
        console.log("Verifying OTP:", otp);
        setShowOtpDialog(false);
    };

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#1E293B] shadow-md rounded-xl p-8 space-y-6">
                {/* Brand */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#F1F5F9]">TradeX</h1>
                    <p className="text-sm text-[#F1F5F9]">Secure Crypto Trading Platform</p>
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-[#F1F5F9] text-center">Forgot Password?</h2>
                <p className="text-sm text-[#F1F5F9] text-center">
                    Enter your registered email address and we’ll send you an OTP to reset your password.
                </p>

                {/* Email Input */}
                <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#1a1a1a] text-[#F1F5F9] border-gray-700 placeholder-gray-500"
                />

                {/* Send OTP Button */}
                <Button
                    className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                    onClick={handleSendResetLink}
                >
                    Send OTP
                </Button>

                {/* Navigation */}
                <p className="text-sm text-center text-[#F1F5F9]">
                    <Link to="/login" className="text-[#38BDF8] underline hover:text-[#3B82F6]">
                        Back to login
                    </Link>
                </p>
            </div>

            {/* OTP Dialog */}
            <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
                <DialogContent className="bg-[#1E293B] rounded-lg shadow-xl max-w-sm mx-auto">
                    <DialogHeader>
                        <DialogTitle className="text-[#F1F5F9] text-center">Verify OTP</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p className="text-sm text-[#F1F5F9] text-center">
                            Enter the 6-digit OTP sent to <span className="font-medium text-[#38BDF8]">{email}</span>
                        </p>
                        <Input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="bg-[#1a1a1a] text-[#F1F5F9] border-gray-700 placeholder-gray-500 tracking-widest text-center"/>
                        <Button
                            className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                            onClick={handleOtpVerify}>
                            Verify OTP
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
export default ForgotPassword;
