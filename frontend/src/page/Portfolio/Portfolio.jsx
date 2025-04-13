import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";

const Portfolio = () => {
    return (
        <div className="p-5 lg:p-20 bg-[#0F172A] min-h-screen text-[#F1F5F9]">
            <h1 className="font-bold text-3xl mb-6">Portfolio</h1>
            <div className="overflow-x-auto rounded-lg border border-[#334155]">
                <Table className="w-full text-sm bg-[#1E293B]">
                    <TableHeader>
                        <TableRow className="pointer-events-none bg-[#1E293B] border-b border-[#334155]">
                            <TableHead className="text-[#F1F5F9]">Asset</TableHead>
                            <TableHead className="text-[#F1F5F9]">Price</TableHead>
                            <TableHead className="text-[#F1F5F9]">Unit</TableHead>
                            <TableHead className="text-[#F1F5F9]">Change (24h)</TableHead>
                            <TableHead className="text-[#F1F5F9]">Change (%)</TableHead>
                            <TableHead className="text-right text-[#F1F5F9]">Volume</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[1, 1, 1, 1, 1].map((item, index) => (
                            <TableRow
                                key={index}
                                className="hover:bg-[#3B82F6]/10 border-b border-[#334155] transition-all duration-150">
                                <TableCell className="flex items-center gap-3 py-4 font-medium text-[#F1F5F9]">
                                    <Avatar>
                                        <AvatarImage
                                            className="w-10 h-10"
                                            src="https://coin-images.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400"
                                        />
                                    </Avatar>
                                    <span>Bitcoin</span>
                                </TableCell>
                                <TableCell className="text-[#F1F5F9]">₹6,851,107</TableCell>
                                <TableCell className="text-[#F1F5F9]">0.002</TableCell>
                                <TableCell className="text-red-400">- ₹1,252.64</TableCell>
                                <TableCell className="text-red-400">-1.60%</TableCell>
                                <TableCell className="text-right text-[#F1F5F9]">₹4,181</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Portfolio;
