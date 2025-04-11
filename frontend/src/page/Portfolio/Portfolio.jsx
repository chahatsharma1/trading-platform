import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table.jsx";
import {
    Avatar,
    AvatarImage
} from "@/components/ui/avatar.jsx";

const Portfolio = () => {
    return (
        <div className="p-5 lg:p-20 bg-black min-h-screen text-white">
            <h1 className="font-bold text-3xl mb-6">Portfolio</h1>
            <Table className="w-full">
                <TableHeader>
                    <TableRow className="hover:bg-transparent pointer-events-none border-b border-gray-700">
                        <TableHead className="text-white">Asset</TableHead>
                        <TableHead className="text-white">Price</TableHead>
                        <TableHead className="text-white">Unit</TableHead>
                        <TableHead className="text-white">Change (24h)</TableHead>
                        <TableHead className="text-white">Change (%)</TableHead>
                        <TableHead className="text-right text-white">Volume</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[1, 1, 1, 1, 1].map((item, index) => (
                        <TableRow
                            key={index}
                            className="hover:bg-gray-800 border-b border-gray-700"
                        >
                            <TableCell className="font-medium flex items-center gap-2 text-white">
                                <Avatar>
                                    <AvatarImage
                                        className="w-10 h-10"
                                        src="https://coin-images.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400"
                                    />
                                </Avatar>
                                <span>Bitcoin</span>
                            </TableCell>
                            <TableCell className="text-white">₹6,851,107</TableCell>
                            <TableCell className="text-white">0.002</TableCell>
                            <TableCell className="text-red-500">- ₹1,252.64</TableCell>
                            <TableCell className="text-red-500">- 1.6046%</TableCell>
                            <TableCell className="text-right text-white">₹4,181</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Portfolio;
