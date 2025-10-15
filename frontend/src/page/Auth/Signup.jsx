import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { register } from '../State/Auth/Action';
import {Coins, CheckCircle2, UserPlus, EyeOff, Eye} from 'lucide-react';

const StaticBackground = () => (
    <div className="absolute inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e42,transparent)]"></div>
    </div>
);

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const [signupLoading, setSignupLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSignupLoading(true);
        setErrorMessage("");
        try {
            await dispatch(register(formData));
            setDialogOpen(true);
            setTimeout(() => {
                setDialogOpen(false);
                navigate("/login");
            }, 2500);
        } catch (error) {
            console.error("Registration failed:", error);
            setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
            setTimeout(() => setErrorMessage(""), 3000);
        } finally {
            setSignupLoading(false);
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
                        className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 ring-1 ring-border"
                    >
                        <Coins className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        Join TradeX
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Start your journey in the world of crypto.
                    </p>
                </motion.div>

                <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        name="fullName"
                        type="text"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="bg-transparent border-border h-12"
                        required
                    />
                    <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-transparent border-border h-12"
                        required
                    />

                    <div className="relative">
                        <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="bg-transparent border-border h-12 pr-10"
                            required
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </Button>
                    </div>

                    {errorMessage && <p className="text-destructive text-sm text-center">{errorMessage}</p>}

                    <Button type="submit" size="lg" className="w-full font-semibold gap-2" disabled={signupLoading}>
                        <UserPlus className="w-4 h-4" />
                        {signupLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                </motion.form>


                <motion.p variants={itemVariants} className="text-sm text-center text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
                        Login Now
                    </Link>
                </motion.p>
            </motion.div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="bg-card border-border">
                    <DialogHeader>
                        <div className="flex flex-col items-center text-center gap-4 py-4">
                            <CheckCircle2 className="w-16 h-16 text-green-500" />
                            <DialogTitle className="text-2xl">Signup Successful!</DialogTitle>
                            <DialogDescription>
                                Your account has been created. Redirecting you to the login page...
                            </DialogDescription>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Signup;