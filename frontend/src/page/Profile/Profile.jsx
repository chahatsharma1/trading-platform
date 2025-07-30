import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { User, Mail, MapPin, Calendar, ShieldCheck, ShieldOff, AlertTriangle, Edit } from "lucide-react";

import AccountVerificationForm from "@/page/Profile/AccountVerificationForm";
import EditProfileForm from "@/page/Profile/EditProfileForm";
import { disableTwoFactorAuth, getUser } from "@/page/State/Auth/Action.js";

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const [isVerificationOpen, setIsVerificationOpen] = useState(false);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);
    const [isDisableDialogOpen, setIsDisableDialogOpen] = useState(false);

    useEffect(() => {
        if (user) {
            const requiredFields = ['dob', 'nationality', 'address', 'city', 'postcode', 'country'];
            const incomplete = requiredFields.some(field => !user[field]);
            setIsProfileIncomplete(incomplete);
        }
    }, [user]);

    const handleDisable2FA = async () => {
        await dispatch(disableTwoFactorAuth(localStorage.getItem("jwt")));
        dispatch(getUser(localStorage.getItem("jwt")));
        setIsDisableDialogOpen(false);
    };
    
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.15, duration: 0.4 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
    };

    const InfoRow = ({ icon, label, value }) => (
        <div className="flex items-start gap-4">
            <div className="text-muted-foreground pt-1">{icon}</div>
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-medium">{value || 'Not Provided'}</p>
            </div>
        </div>
    );

    return (
        <div className="relative min-h-screen bg-background text-foreground font-sans flex justify-center py-10">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#2d3748_1px,transparent_1px)] [background-size:32px_32px]"></div>
            
            <motion.main variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-4xl space-y-8 px-4">
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl md:text-3xl font-bold tracking-tight text-center">My Profile</h1>
                    <p className="text-muted-foreground mt-2 text-center">Manage your personal information and security settings.</p>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="bg-card/50 backdrop-blur-lg border-border/50">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Personal Information</CardTitle>
                            <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm"><Edit className="h-4 w-4 mr-2" /> Edit Profile</Button>
                                </DialogTrigger>
                                <DialogContent className="bg-card border-border">
                                    <DialogHeader>
                                        <DialogTitle>Edit Your Profile</DialogTitle>
                                        <DialogDescription>Make sure to save your changes when you're done.</DialogDescription>
                                    </DialogHeader>
                                    <EditProfileForm user={user} onSuccess={() => setIsEditProfileOpen(false)} />
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                            <InfoRow icon={<User size={20}/>} label="Full Name" value={user?.fullName} />
                            <InfoRow icon={<Mail size={20}/>} label="Email Address" value={user?.email} />
                            <InfoRow icon={<Calendar size={20}/>} label="Date of Birth" value={user?.dob} />
                            <InfoRow icon={<MapPin size={20}/>} label="Address" value={`${user?.address || ''}, ${user?.city || ''} ${user?.postcode || ''}`} />
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="bg-card/50 backdrop-blur-lg border-border/50">
                        <CardHeader>
                            <CardTitle>Security</CardTitle>
                            <CardDescription>Manage your account's security features.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between p-6 pt-0">
                            <div className="flex items-center gap-2">
                                <p className="font-medium">Two-Factor Authentication</p>
                                <Badge variant={user?.twoFactorAuth?.enabled ? "success" : "destructive"}>
                                    {user?.twoFactorAuth?.enabled ? "Enabled" : "Disabled"}
                                </Badge>
                            </div>
                            {user?.twoFactorAuth?.enabled ? (
                                <Dialog open={isDisableDialogOpen} onOpenChange={setIsDisableDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="destructive"><ShieldOff className="h-4 w-4 mr-2" /> Disable</Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-card border-border">
                                        <DialogHeader>
                                            <DialogTitle>Disable Two-Factor Authentication?</DialogTitle>
                                            <DialogDescription>This will reduce your account's security. We highly recommend keeping it enabled.</DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter className="gap-2 sm:gap-0">
                                            <Button variant="outline" onClick={() => setIsDisableDialogOpen(false)}>Cancel</Button>
                                            <Button variant="destructive" onClick={handleDisable2FA}>Confirm Disable</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            ) : (
                                <Dialog open={isVerificationOpen} onOpenChange={setIsVerificationOpen}>
                                    <DialogTrigger asChild>
                                        <Button><ShieldCheck className="h-4 w-4 mr-2" /> Enable</Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-card border-border">
                                        <DialogHeader>
                                            <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
                                            <DialogDescription/>
                                        </DialogHeader>
                                        <AccountVerificationForm onSuccess={() => setIsVerificationOpen(false)} userEmail={user.email}  />
                                    </DialogContent>
                                </Dialog>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                <Dialog open={isProfileIncomplete} onOpenChange={setIsProfileIncomplete}>
                    <DialogContent className="bg-card border-border">
                         <DialogHeader>
                            <div className="flex flex-col items-center text-center gap-4 py-4">
                                <AlertTriangle className="w-16 h-16 text-yellow-500" />
                                <DialogTitle className="text-2xl">Please Complete Your Profile</DialogTitle>
                                <DialogDescription>
                                    Some required fields are missing. Completing your profile ensures full access to all features.
                                </DialogDescription>
                            </div>
                        </DialogHeader>
                        <DialogFooter>
                            <Button className="w-full" onClick={() => {
                                setIsProfileIncomplete(false);
                                setIsEditProfileOpen(true);
                            }}>
                                Complete Profile Now
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </motion.main>
        </div>
    );
};

export default Profile;
