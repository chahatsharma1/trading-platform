import React from "react";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

const SearchCoin = () => {
    const { searchCoinList, loading } = useSelector((state) => state.coin);
    const navigate=useNavigate();

    if (loading) return <div className="text-white p-4">Loading...</div>;
    if (!searchCoinList || searchCoinList.length === 0)
        return <div className="text-white p-4">No results found.</div>;

    return (
        <div className="p-4 text-white bg-[#0F172A] shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-[#F1F5F9]">Search Results</h2>
            <ul className="space-y-2">
                {searchCoinList.map((coin, index) => (
                    <li
                        onClick={() => navigate(`/market/${coin.id}`)}
                        key={index}
                        className="p-3 bg-[#1E293B] rounded-md hover:bg-[#334155] transition duration-300"
                    >
                        <p className="font-semibold text-[#F1F5F9]">
                            {coin.name} ({coin.symbol})
                        </p>
                        <p className="text-sm text-gray-400">ID: {coin.id}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchCoin;
