import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { sendForgotPasswordOTP, verifyForgotPasswordOTP } from "@/page/State/Auth/Action.js";
import { Coins, Mail, KeyRound, CheckCircle2 } from 'lucide-react';

const StaticBackground = () => (
    <div className="absolute inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e42,transparent)]"></div>
    </div>
);

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [sessionId, setSessionId] = useState(null);
    const [showOtpDialog, setShowOtpDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        setError('');
        try {
            const session = await dispatch(sendForgotPasswordOTP(email));
            setSessionId(session);
            setShowOtpDialog(true);
        } catch (err) {
            setError("Failed to send OTP. Please check the email and try again.");
            setTimeout(() => setError(''), 3000);
        }
        setLoading(false);
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        setError('');
        setSuccessMessage('');
        try {
            await dispatch(verifyForgotPasswordOTP(sessionId, otp, newPassword));
            setSuccessMessage("Password changed successfully!");
            setTimeout(() => {
                setShowOtpDialog(false);
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError("Invalid OTP or password. Please try again.");
        }
        setLoading(false);
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1, duration: 0.5 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <div className="relative min-h-screen bg-background text-foreground font-sans flex items-center justify-center p-4">
            <StaticBackground />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md bg-card/50 backdrop-blur-lg border border-border/30 shadow-xl rounded-2xl p-8 space-y-6 z-10">
                <motion.div variants={itemVariants} className="text-center">
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 ring-1 ring-border">
                        <Coins className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h1 className="text-3xl font-bold">Forgot Password?</h1>
                    <p className="text-muted-foreground mt-2">
                        No worries, we'll help you get back in.
                    </p>
                </motion.div>

                <motion.form variants={itemVariants} onSubmit={handleSendOtp} className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-transparent border-border h-12"
                        required
                    />
                    {error && !showOtpDialog && <p className="text-destructive text-sm text-center">{error}</p>}
                    <Button type="submit" size="lg" className="w-full font-semibold gap-2" disabled={loading}>
                        <Mail className="w-4 h-4" />
                        {loading ? 'Sending...' : 'Send OTP'}
                    </Button>
                </motion.form>

                <motion.p variants={itemVariants} className="text-sm text-center text-muted-foreground">
                    Remembered your password?{" "}
                    <Link to="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
                        Back to Login
                    </Link>
                </motion.p>
            </motion.div>

            <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
                <DialogContent className="bg-card border-border">
                    <DialogHeader>
                        <div className="flex flex-col items-center text-center gap-2 pt-4">
                            <KeyRound className="w-12 h-12 text-primary" />
                            <DialogTitle className="text-2xl">Reset Your Password</DialogTitle>
                            <DialogDescription>
                                An OTP has been sent to <span className="font-medium text-primary">{email}</span>.
                            </DialogDescription>
                        </div>
                    </DialogHeader>
                    <div className="space-y-4 px-6 pb-6">
                        <Input
                            type="text"
                            placeholder="6-Digit OTP"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="bg-transparent text-center tracking-widest text-lg h-12"
                        />
                        <Input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="bg-transparent h-12"
                        />
                        {error && <p className="text-destructive text-sm text-center">{error}</p>}
                        {successMessage &&
                            <div className="flex items-center justify-center gap-2 text-green-500 text-sm">
                                <CheckCircle2 className="w-4 h-4" />
                                <p>{successMessage}</p>
                            </div>
                        }
                        <Button
                            className="w-full font-semibold"
                            onClick={handleVerifyOtp}
                            disabled={loading}>
                            {loading ? 'Verifying...' : 'Change Password'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ForgotPassword;