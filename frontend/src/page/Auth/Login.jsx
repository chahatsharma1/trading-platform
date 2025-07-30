import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { adminLogin, login, verifyLoginOtp } from "@/page/State/Auth/Action";
import { Coins } from 'lucide-react';

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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        setErrorMessage("");

        try {
            const action = activeTab === 'admin' ? adminLogin : login;
            const result = await dispatch(action({ ...formData, navigate }));

            if (result?.twoFactorAuthEnable) {
                setSessionId(result.session);
                setShowOtpDialog(true);
            } else if (result?.error) {
                setErrorMessage("Email or password is incorrect.");
                setTimeout(() => setErrorMessage(""), 3000);
            }
        } catch (error) {
            console.error("Login failed:", error);
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
            setShowOtpDialog(false);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Invalid OTP. Please try again.");
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.5 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <div className="relative min-h-screen bg-background text-foreground font-sans flex items-center justify-center p-4">

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md bg-card/50 backdrop-blur-lg border border-border/30 shadow-xl rounded-2xl p-8 space-y-6 z-10">
                <motion.div variants={itemVariants} className="text-center">
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 ring-1 ring-border"
                    >
                        <Coins className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        TradeX
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        {activeTab === 'admin' ? 'Admin Portal' : 'Welcome Back, Trader'}
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="p-1 bg-muted rounded-lg flex gap-1">
                    <button
                        onClick={() => setActiveTab('user')}
                        className={`w-full py-2 text-sm font-semibold rounded-md transition-colors duration-300 ${activeTab === 'user' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted-foreground/20'}`}>
                        User
                    </button>
                    <button
                        onClick={() => setActiveTab('admin')}
                        className={`w-full py-2 text-sm font-semibold rounded-md transition-colors duration-300 ${activeTab === 'admin' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted-foreground/20'}`}>
                        Admin
                    </button>
                </motion.div>

                <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="bg-transparent border-border h-12"
                        required
                    />
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="bg-transparent border-border h-12"
                        required
                    />
                    <div className="text-right">
                        <Link to="/forgot-password" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                            Forgot password?
                        </Link>
                    </div>
                    {errorMessage && <p className="text-destructive text-sm text-center">{errorMessage}</p>}
                    <Button type="submit" size="lg" className="w-full font-semibold" disabled={loginLoading}>
                        {loginLoading ? "Logging in..." : "Login"}
                    </Button>
                </motion.form>
            </motion.div>

            {showOtpDialog && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card border border-border/50 p-6 rounded-xl shadow-lg space-y-4 w-full max-w-sm"
                    >
                        <h2 className="text-xl font-bold text-foreground text-center">Enter Verification Code</h2>
                        <p className="text-muted-foreground text-sm text-center">A 6-digit code has been sent to your email.</p>
                        <Input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="6-digit OTP"
                            className="bg-transparent text-center tracking-widest text-lg h-12"
                            maxLength={6}
                        />
                        {errorMessage && <p className="text-destructive text-sm text-center">{errorMessage}</p>}
                        <div className="flex justify-end gap-2 pt-2">
                            <Button variant="outline" onClick={() => setShowOtpDialog(false)}>Cancel</Button>
                            <Button onClick={handleOtpVerify}>Verify</Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default LoginPage;