import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";

const Withdrawal = () => {
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
                    {[1, 1, 1, 1].map((item, index) => (
                        <TableRow key={index} className="border-b border-[#334155] hover:bg-[#334155]">
                            <TableCell className="text-[#F1F5F9]">
                                <p>10/04/2025 at 12:02 PM</p>
                            </TableCell>
                            <TableCell className="text-[#F1F5F9]">Bank Account</TableCell>
                            <TableCell className="text-[#F1F5F9]">₹1000</TableCell>
                            <TableCell className="text-green-400 font-medium">Success</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Withdrawal;
