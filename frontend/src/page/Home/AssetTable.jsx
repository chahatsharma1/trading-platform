import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar.jsx";
import { useNavigate } from "react-router-dom";

const AssetTable = () => {
    const navigate = useNavigate();

    const data = [
        {
            name: "Bitcoin",
            symbol: "BTC",
            volume: "9124463121",
            marketCap: "1364881428323",
            change24h: "-0.2009",
            price: "₹6851107",
            image: "https://coin-images.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400",
            slug: "bitcoin"
        },
        // Add more coins if needed
    ];

    return (
        <div className="bg-[#1E293B] rounded-2xl shadow-md p-4 text-[#F1F5F9]">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent pointer-events-none">
                        <TableHead className="text-[#F1F5F9]">Coin</TableHead>
                        <TableHead className="text-[#F1F5F9]">Symbol</TableHead>
                        <TableHead className="text-[#F1F5F9]">Volume</TableHead>
                        <TableHead className="text-[#F1F5F9]">Market Cap</TableHead>
                        <TableHead className="text-[#F1F5F9]">24h</TableHead>
                        <TableHead className="text-right text-[#F1F5F9]">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((coin, index) => (
                        <TableRow
                            key={index}
                            onClick={() => navigate(`/market/${coin.slug}`)}
                            className="cursor-pointer hover:bg-[#334155] transition-colors"
                        >
                            <TableCell className="font-medium flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage className="w-10 h-10" src={coin.image} />
                                </Avatar>
                                <span>{coin.name}</span>
                            </TableCell>
                            <TableCell>{coin.symbol}</TableCell>
                            <TableCell>{coin.volume}</TableCell>
                            <TableCell>{coin.marketCap}</TableCell>
                            <TableCell>{coin.change24h}</TableCell>
                            <TableCell className="text-right">{coin.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AssetTable;
