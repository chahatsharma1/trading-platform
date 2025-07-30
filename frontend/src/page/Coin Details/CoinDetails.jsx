import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark, BookmarkCheck, TrendingUp, ShoppingCart } from "lucide-react";

import StockChart from "@/page/Home/StockChart.jsx";
import TradingForm from "@/page/Coin Details/TradingForm.jsx";
import { getCoinDetails } from "@/page/State/Coin/Action.js";
import { addCoinToWatchlist } from "@/page/State/Watchlist/Action.js";
import { existInWatchlist } from "@/utils/existInWatchlist.js";

const CoinDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { items } = useSelector(store => store.watchlist);
    const { coinDetails, loading } = useSelector(store => store.coin);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getCoinDetails(id, localStorage.getItem("jwt")));
    }, [id, dispatch]);

    const handleAddToWatchlist = () => {
        dispatch(addCoinToWatchlist(coinDetails?.id, localStorage.getItem("jwt")));
    };

    const isInWatchlist = existInWatchlist(items, coinDetails);

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.15, duration: 0.4 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
    };

    if (loading || !coinDetails) {
        return (
            <div className="relative min-h-screen bg-background text-foreground font-sans flex justify-center py-10">
                <div className="w-full max-w-7xl space-y-8 px-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-16 w-16 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-8 w-40" />
                            </div>
                        </div>
                        <Skeleton className="h-10 w-48" />
                    </div>
                    <Skeleton className="h-96 w-full" />
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-background text-foreground font-sans flex justify-center py-10">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#2d3748_1px,transparent_1px)] [background-size:32px_32px]"></div>

            <motion.main variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-7xl space-y-8 px-4">
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={coinDetails.image.large} />
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold">{coinDetails.name}</h1>
                                <p className="text-lg text-muted-foreground uppercase">{coinDetails.symbol}</p>
                            </div>
                            <p className="text-3xl font-bold mt-1">₹ {coinDetails.market_data.current_price.inr.toLocaleString()}</p>
                            <p className={`font-semibold flex items-center gap-1 text-sm ${coinDetails.market_data.price_change_percentage_24h_in_currency.inr >= 0 ? "text-green-500" : "text-red-500"}`}>
                                <TrendingUp className={`w-4 h-4 ${coinDetails.market_data.price_change_percentage_24h_in_currency.inr < 0 && "rotate-180"}`} />
                                ₹{coinDetails.market_data.price_change_24h_in_currency.inr.toFixed(2).toLocaleString()} ({coinDetails.market_data.price_change_percentage_24h_in_currency.inr.toFixed(2)}%) 24h
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button onClick={handleAddToWatchlist} variant="outline" size="icon" title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}>
                            {isInWatchlist ? <BookmarkCheck className="h-5 w-5 text-primary" /> : <Bookmark className="h-5 w-5" />}
                        </Button>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button size="lg"><ShoppingCart className="h-5 w-5 mr-2" /> Trade</Button>
                            </DialogTrigger>
                            <DialogContent className="bg-card border-border">
                                <DialogHeader>
                                    <DialogTitle>Trade {coinDetails.name}</DialogTitle>
                                </DialogHeader>
                                <TradingForm onTradeSuccess={() => setOpen(false)} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="bg-card/50 backdrop-blur-lg border-border/50 h-[500px] p-2">
                        <StockChart coinId={id} />
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="bg-card/50 backdrop-blur-lg border-border/50">
                        <CardHeader>
                            <CardTitle>About {coinDetails.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: coinDetails.description.en }} />
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.main>
        </div>
    );
};

export default CoinDetails;