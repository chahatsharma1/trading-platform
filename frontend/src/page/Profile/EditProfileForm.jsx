import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import {updateUser} from "@/page/State/Auth/Action.js";

const EditProfileForm = ({ user, onClose }) => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateUser(formData, localStorage.getItem("jwt")));
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {[
                { name: "fullName", label: "Full Name" },
                { name: "dob", label: "Date of Birth" },
                { name: "nationality", label: "Nationality" },
                { name: "address", label: "Address" },
                { name: "city", label: "City" },
                { name: "postcode", label: "Postcode" },
                { name: "country", label: "Country" }
            ].map(field => (
                <div key={field.name}>
                    <Label htmlFor={field.name} className="text-slate-300">{field.label}</Label>
                    <Input
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="bg-slate-800 text-white mt-1"
                        required
                    />
                </div>
            ))}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Save Changes
            </Button>
        </form>
    );
};

export default EditProfileForm;
