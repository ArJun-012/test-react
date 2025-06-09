import React, { useState } from 'react';
// import Chatbot from './chatbot';

 // Assuming Chatbot is in the same directory

const ChatbotLauncher = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen((prev) => !prev);
    };

    return (
        <div>
        {/* Floating Button */}
        <button
            onClick={toggleChat}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg z-50 transition-all duration-300"
            aria-label="Open chat"
        >
            <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
            </svg>
        </button>

        {/* Chatbot Component */}
        {isChatOpen && (
            <div className="fixed bottom-0 right-0 z-40 w-full max-w-sm">
            <Chatbot />
            </div>
        )}
        </div>
    );
};

export default ChatbotLauncher;
