import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button.jsx";
import { MessageCircle, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input.jsx";
import {API_BASE_URL} from "@/config/api.js";

const Chatbot = () => {
    const [inputValue, setInputValue] = useState("");
    const [isBotRelease, setIsBotRelease] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef(null);

    const handleKeyPress = async (event) => {
        if (event.key === "Enter" && inputValue.trim()) {
            const userMessage = inputValue.trim();
            if (userMessage.length > 300) return alert("Prompt too long!");

            setInputValue("");
            setMessages(prev => [...prev, { type: "user", text: userMessage }]);
            setIsLoading(true);

            try {
                const res = await fetch(`${API_BASE_URL}/chatbot`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt: userMessage }),
                });

                const data = await res.text();
                setMessages(prev => [...prev, { type: "bot", text: data }]);
            } catch (err) {
                setMessages(prev => [...prev, { type: "bot", text: `Error talking to Gemini: ${err.message}` }]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleBotRelease = () => setIsBotRelease(!isBotRelease);
    const handleChange = (e) => setInputValue(e.target.value);

    const handleButtonClick = () => {
        if (inputValue.trim()) {
            handleKeyPress({ key: "Enter" });
        }
    };

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);


    return (
        <section className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {isBotRelease && (
                <div className="w-[20rem] md:w-[25rem] h-[70vh] bg-[#1E293B] rounded-xl shadow-lg overflow-hidden flex flex-col">
                    <div className="flex justify-between items-center border-b px-6 h-[12%] bg-[#1E293B] text-[#F1F5F9]">
                        <p className="font-medium">Chat Bot</p>
                        <Button onClick={handleBotRelease} variant="ghost" size="icon" className="hover:bg-gray-700 rounded-full">
                            <XIcon className="w-5 h-5 text-white" />
                        </Button>
                    </div>

                    <div ref={chatRef} className="h-[76%] flex flex-col overflow-y-auto gap-1 px-5 py-2 scroll-container">
                        {messages.length === 0 && !isLoading && (
                            <div className="text-sm text-gray-400 mt-2">
                                💡 Try asking:
                                <ul className="list-disc ml-4 mt-1">
                                    <li>What is Bitcoin?</li>
                                    <li>Give me top 5 coins</li>
                                    <li>Should I invest in Ethereum?</li>
                                </ul>
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <div key={i} className={`${msg.type === "bot" ? "self-start" : "self-end"} pb-5 w-auto max-w-[90%]`}>
                                <div className={`px-5 py-2 rounded-lg ${msg.type === "bot" ? "bg-[#3B82F6]" : "bg-[#1E293B] border border-gray-600"} text-white whitespace-pre-line break-words`}>
                                    <p>{msg.text}</p>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="self-start pb-5 w-auto">
                                <div className="px-5 py-2 rounded-lg bg-[#3B82F6] text-white animate-pulse">
                                    <p>Typing...</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="h-[12%] border-t border-gray-700 flex items-center px-5 py-2 gap-2">
                        <Input
                            className="flex-grow h-full bg-[#0F172A] text-white placeholder-gray-400 border-none focus:outline-none focus:ring-0 rounded-md px-3"
                            placeholder="Write Prompt..."
                            onChange={handleChange}
                            value={inputValue}
                            onKeyPress={handleKeyPress}/>
                        <Button
                            onClick={handleButtonClick}
                            className="py-2 px-6 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563eb] transition-all duration-300 ease-in-out flex-shrink-0"
                            aria-label="Send message"
                            disabled={isLoading || !inputValue.trim()}>
                            Enter
                        </Button>
                    </div>
                </div>
            )}
            <Button onClick={handleBotRelease} className="h-[2.75rem] px-4 py-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] text-white shadow-md hover:scale-105 transition-transform duration-300 ease-in-out">
                <MessageCircle className="w-5 h-5 mr-2 stroke-white rotate-[270deg]" />
                <span className="text-base font-medium tracking-wide">Chat Bot</span>
            </Button>
        </section>
    );
};
export default Chatbot;