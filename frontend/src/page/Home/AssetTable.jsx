import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar.jsx";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";

const AssetTable = ({ coin, category, onRowClick }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#1E293B] rounded-2xl shadow-md p-2 text-[#F1F5F9]">
            <Table className="w-full table-fixed">
                <ScrollArea className={`${category === "all" ? "h-[76vh]" : "h-[82vh]"}`}>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent pointer-events-none">
                            <TableHead className="w-[200px] text-[#F1F5F9]">Coin</TableHead>
                            <TableHead className="w-[100px] text-[#F1F5F9]">Symbol</TableHead>
                            <TableHead className="w-[160px] text-[#F1F5F9]">Volume</TableHead>
                            <TableHead className="w-[180px] text-[#F1F5F9]">Market Cap</TableHead>
                            <TableHead className="w-[180px] text-[#F1F5F9]">Price Change (24h)</TableHead>
                            <TableHead className="w-[140px] text-[#F1F5F9]">Amount</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {coin.map((coinItem) => (
                            <TableRow
                                key={coinItem.id}
                                onClick={() => onRowClick(coinItem)}
                                title="Click coin name to view info, or row to view chart & details"
                                className="cursor-pointer hover:bg-[#334155] transition-colors"
                            >
                                <TableCell className="font-medium flex items-center gap-2 whitespace-nowrap overflow-hidden">
                                    <Avatar>
                                        <AvatarImage className="w-10 h-10" src={coinItem?.image} />
                                    </Avatar>
                                    <span
                                        className="truncate max-w-[120px]"
                                        title={coinItem?.name}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/market/${coinItem.id}`);
                                        }}
                                    >
                                        {coinItem?.name}
                                    </span>
                                </TableCell>

                                <TableCell className="whitespace-nowrap">{coinItem?.symbol.toUpperCase()}</TableCell>
                                <TableCell className="whitespace-nowrap">₹ {coinItem?.total_volume}</TableCell>
                                <TableCell className="whitespace-nowrap">₹ {coinItem?.market_cap}</TableCell>
                                <TableCell
                                    className={`whitespace-nowrap ${coinItem.price_change_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    ₹ {coinItem.price_change_24h.toFixed(2)}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">₹ {coinItem.current_price.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </ScrollArea>
            </Table>
        </div>
    );
};

export default AssetTable;
