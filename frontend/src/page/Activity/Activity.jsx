import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { Avatar, AvatarImage } from "@/components/ui/avatar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForUser } from "@/page/State/Order/Action.js";

const Activity = () => {
    const dispatch = useDispatch();
    const {orders} = useSelector(store => store.order);

    useEffect(() => {
        dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }))
    }, []);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString()
        };
    };

    const calculateProfitLoss = (buyPrice, sellPrice, amount) => {
        if (!buyPrice || !sellPrice || !amount) return null;
        const units = amount / buyPrice;
        const profit = (sellPrice - buyPrice) * units;
        return profit.toFixed(2);
    };

    return (
        <div className="p-5 lg:p-20 bg-[#1E293B] text-[#F1F5F9] min-h-screen flex flex-col">
            <h1 className="font-bold text-3xl mb-6">Activity</h1>
            <Table className="rounded-xl bg-[#0F172A] flex-1">
                <TableHeader>
                    <TableRow className="hover:bg-transparent pointer-events-none">
                        <TableHead className="text-[#F1F5F9] py-5">Date & Time</TableHead>
                        <TableHead className="text-[#F1F5F9]">Coin</TableHead>
                        <TableHead className="text-[#F1F5F9]">Buy Price</TableHead>
                        <TableHead className="text-[#F1F5F9]">Sell Price</TableHead>
                        <TableHead className="text-[#F1F5F9]">Order Type</TableHead>
                        <TableHead className="text-[#F1F5F9]">Profit/Loss</TableHead>
                        <TableHead className="text-[#F1F5F9]">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders?.map((item, index) => {
                        const { date, time } = formatDate(item.timeStamp);
                        const buyPrice = item.orderItem?.buyPrice || 0;
                        const sellPrice = item.orderItem?.sellPrice || 0;
                        const amount = item.price || 0;

                        const profitLoss = item.orderType === "SELL"
                            ? calculateProfitLoss(buyPrice, sellPrice, amount)
                            : null;

                        const isProfit = profitLoss && parseFloat(profitLoss) > 0;

                        return (
                            <TableRow
                                key={index}
                                className="hover:bg-[#3B82F6] hover:bg-opacity-20 transition-all duration-200"
                            >
                                <TableCell>
                                    <p className="text-[#F1F5F9]">{date}</p>
                                    <p className="text-gray-400 text-sm">{time}</p>
                                </TableCell>
                                <TableCell className="font-medium flex items-center gap-2 text-[#F1F5F9]">
                                    <Avatar>
                                        <AvatarImage
                                            className="w-10 h-10"
                                            src={item.orderItem?.coin.image}
                                        />
                                    </Avatar>
                                    <span>{item?.orderItem?.coin.name}</span>
                                </TableCell>
                                <TableCell className="text-[#F1F5F9]">₹ {buyPrice}</TableCell>
                                <TableCell className="text-[#F1F5F9]">
                                    {item.orderType === "SELL" && sellPrice ? `₹ ${sellPrice}` : "-"}
                                </TableCell>
                                <TableCell className="text-[#F1F5F9]">{item?.orderType}</TableCell>
                                <TableCell className={`font-semibold ${
                                    profitLoss === null ? 'text-gray-400' :
                                        isProfit ? 'text-green-400' : 'text-red-500'
                                }`}>
                                    {profitLoss === null ? "-" : `${isProfit ? "+" : "-"}₹${Math.abs(profitLoss)}`}
                                </TableCell>
                                <TableCell className="text-[#F1F5F9]">₹ {amount}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default Activity;
