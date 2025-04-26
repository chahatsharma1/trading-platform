import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getUserWallet } from "@/page/State/Wallet/Action.js";
import { getAssetDetails } from "@/page/State/Asset/Action.js";
import { payOrder } from "@/page/State/Order/Action.js";

const TradingForm = ({ onTradeSuccess }) => {
    const dispatch = useDispatch();
    const [isBuyMode, setIsBuyMode] = useState(true);
    const [amount, setAmount] = useState("");
    const [quantity, setQuantity] = useState(0);

    const {assetDetails} = useSelector((store) => store.asset);
    const {userWallet} = useSelector((store) => store.wallet);
    const {coinDetails} = useSelector(store => store.coin);

    useEffect(() => {
        dispatch(getUserWallet(localStorage.getItem("jwt")));
        dispatch(getAssetDetails({ coinId: coinDetails?.id, jwt: localStorage.getItem("jwt") }));
    }, []);

    const toggleMode = () => setIsBuyMode((prev) => !prev);

    const handleChange = (e) => {
        const inputAmount = e.target.value;
        setAmount(inputAmount);

        const price = coinDetails?.market_data?.current_price?.inr;
        if (!price || isNaN(inputAmount) || inputAmount <= 0) {
            setQuantity(0);
            return;
        }

        const volume = calculateBuyCost(inputAmount, price);
        setQuantity(volume);
    };

    const calculateBuyCost = (amount, price) => {
        const volume = amount / price;
        const decimalPlaces = 6;
        return Number(volume.toFixed(decimalPlaces));
    };

    const handleTrade = async () => {
        try {
            const orderType = isBuyMode ? "BUY" : "SELL";
            await dispatch(payOrder({
                orderData: { coinId: coinDetails?.id, quantity, orderType },
                jwt: localStorage.getItem("jwt"),
                amount: amount
            }));

            if (onTradeSuccess) {
                const successMsg = isBuyMode
                    ? `Successfully bought ${quantity} ${coinDetails?.symbol.toUpperCase()}!`
                    : `Successfully sold ${quantity} ${coinDetails?.symbol.toUpperCase()}!`;

                onTradeSuccess(successMsg);
            }

        } catch (error) {
            console.error("Trade failed", error);
        }
    };

    const price = coinDetails?.market_data?.current_price?.inr || 0;
    const priceChange = coinDetails?.market_data?.price_change_24h_in_currency?.inr || 0;
    const priceChangePercent = coinDetails?.market_data?.price_change_percentage_24h_in_currency?.inr || 0;

    const walletBalance = userWallet?.balance || 0;
    const isInsufficient = isBuyMode && Number(amount) > walletBalance;

    return (
        <div className="space-y-6 text-[#F1F5F9]">
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
                        You will get: <span className="text-[#F1F5F9] font-medium">{quantity} {coinDetails?.symbol?.toUpperCase()}</span>
                    </div>
                )}
                {isInsufficient && (
                    <div className="text-sm text-red-500 text-right font-medium">
                        Insufficient Balance
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3">
                <img
                    src={coinDetails?.image.large}
                    alt="coin-logo"
                    className="w-6 h-6"
                />
                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-[#F1F5F9]">{coinDetails?.symbol?.toUpperCase()}</p>
                        <span className="text-[#94A3B8]">• {coinDetails?.name}</span>
                    </div>
                    <p className="text-sm">
                        <span className="text-[#F1F5F9] font-semibold">₹ {price}</span>{' '}
                        <span className={`text-sm ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Order Type</span>
                <span className="text-[#F1F5F9] font-medium">{isBuyMode ? "Buy" : "Sell"}</span>
            </div>

            <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">{isBuyMode ? "Wallet Amount" : "Available Quantity"}</span>
                <span className="text-xl font-semibold text-[#F1F5F9]">
                    {isBuyMode
                        ? `₹ ${walletBalance}`
                        : `${assetDetails?.quantity || 0} ${coinDetails?.symbol?.toUpperCase()}`}
                </span>
            </div>

            <Button
                onClick={handleTrade}
                disabled={isInsufficient}
                className={`w-full rounded-md text-white ${
                    isInsufficient
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-[#3B82F6] hover:bg-[#2563EB]"}`}>
                {isBuyMode ? "BUY" : "SELL"}
            </Button>

            <p
                onClick={toggleMode}
                className="text-center text-sm underline text-[#94A3B8] cursor-pointer">
                {isBuyMode ? " Or Sell" : "Or Buy"}
            </p>
        </div>
    );
};

export default TradingForm;
