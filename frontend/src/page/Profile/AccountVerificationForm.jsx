import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button.jsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.jsx";
import { Input } from "@/components/ui/input.jsx";
import {getUser, sendVerificationOtp, verifyOtp} from "@/page/State/Auth/Action.js";

const AccountVerificationForm = ({ closeParentDialog, userEmail}) => {
    const [otpDialogOpen, setOtpDialogOpen] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSendOtp = async () => {
        setLoading(true);
        setError("");
        try {
            await dispatch(sendVerificationOtp(localStorage.getItem("jwt"), "EMAIL"));
            setOtpDialogOpen(true);
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
        } catch (err) {
            setError("Gmail Server is Down");
        } finally {
            setLoading(false);
        }
    };

    const handleChangeOtp = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index, event) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOtp = async () => {
        const enteredOtp = otp.join("");
        setLoading(true);
        setError("");
        try {
            await dispatch(verifyOtp(localStorage.getItem("jwt"), enteredOtp));
            await dispatch(getUser(localStorage.getItem("jwt")))
            setOtpDialogOpen(false);
            closeParentDialog();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-4 text-[#F1F5F9]">
                <div className="space-y-1">
                    <p className="text-sm text-[#94A3B8] font-medium">Sending OTP to</p>
                    <div className="bg-[#1E293B] text-[#F1F5F9] px-4 py-3 rounded-md text-sm font-semibold border border-[#334155] max-w-full break-words">
                        {userEmail}
                    </div>
                </div>

                <Button
                    type="button"
                    onClick={handleSendOtp}
                    className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB] rounded-xl py-2 text-sm font-medium"
                    disabled={loading}
                >
                    {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <Dialog open={otpDialogOpen} onOpenChange={setOtpDialogOpen}>
                <DialogContent className="bg-[#0F172A] text-[#F1F5F9]">
                    <DialogHeader>
                        <DialogTitle className="text-[#F1F5F9]">Verify OTP</DialogTitle>
                        <DialogDescription/>
                    </DialogHeader>
                    <div className="flex justify-center gap-2 mt-4">
                        {otp.map((digit, index) => (
                            <Input
                                key={index}
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChangeOtp(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="w-10 h-10 text-center text-lg bg-[#1E293B] text-[#F1F5F9] border border-[#334155] focus:ring-0 focus:border-[#3B82F6]"
                            />
                        ))}
                    </div>
                    <Button
                        onClick={handleVerifyOtp}
                        className="w-full mt-6 bg-[#3B82F6] text-white hover:bg-[#2563EB] rounded-xl py-2 text-sm font-medium"
                        disabled={loading}
                    >
                        {loading ? "Verifying OTP..." : "Verify OTP"}
                    </Button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AccountVerificationForm;
