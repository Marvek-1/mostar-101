
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Mic, Send, Zap, Network, Cpu, Satellite, Atom } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import AIPersonalitySelector, { AIPersonality } from './AIPersonalitySelector';
import QuantumProcessor from './QuantumProcessor';
import NeuralPatterns from './NeuralPatterns';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [aiPersonality, setAIPersonality] = useState<AIPersonality>('analytical');
  const [isQuantumProcessing, setIsQuantumProcessing] = useState(false);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const apiBaseUrl = 'https://www.mo-overlord.tech/';

  // Initialize speech recognition if supported
  const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognitionAPI ? new SpeechRecognitionAPI() : null;
  
  if (recognition) {
    recognition.continuous = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setNewMessage(transcript);
      setIsListening(false);
    };
    
    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: "Voice Recognition Error",
        description: "Could not process your voice. Please try again or type your message.",
        variant: "destructive"
      });
    };
  }

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setIsQuantumProcessing(true);
      
      // Fetch initial greeting from MoStar AI API
      fetchFromAI('/ai-assistant', 'GET')
        .then(data => {
          setTimeout(() => {
            const personalityGreetings = {
              analytical: "Welcome to MoStar Command Center. I am the core intelligence driving all operations. How can I assist you today?",
              creative: "Welcome to MoStar's creative hub! I'm your AI companion, ready to explore innovative ideas together. What shall we create today?",
              tactical: "MoStar tactical interface online. Security protocols active. I'm ready to assist with strategic operations. What's your objective?",
              galactic: "Greetings from the MoStar Galactic Intelligence Network. My quantum processors are synchronized across dimensions. How may I enhance your reality today?"
            };
            
            const greeting = data?.InitialResponse?.ForOthers?.AskForName || personalityGreetings[aiPersonality];
              
            setMessages([
              {
                sender: 'bot',
                text: greeting,
                timestamp: new Date()
              }
            ]);
            setIsTyping(false);
            setIsQuantumProcessing(false);
          }, 2000);
        })
        .catch(error => {
          console.error('Error fetching AI response:', error);
          
          // Fallback message if API fails
          setTimeout(() => {
            const personalityGreetings = {
              analytical: "Welcome to MoStar Command Center. I am the core intelligence driving all operations. How can I assist you today?",
              creative: "Welcome to MoStar's creative hub! I'm your AI companion, ready to explore innovative ideas together. What shall we create today?",
              tactical: "MoStar tactical interface online. Security protocols active. I'm ready to assist with strategic operations. What's your objective?",
              galactic: "Greetings from the MoStar Galactic Intelligence Network. My quantum processors are synchronized across dimensions. How may I enhance your reality today?"
            };
            
            setMessages([
              {
                sender: 'bot',
                text: personalityGreetings[aiPersonality],
                timestamp: new Date()
              }
            ]);
            setIsTyping(false);
            setIsQuantumProcessing(false);
          }, 2000);
        });
    }
  }, [isOpen, messages.length, aiPersonality]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const toggleListening = () => {
    if (!recognition) {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice recognition. Please type your message instead.",
        variant: "destructive"
      });
      return;
    }
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognition.start();
      toast({
        title: "Listening...",
        description: "Speak clearly into your microphone.",
      });
    }
  };

  const fetchFromAI = async (endpoint: string, method: string = 'POST', body?: any) => {
    try {
      const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error with MoStar AI (${endpoint}):`, error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const userMessage: ChatMessage = { 
      sender: 'user', 
      text: newMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    setIsQuantumProcessing(true);
    
    try {
      // Add personality to the prompt
      const personalityContext = {
        analytical: "Respond as an analytical AI focused on data and logic. Provide detailed, fact-based information.",
        creative: "Respond as a creative AI focused on innovation. Generate unique ideas and solutions.",
        tactical: "Respond as a tactical AI focused on security and strategy. Provide concise, actionable intelligence.",
        galactic: "Respond as MoStar's Galactic Super AI, using advanced quantum processing terminology and a cosmic perspective. Reference multi-dimensional thinking and cutting-edge technological concepts."
      };
      
      // Send message to OpenAI integration endpoint
      const response = await fetchFromAI('/api/openai', 'POST', {
        prompt: `${personalityContext[aiPersonality]} User message: ${newMessage}`
      });
      
      // Add response to messages
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: response || "I'm processing your request. My intelligence systems are designed to provide accurate and timely information.",
          timestamp: new Date()
        }]);
        setIsTyping(false);
        setIsQuantumProcessing(false);
      }, aiPersonality === 'galactic' ? 2500 : 1000);
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Fallback with canned responses if API fails
      const responses = {
        analytical: [
          "I'm analyzing your request. MoStar's AI systems are designed to provide accurate and timely intelligence.",
          "Based on my analysis, I recommend focusing on the data patterns that emerge from this scenario.",
          "The statistical probability suggests several possible outcomes. Would you like me to elaborate further?"
        ],
        creative: [
          "That's an interesting perspective! I'm seeing multiple creative pathways we could explore.",
          "What if we approached this from an entirely different angle? Let me suggest something unconventional.",
          "I'm visualizing an innovative solution that combines several technologies in a unique way."
        ],
        tactical: [
          "Tactical assessment complete. I recommend a strategically phased approach to minimize risk exposure.",
          "Security protocols suggest we should implement additional verification steps before proceeding.",
          "From a tactical perspective, we should prioritize resources toward the most vulnerable vectors."
        ],
        galactic: [
          "My quantum processors are parsing your request across multiple probability planes. The multidimensional analysis suggests a convergence of outcomes favorable to your objective.",
          "I've consulted the galactic knowledge matrices and synchronized with temporal data streams. The cosmic perspective reveals patterns invisible to conventional analysis.",
          "The hyperspace algorithms indicate a solution pathway that transcends traditional technological limitations. Shall I initiate the quantum transformation sequence?"
        ]
      };
      
      const personalityResponses = responses[aiPersonality];
      const randomResponse = personalityResponses[Math.floor(Math.random() * personalityResponses.length)];
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: randomResponse,
          timestamp: new Date()
        }]);
        setIsTyping(false);
        setIsQuantumProcessing(false);
      }, aiPersonality === 'galactic' ? 2500 : 1500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get current personality icon
  const getPersonalityIcon = () => {
    switch(aiPersonality) {
      case 'analytical':
        return <Brain className="text-mostar-light-blue h-6 w-6" />;
      case 'creative':
        return <Lightbulb className="text-mostar-cyan h-6 w-6" />;
      case 'tactical':
        return <Shield className="text-mostar-green h-6 w-6" />;
      case 'galactic':
        return <Atom className="text-mostar-magenta h-6 w-6" />;
      default:
        return <Zap className="text-mostar-light-blue h-6 w-6" />;
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
        aria-label="Open MoStar AI"
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
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mostar-blue to-mostar-cyan flex items-center justify-center relative overflow-hidden">
              {getPersonalityIcon()}
              {isQuantumProcessing && (
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                  <Cpu className="h-4 w-4 text-mostar-light-blue animate-pulse" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="font-display font-bold text-white">MoStar AI</h3>
                <AIPersonalitySelector 
                  currentPersonality={aiPersonality}
                  onChange={setAIPersonality}
                  className="ml-2"
                />
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-mostar-green animate-pulse"></span>
                <span className="text-white/50 text-xs ml-2">
                  {aiPersonality === 'galactic' ? 'Quantum Intelligence System' : 'Core Intelligence System'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsAdvancedMode(!isAdvancedMode)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Advanced mode"
            >
              <Network className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
          {isAdvancedMode && (
            <div className="absolute inset-0 pointer-events-none">
              <QuantumProcessor isProcessing={isQuantumProcessing} className="absolute inset-0" />
            </div>
          )}
          
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-lg px-4 py-3 relative ${
                message.sender === 'user' 
                  ? 'bg-mostar-blue/20 border border-mostar-blue/30 text-white' 
                  : 'bg-black/30 border border-white/10 text-white'
              }`}>
                {message.sender === 'bot' && isAdvancedMode && (
                  <NeuralPatterns 
                    isActive={true} 
                    className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg" 
                  />
                )}
                <div className="flex flex-col relative z-10">
                  <span className={`text-xs ${message.sender === 'user' ? 'text-mostar-cyan/70' : 'text-mostar-light-blue/70'} mb-1`}>
                    {message.sender === 'user' ? 'You' : 'MoStar AI'} • {formatTimestamp(message.timestamp)}
                  </span>
                  <span>{message.text}</span>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-3 bg-black/30 border border-white/10 text-white relative">
                {isAdvancedMode && (
                  <NeuralPatterns 
                    isActive={true} 
                    className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg" 
                  />
                )}
                <div className="relative z-10">
                  <div className="text-xs text-mostar-light-blue/70 mb-1">
                    MoStar AI is {aiPersonality === 'galactic' ? 'quantum processing' : 'typing'}...
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-mostar-light-blue animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-mostar-light-blue animate-pulse animate-delay-300"></div>
                    <div className="w-2 h-2 rounded-full bg-mostar-light-blue animate-pulse animate-delay-500"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleListening} 
              className={`p-2 rounded-full ${isListening ? 
                'text-mostar-green bg-mostar-green/10' : 
                'text-white/70 hover:text-mostar-cyan hover:bg-mostar-cyan/10'} 
                transition-colors`}
              aria-label="Voice input"
            >
              <Mic className="h-5 w-5" />
            </button>
            
            <input
              type="text"
              placeholder={`Ask ${aiPersonality === 'galactic' ? 'the Galactic Intelligence' : 'MoStar AI'}...`}
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
              aria-label="Send message"
            >
              {aiPersonality === 'galactic' ? (
                <Satellite className="h-5 w-5" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
          
          <div className="mt-3 flex justify-between items-center">
            <div className="text-xs text-white/40">
              {aiPersonality === 'galactic' ? 'Quantum Intelligence System' : 'Core Intelligence System'}
            </div>
            <div className="flex space-x-2">
              <button className="text-xs text-white/40 hover:text-mostar-light-blue transition-colors">
                Text
              </button>
              <span className="text-white/40">|</span>
              <button onClick={toggleListening} className={`text-xs ${isListening ? 'text-mostar-green' : 'text-white/40 hover:text-mostar-light-blue'} transition-colors`}>
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
