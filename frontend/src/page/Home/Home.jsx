import { useEffect, useState } from "react";
import StockChart from "@/page/Home/StockChart.jsx";
import AssetTable from "@/page/Home/AssetTable.jsx";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { getCoinList, getTop50Coins } from "@/page/State/Coin/Action.js";
import { Button } from "@/components/ui/button";
import Chatbot from "@/page/Home/Chatbot.jsx";

const Home = () => {
    const dispatch = useDispatch();
    const { coinList, top50 } = useSelector((store) => store.coin);
    const [activeCategory, setActiveCategory] = useState("all");
    const [selectedCoinId, setSelectedCoinId] = useState("bitcoin");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getCoinList(currentPage));
        dispatch(getTop50Coins());
    }, [dispatch, currentPage]);

    const coinToDisplay = activeCategory === "all" ? coinList : top50;

    const coinDetails = coinToDisplay.find((coin) => coin.id === selectedCoinId) || {
        id: "bitcoin",
        name: "Bitcoin",
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
        symbol: "btc",
        current_price: 2950000,
        market_cap: "58T",
        total_volume: "12T",
        price_change_24h: 25000,
    };

    const handleRowClick = (coinId) => {
        setSelectedCoinId(coinId);
    };

    const handleActiveCategory = (category) => {
        setActiveCategory(category);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div className="bg-[#0F172A] min-h-screen p-4 text-[#F1F5F9]">
            <div className="flex flex-col xl:flex-row gap-4 h-[calc(90vh-2rem)]">
                <div className="w-full xl:w-[55%] flex flex-col min-h-0">
                    <div className="mb-4 text-[#F1F5F9] flex items-center gap-4 shrink-0">
                        <Button
                            onClick={() => handleActiveCategory("all")}
                            className={`text-sm rounded-xl px-4 py-2 border transition-colors duration-200 ${
                                activeCategory === "all"
                                    ? "bg-[#3B82F6] text-white border-transparent cursor-default hover:bg-[#3B82F6]"
                                    : "bg-transparent text-[#F1F5F9] border-[#334155] hover:bg-[#334155] hover:text-white"
                            }`}
                        >
                            All Coins
                        </Button>
                        <Button
                            onClick={() => handleActiveCategory("top50")}
                            className={`text-sm rounded-xl px-4 py-2 border transition-colors duration-200 ${
                                activeCategory === "top50"
                                    ? "bg-[#3B82F6] text-white border-transparent cursor-default hover:bg-[#3B82F6]"
                                    : "bg-transparent text-[#F1F5F9] border-[#334155] hover:bg-[#334155] hover:text-white"
                            }`}
                        >
                            Top 50
                        </Button>

                        {activeCategory !== "top50" && (
                            <div className="ml-auto flex items-center space-x-4">
                                <Button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className="text-sm rounded-xl px-4 py-2 border transition-colors duration-200 bg-[#334155] text-white hover:bg-[#475569]"
                                >
                                    Previous
                                </Button>
                                <span className="text-sm text-[#F1F5F9]">Page {currentPage}</span>
                                <Button
                                    onClick={handleNextPage}
                                    className="text-sm rounded-xl px-4 py-2 border transition-colors duration-200 bg-[#334155] text-white hover:bg-[#475569]"
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="flex-grow overflow-auto min-h-0">
                        <AssetTable
                            coin={coinToDisplay}
                            category={activeCategory}
                            onRowClick={(coin) => handleRowClick(coin.id)}
                        />
                    </div>
                </div>

                <div className="w-full xl:w-[45%] flex flex-col gap-4 overflow-y-auto min-h-0">
                    <StockChart coinId={coinDetails.id} />
                    <Card className="bg-[#1E293B] text-[#F1F5F9] p-4 rounded-2xl shadow-none border border-transparent">
                        <CardContent className="flex items-center justify-between gap-4 p-0">

                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage className="w-12 h-12" src={coinDetails.image} />
                                </Avatar>
                                <div>
                                    <h2 className="text-lg font-semibold">{coinDetails.name}</h2>
                                    <p className="uppercase text-xs text-gray-400">{coinDetails.symbol}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-x-6 text-sm flex-grow justify-end">
                                <div>
                                    <p className="text-gray-400">Price</p>
                                    <p>₹ {coinDetails.current_price.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Market Cap</p>
                                    <p>{coinDetails.market_cap}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">24h Change</p>
                                    <p
                                        className={
                                            coinDetails.price_change_24h >= 0
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }
                                    >
                                        ₹ {coinDetails.price_change_24h.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="fixed bottom-4 right-4 z-10">
                <Chatbot />
            </div>
        </div>
    );
};

export default Home;
