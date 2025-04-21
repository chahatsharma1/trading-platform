import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import PaymentDetailsForm from "@/page/Payment Details/PaymentDetailsForm.jsx";
import { useDispatch, useSelector } from "react-redux";
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

    const handleDelete = async () => {
        await dispatch(deletePaymentDetails({ jwt: localStorage.getItem("jwt") }));
        fetchPaymentDetails();
    };

    const handleSuccess = () => {
        setOpen(false);
        fetchPaymentDetails();
    };

    return (
        <div className="min-h-screen py-10 px-4 flex justify-center bg-[#0F172A] text-[#F1F5F9]">
            <div className="w-full max-w-2xl">
                <h1 className="text-2xl font-semibold text-[#F1F5F9] mb-6">Payment Details</h1>

                {paymentDetails ? (
                    <Card className="rounded-xl border border-[#1E293B] bg-[#1E293B] p-6 space-y-4 shadow-md">
                        <div className="text-lg font-semibold text-[#F1F5F9]">
                            {paymentDetails?.bankName}
                            <p>
                                <span className="font-medium text-[#94A3B8] text-sm">
                                    A/c No. : {paymentDetails?.accountNo?.replace(/\d(?=\d{4})/g, '*')}
                                </span>
                            </p>
                        </div>
                        <div className="text-sm text-[#CBD5E1] space-y-1">
                            <p>
                                <span className="font-medium text-[#94A3B8]">A/C Holder</span> : {paymentDetails?.accountHolderName}
                            </p>
                            <p>
                                <span className="font-medium text-[#94A3B8]">IFSC</span> : {paymentDetails?.ifscCode}
                            </p>
                        </div>
                        <Button
                            onClick={handleDelete}
                            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-xl shadow"
                        >
                            Delete Payment Details
                        </Button>
                    </Card>
                ) : (
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="mt-6 w-full bg-[#1E293B] text-[#F1F5F9] border border-[#334155] hover:bg-[#334155] font-medium py-3 rounded-xl shadow-sm transition-colors">
                                + Add Payment Details
                            </Button>
                        </DialogTrigger>
                        <DialogContent
                            className="bg-[#1E293B] text-[#F1F5F9] border border-[#334155]"
                            aria-describedby="paymentDetailsFormDescription"
                        >
                            <DialogHeader>
                                <DialogTitle className="text-[#F1F5F9] text-center">Payment Details</DialogTitle>
                                <DialogDescription/>
                            </DialogHeader>
                            <p id="paymentDetailsFormDescription" className="sr-only">
                                A form to add or update your payment details including bank name, account number, and IFSC code.
                            </p>
                            <PaymentDetailsForm onSuccess={handleSuccess} />
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    );
};

export default PaymentDetails;
