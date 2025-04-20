import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button.jsx";
import AssetTable from "@/page/Home/AssetTable.jsx";
import StockChart from "@/page/Home/StockChart.jsx";
import { Avatar, AvatarImage } from "@/components/ui/avatar.jsx";
import { DotIcon } from "lucide-react";
import { getCoinList, getTop50Coins } from "@/page/State/Coin/Action.js";
import { useDispatch, useSelector } from "react-redux";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination.jsx";
import Chatbot from '@/page/Home/Chatbot.jsx';

const Home = () => {
    const dispatch = useDispatch();
    const { coin } = useSelector(store => store);
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        if (activeCategory === "top50") {
            dispatch(getTop50Coins());
        } else {
            dispatch(getCoinList(1));
        }
    }, [activeCategory, dispatch]);

    const categoryList = [
        { label: "All", value: "all" },
        { label: "Top 50", value: "top50" }
    ];

    const handlePageChange = (page) => {
        if (activeCategory === 'all') {
            if (page > 0) {
                dispatch(getCoinList(page));
            }
        }
    }

    return (
        <div className="relative bg-[#0F172A] h-screen text-[#F1F5F9] flex flex-col overflow-hidden">
            <div className="flex flex-wrap lg:flex-nowrap flex-grow min-h-0">
                <div className="w-full lg:w-[50%] p-3 flex flex-col overflow-hidden">
                    <div className="p-3 flex items-center gap-4 flex-wrap flex-shrink-0">
                        {categoryList.map((item) => (
                            <Button
                                key={item.value}
                                onClick={() => setActiveCategory(item.value)}
                                className={`rounded-full px-4 py-2 border transition-colors duration-200 text-sm
                                    ${activeCategory === item.value
                                    ? "bg-[#3B82F6] text-white border-transparent cursor-default hover:bg-[#3B82F6]"
                                    : "bg-[#1E293B] text-[#94A3B8] border-[#334155] hover:bg-[#334155] hover:text-white"}`}>
                                {item.label}
                            </Button>
                        ))}
                    </div>

                    <div className="flex-grow overflow-y-auto min-h-0 relative">
                        <div className="pb-16">
                            <AssetTable
                                coin={activeCategory === "all" ? coin.coinList : activeCategory === "top50" ? coin.top50 : []}
                                category={activeCategory}/>
                        </div>

                        <div className="sticky bottom-0 bg-[#0F172A] p-3 z-10">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" onClick={() => handlePageChange(1)} />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#" isActive onClick={() => handlePageChange(1)}>1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#" onClick={() => handlePageChange(2)}>2</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href="#" onClick={() => handlePageChange(3)} />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-[50%] p-3 flex flex-col overflow-hidden">
                    <div className="h-[74%]">
                        <StockChart coinId={"bitcoin"} />
                    </div>
                    <div className="flex-shrink-0 mt-5 p-4 bg-[#1E293B] rounded-lg flex gap-5 items-center">
                        <Avatar>
                            <AvatarImage src="https://coin-images.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400" />
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2 text-[#F1F5F9]">
                                <p className="font-semibold">BTC</p>
                                <DotIcon className="text-[#38BDF8]" />
                                <p>Bitcoin</p>
                            </div>
                            <div className="flex items-end gap-2 mt-1">
                                <p className="text-xl font-bold">₹7,355,264</p>
                                <p className="text-green-500 text-sm">
                                    <span>+70,606</span>
                                    <span> (0.96%) </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Chatbot />
        </div>
    );
};
export default Home;