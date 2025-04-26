import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from "@/components/ui/avatar.jsx";
import { DotIcon, BookmarkIcon, BookmarkCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StockChart from "@/page/Home/StockChart.jsx";
import TradingForm from "@/page/Coin Details/TradingForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCoinDetails } from "@/page/State/Coin/Action.js";
import { addCoinToWatchlist } from "@/page/State/Watchlist/Action.js";
import { existInWatchlist } from "@/utils/existInWatchlist.js";

const CoinDetails = () => {
    const { items } = useSelector(store => store.watchlist);
    const { coinDetails } = useSelector(store => store.coin);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState(""); // Added
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getCoinDetails(id, localStorage.getItem("jwt")));
    }, [id, dispatch]);

    const handleAddToWatchlist = () => {
        dispatch(addCoinToWatchlist(coinDetails?.id, localStorage.getItem("jwt")));
    };

    const handleTradeSuccess = (message) => {
        setDialogOpen(false);
        setSuccessMessage(message);
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000); // Clear success message after 3 seconds
    };

    const isInWatchlist = existInWatchlist(items, coinDetails);

    return (
        <div className="p-5 min-h-screen bg-[#0F172A] text-[#F1F5F9]">

            {successMessage && (
                <div className="mb-4 p-3 bg-green-600 text-white rounded-lg text-center font-semibold">
                    {successMessage}
                </div>
            )}

            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={coinDetails?.image.large} />
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold text-[#F1F5F9]">
                                {coinDetails?.symbol.toUpperCase()}
                            </p>
                            <DotIcon className="text-[#94A3B8]" />
                            <p className="text-sm text-[#94A3B8]">{coinDetails?.name}</p>
                        </div>
                        <p className="text-2xl font-bold text-[#F1F5F9]">
                            ₹ {coinDetails?.market_data.current_price.inr.toLocaleString()}
                        </p>
                        <p className={`text-sm ${coinDetails?.market_data.price_change_24h_in_currency.inr >= 0
                            ? 'text-green-500'
                            : 'text-red-500'}`}>
                            ₹{coinDetails?.market_data.price_change_24h_in_currency.inr.toFixed(2)}
                            ({coinDetails?.market_data.price_change_percentage_24h_in_currency.inr.toFixed(2)}%)
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        onClick={handleAddToWatchlist}
                        variant="outline"
                        size="icon"
                        className={`border border-[#334155] text-white transition-all duration-200
                            ${isInWatchlist ? 'bg-green-600 hover:bg-green-700' : 'bg-[#1E293B] hover:bg-[#334155]'}`}
                        title={isInWatchlist ? "Coin in Watchlist" : "Add to Watchlist"}
                    >
                        {isInWatchlist ? <BookmarkCheckIcon size={18} /> : <BookmarkIcon size={18} />}
                    </Button>

                    <Button
                        onClick={() => setDialogOpen(true)}
                        className="rounded-lg px-6 py-2 bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                    >
                        TRADE
                    </Button>
                </div>
            </div>

            <div className="h-[500px] mt-4">
                <StockChart coinId={id} />
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="bg-[#1E293B] border-none text-[#F1F5F9]">
                    <DialogHeader>
                        <DialogTitle className="text-[#F1F5F9]">Trade {coinDetails?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="text-sm text-[#94A3B8]">
                        <TradingForm onTradeSuccess={handleTradeSuccess} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CoinDetails;
