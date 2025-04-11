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
        <div className="space-y-6 text-black">
            {/* Title */}
            <h2 className="text-center text-lg font-semibold">Enter the amount to trade</h2>

            {/* Input Row */}
            <div className="flex flex-col gap-2">
                <div className="relative w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                    <Input
                        placeholder="Enter amount..."
                        value={amount}
                        onChange={handleChange}
                        className="pl-7 pr-3"
                    />
                </div>
                {isBuyMode && (
                    <div className="text-sm text-gray-600 text-right">
                        You will get: <span className="text-black font-medium">{quantity} BTC</span>
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
                        <p className="font-medium">BTC</p>
                        <span className="text-gray-500">• Bitcoin</span>
                    </div>
                    <p className="text-sm">
                        <span className="text-black font-semibold">₹{btcPrice.toLocaleString()}</span>{' '}
                        <span className="text-red-600 font-medium text-xs ml-1">(↓ 754.041 / 0.95578%)</span>
                    </p>
                </div>
            </div>

            {/* Order Type & Balance */}
            <div className="flex justify-between text-sm">
                <span className="text-gray-500">Order Type</span>
                <span className="text-gray-900 font-medium">Market Order</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-gray-500">Wallet Amount</span>
                <span className="text-xl font-semibold text-black">₹{availableCash}</span>
            </div>

            {/* Insufficient Funds Error */}
            {isInsufficient && (
                <p className="text-sm text-red-600 text-center font-medium">Insufficient funds</p>
            )}

            {/* Buy / Sell Button */}
            <Button
                className="w-full rounded-md bg-black text-white hover:bg-gray-700"
                disabled={!amount || isInsufficient}
            >
                {isBuyMode ? "BUY" : "SELL"}
            </Button>

            {/* Toggle Sell/Buy */}
            <p
                onClick={toggleMode}
                className="text-center text-sm text-blue-500 cursor-pointer hover:underline"
            >
                {isBuyMode ? "Or Sell" : "Or Buy"}
            </p>
        </div>
    );
};

export default TradingForm;
