import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button.jsx";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog.jsx";
import { Input } from "@/components/ui/input.jsx";
import { getUser, sendVerificationOtp, verifyOtp } from "@/page/State/Auth/Action.js";
import { Loader2, KeyRound } from "lucide-react";

const AccountVerificationForm = ({ onSuccess, userEmail }) => {
    const dispatch = useDispatch();
    const [otpDialogOpen, setOtpDialogOpen] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSendOtp = async () => {
        setLoading(true);
        setError("");
        try {
            await dispatch(sendVerificationOtp(localStorage.getItem("jwt"), "EMAIL"));
            setOtpDialogOpen(true);
        } catch (err) {
            setError("Failed to send OTP. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (otpDialogOpen) {
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
        }
    }, [otpDialogOpen]);

    const handleChangeOtp = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOtp = async () => {
        const enteredOtp = otp.join("");
        if (enteredOtp.length !== 6) {
            setError("Please enter the complete 6-digit OTP.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await dispatch(verifyOtp(localStorage.getItem("jwt"), enteredOtp));
            await dispatch(getUser(localStorage.getItem("jwt")));
            setOtpDialogOpen(false);
            if (onSuccess) onSuccess();
        } catch (err) {
            setError("Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 py-4">
            <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">We will send a verification code to:</p>
                <p className="text-base font-semibold">{userEmail}</p>
            </div>

            <Button
                type="button"
                onClick={handleSendOtp}
                className="w-full font-semibold"
                size="lg"
                disabled={loading}
            >
                {loading ? (
                    <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Sending...</span>
                    </div>
                ) : (
                    "Send Verification Code"
                )}
            </Button>
            {error && !otpDialogOpen && <p className="text-sm text-red-500 text-center">{error}</p>}

            <Dialog open={otpDialogOpen} onOpenChange={setOtpDialogOpen}>
                <DialogContent className="bg-card border-border">
                    <DialogHeader>
                        <div className="flex flex-col items-center text-center gap-4 py-4">
                            <KeyRound className="w-16 h-16 text-primary" />
                            <DialogTitle className="text-2xl">Enter Verification Code</DialogTitle>
                            <DialogDescription>
                                A 6-digit code has been sent to your email.
                            </DialogDescription>
                        </div>
                    </DialogHeader>
                    
                    <div className="flex justify-center gap-2" onPaste={(e) => {
                        const pastedData = e.clipboardData.getData('text').slice(0, 6);
                        if (/^\d{6}$/.test(pastedData)) {
                            setOtp(pastedData.split(''));
                            inputRefs.current[5]?.focus();
                        }
                    }}>
                        {otp.map((digit, index) => (
                            <Input
                                key={index}
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChangeOtp(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="h-14 w-12 text-center text-2xl font-mono bg-background border-border"
                            />
                        ))}
                    </div>

                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                    
                    <DialogFooter>
                        <Button
                            onClick={handleVerifyOtp}
                            className="w-full font-semibold"
                            size="lg"
                            disabled={loading || otp.join("").length < 6}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Verifying...</span>
                                </div>
                            ) : (
                                "Verify Code"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AccountVerificationForm;