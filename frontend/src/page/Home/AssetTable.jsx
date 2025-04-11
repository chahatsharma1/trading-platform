import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader,TableRow,} from "@/components/ui/table"
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {useNavigate} from "react-router-dom";

const AssetTable = () => {
    const navigate=useNavigate()
    return (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent pointer-events-none">
                    <TableHead>Coin</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Market Cap</TableHead>
                    <TableHead>24h</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[1,1,1,1,1,1,1,1,1,1,1].map((item,index) => <TableRow key={index}>
                    <TableCell onClick={() => navigate(`/market/bitcoin`)} className="font-medium flex items-center gap-2">
                        <Avatar>
                            <AvatarImage className="w-10 h-10" src="https://coin-images.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400"></AvatarImage>
                        </Avatar>
                        <span>Bitcoin</span>
                    </TableCell>
                    <TableCell>BTC</TableCell>
                    <TableCell>9124463121</TableCell>
                    <TableCell>1364881428323</TableCell>
                    <TableCell>-0.2009</TableCell>
                    <TableCell className="text-right">₹6851107</TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    );
};

export default AssetTable;