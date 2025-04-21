import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import AccountVerificationForm from "@/page/Profile/AccountVerificationForm";
import EditProfileForm from "@/page/Profile/EditProfileForm";
import { useDispatch, useSelector } from "react-redux";
import {disableTwoFactorAuth} from "@/page/State/Auth/Action.js";

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const [isVerificationOpen, setIsVerificationOpen] = useState(false);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);
    const [isDisableDialogOpen, setIsDisableDialogOpen] = useState(false);

    useEffect(() => {
        const requiredFields = ['dob', 'nationality', 'address', 'city', 'postcode', 'country'];
        const incompleteFields = requiredFields.filter(field => !user[field]);
        setIsProfileIncomplete(incompleteFields.length > 0);
    }, [user]);

    const handleDisable = () => {
        dispatch(disableTwoFactorAuth(localStorage.getItem("jwt")));
        setIsDisableDialogOpen(false);
    };

    return (
        <div className="min-h-screen py-10 px-4 flex justify-center bg-[#0F172A]">
            <div className="w-full max-w-4xl space-y-6">

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
                                    <DialogDescription/>
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
                        <Badge variant={user?.twoFactorAuth.enabled ? "success" : "destructive"} className="text-xs">
                            {user?.twoFactorAuth.enabled ? "Enabled" : "Disabled"}
                        </Badge>
                    </div>

                    {user?.twoFactorAuth.enabled ? (
                        <Dialog open={isDisableDialogOpen} onOpenChange={setIsDisableDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-2 text-sm font-medium transition"
                                >
                                    Disable Two Step Verification
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-[#1E293B] border border-slate-700">
                                <DialogHeader>
                                    <DialogTitle className="text-[#F1F5F9]">Disable Two Step Verification</DialogTitle>
                                    <DialogDescription className="text-[#CBD5E1]">
                                        Are you sure you want to disable two-step verification? This may lower your account security.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex justify-end gap-4 mt-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsDisableDialogOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                        onClick={handleDisable}
                                    >
                                        Confirm Disable
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ) : (
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
                                    <DialogDescription/>
                                </DialogHeader>
                                <AccountVerificationForm
                                    closeParentDialog={() => setIsVerificationOpen(false)}
                                    userEmail={user.email}
                                />
                            </DialogContent>
                        </Dialog>
                    )}
                </Card>
            </div>

            {isProfileIncomplete && (
                <Dialog open={isProfileIncomplete} onOpenChange={setIsProfileIncomplete}>
                    <DialogContent className="bg-[#1E293B] border border-slate-700">
                        <DialogHeader>
                            <DialogTitle className="text-[#F1F5F9]">Please Complete Your Profile</DialogTitle>
                        </DialogHeader>
                        <p className="text-[#F1F5F9]">
                            Some required fields are missing. Kindly complete your profile to ensure full access to features.
                        </p>
                        <DialogTrigger asChild>
                            <Button
                                variant="ghost"
                                className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white rounded-xl px-4 py-2 text-sm font-medium transition"
                                onClick={() => {
                                    setIsEditProfileOpen(true);
                                    setIsProfileIncomplete(false);
                                }}
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
