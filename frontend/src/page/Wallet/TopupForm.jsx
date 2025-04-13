import React from 'react';
import { Input } from "@/components/ui/input.jsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";

const TopupForm = () => {
    const [amount, setAmount] = React.useState('');
    const [paymentMethod, setPaymentMethod] = React.useState("RAZORPAY");

    const handlePaymentMethodChange = (value) => {
        setPaymentMethod(value);
    };

    const handleChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = () => {
        console.log(amount, paymentMethod);
    };

    return (
        <div className="pt-10 space-y-5 bg-[#1E293B] text-[#F1F5F9] p-6 rounded-lg">
            <div>
                <h1 className="pb-1">Enter Amount</h1>
                <Input
                    onChange={handleChange}
                    value={amount}
                    className="py-7 text-lg bg-[#0F172A] text-[#F1F5F9] placeholder:text-slate-400 border border-[#334155] focus:ring-0"
                    placeholder="₹10000"
                />
            </div>

            <div>
                <h1 className="pb-1">Select Payment Method</h1>
                <RadioGroup onValueChange={handlePaymentMethodChange} className="flex gap-4" defaultValue="RAZORPAY">
                    <Label htmlFor="razorpay" className="flex items-center space-x-4 border p-3 px-5 rounded-md cursor-pointer bg-[#0F172A] text-[#F1F5F9] border-[#334155] hover:bg-[#3B82F6]">
                        <RadioGroupItem value="RAZORPAY" id="razorpay" />
                        <div className="w-32 h-10 flex items-center justify-center bg-white rounded-md">
                            <img src="src/assets/razorpay.png" alt="Razorpay" className="h-full object-contain" />
                        </div>
                    </Label>

                    <Label htmlFor="stripe" className="flex items-center space-x-4 border p-3 px-5 rounded-md cursor-pointer bg-[#0F172A] text-[#F1F5F9] border-[#334155] hover:bg-[#3B82F6]">
                        <RadioGroupItem value="STRIPE" id="stripe" />
                        <div className="w-32 h-10 flex items-center justify-center bg-white rounded-md">
                            <img src="src/assets/stripe.png" alt="Stripe" className="h-full object-contain" />
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
