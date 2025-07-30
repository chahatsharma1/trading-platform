import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser } from "@/page/State/Auth/Action.js";
import { Loader2 } from "lucide-react";

const EditProfileForm = ({ user, onSuccess }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        fullName: user.fullName || '',
        dob: user.dob || '',
        nationality: user.nationality || '',
        address: user.address || '',
        city: user.city || '',
        postcode: user.postcode || '',
        country: user.country || ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        for (const key in formData) {
            if (!formData[key].trim()) {
                setError("All fields are required.");
                return;
            }
        }
        setError('');
        setIsLoading(true);
        await dispatch(updateUser(formData, localStorage.getItem("jwt")));
        setIsLoading(false);
        if (onSuccess) onSuccess();
    };

    const formFields = [
        { name: "fullName", label: "Full Name", placeholder: "Enter your full name" },
        { name: "dob", label: "Date of Birth", type: "date" },
        { name: "nationality", label: "Nationality", placeholder: "e.g., Indian" },
        { name: "country", label: "Country", placeholder: "e.g., India" },
        { name: "address", label: "Address", placeholder: "Enter your street address" },
        { name: "city", label: "City", placeholder: "e.g., Kanpur" },
        { name: "postcode", label: "Postcode", placeholder: "e.g., 208001" },
    ];

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } },
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <motion.div
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5"
            >
                {formFields.map(field => (
                    <motion.div variants={itemVariants} key={field.name}>
                        <Label htmlFor={field.name}>{field.label}</Label>
                        <Input
                            id={field.name}
                            name={field.name}
                            type={field.type || "text"}
                            value={formData[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder || ''}
                            className="mt-2 h-12 bg-background border-border"
                            required
                        />
                    </motion.div>
                ))}
            </motion.div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <motion.div variants={itemVariants} className="pt-4">
                <Button type="submit" size="lg" className="w-full font-semibold" disabled={isLoading}>
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Saving Changes...</span>
                        </div>
                    ) : (
                        "Save Changes"
                    )}
                </Button>
            </motion.div>
        </form>
    );
};

export default EditProfileForm;