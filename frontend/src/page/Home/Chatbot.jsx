import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { API_BASE_URL } from "@/config/api.js";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import Markdown from 'react-markdown';

const Chatbot = () => {
    const [inputValue, setInputValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const sendMessage = async (messageText) => {
        if (!messageText.trim()) return;

        setMessages(prev => [...prev, { role: "user", text: messageText }]);
        setIsLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/chatbot`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: messageText }),
            });

            if (!res.ok) throw new Error(`API error: ${res.statusText}`);

            const data = await res.text();
            setMessages(prev => [...prev, { role: "bot", text: data }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: "bot", text: `Sorry, I'm having trouble connecting. Please try again later.` }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = () => {
        sendMessage(inputValue);
        setInputValue("");
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSend();
        }
    };

    const suggestedPrompts = [
        "What is Bitcoin?",
        "Top 5 coins by market cap?",
        "Explain Ethereum's smart contracts."
    ];

    const chatboxVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 15 } },
        exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }
    };

    const messageVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={chatboxVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed bottom-20 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[70vh] max-h-[550px] bg-card/80 backdrop-blur-lg border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        <header className="flex items-center justify-between p-4 border-b border-border">
                            <div className="flex items-center gap-3">
                                <Bot className="h-6 w-6 text-primary" />
                                <h3 className="font-semibold">TradeX AI Assistant</h3>
                            </div>
                            <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon" className="rounded-full h-8 w-8">
                                <X className="h-4 w-4" />
                            </Button>
                        </header>
                        <div className="flex-grow p-4 overflow-y-auto space-y-4">
                            {messages.length === 0 && !isLoading && (
                                <div className="text-sm text-muted-foreground space-y-3">
                                    <p>Hi! I'm the TradeX AI. How can I help you today?</p>
                                    <div className="space-y-2">
                                        {suggestedPrompts.map(prompt => (
                                            <button
                                                key={prompt}
                                                onClick={() => sendMessage(prompt)}
                                                className="w-full text-left p-2 rounded-md bg-muted/50 hover:bg-muted text-foreground transition-colors text-xs"
                                            >
                                                {prompt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <AnimatePresence>
                                {messages.map((msg, i) => (
                                    <motion.div key={i} variants={messageVariants} initial="hidden" animate="visible" className={`flex gap-3 items-start ${msg.role === 'user' && 'justify-end'}`}>
                                        {msg.role === 'bot' && <Bot className="h-5 w-5 text-primary flex-shrink-0 mt-1" />}
                                        <div className={`prose prose-sm dark:prose-invert max-w-[85%] rounded-lg p-3 ${msg.role === 'bot' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                                            <Markdown>{msg.text}</Markdown>
                                        </div>
                                        {msg.role === 'user' && <User className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {isLoading && (
                                <motion.div variants={messageVariants} initial="hidden" animate="visible" className="flex gap-3 items-start">
                                    <Bot className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                                    <div className="prose prose-sm dark:prose-invert rounded-lg p-3 bg-muted flex items-center space-x-1.5">
                                        <span className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                        <span className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                        <span className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse"></span>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={chatEndRef} />
                        </div>
                        <footer className="p-4 border-t border-border">
                            <div className="relative">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask about crypto..."
                                    className="pr-12 h-10"
                                />
                                <Button
                                    onClick={handleSend}
                                    disabled={isLoading || !inputValue.trim()}
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8 rounded-full"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring", stiffness: 150 }}>
                <Button onClick={() => setIsOpen(!isOpen)} size="lg" className="rounded-full shadow-lg h-14 w-14 p-0">
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div key="close" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }}>
                                <X className="h-6 w-6" />
                            </motion.div>
                        ) : (
                            <motion.div key="open" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }}>
                                <MessageCircle className="h-6 w-6" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Button>
            </motion.div>
        </>
    );
};

export default Chatbot;