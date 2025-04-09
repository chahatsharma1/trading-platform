import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";

const Activity = () => {
    return (
        <div className="p-5 lg:p-20" >
            <h1 className="font-bold text-3xl"> Activity </h1>
            <Table className="border">
                <TableHeader>
                    <TableRow className="hover:bg-transparent pointer-events-none">
                        <TableHead className="py-5">Date And Time</TableHead>
                        <TableHead>Trading Pair</TableHead>
                        <TableHead>Buy Price</TableHead>
                        <TableHead>Sell Price</TableHead>
                        <TableHead>Order Type</TableHead>
                        <TableHead>Profit/Loss</TableHead>
                        <TableHead>Value </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[1,1,1,1].map((item,index) => <TableRow key={index}>
                        <TableCell>
                            <p>10/04/2025 </p>
                            <p className="text-gray-500"> 02:17:43 AM</p>
                        </TableCell>
                        <TableCell className="font-medium flex items-center gap-2">
                            <Avatar>
                                <AvatarImage className="w-10 h-10" src="https://coin-images.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400"></AvatarImage>
                            </Avatar>
                            <span>Bitcoin</span>
                        </TableCell>
                        <TableCell>BTC</TableCell>
                        <TableCell>9124463121</TableCell>
                        <TableCell>1364881428323</TableCell>
                        <TableCell>-0.2009</TableCell>
                        <TableCell>₹6851107</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </div>
    );
};

export default Activity;