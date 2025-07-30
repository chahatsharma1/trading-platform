import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { TrendingUp } from "lucide-react";

const AssetTable = ({ coin, onRowClick, selectedCoinId }) => {
    const navigate = useNavigate();
    return (
        <Table>
            <TableHeader>
                <TableRow className="border-b-border/50 hover:bg-transparent">
                    <TableHead className="pl-4">Coin</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">24h %</TableHead>
                    <TableHead className="text-right hidden md:table-cell">Market Cap</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {coin.map((coinItem) => (
                    <TableRow
                        key={coinItem.id}
                        onClick={() => onRowClick(coinItem.id)}
                        className={`cursor-pointer border-b-border/30 transition-colors duration-200 ${
                            selectedCoinId === coinItem.id
                                ? "bg-primary/10 hover:bg-primary/20"
                                : "hover:bg-muted/50"
                        }`}>
                        <TableCell className="font-medium flex items-center gap-3 pl-4">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={coinItem.image} alt={coinItem.name} />
                            </Avatar>
                            <span
                                className="font-semibold hover:underline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/market/${coinItem.id}`);
                                }}>
                                {coinItem.name}
                            </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{coinItem.symbol.toUpperCase()}</TableCell>
                        <TableCell className="font-semibold text-right">
                            ₹{coinItem.current_price.toLocaleString()}
                        </TableCell>
                        <TableCell className={`font-semibold text-right flex justify-end items-center gap-1 ${
                            coinItem.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
                        }`}>
                            <TrendingUp className={`h-4 w-4 ${coinItem.price_change_percentage_24h < 0 && "rotate-180"}`} />
                            {coinItem.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell className="text-right hidden md:table-cell">
                            ₹{coinItem.market_cap.toLocaleString()}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default AssetTable;