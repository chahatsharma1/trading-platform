import React, {useEffect} from 'react';
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import PaymentDetailsForm from "@/page/Payment Details/PaymentDetailsForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getPaymentDetails} from "@/page/State/Withdrawal/Action.js";

const PaymentDetails = () => {
    const dispatch=useDispatch();
    const{withdrawal} = useSelector(store => store)

    useEffect(() => {
        dispatch(getPaymentDetails({jwt: localStorage.getItem("jwt")}))
    }, []);

    return (
        <div className="min-h-screen py-10 px-4 flex justify-center bg-[#0F172A] text-[#F1F5F9]">
            <div className="w-full max-w-2xl">
                <h1 className="text-2xl font-semibold text-[#F1F5F9] mb-6">Payment Details</h1>

                {withdrawal.paymentDetails ? (
                    <Card className="rounded-xl border border-[#1E293B] bg-[#1E293B] p-6 space-y-4 shadow-md">
                        <div className="text-lg font-semibold text-[#F1F5F9]">
                            {withdrawal.paymentDetails.bankName}
                            <p>
                                <span className="font-medium text-[#94A3B8] text-sm">
                                    A/c No. : {withdrawal.paymentDetails.accountNo?.replace(/\d(?=\d{4})/g, '*')}
                                </span>
                            </p>
                        </div>
                        <div className="text-sm text-[#CBD5E1] space-y-1">
                            <p>
                                <span className="font-medium text-[#94A3B8]">A/C Holder</span> : {withdrawal.paymentDetails.accountHolderName}
                            </p>
                            <p>
                                <span className="font-medium text-[#94A3B8]">IFSC</span> : {withdrawal.paymentDetails.ifscCode}
                            </p>
                        </div>
                    </Card>
                ) : (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="mt-6 w-full bg-[#1E293B] text-[#F1F5F9] border border-[#334155] hover:bg-[#334155] font-medium py-3 rounded-xl shadow-sm transition-colors">
                                + Add Payment Details
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#1E293B] text-[#F1F5F9] border border-[#334155]">
                            <DialogHeader>
                                <DialogTitle className="text-[#F1F5F9] text-center">Payment Details</DialogTitle>
                            </DialogHeader>
                            <PaymentDetailsForm />
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    );
};

export default PaymentDetails;
