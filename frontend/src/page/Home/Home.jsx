import React from 'react';
import {Button} from "@/components/ui/button.jsx";
import AssetTable from "@/page/Home/AssetTable.jsx";
import StockChart from "@/page/Home/StockChart.jsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {DotIcon, MessageCircle} from "lucide-react";

const Home = () => {
    const [category, setCategory] = React.useState("all")

    const handleCategory = (value) => {
        setCategory(value)
    }
    return (
        <div className='relative'>
            <div className='lg:flex'>
                <div className= 'lg:w-[50%] lg:border-r-0'>
                    <div className='p-3 flex items-center gap-4'>
                        <Button onClick={() => handleCategory("all")} variant={category === "all" ? "default" : "outline"} className="rounded-full"> All</Button>
                        <Button onClick={() => handleCategory("top50")} variant={category === "top50" ? "default" : "outline"} className="rounded-full"> Top 50</Button>
                        <Button onClick={() => handleCategory("topGainers")} variant={category === "topGainers" ? "default" : "outline"} className="rounded-full"> Top Gainers</Button>
                        <Button onClick={() => handleCategory("topLosers")} variant={category === "topLosers" ? "default" : "outline"} className="rounded-full"> Top Losers</Button>
                    </div>
                    <AssetTable></AssetTable>
                </div>
                <div className="hidden lg:block lg:w-[50%] p-5">
                    <StockChart>
                    </StockChart>
                    <div className="flex gap-5 items-center">
                        <div>
                            <Avatar>
                                <AvatarImage src={"https://coin-images.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400"}/>
                            </Avatar>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p>BTC</p>
                                <DotIcon className="text-gray-800"></DotIcon>
                                <p className="text-gray-800"> Bitcoin </p>
                            </div>
                            <div className="flex items-end gap-2">
                                <p className="text-l font-bold">6851107</p>
                                <p className="text-red-600">
                                    <span> 754.041</span>
                                    <span> (0.95578%) </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="absolute bottom-5 right-5 z-40">
                <div className="relative w-[9rem] cursor-pointer group">
                    <Button className="w-full h-[2.75rem] px-4 py-2 rounded-xl bg-gradient-to-r from-slate-500 to-slate-700 text-white shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
                        <MessageCircle className="w-5 h-5 mr-2 stroke-white group-hover:stroke-gray-300 rotate-[270deg]" />
                        <span className="text-lg font-medium tracking-wide">Chat Bot</span>
                    </Button>
                </div>
            </section>

        </div>
    );
};

export default Home;