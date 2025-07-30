import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XCircle, Wallet } from "lucide-react";

const PaymentCancel = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
                duration: 0.5,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
    };

    return (
        <div className="relative min-h-screen bg-background text-foreground font-sans flex items-center justify-center p-4">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#2d3748_1px,transparent_1px)] [background-size:32px_32px]"></div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-lg"
            >
                <Card className="bg-card/50 backdrop-blur-lg border-border/50 shadow-xl">
                    <CardContent className="flex flex-col items-center text-center p-8 md:p-12">
                        <motion.div variants={itemVariants}>
                            <XCircle className="h-20 w-20 text-red-500 mb-6" />
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-3xl md:text-4xl font-bold tracking-tight"
                        >
                            Payment Canceled
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-muted-foreground mt-4 max-w-md"
                        >
                            Your transaction was not completed. No charges were made. You can try again or return to your wallet.
                        </motion.p>

                        <motion.div variants={itemVariants} className="mt-8">
                            <Button size="lg" onClick={() => navigate("/wallet")}>
                                <Wallet className="h-4 w-4 mr-2" />
                                Return to Wallet
                            </Button>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default PaymentCancel;