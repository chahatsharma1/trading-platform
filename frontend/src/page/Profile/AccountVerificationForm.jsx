import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AccountVerificationForm = ({ closeParentDialog }) => {
    const [email, setEmail] = useState("chahats@gmail.com");
    const [otpDialogOpen, setOtpDialogOpen] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);

    const handleSendOtp = () => {
        setOtpDialogOpen(true);
        setTimeout(() => {
            inputRefs.current[0]?.focus();
        }, 100);
    };

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

    const handleVerifyOtp = () => {
        const enteredOtp = otp.join("");
        console.log("Verifying OTP:", enteredOtp);

        setOtpDialogOpen(false);
        closeParentDialog();
    };

    return (
        <>
            <div className="space-y-4">
                <div className="space-y-1">
                    <p className="text-sm text-slate-600 font-medium">Sending OTP to</p>
                    <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm font-semibold">
                        {email}
                    </div>
                </div>

                <Button
                    type="button"
                    onClick={handleSendOtp}
                    className="w-full bg-slate-800 text-white hover:bg-slate-700 rounded-xl py-2 text-sm font-medium">
                    Send OTP
                </Button>
            </div>

            <Dialog open={otpDialogOpen} onOpenChange={setOtpDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Verify OTP</DialogTitle>
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
                                className="w-10 text-center text-lg bg-gray-300"
                            />
                        ))}
                    </div>
                    <Button
                        onClick={handleVerifyOtp}
                        className="w-full mt-6 bg-gray-800 text-white hover:bg-gray-700 rounded-xl py-2 text-sm font-medium">
                        Verify OTP
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AccountVerificationForm;
