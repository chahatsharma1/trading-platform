import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar.jsx";
import { useNavigate } from "react-router-dom";

const AssetTable = ({coin, category} ) => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#1E293B] rounded-2xl shadow-md p-4 text-[#F1F5F9]">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent pointer-events-none">
                        <TableHead className="text-[#F1F5F9]">Coin</TableHead>
                        <TableHead className="text-[#F1F5F9]">Symbol</TableHead>
                        <TableHead className="text-[#F1F5F9]">Volume</TableHead>
                        <TableHead className="text-[#F1F5F9]">Market Cap</TableHead>
                        <TableHead className="text-[#F1F5F9]">24h</TableHead>
                        <TableHead className="text-right text-[#F1F5F9]">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {coin.map((coin, index)  => (
                        <TableRow
                            key={index}
                            onClick={() => navigate(`/market/${coin.id}`)}
                            className="cursor-pointer hover:bg-[#334155] transition-colors">
                            <TableCell className="font-medium flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage className="w-10 h-10" src={coin.image} />
                                </Avatar>
                                <span>{coin.name}</span>
                            </TableCell>
                            <TableCell>{coin.symbol.toUpperCase()}</TableCell>
                            <TableCell>{coin.total_volume}</TableCell>
                            <TableCell>{coin.market_cap}</TableCell>
                            <TableCell>{coin.price_change_24h}</TableCell>
                            <TableCell className="text-right">{coin.current_price} INR</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AssetTable;
