import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Bookmark} from "lucide-react";

const Watchlist = () => {

    const handleRemoveFromWatchlist=(value) => {
        console.log(value);
    }
    return (
        <div className="p-5 lg:p-20">
            <h1 className="font-bold text-3xl"> Watchlist </h1>
            <Table className="border">
                <TableHeader>
                    <TableRow className="hover:bg-transparent pointer-events-none">
                        <TableHead>Coin</TableHead>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Volume</TableHead>
                        <TableHead>Market Cap</TableHead>
                        <TableHead>24h</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Remove</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[1,1,1,1].map((item,index) => <TableRow key={index}>
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
                        <TableCell>
                            <Button variant="ghost" onClick={handleRemoveFromWatchlist(item.id)} size="icon" className="h-10 w-10 bg-slate-700 hover:bg-slate-500">
                                <Bookmark className="w-6 h-6 fill-current text-gray-200" />
                            </Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </div>
    );
};

export default Watchlist;