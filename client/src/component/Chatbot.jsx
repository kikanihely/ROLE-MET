import React, { useState } from "react";
import axios from "axios";

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setInput("");

        try {
            const res = await axios.post("http://localhost:5000/api/auth/chatbot", {
                message: input,
            });

            const output = res.data.output_value;
            const botReply =
                typeof output === "object" && output.data
                    ? output.data
                    : typeof output === "string"
                        ? output
                        : "No valid response from AI.";

            setMessages([...newMessages, { role: "bot", content: botReply }]);
        } catch (error) {
            setMessages([
                ...newMessages,
                { role: "bot", content: "Something went wrong!" },
            ]);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg flex flex-col overflow-hidden">
                <div className="bg-blue-600 text-white p-4 text-lg font-semibold">
                    Resume Chatbot
                </div>

                <div className="flex-1 p-4 overflow-y-auto h-[400px] space-y-2">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`p-3 rounded-xl max-w-[75%] ${msg.role === "user"
                                ? "bg-blue-100 self-end ml-auto text-right"
                                : "bg-gray-200 self-start mr-auto text-left"
                                }`}
                        >
                            {typeof msg.content === "object"
                                ? JSON.stringify(msg.content, null, 2)
                                : msg.content}
                        </div>
                    ))}

                </div>

                <div className="flex items-center border-t p-3 gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring focus:border-blue-400"
                        placeholder="Ask anything about your resume..."
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;
