import React, { useState } from 'react';
import data from '@emoji-mart/data'; // Emoji data for the picker
import Picker from '@emoji-mart/react'; // Emoji picker component
import chatBackground from "../../src/assets/community/chat-background.png"; // Import the background image
import Header from "./HomePage/Header";
import Footer from "./HomePage/Footer";

const CommunityChat = () => {
  // Mock user data
  const [user] = useState({ displayName: 'User1' });

  // State for groups, messages, and UI
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([
    { id: 1, name: 'Group 1', lastMessage: 'Hey, how are you?', timestamp: '12:34', icon: null },
    { id: 2, name: 'Group 2', lastMessage: 'Let’s meet tomorrow!', timestamp: '10:22', icon: null },
  ]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupIcon, setNewGroupIcon] = useState(null); // State for group icon
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State for emoji picker
  const [searchQuery, setSearchQuery] = useState(''); // State for search bar

  // Mock messages for the selected group
  const loadMessages = (groupId) => {
    const mockMessages = {
      1: [
        { id: 1, text: 'Hey, how are you?', sender: 'User2', timestamp: '12:30' },
        { id: 2, text: 'I’m good, thanks!', sender: 'User1', timestamp: '12:32' },
      ],
      2: [
        { id: 1, text: 'Let’s meet tomorrow!', sender: 'User3', timestamp: '10:20' },
        { id: 2, text: 'Sounds good!', sender: 'User1', timestamp: '10:22' },
      ],
    };
    return mockMessages[groupId] || [];
  };

  // Handle group selection
  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    setMessages(loadMessages(group.id));
  };

  // Create a new group with an icon
  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;
    const newGroup = {
      id: groups.length + 1,
      name: newGroupName,
      lastMessage: 'Group created',
      timestamp: new Date().toLocaleTimeString(),
      icon: newGroupIcon, // Add the uploaded icon
    };
    setGroups([...groups, newGroup]);
    setNewGroupName('');
    setNewGroupIcon(null);
    setShowCreateGroup(false);
  };

  // Handle group icon upload
  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewGroupIcon(reader.result); // Store the image as a base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Send a message
  const handleSendMessage = (e) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: user.displayName,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');

      // Update the group's last message preview
      const updatedGroups = groups.map((group) =>
        group.id === selectedGroup.id
          ? { ...group, lastMessage: newMessage, timestamp: newMsg.timestamp }
          : group
      );
      setGroups(updatedGroups);
    }
  };

  // Add emoji to the message
  const handleEmojiSelect = (emoji) => {
    setNewMessage(newMessage + emoji.native);
    setShowEmojiPicker(false);
  };

  // Filter groups based on search query
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sign out (simulated)
  const handleSignOut = () => {
    alert('Signed out! (Simulated)');
  };

  return (
    <div className="flex flex-col min-h-screen h-full bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-white font-sans">
      {/* Header */}
      {/* <div className="w-full ">
        <Header />
      </div> */}

      {/* Main Content */}
      <div className="flex flex-1 ">
        {/* Sidebar */}
        <div className="w-16 bg-[#0F0F1A] flex flex-col items-center py-6 space-y-6">
          <div className="text-lg font-bold text-purple-400">Chat</div>
          <button
            onClick={() => setShowCreateGroup(true)}
            className="p-2 rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
            title="New Group"
          >
            <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button
            className="p-2 rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
            title="Settings"
          >
            <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <button
            onClick={handleSignOut}
            className="p-2 rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
            title="Sign Out"
          >
            <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>

        {/* Group List */}
        <div className="w-80 bg-[#0F0F1A] border-r border-[#2A2A3E] overflow-y-auto">
          <div className="p-4 border-b border-[#2A2A3E]">
            <h2 className="text-xl font-semibold text-purple-400">Groups</h2>
            {/* Search Bar */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search groups..."
              className="w-full mt-2 p-2 bg-[#2A2A3E] border border-[#3A3A4E] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            />
          </div>
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className={`p-4 border-b border-[#2A2A3E] cursor-pointer hover:bg-gradient-to-r hover:from-[#2A2A3E] hover:to-[#1A1A2E] transition-all duration-300 flex items-center gap-4 ${
                selectedGroup?.id === group.id ? 'bg-gradient-to-r from-[#2A2A3E] to-[#1A1A2E]' : ''
              }`}
              onClick={() => handleSelectGroup(group)}
            >
              {/* Group Icon with Image or Fallback */}
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold overflow-hidden">
                {group.icon ? (
                  <img src={group.icon} alt={group.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    {group.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-purple-300">{group.name}</div>
                <div className="text-sm text-gray-400 truncate">{group.lastMessage}</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs text-gray-500">{group.timestamp}</div>
                <div className="w-3 h-3 bg-green-400 rounded-full mt-1 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Section with Background Image */}
        <div
          className="flex-1 flex flex-col"
          style={{
            backgroundImage: `url(${chatBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {selectedGroup ? (
            <>
              <div className="bg-[#0F0F1A] p-4 border-b border-[#2A2A3E] flex items-center gap-4">
                {/* Group Icon in Chat Header */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold overflow-hidden">
                  {selectedGroup.icon ? (
                    <img src={selectedGroup.icon} alt={selectedGroup.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                      {selectedGroup.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-purple-400">{selectedGroup.name}</h2>
              </div>
              <div className="flex-1 p-6 bg-[#1A1A2E] bg-opacity-80 overflow-y-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-4 text-sm animate-slide-in ${
                      msg.sender === user.displayName ? 'text-right' : 'text-left'
                    }`}
                  >
                    <span
                      className={`inline-block p-3 rounded-xl max-w-xs shadow-lg ${
                        msg.sender === user.displayName
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                          : 'bg-[#2A2A3E] bg-opacity-90'
                      }`}
                    >
                      <span className="font-bold text-purple-200">{msg.sender}: </span>
                      <span>{msg.text}</span>
                    </span>
                    <div className="text-gray-500 text-xs mt-1">{msg.timestamp}</div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-[#2A2A3E] bg-[#0F0F1A] flex items-center gap-3 relative">
                {/* Emoji Picker Button */}
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                {showEmojiPicker && (
                  <div className="absolute bottom-16 left-4">
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
                  </div>
                )}
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleSendMessage}
                  placeholder="Type a message..."
                  className="flex-1 p-3 bg-[#2A2A3E] border border-[#3A3A4E] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                />
                <button
                  onClick={() => handleSendMessage({ key: 'Enter' })}
                  className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 bg-[#1A1A2E] bg-opacity-80">
              Select a group to start chatting
            </div>
          )}
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
          <div className="bg-[#0F0F1A] p-6 rounded-xl w-96 border border-[#2A2A3E]">
            <h3 className="text-lg font-semibold text-purple-400 mb-4">Create New Group</h3>
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Enter group name"
              className="w-full p-3 bg-[#2A2A3E] border border-[#3A3A4E] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 mb-4"
            />
            {/* Group Icon Upload */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Group Icon (Optional)</label>
              <input
                type="file"
                accept="image/*"  
                onChange={handleIconUpload}
                className="w-full p-2 bg-[#2A2A3E] border border-[#3A3A4E] rounded-xl text-white"
              />
              {newGroupIcon && (
                <img src={newGroupIcon} alt="Preview" className="mt-2 w-16 h-16 rounded-full object-cover" />
              )}
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCreateGroup(false)}
                className="px-4 py-2 bg-[#2A2A3E] rounded-lg text-gray-300 hover:bg-[#3A3A4E] transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default CommunityChat;