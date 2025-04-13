import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import AccountVerificationForm from "@/page/Profile/AccountVerificationForm";
import {useSelector} from "react-redux";

const Profile = () => {
    const {auth} = useSelector(store => store);
    const [isVerificationOpen, setIsVerificationOpen] = useState(false);

    const user = {
        email: auth.user?.email,
        fullName: auth.user?.fullName,
        dob: "10/01/2003",
        nationality: "Indian",
        address: "Wagholi Pune",
        city: "Pune",
        postcode: "12345",
        country: "India",
        is2StepEnabled: false,
    };

    return (
        <div className="min-h-screen py-10 px-4 flex justify-center bg-[#0F172A]">
            <div className="w-full max-w-4xl space-y-6">
                {/* User Info Card */}
                <Card className="p-6 bg-[#1E293B] border border-slate-700 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold text-[#F1F5F9] mb-4">Your Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-sm text-[#CBD5E1]">
                        <p><span className="font-medium text-slate-400">Email</span> : {user.email}</p>
                        <p><span className="font-medium text-slate-400">Address</span> : {user.address}</p>
                        <p><span className="font-medium text-slate-400">Full Name</span> : {user.fullName}</p>
                        <p><span className="font-medium text-slate-400">City</span> : {user.city}</p>
                        <p><span className="font-medium text-slate-400">Date Of Birth</span> : {user.dob}</p>
                        <p><span className="font-medium text-slate-400">Postcode</span> : {user.postcode}</p>
                        <p><span className="font-medium text-slate-400">Nationality</span> : {user.nationality}</p>
                        <p><span className="font-medium text-slate-400">Country</span> : {user.country}</p>
                    </div>
                </Card>

                {/* Two Step Verification Card */}
                <Card className="p-6 bg-[#1E293B] border border-slate-700 rounded-xl shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="text-sm text-[#F1F5F9] font-medium flex items-center gap-2">
                        2 Step Verification
                        <Badge variant={user.is2StepEnabled ? "default" : "destructive"} className="text-xs">
                            {user.is2StepEnabled ? "Enabled" : "Disabled"}
                        </Badge>
                    </div>
                    {!user.is2StepEnabled && (
                        <Dialog open={isVerificationOpen} onOpenChange={setIsVerificationOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-xl px-4 py-2 text-sm font-medium transition"
                                >
                                    Enable Two Step Verification
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-[#1E293B] border border-slate-700">
                                <DialogHeader>
                                    <DialogTitle className="text-[#F1F5F9]">Enable Two Step Verification</DialogTitle>
                                </DialogHeader>
                                <AccountVerificationForm closeParentDialog={() => setIsVerificationOpen(false)} />
                            </DialogContent>
                        </Dialog>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Profile;
