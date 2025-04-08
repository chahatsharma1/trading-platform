import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";

const Portfolio = () => {
    return (
        <div className="p-5 lg:p-20">
            <h1 className="font-bold text-3xl"> Portfolio </h1>
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent pointer-events-none">
                        <TableHead>Asset</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Change (24h)</TableHead>
                        <TableHead>Change (%)</TableHead>
                        <TableHead className="text-right">Volume</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[1,1,1,1,1].map((item,index) => <TableRow key={index}>
                        <TableCell className="font-medium flex items-center gap-2">
                            <Avatar>
                                <AvatarImage className="w-10 h-10" src="https://coin-images.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400"></AvatarImage>
                            </Avatar>
                            <span>Bitcoin</span>
                        </TableCell>
                        <TableCell>₹6851107</TableCell>
                        <TableCell>0.002</TableCell>
                        <TableCell>- ₹1252.64</TableCell>
                        <TableCell>- 1.6046%</TableCell>
                        <TableCell className="text-right">₹4181718020438</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </div>
    );
};

export default Portfolio;