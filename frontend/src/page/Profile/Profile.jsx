import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AccountVerificationForm from "@/page/Profile/AccountVerificationForm";
import EditProfileForm from "@/page/Profile/EditProfileForm";
import { useSelector } from "react-redux";

const Profile = () => {
    const {user} = useSelector(store => store.auth);
    const [isVerificationOpen, setIsVerificationOpen] = useState(false);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);

    useEffect(() => {
        const requiredFields = ['dob', 'nationality', 'address', 'city', 'postcode', 'country'];
        const incompleteFields = requiredFields.filter(field => !user[field]);

        if (incompleteFields.length > 0) {
            setIsProfileIncomplete(true);
        } else {
            setIsProfileIncomplete(false);
        }
    }, [user]);

    return (
        <div className="min-h-screen py-10 px-4 flex justify-center bg-[#0F172A]">
            <div className="w-full max-w-4xl space-y-6">
                {/* User Info Card */}
                <Card className="p-6 bg-[#1E293B] border border-slate-700 rounded-xl shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-[#F1F5F9]">Your Information</h2>
                        <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white text-sm px-4 py-2 rounded-xl">
                                    Edit Profile
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-[#1E293B] border border-slate-700">
                                <DialogHeader>
                                    <DialogTitle className="text-[#F1F5F9]">Edit Your Profile</DialogTitle>
                                </DialogHeader>
                                <EditProfileForm user={user} onClose={() => setIsEditProfileOpen(false)} />
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-sm text-[#CBD5E1]">
                        <p><span className="font-medium text-slate-400">Email</span> : {user.email}</p>
                        <p><span className="font-medium text-slate-400">Address</span> : {user.address || 'Not Provided'}</p>
                        <p><span className="font-medium text-slate-400">Full Name</span> : {user.fullName}</p>
                        <p><span className="font-medium text-slate-400">City</span> : {user.city || 'Not Provided'}</p>
                        <p><span className="font-medium text-slate-400">Date Of Birth</span> : {user.dob || 'Not Provided'}</p>
                        <p><span className="font-medium text-slate-400">Postcode</span> : {user.postcode || 'Not Provided'}</p>
                        <p><span className="font-medium text-slate-400">Nationality</span> : {user.nationality || 'Not Provided'}</p>
                        <p><span className="font-medium text-slate-400">Country</span> : {user.country || 'Not Provided'}</p>
                    </div>
                </Card>

                <Card className="p-6 bg-[#1E293B] border border-slate-700 rounded-xl shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="text-sm text-[#F1F5F9] font-medium flex items-center gap-2">
                        2 Step Verification
                        <Badge variant={user?.twoFactorAuth.enabled ? "default" : "destructive"} className="text-xs">
                            {user?.twoFactorAuth.enabled ? "Enabled" : "Disabled"}
                        </Badge>
                    </div>
                    {!user?.twoFactorAuth.enabled && (
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

            {/* Profile Incomplete Dialog */}
            {isProfileIncomplete && (
                <Dialog open={isProfileIncomplete} onOpenChange={setIsProfileIncomplete}>
                    <DialogContent className="bg-[#1E293B] border border-slate-700">
                        <DialogHeader>
                            <DialogTitle className="text-[#F1F5F9]">Please Complete Your Profile</DialogTitle>
                        </DialogHeader>
                        <div className="text-[#F1F5F9]">
                            <p>Some required fields are missing in your profile. Please complete your profile to continue.</p>
                        </div>
                        <DialogTrigger asChild>
                            <Button
                                variant="ghost"
                                className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-xl px-4 py-2 text-sm font-medium transition"
                                onClick={() => setIsEditProfileOpen(true)}
                            >
                                Complete Profile
                            </Button>
                        </DialogTrigger>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default Profile;
