import { useState } from 'react';
import MessageForm from './MessageForm';
import { FaRobot, FaUser } from 'react-icons/fa';

function MainContent() {
  const [view, setView] = useState('new-chat');

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden">
      {/* Fixed header bar */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800 bg-[#060b25] flex-shrink-0">
        <div className="flex items-center gap-2">
          <FaRobot className="text-blue-400 text-xl" />
          <span className="text-white font-bold text-xl">Empathetic AI</span>
        </div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
            <FaUser className="text-white text-sm" />
          </div>
        </div>
      </div>

      {/* Content area - now explicitly constrained to remaining height */}
      <div className="flex-1 overflow-hidden">
        {view === 'new-chat' && (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <div className="text-gray-300 font-bold text-3xl mb-6 z-10">Start a new conversation</div>
            <div className="w-full max-w-5xl">
              <MessageForm />
            </div>
          </div>
        )}
        {view === 'conversation' && (
          <div className="flex flex-col h-full p-6">
            <div className="flex-1 overflow-hidden">
              <MessageForm />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default MainContent;