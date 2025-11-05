import { useState } from 'react';
import { Send, Mic, Image, Paperclip, User, Clock, Check, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  senderRole: 'resident' | 'family' | 'staff';
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'voice' | 'image';
}

interface Conversation {
  id: string;
  name: string;
  role: 'family' | 'staff';
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

interface CommunicationProps {
  role: 'elderly' | 'caretaker';
}

export function Communication({ role }: CommunicationProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'family',
      avatar: '👩',
      lastMessage: 'Hi Mom! How are you feeling today?',
      timestamp: '10 min ago',
      unread: 2,
      online: true
    },
    {
      id: '2',
      name: 'Nurse Jennifer',
      role: 'staff',
      avatar: '👩‍⚕️',
      lastMessage: 'Time for your afternoon medication',
      timestamp: '1 hour ago',
      unread: 0,
      online: true
    },
    {
      id: '3',
      name: 'Michael Johnson',
      role: 'family',
      avatar: '👨',
      lastMessage: "I'll visit you this weekend!",
      timestamp: '3 hours ago',
      unread: 0,
      online: false
    },
    {
      id: '4',
      name: 'Dr. Smith',
      role: 'staff',
      avatar: '👨‍⚕️',
      lastMessage: 'Your test results look great!',
      timestamp: 'Yesterday',
      unread: 0,
      online: false
    }
  ];

  const messages: Record<string, Message[]> = {
    '1': [
      {
        id: '1',
        sender: 'Sarah Johnson',
        senderRole: 'family',
        content: 'Good morning Mom! Did you sleep well?',
        timestamp: '9:30 AM',
        read: true,
        type: 'text'
      },
      {
        id: '2',
        sender: 'You',
        senderRole: 'resident',
        content: 'Yes dear, I slept very well. Thank you for asking.',
        timestamp: '9:45 AM',
        read: true,
        type: 'text'
      },
      {
        id: '3',
        sender: 'Sarah Johnson',
        senderRole: 'family',
        content: 'That\'s wonderful! Are you eating your meals?',
        timestamp: '10:00 AM',
        read: true,
        type: 'text'
      },
      {
        id: '4',
        sender: 'Sarah Johnson',
        senderRole: 'family',
        content: 'Hi Mom! How are you feeling today?',
        timestamp: '11:20 AM',
        read: false,
        type: 'text'
      }
    ],
    '2': [
      {
        id: '1',
        sender: 'Nurse Jennifer',
        senderRole: 'staff',
        content: 'Good morning Margaret! Time for your morning checkup.',
        timestamp: '8:00 AM',
        read: true,
        type: 'text'
      },
      {
        id: '2',
        sender: 'You',
        senderRole: 'resident',
        content: 'Thank you! I\'ll be ready.',
        timestamp: '8:05 AM',
        read: true,
        type: 'text'
      },
      {
        id: '3',
        sender: 'Nurse Jennifer',
        senderRole: 'staff',
        content: 'Time for your afternoon medication',
        timestamp: '2:00 PM',
        read: false,
        type: 'text'
      }
    ]
  };

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConversation) {
      // In real app, send message to backend
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // In real app, implement voice recording
    if (!isRecording) {
      alert('Voice recording started. Tap again to stop and send.');
    }
  };

  const speakMessage = (message: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      speechSynthesis.speak(utterance);
    }
  };

  if (!selectedConversation) {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl">
          <h2 className="text-white mb-1">Messages</h2>
          <p className="text-blue-100">
            {role === 'elderly' 
              ? 'Stay connected with family and staff'
              : 'Communicate with residents and families'}
          </p>
        </div>

        {/* Conversations List */}
        <div className="space-y-3">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className="w-full bg-white rounded-2xl p-5 shadow-lg border-2 border-white hover:border-blue-200 transition-all text-left active:scale-98"
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    {conversation.avatar}
                  </div>
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-gray-900">{conversation.name}</h4>
                    <span className="text-gray-500 text-xs flex-shrink-0 ml-2">
                      {conversation.timestamp}
                    </span>
                  </div>

                  <p className={`text-gray-600 text-sm mb-2 truncate ${conversation.unread > 0 ? '' : ''}`}>
                    {conversation.lastMessage}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      conversation.role === 'family' 
                        ? 'bg-pink-100 text-pink-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {conversation.role === 'family' ? '👨‍👩‍👧 Family' : '🏥 Staff'}
                    </span>

                    {conversation.unread > 0 && (
                      <span className="bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Action Card */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-200">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">💬</span>
            <div>
              <h4 className="text-gray-900">Voice Messages</h4>
              <p className="text-gray-600 text-sm">Send voice notes instead of typing</p>
            </div>
          </div>
          <button className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-2">
            <Mic className="w-5 h-5" />
            <span>Record Voice Message</span>
          </button>
        </div>
      </div>
    );
  }

  const currentConversation = conversations.find(c => c.id === selectedConversation);
  const conversationMessages = messages[selectedConversation] || [];

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      {/* Conversation Header */}
      <div className="bg-white rounded-2xl p-4 shadow-lg mb-4 flex-shrink-0">
        <button
          onClick={() => setSelectedConversation(null)}
          className="text-blue-600 mb-2 flex items-center gap-1 hover:underline"
        >
          ← Back to messages
        </button>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-xl">
              {currentConversation?.avatar}
            </div>
            {currentConversation?.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div>
            <h3 className="text-gray-900">{currentConversation?.name}</h3>
            <p className="text-gray-600 text-sm">
              {currentConversation?.online ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {conversationMessages.map((message) => {
          const isOwn = message.senderRole === 'resident';
          
          return (
            <div
              key={message.id}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${isOwn ? 'order-2' : 'order-1'}`}>
                <div
                  className={`rounded-2xl p-4 shadow-md ${
                    isOwn
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-900 rounded-bl-sm'
                  }`}
                >
                  {!isOwn && (
                    <p className={`text-xs mb-1 ${isOwn ? 'text-blue-100' : 'text-gray-600'}`}>
                      {message.sender}
                    </p>
                  )}
                  
                  <p className="mb-2">{message.content}</p>
                  
                  <div className="flex items-center justify-between gap-2">
                    <div className={`flex items-center gap-1 text-xs ${
                      isOwn ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      <Clock className="w-3 h-3" />
                      <span>{message.timestamp}</span>
                    </div>
                    
                    {isOwn && (
                      <div>
                        {message.read ? (
                          <CheckCheck className="w-4 h-4 text-blue-100" />
                        ) : (
                          <Check className="w-4 h-4 text-blue-100" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {!isOwn && role === 'elderly' && (
                  <button
                    onClick={() => speakMessage(message.content)}
                    className="mt-2 text-gray-600 hover:text-blue-600 flex items-center gap-1 text-sm"
                  >
                    <span className="text-lg">🔊</span>
                    <span>Read aloud</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="bg-white rounded-2xl p-4 shadow-lg flex-shrink-0">
        <div className="flex gap-2 mb-3">
          <button className="p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 active:scale-95 transition-all">
            <Image className="w-6 h-6" />
          </button>
          <button className="p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 active:scale-95 transition-all">
            <Paperclip className="w-6 h-6" />
          </button>
          <button
            onClick={handleVoiceInput}
            className={`p-3 rounded-xl active:scale-95 transition-all ${
              isRecording
                ? 'bg-red-600 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Mic className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-4 bg-gray-100 rounded-xl border-2 border-gray-100 focus:border-blue-400 focus:outline-none text-gray-900"
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>

        {isRecording && (
          <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-700">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span>Recording...</span>
            </div>
            <button
              onClick={handleVoiceInput}
              className="text-red-700 hover:underline"
            >
              Stop & Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
