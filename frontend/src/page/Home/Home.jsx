import React, {useEffect} from 'react';
import { Button } from "@/components/ui/button.jsx";
import AssetTable from "@/page/Home/AssetTable.jsx";
import StockChart from "@/page/Home/StockChart.jsx";
import { Avatar, AvatarImage } from "@/components/ui/avatar.jsx";
import { DotIcon, MessageCircle, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input.jsx";
import {getCoinList} from "@/page/State/Coin/Action.js";
import {useDispatch, useSelector} from "react-redux";

const Home = () => {
    const dispatch=useDispatch();
    const {coin}=useSelector(store => store)
    const [category, setCategory] = React.useState("all");
    const [inputValue, setInputValue] = React.useState("");
    const [isBotRelease, setIsBotRelease] = React.useState(false);

    const handleBotRelease = () => setIsBotRelease(!isBotRelease);

    const handleCategory = (value) => {
        setCategory(value);
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            console.log(inputValue);
            setInputValue("");
        }
    };

    useEffect(() => {
        dispatch((getCoinList(1)))
    }, []);

    return (
        <div className="relative bg-[#0F172A] min-h-screen text-[#F1F5F9]">
            <div className="lg:flex">
                <div className="lg:w-[50%]">
                    <div className="p-3 flex items-center gap-4">
                        <Button onClick={() => handleCategory("all")} variant={category === "all" ? "default" : "outline"} className="rounded-full bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90 border-none">
                            All
                        </Button>
                        <Button onClick={() => handleCategory("top50")} variant={category === "top50" ? "default" : "outline"} className="rounded-full bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90 border-none">
                            Top 50
                        </Button>
                        <Button onClick={() => handleCategory("topGainers")} variant={category === "topGainers" ? "default" : "outline"} className="rounded-full bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90 border-none">
                            Top Gainers
                        </Button>
                        <Button onClick={() => handleCategory("topLosers")} variant={category === "topLosers" ? "default" : "outline"} className="rounded-full bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90 border-none">
                            Top Losers
                        </Button>
                    </div>
                    <AssetTable coin={coin.coinList} category={category}/>
                </div>

                <div className="hidden lg:block lg:w-[50%] p-5">
                    <StockChart />
                    <div className="flex gap-5 items-center mt-6">
                        <Avatar>
                            <AvatarImage src="https://coin-images.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400" />
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2 text-[#F1F5F9]">
                                <p>BTC</p>
                                <DotIcon className="text-[#38BDF8]" />
                                <p>Bitcoin</p>
                            </div>
                            <div className="flex items-end gap-2">
                                <p className="text-lg font-bold">₹6,851,107</p>
                                <p className="text-red-500">
                                    <span>754.041</span>
                                    <span> (0.95578%) </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                {isBotRelease && (
                    <div className="w-[20rem] md:w-[25rem] h-[70vh] bg-[#1E293B] rounded-xl shadow-lg overflow-hidden">
                        <div className="flex justify-between items-center border-b px-6 h-[12%] bg-[#1E293B] text-[#F1F5F9]">
                            <p className="font-medium">Chat Bot</p>
                            <Button onClick={handleBotRelease} variant="ghost" size="icon" className="hover:bg-gray-700 rounded-full">
                                <XIcon className="w-5 h-5 text-white" />
                            </Button>
                        </div>
                        <div className="h-[76%] flex flex-col overflow-y-auto gap-1 px-5 py-2 scroll-container">
                            <div className="self-start pb-5 w-auto">
                                <div className="px-5 py-2 rounded-md bg-[#3B82F6] text-white">
                                    <p>Hi, Chahat</p>
                                    <p>You can ask crypto related questions</p>
                                    <p>like price, market cap and more.</p>
                                </div>
                            </div>

                            {[1, 1, 1, 1].map((item, i) => (
                                <div key={i} className={`${i % 2 === 0 ? "self-start" : "self-end"} pb-5 w-auto`}>
                                    <div className="px-5 py-2 rounded-md bg-[#1E293B] text-white border border-gray-600">
                                        <p>{i % 2 === 0 ? "Question" : "Answer"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="h-[12%] border-t border-gray-700">
                            <Input
                                className="w-full h-full bg-[#0F172A] text-white placeholder-gray-400 border-none focus:outline-none focus:ring-0"
                                placeholder="Write Prompt"
                                onChange={handleChange}
                                value={inputValue}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                    </div>
                )}

                <Button onClick={handleBotRelease} className="h-[2.75rem] px-4 py-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] text-white shadow-md hover:scale-105 transition-transform duration-300 ease-in-out">
                    <MessageCircle className="w-5 h-5 mr-2 stroke-white rotate-[270deg]" />
                    <span className="text-base font-medium tracking-wide">Chat Bot</span>
                </Button>
            </section>
        </div>
    );
};

export default Home;
