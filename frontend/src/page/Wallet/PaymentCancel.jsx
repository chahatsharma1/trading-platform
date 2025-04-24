import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-[#F1F5F9]">
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-4">Payment Canceled</h1>
                <p className="text-xl mb-6">We're sorry, but your payment was not successful. You can try again or contact support if you need assistance.</p>
                <button
                    className="bg-[#3B82F6] hover:bg-[#38BDF8] text-[#F1F5F9] px-6 py-2 rounded-lg transition duration-300"
                    onClick={() => navigate("/wallet")}>
                    Go to Wallet
                </button>
            </div>
        </div>
    );
};

export default PaymentCancel;
