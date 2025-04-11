import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Header / Hero Section */}
            <header className="px-6 py-10 text-center bg-[#111] shadow-sm">
                <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
                    Welcome to <span className="text-gray-300">TradeX</span>
                </h1>
                <p className="text-gray-400 text-lg mb-6">Your gateway to secure and instant crypto trading.</p>
                <div className="flex justify-center gap-4">
                    <Link to="/signup">
                        <Button className="bg-white text-black hover:bg-gray-400">Get Started</Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="outline" className="border-white text-black hover:bg-gray-400">
                            Login
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Market Snapshot */}
            <section className="px-6 py-10 border-b border-gray-800 bg-black">
                <h2 className="text-2xl font-semibold mb-6 text-center text-white">Live Market Snapshot</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div className="border rounded-lg p-5 bg-[#1a1a1a] shadow-sm border-gray-700">
                        <h3 className="font-semibold text-gray-300">Bitcoin (BTC)</h3>
                        <p className="text-xl font-bold text-white">₹6,851,107</p>
                        <p className="text-sm text-red-500">(↓ 0.95%)</p>
                    </div>
                    <div className="border rounded-lg p-5 bg-[#1a1a1a] shadow-sm border-gray-700">
                        <h3 className="font-semibold text-gray-300">Ethereum (ETH)</h3>
                        <p className="text-xl font-bold text-white">₹345,200</p>
                        <p className="text-sm text-green-500">(↑ 1.12%)</p>
                    </div>
                    <div className="border rounded-lg p-5 bg-[#1a1a1a] shadow-sm border-gray-700">
                        <h3 className="font-semibold text-gray-300">Solana (SOL)</h3>
                        <p className="text-xl font-bold text-white">₹13,440</p>
                        <p className="text-sm text-red-500">(↓ 0.45%)</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-6 py-14 bg-[#111]">
                <h2 className="text-2xl font-semibold mb-8 text-center text-white">Why Choose TradeX?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-200">Secure Wallet</h3>
                        <p className="text-sm text-gray-400 mt-2">Your assets are protected with enterprise-grade security infrastructure.</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-200">Real-Time Trading</h3>
                        <p className="text-sm text-gray-400 mt-2">Execute trades instantly with real-time market data.</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-200">Fast Withdrawals</h3>
                        <p className="text-sm text-gray-400 mt-2">Withdraw your earnings quickly to your bank or wallet.</p>
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <footer className="mt-auto px-6 py-10 bg-black border-t border-gray-800 text-center">
                <h3 className="text-xl font-medium mb-3 text-white">Ready to start trading with TradeX?</h3>
                <Link to="/signup">
                    <Button className="bg-white text-black hover:bg-gray-200">Create Account</Button>
                </Link>
                <p className="text-sm text-gray-500 mt-6">© 2025 TradeX. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
