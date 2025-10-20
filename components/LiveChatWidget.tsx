import React, { useState, useEffect, useRef } from 'react';

const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'agent';
}

const LiveChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hi there! 👋 How can we help you plan your adventure today?", sender: 'agent' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        const userMessage: Message = {
            id: Date.now(),
            text: inputValue,
            sender: 'user'
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInputValue('');

        setTimeout(() => {
            const agentResponse: Message = {
                id: Date.now() + 1,
                text: "Thanks for your message! An agent will be with you shortly to discuss your query.",
                sender: 'agent'
            };
            setMessages(prevMessages => [...prevMessages, agentResponse]);
        }, 1500);
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 pointer-events-none">
            {/* Chat Window */}
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <div className="w-80 h-96 bg-brand-base rounded-lg shadow-2xl flex flex-col">
                    {/* Header */}
                    <div className="bg-brand-dark p-4 flex justify-between items-center rounded-t-lg">
                        <h3 className="text-white font-bold">Chat with an expert</h3>
                        <button onClick={toggleOpen} className="text-white hover:text-brand-accent">
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-lg px-3 py-2 ${msg.sender === 'user' ? 'bg-brand-accent text-brand-dark' : 'bg-brand-dark text-white'}`}>
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-700">
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 bg-brand-dark border border-gray-600 rounded-md py-2 px-3 text-white text-sm focus:ring-brand-accent focus:border-brand-accent"
                            />
                            <button type="submit" className="bg-brand-accent text-brand-dark p-2 rounded-md font-bold hover:bg-lime-400">
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={toggleOpen}
                className={`transition-all duration-300 ease-in-out mt-4 float-right bg-brand-accent text-brand-dark rounded-full p-4 shadow-lg hover:bg-lime-400 transform hover:scale-110 pointer-events-auto ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
                aria-label="Open chat"
            >
                <ChatIcon />
            </button>
        </div>
    );
};

export default LiveChatWidget;