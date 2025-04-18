import React, {useEffect} from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getWithdrawalHistory} from "@/page/State/Withdrawal/Action.js";

const Withdrawal = () => {
    const dispatch=useDispatch();
    const {withdrawal}= useSelector(store => store);

    useEffect(() => {
        dispatch(getWithdrawalHistory({jwt: localStorage.getItem("jwt")}))
    });
    return (
        <div className="p-5 lg:p-20 min-h-screen bg-[#0F172A] text-[#F1F5F9]">
            <h1 className="font-bold text-3xl mb-6">Withdrawal</h1>
            <Table className="bg-[#1E293B] rounded-xl overflow-hidden">
                <TableHeader>
                    <TableRow className="hover:bg-transparent pointer-events-none border-b border-[#334155]">
                        <TableHead className="py-5 text-[#F1F5F9]">Date</TableHead>
                        <TableHead className="text-[#F1F5F9]">Method</TableHead>
                        <TableHead className="text-[#F1F5F9]">Amount</TableHead>
                        <TableHead className="text-[#F1F5F9]">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {withdrawal.history.map((item, index) => (
                        <TableRow key={index} className="border-b border-[#334155] hover:bg-[#334155]">
                            <TableCell className="text-[#F1F5F9]">
                                <p>{new Date(item.date).toLocaleString('en-IN', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                })}</p>
                            </TableCell>

                            <TableCell className="text-[#F1F5F9]">Bank Transfer</TableCell>
                            <TableCell className="text-[#F1F5F9]">₹ {item.amount}</TableCell>
                            <TableCell className={`font-medium ${item.status.toLowerCase() === 'success' ? 'text-green-400' : item.status.toLowerCase() === 'pending' ? 'text-yellow-400' : 'text-red-400'}`}>
                                {item.status}
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Withdrawal;
