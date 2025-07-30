import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchX } from "lucide-react";

const SearchLoadingSkeleton = () => (
    <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-24" />
                </div>
            </div>
        ))}
    </div>
);

const SearchCoin = () => {
    const { searchCoinList, loading } = useSelector((state) => state.coin);
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1, duration: 0.4 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
    };

    return (
        <div className="relative min-h-screen bg-background text-foreground font-sans flex justify-center py-10">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#2d3748_1px,transparent_1px)] [background-size:32px_32px]"></div>

            <motion.main
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-4xl space-y-8 px-4"
            >
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl md:text-3xl font-bold tracking-tight text-center">Search Results</h1>
                    <p className="text-muted-foreground mt-2 text-center">Explore assets matching your query.</p>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="bg-card/50 backdrop-blur-lg border-border/50">
                        <CardDescription/>
                        <CardContent>
                            {loading ? (
                                <SearchLoadingSkeleton />
                            ) : !searchCoinList || searchCoinList.length === 0 ? (
                                <div className="h-48 text-center flex flex-col items-center justify-center">
                                    <SearchX className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                    <p className="text-muted-foreground mt-4">No results found.</p>
                                    <p className="text-sm text-muted-foreground/80">Try searching for another coin or keyword.</p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-b-border/50 hover:bg-transparent">
                                            <TableHead>Asset</TableHead>
                                            <TableHead className="text-right">Symbol</TableHead>
                                            <TableHead className="text-right hidden sm:table-cell">Market Cap Rank</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {searchCoinList.map((coin) => (
                                            <TableRow
                                                key={coin.id}
                                                onClick={() => navigate(`/market/${coin.id}`)}
                                                className="cursor-pointer border-b-border/30"
                                            >
                                                <TableCell className="font-medium flex items-center gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={coin.large} alt={coin.name} />
                                                    </Avatar>
                                                    <p className="font-semibold">{coin.name}</p>
                                                </TableCell>
                                                <TableCell className="text-right text-muted-foreground">
                                                    {coin.symbol}
                                                </TableCell>
                                                <TableCell className="text-right hidden sm:table-cell">
                                                    {coin.market_cap_rank || 'N/A'}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.main>
        </div>
    );
};

export default SearchCoin;