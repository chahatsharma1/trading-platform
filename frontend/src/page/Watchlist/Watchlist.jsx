import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookmarkX, TrendingUp } from "lucide-react";
import { addCoinToWatchlist, getUserWatchlist } from "@/page/State/Watchlist/Action.js";
import { useNavigate, Link } from "react-router-dom";

const Watchlist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items } = useSelector(store => store.watchlist);

    useEffect(() => {
        dispatch(getUserWatchlist(localStorage.getItem("jwt")));
    }, [dispatch]);

    const handleRemoveFromWatchlist = (coinId) => {
        dispatch(addCoinToWatchlist(coinId, localStorage.getItem("jwt")));
    };
    
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
                className="w-full max-w-7xl space-y-8 px-4"
            >
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl md:text-3xl font-bold tracking-tight text-center">My Watchlist</h1>
                    <p className="text-muted-foreground mt-2 text-center">Keep a close eye on your favorite cryptocurrencies.</p>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="bg-card/50 backdrop-blur-lg border-border/50">
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b-border/50 hover:bg-transparent">
                                        <TableHead>Asset</TableHead>
                                        <TableHead className="text-right">Price</TableHead>
                                        <TableHead className="text-right">24h %</TableHead>
                                        <TableHead className="text-right hidden md:table-cell">Market Cap</TableHead>
                                        <TableHead className="text-right"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {items?.length > 0 ? (
                                        items.map((item) => (
                                            <TableRow
                                                key={item.id}
                                                onClick={() => navigate(`/market/${item.id}`)}
                                                className="cursor-pointer border-b-border/30"
                                            >
                                                <TableCell className="font-medium flex items-center gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={item.image} alt={item.name} />
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-semibold">{item.name}</p>
                                                        <p className="text-xs text-muted-foreground">{item.symbol.toUpperCase()}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-semibold text-right">
                                                    ₹{item.current_price.toLocaleString()}
                                                </TableCell>
                                                <TableCell className={`font-semibold text-right flex justify-end items-center gap-1 ${
    item.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
}`}>
                                                    <TrendingUp className={`h-4 w-4 ${item.price_change_percentage_24h < 0 && "rotate-180"}`} />
                                                    {item.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>
                                                <TableCell className="text-right hidden md:table-cell">
                                                    ₹{item.market_cap.toLocaleString()}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRemoveFromWatchlist(item.id);
                                                        }}
                                                        className="group"
                                                    >
                                                        <BookmarkX className="h-5 w-5 text-muted-foreground group-hover:text-red-500 transition-colors" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-48 text-center">
                                                <p className="text-muted-foreground mb-4">Your watchlist is empty.</p>
                                                <Button asChild>
                                                    <Link to="/home">Explore Assets</Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.main>
        </div>
    );
};

export default Watchlist;