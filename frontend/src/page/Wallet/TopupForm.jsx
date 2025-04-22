import React from 'react';
import { Input } from "@/components/ui/input.jsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useDispatch } from "react-redux";
import { paymentHandler } from "@/page/State/Wallet/Action.js";

const TopupForm = () => {
    const [amount, setAmount] = React.useState('');
    const [paymentMethod, setPaymentMethod] = React.useState("DOMESTIC");
    const dispatch = useDispatch();

    const handlePaymentMethodChange = (value) => {
        setPaymentMethod(value);
    };

    const handleChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = () => {
        dispatch(paymentHandler(localStorage.getItem("jwt"), amount, paymentMethod));
    };

    return (
        <div className="pt-10 space-y-5 bg-[#1E293B] text-[#F1F5F9] p-6 rounded-lg w-full max-w-[550px]">
            <div>
                <h1 className="pb-1">Enter Amount</h1>
                <Input
                    onClick={(e) => e.stopPropagation()}
                    onChange={handleChange}
                    value={amount}
                    className="py-7 text-lg bg-[#0F172A] text-[#F1F5F9] placeholder:text-slate-400 border border-[#334155] focus:ring-0"
                    placeholder="Enter Amount"
                />
            </div>

            <div>
                <h1 className="pb-1">Select Payment Type</h1>
                <RadioGroup onValueChange={handlePaymentMethodChange} className="flex gap-4 w-full" defaultValue="DOMESTIC">
                    <Label
                        htmlFor="domestic"
                        className="flex items-center space-x-4 border p-3 px-5 rounded-md cursor-pointer bg-[#334155] text-[#F1F5F9] border-[#334155] hover:bg-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <RadioGroupItem value="DOMESTIC" id="domestic" />
                        <div className="flex items-center gap-3">
                            <div className="w-20 h-10 flex items-center justify-center">
                                <img src="/stripe.png" alt="Stripe" className="h-full object-contain" />
                            </div>
                            <span>(INR)</span>
                        </div>
                    </Label>

                    <Label
                        htmlFor="international"
                        className="flex items-center space-x-4 border p-3 px-5 rounded-md cursor-pointer bg-[#334155] text-[#F1F5F9] border-[#334155] hover:bg-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <RadioGroupItem value="INTERNATIONAL" id="international" />
                        <div className="flex items-center gap-2">
                            <div className="w-20 h-10 flex items-center justify-center">
                                <img src="/stripe.png" alt="Stripe" className="h-full object-contain" />
                            </div>
                            <span>(USD)</span>
                        </div>
                    </Label>
                </RadioGroup>
            </div>

            <Button
                onClick={handleSubmit}
                className="w-full py-7 mt-4 bg-[#3B82F6] text-white font-semibold rounded-lg hover:bg-[#2563EB]">
                Submit
            </Button>
        </div>
    );
};


export default TopupForm;
