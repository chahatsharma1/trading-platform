import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "@/page/State/Auth/Action.js";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UserPage = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllUsers(localStorage.getItem("jwt")));
    }, [dispatch]);

    const handleDashboardClick = () => navigate("/admin/dashboard");

    return (
        <div className="relative p-5 lg:p-20 min-h-screen bg-background text-foreground">
            <div className="absolute top-6 right-6 flex gap-2">
                <Button
                    onClick={handleDashboardClick}
                    className="bg-primary hover:bg-primary/80 text-primary-foreground text-xs px-3 py-1 rounded-md"
                >
                    Dashboard
                </Button>
            </div>

            <h1 className="font-bold text-3xl mb-6 text-center">All Customers</h1>

            {loading && !users?.length ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-foreground text-lg font-medium">Loading users...</p>
                </div>
            ) : error ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-destructive text-lg font-medium">Error: {error}</p>
                </div>
            ) : (
                <div className="w-full max-w-5xl mx-auto overflow-x-auto rounded-xl shadow-2xl bg-card">
                    <table className="min-w-full text-sm">
                        <thead className="bg-card/70">
                        <tr className="border-b border-border pointer-events-none">
                            <th className="py-5 px-4 text-left font-semibold tracking-wider text-card-foreground uppercase w-16">
                                ID
                            </th>
                            <th className="px-4 text-left font-semibold tracking-wider text-card-foreground uppercase w-32">
                                Name
                            </th>
                            <th className="px-4 text-left font-semibold tracking-wider text-card-foreground uppercase w-64">
                                Email
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {users
                            ?.filter((user) => user?.userRole === "ROLE_CUSTOMER")
                            .map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b border-border hover:bg-muted transition duration-200">
                                    <td className="py-4 px-4">{user?.id}</td>
                                    <td className="px-4">{user?.fullName}</td>
                                    <td className="px-4">{user?.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserPage;