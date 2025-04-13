import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TradingForm = () => {
    const [isBuyMode, setIsBuyMode] = useState(true);
    const [amount, setAmount] = useState('');
    const availableCash = 4400.53;
    const btcPrice = 6851107; // current BTC price in INR

    const toggleMode = () => setIsBuyMode((prev) => !prev);

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setAmount(value);
        }
    };

    const isInsufficient = parseFloat(amount) > availableCash;
    const quantity = amount ? (parseFloat(amount) / btcPrice).toFixed(8) : "0";

    return (
        <div className="space-y-6 text-[#F1F5F9]">
            {/* Title */}
            <h2 className="text-center text-lg font-semibold">Enter the amount to trade</h2>

            {/* Input Row */}
            <div className="flex flex-col gap-2">
                <div className="relative w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">₹</span>
                    <Input
                        placeholder="Enter amount..."
                        value={amount}
                        onChange={handleChange}
                        className="pl-7 pr-3 bg-[#1E293B] text-[#F1F5F9] border border-[#334155] placeholder:text-[#94A3B8]"
                    />
                </div>
                {isBuyMode && (
                    <div className="text-sm text-right text-[#94A3B8]">
                        You will get: <span className="text-[#F1F5F9] font-medium">{quantity} BTC</span>
                    </div>
                )}
            </div>

            {/* Coin Info */}
            <div className="flex items-center gap-3">
                <img
                    src="https://coin-images.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400"
                    alt="btc"
                    className="w-6 h-6"
                />
                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-[#F1F5F9]">BTC</p>
                        <span className="text-[#94A3B8]">• Bitcoin</span>
                    </div>
                    <p className="text-sm">
                        <span className="text-[#F1F5F9] font-semibold">₹{btcPrice.toLocaleString()}</span>{' '}
                        <span className="text-red-500 font-medium text-xs ml-1">(↓ 754.041 / 0.95578%)</span>
                    </p>
                </div>
            </div>

            {/* Order Type & Balance */}
            <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Order Type</span>
                <span className="text-[#F1F5F9] font-medium">Market Order</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Wallet Amount</span>
                <span className="text-xl font-semibold text-[#F1F5F9]">₹{availableCash}</span>
            </div>

            {/* Insufficient Funds Error */}
            {isInsufficient && (
                <p className="text-sm text-red-500 text-center font-medium">Insufficient funds</p>
            )}

            {/* Buy / Sell Button */}
            <Button
                className="w-full rounded-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                disabled={!amount || isInsufficient}
            >
                {isBuyMode ? "BUY" : "SELL"}
            </Button>

            {/* Toggle Sell/Buy */}
            <p
                onClick={toggleMode}
                className="text-center text-sm text-sky-400 cursor-pointer hover:underline"
            >
                {isBuyMode ? "Or Sell" : "Or Buy"}
            </p>
        </div>
    );
};

export default TradingForm;
