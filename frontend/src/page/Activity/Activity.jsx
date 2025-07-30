import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowDownLeft, ArrowUpRight, History } from "lucide-react";
import { getAllOrdersForUser } from "@/page/State/Order/Action.js";
import { Link } from "react-router-dom";

const Activity = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector(store => store.order);

    useEffect(() => {
        dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));
    }, [dispatch]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return {
            date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
            time: date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        };
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
                className="w-full max-w-7xl space-y-8 px-4">
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl md:text-3xl font-bold tracking-tight text-center">Transaction History</h1>
                    <p className="text-muted-foreground mt-2 text-center">A complete log of all your trading activities.</p>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="bg-card/50 backdrop-blur-lg border-border/50">
                        <CardDescription/>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b-border/50 hover:bg-transparent">
                                        <TableHead>Asset</TableHead>
                                        <TableHead className="hidden md:table-cell">Type</TableHead>
                                        <TableHead className="text-right">Price</TableHead>
                                        <TableHead className="text-right hidden sm:table-cell">Amount</TableHead>
                                        <TableHead className="text-right hidden md:table-cell">Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders?.length > 0 ? (
                                        orders.map((item) => {
                                            const { date, time } = formatDate(item.timeStamp);
                                            const isBuyOrder = item.orderType === "BUY";
                                            return (
                                                <TableRow key={item.id} className="border-b-border/30">
                                                    <TableCell className="font-medium flex items-center gap-3">
                                                        <Avatar className="h-9 w-9">
                                                            <AvatarImage src={item.orderItem?.coin.image} alt={item.orderItem?.coin.name} />
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-semibold">{item.orderItem?.coin.name}</p>
                                                            <p className="text-xs text-muted-foreground">{item.orderItem?.coin.symbol.toUpperCase()}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        <div className={`flex items-center gap-2 font-medium ${isBuyOrder ? 'text-green-500' : 'text-red-500'}`}>
                                                            {isBuyOrder ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                                                            <span>{item.orderType}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right font-mono">
                                                        ₹{item.orderItem?.price?.toLocaleString() || item.price.toLocaleString()}
                                                    </TableCell>
                                                    <TableCell className="text-right font-mono hidden sm:table-cell">
                                                        {item.orderItem?.quantity?.toLocaleString()}
                                                    </TableCell>
                                                    <TableCell className="text-right text-muted-foreground hidden md:table-cell">
                                                        <div>
                                                            <p>{date}</p>
                                                            <p className="text-xs">{time}</p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-48 text-center">
                                                <History className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                                <p className="text-muted-foreground mt-4 mb-4">You have no transaction history yet.</p>
                                                <Button asChild>
                                                    <Link to="/home">Start Trading</Link>
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

export default Activity;