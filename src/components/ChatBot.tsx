
import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Mic, Send } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string; }[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            sender: 'bot',
            text: 'Welcome to MoStar Command Center. How can I assist you today?'
          }
        ]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage = { sender: 'user', text: newMessage };
    setMessages([...messages, userMessage]);
    setNewMessage('');
    
    // Simulate bot thinking
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "I'm analyzing your request. MoStar's AI systems are designed to provide accurate and timely intelligence.",
        "That's an interesting question. Our geospatial tracking systems can help with global monitoring and analytics.",
        "MoStar Industries uses advanced cybersecurity protocols to ensure data protection and threat neutralization.",
        "Our AI algorithms are constantly evolving to provide better predictive intelligence and data fusion capabilities.",
        "Would you like to learn more about our partnership opportunities or technology solutions?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, { sender: 'bot', text: randomResponse }]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Bubble */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-mostar-blue flex items-center justify-center shadow-neon-blue transition-transform duration-300 hover:scale-110 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <MessageSquare className="text-white h-6 w-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-0 right-0 z-50 w-full sm:w-96 h-[500px] sm:h-[600px] rounded-t-lg sm:rounded-lg glassmorphism shadow-lg flex flex-col border border-white/10 transition-all duration-300 transform ${
        isOpen ? 'translate-y-0 opacity-100 sm:mr-6 sm:mb-6' : 'translate-y-full opacity-0'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-mostar-blue/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mostar-blue to-mostar-cyan flex items-center justify-center">
              <span className="font-display font-bold text-sm text-white">M</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-white">MoStar Command Center</h3>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-mostar-green animate-pulse"></span>
                <span className="text-white/50 text-xs ml-2">Online</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
                message.sender === 'user' 
                  ? 'bg-mostar-blue/20 border border-mostar-blue/30 text-white' 
                  : 'bg-black/30 border border-white/10 text-white'
              }`}>
                {message.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-3 bg-black/30 border border-white/10 text-white">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-mostar-light-blue animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-mostar-light-blue animate-pulse animate-delay-300"></div>
                  <div className="w-2 h-2 rounded-full bg-mostar-light-blue animate-pulse animate-delay-500"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full text-white/70 hover:text-mostar-cyan hover:bg-mostar-cyan/10 transition-colors">
              <Mic className="h-5 w-5" />
            </button>
            
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-mostar-blue/50"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            
            <button 
              onClick={handleSendMessage}
              className={`p-2 rounded-full ${
                newMessage.trim() 
                  ? 'text-mostar-light-blue hover:bg-mostar-blue/10' 
                  : 'text-white/30 cursor-not-allowed'
              } transition-colors`}
              disabled={!newMessage.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          
          <div className="mt-3 flex justify-between items-center">
            <div className="text-xs text-white/40">Powered by MoStar AI</div>
            <div className="flex space-x-2">
              <button className="text-xs text-white/40 hover:text-mostar-light-blue transition-colors">
                Text
              </button>
              <span className="text-white/40">|</span>
              <button className="text-xs text-white/40 hover:text-mostar-light-blue transition-colors">
                Voice
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
