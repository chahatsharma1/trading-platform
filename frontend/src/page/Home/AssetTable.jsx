import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar.jsx";
import { useNavigate } from "react-router-dom";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";

const AssetTable = ({coin, category } ) => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#1E293B] rounded-2xl shadow-md p-4 text-[#F1F5F9]">
            <Table>
                <ScrollArea className={`${category === "all"?"h-[74vh]":"h-[82vh]"}`}>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent pointer-events-none">
                            <TableHead className="text-[#F1F5F9]">Coin</TableHead>
                            <TableHead className="text-[#F1F5F9]">Symbol</TableHead>
                            <TableHead className="text-[#F1F5F9]">Volume</TableHead>
                            <TableHead className="text-[#F1F5F9]">Market Cap</TableHead>
                            <TableHead className="text-[#F1F5F9]">Price Change (24h)</TableHead>
                            <TableHead className="text-[#F1F5F9]">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {coin.map((coin)  => (
                            <TableRow
                                key={coin.id}
                                onClick={() => navigate(`/market/${coin.id}`)}
                                className="cursor-pointer hover:bg-[#334155] transition-colors">
                                <TableCell className="font-medium flex items-center gap-2 max-w-[150px]">
                                    <Avatar>
                                        <AvatarImage className="w-10 h-10" src={coin?.image} />
                                    </Avatar>
                                    <span className="truncate max-w-[140px]" title={coin?.name}>{coin?.name}</span>
                                </TableCell>
                                <TableCell>{coin?.symbol.toUpperCase()}</TableCell>
                                <TableCell>{coin?.total_volume}</TableCell>
                                <TableCell>{coin?.market_cap}</TableCell>
                                <TableCell className={coin.price_change_24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                                    ₹ {coin.price_change_24h.toFixed(2)}
                                </TableCell>
                                <TableCell >₹ {coin.current_price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </ScrollArea>
            </Table>
        </div>
    );
};

export default AssetTable;