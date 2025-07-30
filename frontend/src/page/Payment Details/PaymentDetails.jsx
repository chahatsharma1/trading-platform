import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button.jsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.jsx";
import { Landmark, Trash2, PlusCircle, ShieldCheck } from "lucide-react";
import PaymentDetailsForm from "@/page/Payment Details/PaymentDetailsForm.jsx";
import { deletePaymentDetails, getPaymentDetails } from "@/page/State/Withdrawal/Action.js";

const PaymentDetails = () => {
    const dispatch = useDispatch();
    const { paymentDetails } = useSelector(store => store.withdrawal);
    const [open, setOpen] = useState(false);

    const fetchPaymentDetails = () => {
        dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
    };

    useEffect(() => {
        fetchPaymentDetails();
    }, []);

    const handleDelete = () => {
        dispatch(deletePaymentDetails({ jwt: localStorage.getItem("jwt") }));
    };

    const handleSuccess = () => {
        setOpen(false);
        fetchPaymentDetails();
    };
    
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
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#2d3748_1px,transparent_1px)] [background-size:32px_32px]"></div>

            <motion.main
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-2xl space-y-8 px-4">
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl md:text-3xl font-bold tracking-tight text-center">Payment Details</h1>
                    <p className="text-muted-foreground mt-2 text-center">Manage your linked bank account for withdrawals.</p>
                </motion.div>

                <motion.div variants={itemVariants}>
                    {paymentDetails ? (
                        <Card className="bg-gradient-to-br from-primary/10 via-card/50 to-card/50 backdrop-blur-lg border-border/50 overflow-hidden">
                            <CardHeader className="flex flex-row items-start justify-between">
                                <div>
                                    <CardTitle className="text-xl">{paymentDetails?.bankName}</CardTitle>
                                    <CardDescription/>
                                </div>
                                <Landmark className="h-8 w-8 text-muted-foreground" />
                            </CardHeader>
                            <CardContent className="space-y-6 pt-4">
                                <div className="font-mono text-2xl tracking-widest text-foreground">
                                    {paymentDetails?.accountNo?.replace(/\d(?=\d{4})/g, '•')}
                                </div>
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-xs text-muted-foreground">Account Holder</p>
                                        <p className="font-medium">{paymentDetails?.accountHolderName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">IFSC Code</p>
                                        <p className="font-medium">{paymentDetails?.ifscCode}</p>
                                    </div>
                                </div>
                            </CardContent>
                            <div className="p-6 pt-0">
                                <Button
                                    onClick={handleDelete}
                                    variant="destructive"
                                    className="w-full"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Account Details
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        <Dialog open={open} onOpenChange={setOpen}>
                            <Card className="bg-card/50 backdrop-blur-lg border-2 border-dashed border-border/50 text-center p-8">
                                <CardHeader>
                                    <ShieldCheck className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                    <CardTitle>No Payment Details Found</CardTitle>
                                    <CardDescription>
                                        Link your bank account to start withdrawing your funds securely.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <DialogTrigger asChild>
                                        <Button size="lg">
                                            <PlusCircle className="h-5 w-5 mr-2" />
                                            Add Bank Account
                                        </Button>
                                    </DialogTrigger>
                                </CardContent>
                            </Card>
                            <DialogContent className="bg-card border-border">
                                <DialogHeader>
                                    <DialogTitle>Add Your Bank Account</DialogTitle>
                                    <CardDescription>
                                        Please ensure all details are correct.
                                    </CardDescription>
                                </DialogHeader>
                                <PaymentDetailsForm onSuccess={handleSuccess} />
                            </DialogContent>
                        </Dialog>
                    )}
                </motion.div>
            </motion.main>
        </div>
    );
};

export default PaymentDetails;