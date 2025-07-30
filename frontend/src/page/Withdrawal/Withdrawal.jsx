import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getWithdrawalHistory } from "@/page/State/Withdrawal/Action.js";
import { Landmark, Clock, CheckCircle2, XCircle, History } from "lucide-react";
import { Link } from "react-router-dom";

const Withdrawal = () => {
    const dispatch = useDispatch();
    const { history } = useSelector(store => store.withdrawal);

    useEffect(() => {
        dispatch(getWithdrawalHistory({ jwt: localStorage.getItem("jwt") }));
    }, [dispatch]);

    const StatusBadge = ({ status }) => {
        const lowerCaseStatus = status.toLowerCase();
        const config = {
            success: {
                variant: "default",
                className: "bg-green-500/10 text-green-500 border-green-500/30",
                icon: <CheckCircle2 className="h-3.5 w-3.5" />
            },
            pending: {
                variant: "default",
                className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
                icon: <Clock className="h-3.5 w-3.5" />
            },
            failed: {
                variant: "destructive",
                className: "bg-red-500/10 text-red-500 border-red-500/30",
                icon: <XCircle className="h-3.5 w-3.5" />
            }
        };
        const { variant, className, icon } = config[lowerCaseStatus] || {};
        return (
            <Badge variant={variant} className={`capitalize ${className}`}>
                {icon}
                <span className="ml-1">{status}</span>
            </Badge>
        );
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
                    <h1 className="text-3xl md:text-3xl font-bold tracking-tight text-center">Withdrawal History</h1>
                    <p className="text-muted-foreground mt-2 text-center">A complete record of all your fund withdrawals.</p>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="bg-card/50 backdrop-blur-lg border-border/50">
                        <CardDescription/>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b-border/50 hover:bg-transparent ">
                                        <TableHead>Date & Time</TableHead>
                                        <TableHead className="hidden sm:table-cell">Method</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {history?.length > 0 ? (
                                        history.map((item) => (
                                            <TableRow key={item.id} className="border-b-border/30">
                                                <TableCell>
                                                    {new Date(item.date).toLocaleString('en-IN', {
                                                        day: '2-digit', month: 'short', year: 'numeric',
                                                        hour: '2-digit', minute: '2-digit', hour12: true
                                                    })}
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell">
                                                    <div className="flex items-center gap-2">
                                                        <span>Bank Transfer</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right font-mono">₹ {item.amount.toLocaleString()}</TableCell>
                                                <TableCell className="text-right">
                                                    <StatusBadge status={item.status} />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-48 text-center">
                                                <History className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                                <p className="text-muted-foreground mt-4 mb-4">You have no withdrawal history.</p>
                                                <Button asChild>
                                                    <Link to="/wallet">Go to Wallet</Link>
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

export default Withdrawal;