import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowDownLeft, ArrowUpRight, Copy, History, Plus, Minus, Send } from "lucide-react";

import TopupForm from "@/page/Wallet/TopupForm.jsx";
import WithdrawalForm from "@/page/Withdrawal/WithdrawalForm.jsx";
import TransferForm from "@/page/Wallet/TransferForm.jsx";
import { depositMoney, getUserWallet, getWalletTransactions } from "@/page/State/Wallet/Action.js";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Wallet = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userWallet, transactions } = useSelector(store => store.wallet);
    const query = useQuery();
    const orderId = query.get("order_id");

    const handleFetchUserWallet = () => dispatch(getUserWallet(localStorage.getItem("jwt")));
    const handleFetchUserWalletTransaction = () => dispatch(getWalletTransactions({ jwt: localStorage.getItem("jwt") }));

    useEffect(() => {
        handleFetchUserWallet();
        handleFetchUserWalletTransaction();
    }, [dispatch]);

    useEffect(() => {
        if (orderId) {
            dispatch(depositMoney({ jwt: localStorage.getItem("jwt"), orderId, navigate }));
        }
    }, [dispatch, orderId, navigate]);

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(userWallet.id);
    };

    const actionDialogs = [
        { icon: <Plus />, label: "Add Money", content: <TopupForm /> },
        { icon: <Minus />, label: "Withdraw", content: <WithdrawalForm /> },
        { icon: <Send />, label: "Transfer", content: <TransferForm /> }
    ];

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.15, duration: 0.4 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
    };

    const TransactionRow = ({ type, amount }) => {
        const isCredit = ["DEPOSIT", "ADD_MONEY", "SELL_ASSET"].includes(type);
        return (
            <div className={`flex items-center gap-2 font-medium ${isCredit ? 'text-green-500' : 'text-red-500'}`}>
                {isCredit ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                <span>{type?.replace(/_/g, ' ')}</span>
            </div>
        );
    };

    return (
        <div className="relative min-h-screen bg-background text-foreground font-sans flex justify-center py-10">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#2d3748_1px,transparent_1px)] [background-size:32px_32px]"></div>

            <motion.main variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-7xl space-y-8 px-4">
                <motion.div variants={itemVariants}>
                    <Card className="bg-card/50 backdrop-blur-lg border-border/50">
                        <CardHeader>
                            <CardTitle className="text-2xl">My Wallet</CardTitle>
                            {userWallet?.id && (
                                <CardDescription className="flex items-center gap-2 cursor-pointer" onClick={handleCopyToClipboard}>
                                    ID: {userWallet.id} <Copy className="h-3 w-3" />
                                </CardDescription>
                            )}
                        </CardHeader>
                        <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div>
                                <p className="text-sm text-muted-foreground">Available Balance</p>
                                <p className="text-5xl font-bold mt-1">₹{userWallet?.balance?.toLocaleString() || '0.00'}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                {actionDialogs.map((action, idx) => (
                                    <Dialog key={idx}>
                                        <DialogTrigger asChild>
                                            <Button>
                                                {action.icon} <span className="ml-2 hidden sm:inline">{action.label}</span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-card border-border">
                                            <DialogHeader>
                                                <DialogTitle>{action.label}</DialogTitle>
                                            </DialogHeader>
                                            {action.content}
                                        </DialogContent>
                                    </Dialog>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="bg-card/50 backdrop-blur-lg border-border/50">
                        <CardHeader>
                            <CardTitle>Transaction History</CardTitle>
                            <CardDescription>A record of all your wallet activities.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b-border/50 hover:bg-transparent">
                                        <TableHead>Type</TableHead>
                                        <TableHead className="hidden sm:table-cell">Date</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions?.length > 0 ? (
                                        transactions.map((item) => (
                                            <TableRow key={item.id} className="border-b-border/30">
                                                <TableCell>
                                                    <TransactionRow type={item.walletTransactionType} amount={item.amount} />
                                                </TableCell>
                                                <TableCell className="text-muted-foreground hidden sm:table-cell">
                                                    {new Date(item.localDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </TableCell>
                                                <TableCell className="text-right font-mono">
                                                    ₹{item.amount.toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} className="h-48 text-center">
                                                <History className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                                <p className="text-muted-foreground mt-4 mb-4">You have no transaction history yet.</p>
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

export default Wallet;