import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getTop50Coins } from "@/page/State/Coin/Action.js";
import { Sun, Moon, ShieldCheck, GaugeCircle, Banknote, Coins, TrendingUp, ArrowRight } from "lucide-react";

const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const [, payload] = token.split(".");
        if (!payload) return false;
        const decoded = JSON.parse(atob(payload));
        const expiry = decoded.exp * 1000;
        return Date.now() < expiry;
    } catch (e) {
        console.error("Failed to decode JWT:", e);
        return false;
    }
};

const AuroraBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card">
            <div className="absolute w-[40rem] h-[40rem] bg-primary/5 rounded-full -top-1/4 -left-1/4 filter blur-3xl animate-aurora-pulse" />
            <div className="absolute w-[50rem] h-[50rem] bg-accent/5 rounded-full -bottom-1/4 -right-1/4 filter blur-3xl animate-aurora-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute w-[30rem] h-[30rem] bg-chart-3/5 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 filter blur-3xl animate-aurora-pulse" style={{ animationDelay: '4s' }} />
            <div className="absolute top-20 left-20 w-4 h-4 border border-primary/30 rotate-45 animate-float" />
            <div className="absolute top-40 right-32 w-6 h-6 border border-accent/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-32 left-40 w-3 h-3 bg-chart-4/30 rotate-12 animate-float" style={{ animationDelay: '3s' }} />
        </div>
    </div>
);

const Homepage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { top50 } = useSelector(store => store.coin);

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        dispatch(getTop50Coins());
    }, [dispatch]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const selectedCoins = top50?.slice(0, 3);

    const handleLoginClick = () => {
        const token = localStorage.getItem("jwt");
        isTokenValid(token) ? navigate("/home") : navigate("/login");
    };

    const features = [
        { icon: <ShieldCheck className="w-8 h-8 text-primary" />, title: "Enterprise-Grade Security", description: "Your assets are protected with state-of-the-art infrastructure and cold storage solutions." },
        { icon: <GaugeCircle className="w-8 h-8 text-primary" />, title: "Real-Time Trading Engine", description: "Execute trades instantly with our low-latency matching engine and real-time market data." },
        { icon: <Banknote className="w-8 h-8 text-primary" />, title: "Seamless & Fast Payouts", description: "Withdraw your earnings quickly and securely to your preferred bank or digital wallet." }
    ];

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
    const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } } };

    return (
        <div className="relative min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
            <motion.div initial="hidden" animate="visible" variants={containerVariants} className="relative z-10 flex flex-col">
                <header className="py-20 text-center px-4">
                    <motion.div variants={itemVariants}>
                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 ring-1 ring-border">
                            <Coins className="w-10 h-10 text-primary" />
                        </motion.div>
                    </motion.div>
                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
                        Welcome to{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                            TradeX
                        </span>
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
                        Your secure, modern, and lightning-fast gateway to the world of digital assets.
                    </motion.p>
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button asChild size="lg" className="font-semibold">
                            <Link to="/signup" className="group">Get Started<ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" /></Link>
                        </Button>
                        <Button onClick={handleLoginClick} variant="outline" size="lg" className="font-semibold">
                            Login
                        </Button>
                    </motion.div>
                </header>

                <section className="px-6 py-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }} className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <TrendingUp className="w-6 h-6 text-chart-1" />
                            <span className="font-semibold text-chart-1">LIVE MARKET</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Market Snapshot</h2>
                        <p className="text-muted-foreground text-lg">Top movers in the market right now.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {selectedCoins?.map((coin, index) => (
                            <motion.div key={coin.id} initial={{ opacity: 0, y: 40, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }} whileHover={{ y: -8, transition: { duration: 0.2 } }} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative border border-border rounded-xl p-6 bg-card/50 backdrop-blur-sm shadow-lg hover:border-primary/50 transition-colors duration-300">
                                    <div className="flex items-center gap-4 mb-4">
                                        <img src={coin.image} alt={`${coin.name} logo`} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <h3 className="font-semibold text-lg text-card-foreground">{coin.name}</h3>
                                            <p className="text-sm text-muted-foreground uppercase">{coin.symbol}</p>
                                        </div>
                                    </div>
                                    <p className="text-2xl font-bold text-foreground mb-2">₹ {coin.current_price.toLocaleString()}</p>
                                    <p className={`flex items-center gap-1 text-sm font-semibold ${
                                        coin.price_change_percentage_24h >= 0 ? "text-chart-1" : "text-destructive"
                                    }`}>
                                        {coin.price_change_percentage_24h >= 0 ? "▲" : "▼"}
                                        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="px-6 py-20 bg-secondary/20">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose TradeX?</h2>
                        <p className="text-muted-foreground text-lg">Built for performance, security, and peace of mind.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {features.map((feature, index) => (
                            <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, delay: index * 0.2, type: "spring", stiffness: 100 }} whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} className="text-center p-8 rounded-xl bg-card/30 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-colors duration-300">
                                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }} className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 ring-1 ring-border">
                                    {feature.icon}
                                </motion.div>
                                <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
                <footer className="text-center px-6 pt-20 border-t border-border/30">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}>
                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 ring-1 ring-border">
                            <Coins className="w-8 h-8 text-primary" />
                        </motion.div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Begin Your Trading Journey?</h3>
                        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">Join thousands of traders who trust TradeX for their digital asset investments.</p>
                        <Button asChild size="lg" className="font-semibold">
                            <Link to="/signup" className="group">Create Account Now<ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" /></Link>
                        </Button>
                        <div className="p-4 mt-10">
                            <hr className="border-border/30" />
                            <p className="text-sm text-muted-foreground/60 mt-2">© {new Date().getFullYear()} TradeX. All Rights Reserved.</p>
                        </div>
                    </motion.div>
                </footer>
            </motion.div>
        </div>
    );
};

export default Homepage;