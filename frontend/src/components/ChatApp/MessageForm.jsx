import { useState, useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";

function MessageForm() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { text: message, sender: "user" }]);

    try {
      const res = await fetch("https://7a13-34-169-204-218.ngrok-free.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { text: data.response, sender: "bot" }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, { 
        text: "Sorry, there was an error processing your message. Please try again.", 
        sender: "bot" 
      }]);
    }

    setMessage("");
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Adjust textarea height based on content
  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-5xl mx-auto">
      {/* Chat Messages Container */}
      <div 
        ref={messageContainerRef}
        className="flex-1 overflow-auto overflow-x-auto scrollbar-hide pr-2 pl-2 pb-4 pt-4 mb-4 rounded-lg" 
        style={{ 
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          height: 'calc(100% - 70px)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)'
        }}
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 italic">
            Share your thoughts...
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-3 rounded-lg shadow-md transition-all duration-200 
                  ${msg.sender === "user" 
                    ? "bg-blue-500 text-white max-w-[70%] rounded-tr-none" 
                    : "bg-gray-800 text-white max-w-[75%] rounded-tl-none border border-gray-700"}`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="relative flex-shrink-0 pb-3">
        <textarea
          value={message}
          onChange={handleTextareaChange}
          placeholder="Type your message..."
          className="w-full rounded-xl border border-gray-700 p-4 pr-16 text-white bg-gray-800 resize-none outline-none shadow-lg transition-all"
          style={{ minHeight: "50px", maxHeight: "120px" }}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          className="absolute right-3 bottom-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:from-purple-700 hover:to-blue-700 p-3 text-white transition-colors shadow-lg"
          onClick={sendMessage}
        >
          <FaPaperPlane size={16} />
        </button>
      </div>
    </div>
  );
}

export default MessageForm;