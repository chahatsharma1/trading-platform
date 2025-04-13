import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { Avatar, AvatarImage } from "@/components/ui/avatar.jsx";

const Activity = () => {
    return (
        <div className="p-5 lg:p-20 bg-[#1E293B] text-[#F1F5F9] min-h-screen flex flex-col">
            <h1 className="font-bold text-3xl mb-6">Activity</h1>
            <Table className="rounded-xl bg-[#0F172A] flex-1">
                <TableHeader>
                    <TableRow className="hover:bg-transparent pointer-events-none">
                        <TableHead className="text-[#F1F5F9] py-5">Date & Time</TableHead>
                        <TableHead className="text-[#F1F5F9]">Trading Pair</TableHead>
                        <TableHead className="text-[#F1F5F9]">Buy Price</TableHead>
                        <TableHead className="text-[#F1F5F9]">Sell Price</TableHead>
                        <TableHead className="text-[#F1F5F9]">Order Type</TableHead>
                        <TableHead className="text-[#F1F5F9]">Profit/Loss</TableHead>
                        <TableHead className="text-[#F1F5F9]">Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[1, 1, 1, 1].map((item, index) => (
                        <TableRow
                            key={index}
                            className="hover:bg-[#3B82F6] hover:bg-opacity-20 transition-all duration-200"
                        >
                            <TableCell>
                                <p className="text-[#F1F5F9]">10/04/2025</p>
                                <p className="text-gray-400 text-sm">02:17:43 AM</p>
                            </TableCell>
                            <TableCell className="font-medium flex items-center gap-2 text-[#F1F5F9]">
                                <Avatar>
                                    <AvatarImage
                                        className="w-10 h-10"
                                        src="https://coin-images.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400"
                                    />
                                </Avatar>
                                <span>Bitcoin</span>
                            </TableCell>
                            <TableCell className="text-[#F1F5F9]">₹68,51,107</TableCell>
                            <TableCell className="text-[#F1F5F9]">₹70,00,000</TableCell>
                            <TableCell className="text-[#F1F5F9]">LIMIT</TableCell>
                            <TableCell className="text-green-400 font-semibold">+₹1,48,893</TableCell>
                            <TableCell className="text-[#F1F5F9]">₹10,000</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Activity;
