import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { getUserWallet } from "@/page/State/Wallet/Action.js";
import { getAssetDetails } from "@/page/State/Asset/Action.js";
import { payOrder } from "@/page/State/Order/Action.js";
import { Loader2 } from "lucide-react";

const TradingForm = ({ onTradeSuccess }) => {
    const dispatch = useDispatch();
    const [isBuyMode, setIsBuyMode] = useState(true);
    const [amount, setAmount] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { assetDetails } = useSelector((store) => store.asset);
    const { userWallet } = useSelector((store) => store.wallet);
    const { coinDetails } = useSelector(store => store.coin);

    useEffect(() => {
        dispatch(getUserWallet(localStorage.getItem("jwt")));
        if (coinDetails?.id) {
            dispatch(getAssetDetails({ coinId: coinDetails.id, jwt: localStorage.getItem("jwt") }));
        }
    }, [dispatch, coinDetails]);

    const handleChange = (e) => {
        const inputAmount = e.target.value;
        setAmount(inputAmount);
        setError('');

        const price = coinDetails?.market_data?.current_price?.inr;
        if (!price || isNaN(inputAmount) || inputAmount <= 0) {
            setQuantity(0);
            return;
        }
        setQuantity(Number((inputAmount / price).toFixed(6)));
    };

    const handleTrade = async (e) => {
        e.preventDefault();
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setError("Please enter a valid amount.");
            return;
        }
        if (isBuyMode && numericAmount > userWallet?.balance) {
            setError("Insufficient wallet balance.");
            return;
        }
        if (!isBuyMode && quantity > assetDetails?.quantity) {
            setError("Insufficient asset quantity.");
            return;
        }

        setIsLoading(true);
        setError('');
        try {
            await dispatch(payOrder({
                orderData: { coinId: coinDetails.id, quantity, orderType: isBuyMode ? "BUY" : "SELL" },
                jwt: localStorage.getItem("jwt"),
                amount: numericAmount
            }));
            if (onTradeSuccess) onTradeSuccess();
        } catch (error) {
            setError("Trade failed. Please try again.");
            console.error("Trade failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    const availableBalance = isBuyMode ? userWallet?.balance || 0 : assetDetails?.quantity || 0;
    const balanceSymbol = isBuyMode ? "₹" : coinDetails?.symbol?.toUpperCase();

    return (
        <form onSubmit={handleTrade} className="space-y-6 py-4">
            <div className="p-1 bg-muted rounded-lg grid grid-cols-2 gap-1">
                <Button type="button" onClick={() => setIsBuyMode(true)} variant={isBuyMode ? 'default' : 'ghost'} className="w-full">Buy</Button>
                <Button type="button" onClick={() => setIsBuyMode(false)} variant={!isBuyMode ? 'destructive' : 'ghost'} className="w-full">Sell</Button>
            </div>

            <div>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>{isBuyMode ? "You Pay" : "You Sell"}</span>
                    <span>Available: {availableBalance.toLocaleString()} {balanceSymbol}</span>
                </div>
                <div className="relative">
                    <p className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 font-semibold text-lg">
                        {isBuyMode ? "₹" : coinDetails?.symbol?.toUpperCase()}
                    </p>
                    <Input
                        value={amount}
                        onChange={handleChange}
                        className="h-14 pl-12 pr-4 text-2xl font-bold bg-background border-border text-right"
                        placeholder="0.00"
                    />
                </div>
            </div>

            <AnimatePresence>
                {amount > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-center text-muted-foreground"
                    >
                        <p>{isBuyMode ? "You will get approx." : "You will receive approx."}</p>
                        <p className="text-xl font-bold text-foreground">
                            {isBuyMode ? `${quantity.toLocaleString()} ${coinDetails?.symbol?.toUpperCase()}` : `₹ ${(quantity * coinDetails?.market_data.current_price.inr).toLocaleString()}`}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <div className="pt-2">
                <Button type="submit" size="lg" className="w-full font-semibold" disabled={isLoading || !amount}>
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Processing...</span>
                        </div>
                    ) : (
                        isBuyMode ? "Buy Asset" : "Sell Asset"
                    )}
                </Button>
            </div>
        </form>
    );
};

export default TradingForm;