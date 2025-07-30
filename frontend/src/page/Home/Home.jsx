import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";

import StockChart from "@/page/Home/StockChart.jsx";
import AssetTable from "@/page/Home/AssetTable.jsx";
import Chatbot from "@/page/Home/Chatbot.jsx";
import { getCoinList, getTop50Coins } from "@/page/State/Coin/Action.js";

const Home = () => {
    const dispatch = useDispatch();
    const { coinList, top50 } = useSelector((store) => store.coin);
    const [activeCategory, setActiveCategory] = useState("all");
    const [selectedCoinId, setSelectedCoinId] = useState("bitcoin");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (activeCategory === "all") {
            dispatch(getCoinList(currentPage));
        }
    }, [dispatch, currentPage, activeCategory]);

    useEffect(() => {
        dispatch(getTop50Coins());
    }, [dispatch]);

    const coinToDisplay = activeCategory === "all" ? coinList : top50;

    const selectedCoinDetails = coinToDisplay.find((coin) => coin.id === selectedCoinId);

    const handleRowClick = (coinId) => {
        setSelectedCoinId(coinId);
    };

    const handleActiveCategory = (category) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };

    const handlePageChange = (direction) => {
        if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (direction === "next") {
            setCurrentPage(currentPage + 1);
        }
    };

    const detailVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    };

    return (
        <div className="relative h-[calc(100vh-4rem)] flex flex-col bg-background text-foreground font-sans overflow-hidden">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#2d3748_1px,transparent_1px)] [background-size:32px_32px]"></div>
            <main className="flex-grow container mx-auto p-4 flex flex-col gap-4 min-h-0">
                <div className="flex-grow grid grid-cols-1 lg:grid-cols-7 gap-2 min-h-0">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="lg:col-span-4 flex flex-col min-h-0">
                        <Card className="flex flex-col flex-grow bg-card/50 backdrop-blur-lg border-border/50 shadow-lg min-h-0">
                            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                    <div className="p-1 bg-muted rounded-lg flex gap-1">
                                        <Button onClick={() => handleActiveCategory("all")} size="sm" variant={activeCategory === 'all' ? 'default' : 'ghost'}>All</Button>
                                        <Button onClick={() => handleActiveCategory("top50")} size="sm" variant={activeCategory === 'top50' ? 'default' : 'ghost'}>Top 50</Button>
                                    </div>
                                    {activeCategory === "all" && (
                                        <div className="flex items-center gap-1">
                                            <Button onClick={() => handlePageChange("prev")} variant="outline" size="icon" disabled={currentPage === 1}><ChevronLeft className="h-4 w-4" /></Button>
                                            <Button onClick={() => handlePageChange("next")} variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow overflow-y-auto">
                                <AssetTable
                                    coin={coinToDisplay}
                                    onRowClick={(coin) => handleRowClick(coin.id)}
                                    selectedCoinId={selectedCoinId}
                                />
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="lg:col-span-3 flex flex-col min-h-0">
                        <Card className="w-full h-full bg-card/50 backdrop-blur-lg border-border/50 shadow-lg overflow-hidden">
                            <AnimatePresence mode="wait">
                                {selectedCoinDetails ? (
                                    <motion.div
                                        key={selectedCoinDetails.id}
                                        variants={detailVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="flex flex-col h-full"
                                    >
                                        <CardHeader>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-12 w-12 border-2 border-primary/50">
                                                    <AvatarImage src={selectedCoinDetails.image} />
                                                </Avatar>
                                                <div>
                                                    <CardTitle className="text-xl">{selectedCoinDetails.name}</CardTitle>
                                                    <p className="text-sm text-muted-foreground uppercase">{selectedCoinDetails.symbol}</p>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="flex-grow flex flex-col justify-between gap-4">
                                            <div>
                                                <div className="text-3xl font-bold mb-1">₹ {selectedCoinDetails.current_price.toLocaleString()}</div>
                                                <p className={`font-semibold flex items-center gap-1 text-sm ${selectedCoinDetails.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                                                    <TrendingUp className={`w-4 h-4 ${selectedCoinDetails.price_change_percentage_24h < 0 && "rotate-180"}`} />
                                                    {selectedCoinDetails.price_change_percentage_24h.toFixed(2)}% (24h)
                                                </p>
                                            </div>
                                            <div className="flex-grow h-48 md:h-auto">
                                                <StockChart coinId={selectedCoinDetails.id} />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                                                <div>
                                                    <p className="text-muted-foreground">Market Cap</p>
                                                    <p className="font-semibold">₹ {selectedCoinDetails.market_cap.toLocaleString()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground">Volume (24h)</p>
                                                    <p className="font-semibold">₹ {selectedCoinDetails.total_volume.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </motion.div>
                                ) : (
                                    <div className="flex items-center justify-center h-full p-8 text-muted-foreground">Select an asset to view details.</div>
                                )}
                            </AnimatePresence>
                        </Card>
                    </motion.div>
                </div>
            </main>

            <div className="fixed bottom-6 right-6 z-50">
                <Chatbot />
            </div>
        </div>
    );
};

export default Home;