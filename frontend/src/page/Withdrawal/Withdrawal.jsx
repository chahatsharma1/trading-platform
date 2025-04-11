import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";

const Withdrawal = () => {
    return (
        <div className="p-5 lg:p-20" >
            <h1 className="font-bold text-3xl">Withdrawal</h1>
            <Table className="border">
                <TableHeader>
                    <TableRow className="hover:bg-transparent pointer-events-none">
                        <TableHead className="py-5">Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[1,1,1,1].map((item,index) => <TableRow key={index}>
                        <TableCell>
                            <p>10/04/2025 at 12:02 PM</p>
                        </TableCell>
                        <TableCell>Bank Account</TableCell>
                        <TableCell>₹1000</TableCell>
                        <TableCell>Success</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </div>
    );
};

export default Withdrawal;