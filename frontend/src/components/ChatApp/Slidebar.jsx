import { useState } from 'react';
import { FaPlus, FaChevronLeft, FaEdit, FaTrash, FaEllipsisH } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';

function Sidebar({ onNewChat, onConversationSelect }) {
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sample conversation data
  const conversations = [
    { title: "This is a conversation title", time: "Today", active: true },
    { title: "This is a conversation title", time: "Yesterday" },
    { title: "This is a very super long conversation title that doesn't fit", time: "Previous 7 days" },
    { title: "Another conversation", time: "Today" },
    { title: "Chat about project ideas", time: "Yesterday" },
  ];

  // Group conversations by time period
  const groupedConversations = {
    "Today": conversations.filter(c => c.time === "Today"),
    "Yesterday": conversations.filter(c => c.time === "Yesterday"),
    "Previous 7 days": conversations.filter(c => c.time === "Previous 7 days")
  };

  return (
    <div className="relative h-full">
      {/* Collapsed sidebar button */}
      {isHidden && (
        <button 
          onClick={() => setIsHidden(false)}
          className="absolute left-4 top-4 z-20 bg-[#060b25] border border-gray-500 rounded-full p-2 text-white hover:bg-magenta-500 transition-colors shadow-lg"
        >
          <FaChevronLeft className="rotate-180" />
        </button>
      )}
      
      {/* Main sidebar */}
      <nav 
        className={`bg-[#060b25] border-r border-gray-800 h-full flex flex-col transition-all duration-300 ease-in-out ${
          isHidden ? 'w-0 opacity-0 overflow-hidden' : 'w-72 opacity-100'
        }`}
      >
        <div className="p-3">
          <div className="flex gap-2 mb-4">
            <button 
              onClick={onNewChat}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-magenta-600 to-magenta-500 rounded-lg p-3 text-white hover:from-magenta-500 hover:to-magenta-400 transition-all shadow-md"
            >
              <FaPlus className="text-sm" /> <span className="font-medium">New chat</span>
            </button>
            <button 
              onClick={() => setIsHidden(true)}
              className="bg-[#0e1232] border border-gray-700 rounded-lg p-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <FaChevronLeft />
            </button>
          </div>
        </div>
        
        {/* Conversation list */}
        <div className="flex-1 overflow-hidden hover:overflow-y-auto px-2 pb-2 custom-scrollbar">
          {Object.entries(groupedConversations).map(([group, convs]) => (
            convs.length > 0 ? (
              <div key={group} className="mb-2">
                <h3 className="text-yellow-400 text-xs font-bold px-3 py-2 sticky top-0 bg-[#060b25] z-10">
                  {group.toUpperCase()}
                </h3>
                <ul className="space-y-1">
                  {convs.map((conv, index) => (
                    <li 
                      key={index} 
                      className={`relative group rounded-lg overflow-hidden transition-all ${
                        conv.active ? 'bg-[#0e1232]' : 'hover:bg-[#0e1232]'
                      }`}
                    >
                      <button 
                        onClick={onConversationSelect}
                        className="w-full flex items-center gap-3 p-3 text-gray-200 text-sm hover:text-white"
                      >
                        <FaMessage className="flex-shrink-0 text-gray-400" /> 
                        <span className="truncate">{conv.title}</span>
                      </button>
                      
                      {/* Action buttons that appear on hover */}
                      <div className="absolute right-0 top-0 h-full flex items-center">
                        <div className="w-12 h-full bg-gradient-to-r from-transparent to-[#0e1232] group-hover:opacity-100 opacity-0" />
                        <div className="absolute right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white">
                            <FaEdit size={14} />
                          </button>
                          <button className="p-1.5 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white">
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null
          ))}
        </div>
        
        {/* User profile and menu */}
        <div className="border-t border-gray-800 mt-auto relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-full flex items-center justify-between p-4 text-white hover:bg-[#0e1232] transition-colors"
          >
            <span className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center uppercase font-medium shadow-sm">
                u
              </div>
              <span className="text-sm font-medium">username</span>
            </span>
            <FaEllipsisH className="text-gray-400" />
          </button>
          
          {/* Dropdown menu */}
          {isMenuOpen && (
            <div className="absolute bottom-full left-0 w-full p-2">
              <ul className="bg-[#0e1232] rounded-lg border border-gray-800 shadow-xl overflow-hidden">
                <li>
                  <button className="w-full text-left p-3 text-sm text-gray-200 hover:bg-gray-800 transition-colors">
                    My plan
                  </button>
                </li>
                <li>
                  <button className="w-full text-left p-3 text-sm text-gray-200 hover:bg-gray-800 transition-colors">
                    Custom instructions
                  </button>
                </li>
                <li>
                  <button className="w-full text-left p-3 text-sm text-gray-200 hover:bg-gray-800 transition-colors">
                    Settings & Beta
                  </button>
                </li>
                <li className="border-t border-gray-700">
                  <button className="w-full text-left p-3 text-sm text-gray-200 hover:bg-gray-800 transition-colors">
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      
      {/* Add custom scrollbar style */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}

export default Sidebar;