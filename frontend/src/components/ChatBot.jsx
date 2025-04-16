import Sidebar from './ChatApp/Slidebar';
import MainContent from './ChatApp/MainContent';
import { useState } from 'react';

function ChatBot() {
  const handleNewChat = () => {
    // Use state instead of DOM manipulation for better React practices
    setCurrentView('new-chat');
  };

  const handleConversationSelect = () => {
    setCurrentView('conversation');
  };

  // Add this state to manage view transitions
  const [currentView, setCurrentView] = useState('new-chat');

  return (
    <div className="flex h-screen w-screen bg-cover bg-center bg-no-repeat font-sans relative">
      {/* Video background commented out */}
      {/* <video 
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" 
        autoPlay 
        loop 
        muted
      >
        <source src={videoFile} type="video/mp4" />
      </video> */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
      
      <Sidebar 
        onNewChat={handleNewChat} 
        onConversationSelect={handleConversationSelect} 
      />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <MainContent view={currentView} />
      </div>
    </div>
  );
}

export default ChatBot;