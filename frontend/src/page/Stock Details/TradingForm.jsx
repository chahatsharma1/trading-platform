import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getUserWallet } from "@/page/State/Wallet/Action.js";

const TradingForm = () => {
    const dispatch = useDispatch();
    const [isBuyMode, setIsBuyMode] = useState(true);
    const [amount, setAmount] = useState("");
    const [quantity, setQuantity] = useState(0);

    const { coin, wallet } = useSelector((store) => store);

    const toggleMode = () => setIsBuyMode((prev) => !prev);

    const handleChange = (e) => {
        const inputAmount = e.target.value;
        setAmount(inputAmount);

        const price = coin?.coinDetails?.market_data?.current_price?.inr;
        if (!price || isNaN(inputAmount) || inputAmount <= 0) {
            setQuantity(0);
            return;
        }

        const volume = calculateBuyCost(inputAmount, price);
        setQuantity(volume);
    };

    useEffect(() => {
        dispatch(getUserWallet(localStorage.getItem("jwt")));
    }, []);

    const calculateBuyCost = (amount, price) => {
        const volume = amount / price;
        const decimalPlaces = 6;
        return Number(volume.toFixed(decimalPlaces));
    };

    const handleTrade = () => {
        if (isBuyMode) {
            // dispatch buy order logic
        } else {
            // dispatch sell order logic
        }
    };

    const price = coin?.coinDetails?.market_data?.current_price?.inr || 0;
    const priceChange = coin?.coinDetails?.market_data?.price_change_24h_in_currency?.inr || 0;
    const priceChangePercent = coin?.coinDetails?.market_data?.price_change_percentage_24h_in_currency?.inr || 0;

    const walletBalance = wallet?.userWallet?.balance || 0;
    const isInsufficient = isBuyMode && Number(amount) > walletBalance;

    return (
        <div className="space-y-6 text-[#F1F5F9]">
            <div className="flex flex-col gap-2">
                <div className="relative w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">₹</span>
                    <Input
                        placeholder="Enter amount..."
                        type="number"
                        value={amount}
                        onChange={handleChange}
                        className="pl-7 pr-3 bg-[#1E293B] text-[#F1F5F9] border border-[#334155] placeholder:text-[#94A3B8]"
                    />
                </div>
                {isBuyMode && (
                    <div className="text-sm text-right text-[#94A3B8]">
                        You will get: <span className="text-[#F1F5F9] font-medium">{quantity} {coin.coinDetails?.symbol.toUpperCase()}</span>
                    </div>
                )}
                {isInsufficient && (
                    <div className="text-sm text-red-500 text-right font-medium">
                        Insufficient Balance
                    </div>
                )}
            </div>

            {/* Coin Info */}
            <div className="flex items-center gap-3">
                <img
                    src={coin.coinDetails?.image.large}
                    alt="coin-logo"
                    className="w-6 h-6"
                />
                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-[#F1F5F9]">{coin.coinDetails?.symbol.toUpperCase()}</p>
                        <span className="text-[#94A3B8]">• {coin.coinDetails?.name}</span>
                    </div>
                    <p className="text-sm">
                        <span className="text-[#F1F5F9] font-semibold">₹ {price}</span>{' '}
                        <span className={`text-sm ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
                        </span>
                    </p>
                </div>
            </div>

            {/* Order Info */}
            <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Order Type</span>
                <span className="text-[#F1F5F9] font-medium">{isBuyMode ? "Buy" : "Sell"}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Wallet Amount</span>
                <span className="text-xl font-semibold text-[#F1F5F9]">₹ {walletBalance}</span>
            </div>

            {/* Action Button */}
            <Button
                onClick={handleTrade}
                disabled={isInsufficient}
                className={`w-full rounded-md text-white ${
                    isInsufficient
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-[#3B82F6] hover:bg-[#2563EB]"
                }`}
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
