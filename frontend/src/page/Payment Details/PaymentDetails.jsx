import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import PaymentDetailsForm from "@/page/Payment Details/PaymentDetailsForm.jsx";

const PaymentDetails = () => {
    const [paymentDetails, setPaymentDetails] = useState({
        accountHolder: "Chahat Sharma",
        ifsc: "YESB0000007",
        accountNumber: "************1651",
        bankName: "YES BANK"
    });

    const isEmpty = !paymentDetails || !paymentDetails.accountHolder;

    return (
        <div className="min-h-screen py-10 px-4 flex justify-center">
            <div className="w-full max-w-2xl">
                <h1 className="text-2xl font-semibold text-slate-800 mb-6">Payment Details</h1>

                {!isEmpty ? (
                    <Card className="rounded-xl shadow-md border border-slate-200 bg-white p-6 space-y-4">
                        <div className="text-lg font-semibold text-slate-800">
                            {paymentDetails.bankName}
                            <p>
                                <span className="font-medium text-slate-500 text-sm">A/c No. : {paymentDetails.accountNumber}</span>
                            </p>
                        </div>
                        <div className="text-sm text-slate-700 space-y-1">
                            <p>
                                <span className="font-medium text-slate-500">A/C Holder</span> : {paymentDetails.accountHolder}</p>
                            <p>
                                <span className="font-medium text-slate-500">IFSC</span> : {paymentDetails.ifsc}</p>
                        </div>
                    </Card>
                ) : (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="mt-6 w-full bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 font-medium py-3 rounded-xl shadow-sm transition-colors">
                                + Add Payment Details
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Payment Details</DialogTitle>
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