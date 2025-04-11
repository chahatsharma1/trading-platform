import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import AccountVerificationForm from "@/page/Profile/AccountVerificationForm"; // Adjust path as needed

const Profile = () => {
    const [isVerificationOpen, setIsVerificationOpen] = useState(false);

    const user = {
        email: "chahats@gmail.com",
        fullName: "Chahat Sharma",
        dob: "10/01/2003",
        nationality: "Indian",
        address: "Wagholi Pune",
        city: "Pune",
        postcode: "12345",
        country: "India",
        is2StepEnabled: false,
    };

    return (
        <div className="min-h-screen py-10 px-4 flex justify-center">
            <div className="w-full max-w-4xl space-y-6">
                {/* User Info Card */}
                <Card className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Your Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-sm text-slate-700">
                        <p><span className="font-medium text-slate-500">Email</span> : {user.email}</p>
                        <p><span className="font-medium text-slate-500">Address</span> : {user.address}</p>
                        <p><span className="font-medium text-slate-500">Full Name</span> : {user.fullName}</p>
                        <p><span className="font-medium text-slate-500">City</span> : {user.city}</p>
                        <p><span className="font-medium text-slate-500">Date Of Birth</span> : {user.dob}</p>
                        <p><span className="font-medium text-slate-500">Postcode</span> : {user.postcode}</p>
                        <p><span className="font-medium text-slate-500">Nationality</span> : {user.nationality}</p>
                        <p><span className="font-medium text-slate-500">Country</span> : {user.country}</p>
                    </div>
                </Card>

                {/* Two Step Verification Card */}
                <Card className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="text-sm text-slate-800 font-medium flex items-center gap-2">
                        2 Step Verification
                        <Badge variant={user.is2StepEnabled ? "default" : "destructive"} className="text-xs">
                            {user.is2StepEnabled ? "Enabled" : "Disabled"}
                        </Badge>
                    </div>
                    {!user.is2StepEnabled && (
                        <Dialog open={isVerificationOpen} onOpenChange={setIsVerificationOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="rounded-xl px-4 py-2 text-sm font-medium">
                                    Enable Two Step Verification
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Enable Two Step Verification</DialogTitle>
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