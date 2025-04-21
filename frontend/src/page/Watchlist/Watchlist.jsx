import React, { useEffect } from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import { Avatar, AvatarImage } from "@/components/ui/avatar.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Bookmark } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addCoinToWatchlist, getUserWatchlist } from "@/page/State/Watchlist/Action.js";
import {useNavigate} from "react-router-dom";

const Watchlist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {items} = useSelector(store => store.watchlist);

    useEffect(() => {
        dispatch(getUserWatchlist(localStorage.getItem("jwt")));
    }, []);

    const handleToggleWatchlist = (coinId) => {
        dispatch(addCoinToWatchlist(coinId, localStorage.getItem("jwt")));
    };

    return (
        <div className="p-5 lg:p-20 bg-[#1E293B] text-[#F1F5F9] min-h-screen flex flex-col">
            <h1 className="font-bold text-3xl mb-6">Watchlist</h1>

            <div className="rounded-xl overflow-hidden border border-[#334155]">
                <Table className="w-full bg-[#0F172A]">
                    <TableHeader>
                        <TableRow className="hover:bg-transparent pointer-events-none">
                            <TableHead className="text-[#F1F5F9]">Coin</TableHead>
                            <TableHead className="text-[#F1F5F9]">Symbol</TableHead>
                            <TableHead className="text-[#F1F5F9]">Volume</TableHead>
                            <TableHead className="text-[#F1F5F9]">Market Cap</TableHead>
                            <TableHead className="text-[#F1F5F9]">Price Change (24h)</TableHead>
                            <TableHead className="text-[#F1F5F9]">Current Price</TableHead>
                            <TableHead className="text-[#F1F5F9] text-center">Remove</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items?.length > 0 ? (
                            items.map((item, index) => (
                                <TableRow
                                    onClick={() => navigate(`/market/${item.id}`)}
                                    key={index}
                                    className="hover:bg-[#3B82F6] hover:bg-opacity-20 transition-all duration-200"
                                >
                                    <TableCell className="font-medium flex items-center gap-2 text-[#F1F5F9]">
                                        <Avatar>
                                            <AvatarImage
                                                className="w-10 h-10"
                                                src={item.image}
                                                alt={item.name}
                                            />
                                        </Avatar>
                                        <span>{item.name}</span>
                                    </TableCell>
                                    <TableCell className="text-[#F1F5F9]">{item.symbol?.toUpperCase()}</TableCell>
                                    <TableCell className="text-[#F1F5F9]">{item?.total_volume}</TableCell>
                                    <TableCell className="text-[#F1F5F9]">{item?.market_cap}</TableCell>
                                    <TableCell className={`text-sm ${item.price_change_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        ₹ {item.price_change_24h?.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-[#F1F5F9]">₹ {item.current_price?.toLocaleString()}</TableCell>
                                    <TableCell className="text-center">
                                        <Button
                                            variant="ghost"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleToggleWatchlist(item.id);
                                            }}
                                            size="icon"
                                            className="h-10 w-10 bg-[#3B82F6] hover:bg-[#2563EB]">
                                            <Bookmark className="w-6 h-6 fill-current text-white" />
                                        </Button>

                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="7" className="text-center text-[#94A3B8] py-6">
                                    Your watchlist is empty.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Watchlist;
