import React from 'react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-[#F1F5F9]">
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
                <button
                    className="bg-[#3B82F6] hover:bg-[#38BDF8] text-[#F1F5F9] px-6 py-2 rounded-lg transition duration-300"
                    onClick={() => window.location.href = '/'}>
                    Go Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
