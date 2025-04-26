import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, logout } from "@/page/State/Auth/Action.js";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UserPage = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllUsers(localStorage.getItem("jwt")));
    }, [dispatch]);

    const handleDashboardClick = () => {
        navigate("/admin/dashboard");
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="relative p-5 lg:p-20 min-h-screen bg-[#0F172A] text-[#F1F5F9]">
            <div className="absolute top-6 right-6 flex gap-2">
                <Button
                    onClick={handleDashboardClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md">
                    Dashboard
                </Button>
                <Button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md">
                    Logout
                </Button>
            </div>

            <h1 className="font-bold text-3xl mb-6 text-center">All Customers</h1>

            {loading && <p className="text-[#F1F5F9]">Loading users...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            <div className="w-full max-w-5xl mx-auto overflow-x-auto rounded-xl shadow-2xl bg-[#1E293B]">
                <table className="min-w-full text-sm">
                    <thead className="bg-[#273549]">
                    <tr className="hover:bg-transparent pointer-events-none border-b border-[#334155]">
                        <th className="py-5 px-4 text-left font-semibold tracking-wider text-[#F1F5F9] uppercase w-16">
                            ID
                        </th>
                        <th className="px-4 text-left font-semibold tracking-wider text-[#F1F5F9] uppercase w-32">
                            Name
                        </th>
                        <th className="px-4 text-left font-semibold tracking-wider text-[#F1F5F9] uppercase w-64">
                            Email
                        </th>
                        <th className="px-4 text-left font-semibold tracking-wider text-[#F1F5F9] uppercase w-32">
                            Role
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {users
                        ?.filter((user) => user?.userRole === "ROLE_CUSTOMER")
                        .map((user) => (
                            <tr
                                key={user.id}
                                className="border-b border-[#334155] hover:bg-[#334155] transition duration-200"
                            >
                                <td className="py-4 px-4">{user?.id}</td>
                                <td className="px-4">{user?.fullName}</td>
                                <td className="px-4">{user?.email}</td>
                                <td className="px-4">
                                    {user?.userRole === "ROLE_CUSTOMER" ? "Customer" : user?.userRole}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserPage;
