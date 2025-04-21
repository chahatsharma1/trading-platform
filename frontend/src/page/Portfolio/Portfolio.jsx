import React, { useEffect } from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import { Avatar, AvatarImage } from "@/components/ui/avatar.jsx";
import { getUserAssets } from "@/page/State/Asset/Action.js";
import { useDispatch, useSelector } from "react-redux";

const Portfolio = () => {
    const dispatch = useDispatch();
    const {userAssets} = useSelector(store => store.asset);

    useEffect(() => {
        dispatch(getUserAssets({ jwt: localStorage.getItem("jwt") }));
    }, [dispatch]);

    return (
        <div className="p-5 lg:p-20 bg-[#0F172A] min-h-screen text-[#F1F5F9]">
            <h1 className="font-bold text-3xl mb-6">Portfolio</h1>
            <div className="overflow-x-auto rounded-lg border border-[#334155]">
                <Table className="w-full text-sm bg-[#1E293B]">
                    <TableHeader>
                        <TableRow className="pointer-events-none bg-[#1E293B] border-b border-[#334155]">
                            <TableHead className="text-[#F1F5F9]">Asset</TableHead>
                            <TableHead className="text-[#F1F5F9]">Symbol</TableHead>
                            <TableHead className="text-[#F1F5F9]">Buy Price</TableHead>
                            <TableHead className="text-[#F1F5F9]">Quantity</TableHead>
                            <TableHead className="text-[#F1F5F9]">Total Invested</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userAssets?.map((item, index) => (
                            <TableRow
                                key={index}
                                className="hover:bg-[#3B82F6]/10 border-b border-[#334155] transition-all duration-150">
                                <TableCell className="flex items-center gap-3 py-4 font-medium">
                                    <Avatar>
                                        <AvatarImage className="w-10 h-10" src={item.coin.image} />
                                    </Avatar>
                                    <span>{item.coin.name}</span>
                                </TableCell>
                                <TableCell>{item.coin.symbol.toUpperCase()}</TableCell>
                                <TableCell>₹{item.buyPrice}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>₹{(item.buyPrice * item.quantity).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Portfolio;
