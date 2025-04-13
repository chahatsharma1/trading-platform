import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { Avatar, AvatarImage } from "@/components/ui/avatar.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Bookmark } from "lucide-react";

const Watchlist = () => {

    const handleRemoveFromWatchlist = (coinName) => {
        console.log(`Removed ${coinName} from watchlist`);
    };

    return (
        <div className="p-5 lg:p-20 bg-[#1E293B] text-[#F1F5F9] min-h-screen flex flex-col">
            <h1 className="font-bold text-3xl mb-6">Watchlist</h1>

            {/* Rounded border wrapper for the table */}
            <div className="rounded-xl overflow-hidden border border-[#334155]">
                <Table className="w-full bg-[#0F172A]">
                    <TableHeader>
                        <TableRow className="hover:bg-transparent pointer-events-none">
                            <TableHead className="text-[#F1F5F9]">Coin</TableHead>
                            <TableHead className="text-[#F1F5F9]">Symbol</TableHead>
                            <TableHead className="text-[#F1F5F9]">Volume</TableHead>
                            <TableHead className="text-[#F1F5F9]">Market Cap</TableHead>
                            <TableHead className="text-[#F1F5F9]">24h</TableHead>
                            <TableHead className="text-[#F1F5F9]">Amount</TableHead>
                            <TableHead className="text-[#F1F5F9]">Remove</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[1, 1, 1, 1].map((item, index) => (
                            <TableRow
                                key={index}
                                className="hover:bg-[#3B82F6] hover:bg-opacity-20 transition-all duration-200"
                            >
                                <TableCell className="font-medium flex items-center gap-2 text-[#F1F5F9]">
                                    <Avatar>
                                        <AvatarImage className="w-10 h-10" src="https://coin-images.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400" />
                                    </Avatar>
                                    <span>Bitcoin</span>
                                </TableCell>
                                <TableCell className="text-[#F1F5F9]">BTC</TableCell>
                                <TableCell className="text-[#F1F5F9]">9124463121</TableCell>
                                <TableCell className="text-[#F1F5F9]">1364881428323</TableCell>
                                <TableCell className="text-[#F1F5F9]">-0.2009</TableCell>
                                <TableCell className="text-[#F1F5F9]">₹6851107</TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        onClick={() => handleRemoveFromWatchlist("Bitcoin")}
                                        size="icon"
                                        className="h-10 w-10 bg-[#3B82F6] hover:bg-[#2563EB]">
                                        <Bookmark className="w-6 h-6 fill-current text-white" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Watchlist;
