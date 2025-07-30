import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getUserAssets } from "@/page/State/Asset/Action.js";
import { Wallet, Coins, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Portfolio = () => {
    const dispatch = useDispatch();
    const { userAssets } = useSelector(store => store.asset);

    useEffect(() => {
        dispatch(getUserAssets({ jwt: localStorage.getItem("jwt") }));
    }, [dispatch]);

    const totalInvestedValue = userAssets.reduce((acc, item) => acc + (item.buyPrice * item.quantity), 0);
    const totalCurrentValue = userAssets.reduce((acc, item) => acc + (item.coin.current_price * item.quantity), 0);
    const totalGainLoss = totalCurrentValue - totalInvestedValue;
    const totalGainLossPercentage = totalInvestedValue > 0 ? (totalGainLoss / totalInvestedValue) * 100 : 0;

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.15, duration: 0.4 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
    };

    return (
        <div className="relative min-h-screen bg-background text-foreground font-sans flex justify-center py-10">
            <motion.main
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-7xl space-y-8 px-4">
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl md:text-3xl font-bold tracking-tight text-center">My Portfolio</h1>
                    <p className="text-muted-foreground mt-2 text-center">An overview of your digital asset investments.</p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="bg-card/50 backdrop-blur-lg border-border/50">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Current Value</CardTitle>
                            <Wallet className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹{totalCurrentValue.toLocaleString()}</div>
                            <p className={`text-xs ${totalGainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {totalGainLoss >= 0 ? '+' : ''}₹{totalGainLoss.toLocaleString(undefined, { maximumFractionDigits: 2 })} ({totalGainLossPercentage.toFixed(2)}%) vs invested
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 backdrop-blur-lg border-border/50">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
                            <Landmark className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹{totalInvestedValue.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">The total amount you've spent.</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 backdrop-blur-lg border-border/50">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
                            <Coins className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{userAssets.length}</div>
                            <p className="text-xs text-muted-foreground">Number of unique cryptocurrencies.</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="bg-card/50 backdrop-blur-lg border-border/50">
                        <CardHeader>
                            <CardTitle>Asset Details</CardTitle>
                            <CardDescription>A detailed breakdown of your holdings.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {userAssets.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-b-border/50 hover:bg-transparent">
                                            <TableHead>Asset</TableHead>
                                            <TableHead className="text-right">Quantity</TableHead>
                                            <TableHead className="text-right hidden sm:table-cell">Buy Price</TableHead>
                                            <TableHead className="text-right hidden sm:table-cell">Current Price</TableHead>
                                            <TableHead className="text-right hidden md:table-cell">Total Invested</TableHead>
                                            <TableHead className="text-right">Current Value</TableHead>
                                            <TableHead className="text-right">P/L</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {userAssets.map((item) => {
                                            const currentValue = item.coin.current_price * item.quantity;
                                            const investedValue = item.buyPrice * item.quantity;
                                            const profitLoss = currentValue - investedValue;
                                            return (
                                                <TableRow key={item.id} className="border-b-border/30">
                                                    <TableCell className="font-medium flex items-center gap-3">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={item.coin.image} alt={item.coin.name} />
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-semibold">{item.coin.name}</p>
                                                            <p className="text-xs text-muted-foreground">{item.coin.symbol.toUpperCase()}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">{item.quantity.toLocaleString()}</TableCell>
                                                    <TableCell className="text-right hidden sm:table-cell">₹{item.buyPrice.toLocaleString()}</TableCell>
                                                    <TableCell className="text-right hidden sm:table-cell">₹{item.coin.current_price.toLocaleString()}</TableCell>
                                                    <TableCell className="text-right hidden md:table-cell">₹{investedValue.toLocaleString()}</TableCell>
                                                    <TableCell className="text-right font-semibold">₹{currentValue.toLocaleString()}</TableCell>
                                                    <TableCell className={`text-right font-semibold ${profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                        {profitLoss >= 0 ? '+' : ''}₹{profitLoss.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground mb-4">You don't have any assets yet.</p>
                                    <Button asChild>
                                        <Link to="/home">Start Trading</Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.main>
        </div>
    );
};

export default Portfolio;