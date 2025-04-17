import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const [, payload] = token.split(".");
        const decoded = JSON.parse(atob(payload));
        const expiry = decoded.exp * 1000;
        return Date.now() < expiry;
    } catch (e) {
        return false;
    }
};

const HomePage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        const token = localStorage.getItem("jwt");
        if (isTokenValid(token)) {
            navigate("/home");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] flex flex-col">
            {/* Header / Hero Section */}
            <header className="px-6 py-10 text-center bg-[#1E293B] shadow-sm">
                <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
                    Welcome to <span className="text-slate-300">TradeX</span>
                </h1>
                <p className="text-slate-400 text-lg mb-6">
                    Your gateway to secure and instant crypto trading.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/signup">
                        <Button className="bg-[#3B82F6] text-white hover:bg-[#2563EB]">Get Started</Button>
                    </Link>
                    <Button
                        onClick={handleLoginClick}
                        className="bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                    >
                        Login
                    </Button>
                </div>
            </header>

            {/* Market Snapshot */}
            <section className="px-6 py-10 border-b border-[#334155] bg-[#0F172A]">
                <h2 className="text-2xl font-semibold mb-6 text-center">Live Market Snapshot</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div className="border rounded-lg p-5 bg-[#1E293B] shadow-sm border-[#334155]">
                        <h3 className="font-semibold text-slate-300">Bitcoin (BTC)</h3>
                        <p className="text-xl font-bold">₹6,851,107</p>
                        <p className="text-sm text-red-500">(↓ 0.95%)</p>
                    </div>
                    <div className="border rounded-lg p-5 bg-[#1E293B] shadow-sm border-[#334155]">
                        <h3 className="font-semibold text-slate-300">Ethereum (ETH)</h3>
                        <p className="text-xl font-bold">₹345,200</p>
                        <p className="text-sm text-green-500">(↑ 1.12%)</p>
                    </div>
                    <div className="border rounded-lg p-5 bg-[#1E293B] shadow-sm border-[#334155]">
                        <h3 className="font-semibold text-slate-300">Solana (SOL)</h3>
                        <p className="text-xl font-bold">₹13,440</p>
                        <p className="text-sm text-red-500">(↓ 0.45%)</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-6 py-14 bg-[#1E293B]">
                <h2 className="text-2xl font-semibold mb-8 text-center">Why Choose TradeX?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-slate-200">Secure Wallet</h3>
                        <p className="text-sm text-slate-400 mt-2">Your assets are protected with enterprise-grade security infrastructure.</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-slate-200">Real-Time Trading</h3>
                        <p className="text-sm text-slate-400 mt-2">Execute trades instantly with real-time market data.</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-slate-200">Fast Withdrawals</h3>
                        <p className="text-sm text-slate-400 mt-2">Withdraw your earnings quickly to your bank or wallet.</p>
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <footer className="mt-auto px-6 py-10 bg-[#0F172A] border-t border-[#334155] text-center">
                <h3 className="text-xl font-medium mb-3">Ready to start trading with TradeX?</h3>
                <Link to="/signup">
                    <Button className="bg-[#3B82F6] text-white hover:bg-[#2563EB]">Create Account</Button>
                </Link>
                <p className="text-sm text-slate-500 mt-6">© 2025 TradeX. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
