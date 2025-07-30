import React from 'react';
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input.jsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";
import { paymentHandler } from "@/page/State/Wallet/Action.js";
import { Banknote, Globe, Loader2 } from 'lucide-react';

const TopupForm = () => {
    const [amount, setAmount] = React.useState('');
    const [paymentMethod, setPaymentMethod] = React.useState("DOMESTIC");
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const dispatch = useDispatch();

    const handlePaymentMethodChange = (value) => {
        setPaymentMethod(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setError("Please enter a valid amount greater than zero.");
            return;
        }

        setError('');
        setIsLoading(true);
        dispatch(paymentHandler(localStorage.getItem("jwt"), amount, paymentMethod));
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } },
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <motion.div variants={itemVariants}>
                <Label htmlFor="amount" className="text-sm font-medium text-muted-foreground">Enter Amount</Label>
                <div className="relative mt-2">
                    <p className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 font-semibold text-lg">₹</p>
                    <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                            if (error) setError('');
                        }}
                        className="h-14 pl-8 text-2xl font-bold bg-background border-border"
                        placeholder="0.00"
                        required
                    />
                </div>
                {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            </motion.div>

            <motion.div variants={itemVariants}>
                <Label className="text-sm font-medium text-muted-foreground">Select Payment Method</Label>
                <RadioGroup
                    defaultValue="DOMESTIC"
                    onValueChange={handlePaymentMethodChange}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2"
                >
                    <Label htmlFor="domestic" className="flex flex-col items-start gap-4 rounded-lg border border-border p-4 cursor-pointer transition-all hover:bg-accent/50 data-[state=checked]:border-primary data-[state=checked]:bg-primary/10">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                                <Banknote className="h-5 w-5" />
                                <span className="font-semibold">Domestic</span>
                            </div>
                            <RadioGroupItem value="DOMESTIC" id="domestic" />
                        </div>
                        <p className="text-xs text-muted-foreground">For payments within India (INR).</p>
                    </Label>
                    <Label htmlFor="international" className="flex flex-col items-start gap-4 rounded-lg border border-border p-4 cursor-pointer transition-all hover:bg-accent/50 data-[state=checked]:border-primary data-[state=checked]:bg-primary/10">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                                <Globe className="h-5 w-5" />
                                <span className="font-semibold">International</span>
                            </div>
                            <RadioGroupItem value="INTERNATIONAL" id="international" />
                        </div>
                        <p className="text-xs text-muted-foreground">For payments outside India (USD).</p>
                    </Label>
                </RadioGroup>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
                <Button type="submit" size="lg" className="w-full font-semibold" disabled={isLoading}>
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Processing...</span>
                        </div>
                    ) : (
                        "Proceed to Add Money"
                    )}
                </Button>
            </motion.div>
        </form>
    );
};

export default TopupForm;