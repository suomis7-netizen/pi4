'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Heart, X, Zap, Eye, MessageCircle, Settings, User, Crown, Shield, Sparkles, MapPin, Star, Send, ArrowLeft } from 'lucide-react';

const PiMatchApp = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentScreen, setCurrentScreen] = useState('login');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [matches, setMatches] = useState<any[]>([]);
  const [piBalance, setPiBalance] = useState(142.5);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeChat, setActiveChat] = useState<any>(null);
  
  // Enhanced swipe state
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragCurrent, setDragCurrent] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Enhanced mock users with more profiles
  const mockUsers = [
    {
      id: 1,
      name: "Emma",
      age: 28,
      bio: "Pi Pioneer since 2021 💜 Love hiking, coffee, and building the future of crypto together",
      images: ["https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face"],
      distance: 2.3,
      interests: ["Coffee", "Hiking", "Pi Network", "Photography", "Travel"],
      verified: true,
      piVerified: true,
      online: true,
      lastSeen: "Active now"
    },
    {
      id: 2, 
      name: "Sophie",
      age: 25,
      bio: "Building the future with Pi ⚡ Yoga instructor & tech enthusiast. Let's explore the world together!",
      images: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face"],
      distance: 4.1,
      interests: ["Yoga", "Tech", "Pi Network", "Travel", "Meditation"],
      verified: true,
      piVerified: true,
      online: false,
      lastSeen: "2 hours ago"
    },
    {
      id: 3,
      name: "Olivia", 
      age: 31,
      bio: "Artist & Pi enthusiast 🎨 Looking for genuine connections. Love museums, wine, and deep conversations",
      images: ["https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop&crop=face"],
      distance: 1.8,
      interests: ["Art", "Museums", "Pi Network", "Wine", "Books"],
      verified: true,
      piVerified: true,
      online: true,
      lastSeen: "Active now"
    },
    {
      id: 4,
      name: "Luna",
      age: 26,
      bio: "Crypto trader by day, dancer by night 💃 Pi holder and proud of it! Swipe right for good vibes",
      images: ["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face"],
      distance: 3.7,
      interests: ["Dancing", "Crypto", "Pi Network", "Music", "Fitness"],
      verified: true,
      piVerified: true,
      online: true,
      lastSeen: "Active now"
    },
    {
      id: 5,
      name: "Aria",
      age: 29,
      bio: "Software developer passionate about blockchain 👩‍💻 Pi mining since day one. Let's code the future together",
      images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face"],
      distance: 5.2,
      interests: ["Coding", "Blockchain", "Pi Network", "Gaming", "AI"],
      verified: true,
      piVerified: true,
      online: false,
      lastSeen: "1 hour ago"
    },
    {
      id: 6,
      name: "Isabella",
      age: 24,
      bio: "Fashion designer & Pi enthusiast 👗 Creating sustainable fashion while mining Pi. Life is about style and substance!",
      images: ["https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face"],
      distance: 2.8,
      interests: ["Fashion", "Sustainability", "Pi Network", "Photography", "Travel"],
      verified: true,
      piVerified: true,
      online: true,
      lastSeen: "Active now"
    },
    {
      id: 7,
      name: "Maya",
      age: 27,
      bio: "Nutritionist by day, Pi pioneer by night 🥗 Believe in healthy living and crypto revolution. Let's grow together!",
      images: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face"],
      distance: 3.5,
      interests: ["Health", "Nutrition", "Pi Network", "Cooking", "Fitness"],
      verified: true,
      piVerified: true,
      online: true,
      lastSeen: "Active now"
    },
    {
      id: 8,
      name: "Zoe",
      age: 22,
      bio: "Psychology student exploring the mind & Pi Network 🧠 Love deep conversations, books, and building digital future",
      images: ["https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=400&h=600&fit=crop&crop=face"],
      distance: 4.7,
      interests: ["Psychology", "Books", "Pi Network", "Philosophy", "Music"],
      verified: true,
      piVerified: true,
      online: false,
      lastSeen: "30 min ago"
    },
    {
      id: 9,
      name: "Chloe",
      age: 30,
      bio: "Veterinarian with a heart for animals & Pi 🐱 Saving pets and investing in Pi. Looking for someone who loves both!",
      images: ["https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face"],
      distance: 6.1,
      interests: ["Animals", "Veterinary", "Pi Network", "Nature", "Hiking"],
      verified: true,
      piVerified: true,
      online: true,
      lastSeen: "Active now"
    },
    {
      id: 10,
      name: "Violet",
      age: 26,
      bio: "Musician & crypto dreamer 🎵 Playing piano since 5, mining Pi since 2021. Music + Math = Perfect harmony!",
      images: ["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face"],
      distance: 1.9,
      interests: ["Music", "Piano", "Pi Network", "Crypto", "Art"],
      verified: true,
      piVerified: true,
      online: true,
      lastSeen: "Active now"
    }
  ];

  // Mock chat messages
  const mockChatMessages = [
    { id: 1, sender: 'them', message: "Hey! Thanks for the super like! 💜", timestamp: "2 min ago" },
    { id: 2, sender: 'me', message: "Your Pi passion caught my eye! How long have you been mining?", timestamp: "1 min ago" },
    { id: 3, sender: 'them', message: "Since 2021! I love how Pi is building a real community. What about you?", timestamp: "Just now" },
  ];

  // Mock Pi authentication
  const connectPi = () => {
    setTimeout(() => {
      setCurrentUser({
        id: 'user123',
        name: 'You',
        piVerified: true,
        verified: true
      });
      setCurrentScreen('main');
    }, 1500);
  };

  // Enhanced swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setDragCurrent({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    setDragCurrent({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const deltaX = dragCurrent.x - dragStart.x;
    const threshold = 100;
    
    if (Math.abs(deltaX) > threshold) {
      const direction = deltaX > 0 ? 'right' : 'left';
      handleSwipe(direction);
    }
    
    setIsDragging(false);
    setDragCurrent({ x: 0, y: 0 });
    setDragStart({ x: 0, y: 0 });
  };

  // Mouse handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragCurrent({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setDragCurrent({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const deltaX = dragCurrent.x - dragStart.x;
    const threshold = 100;
    
    if (Math.abs(deltaX) > threshold) {
      const direction = deltaX > 0 ? 'right' : 'left';
      handleSwipe(direction);
    }
    
    setIsDragging(false);
    setDragCurrent({ x: 0, y: 0 });
    setDragStart({ x: 0, y: 0 });
  };

  // Swipe logic
  const handleSwipe = (direction: string) => {
    if (direction === 'right') {
      // 50% chance for match (more realistic)
      if (Math.random() > 0.5) {
        const matchedUser = mockUsers[currentCardIndex];
        setMatches(prev => [...prev, matchedUser]);
        setCurrentScreen('match');
        setTimeout(() => setCurrentScreen('main'), 4000); // Longer match screen
      }
    }
    
    setCurrentCardIndex(prev => (prev + 1) % mockUsers.length);
  };

  // Pi payment simulation
  const makePiPayment = (amount: number, feature: string) => {
    if (piBalance >= amount) {
      setPiBalance(prev => prev - amount);
      alert(`${feature} activated! -${amount} Pi`);
      return true;
    }
    alert('Insufficient Pi balance');
    return false;
  };

  // Chat functions
  const openChat = (match: any) => {
    setActiveChat(match);
    setChatMessages(mockChatMessages);
    setCurrentScreen('chat');
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now(),
        sender: 'me',
        message: newMessage,
        timestamp: 'Just now'
      };
      setChatMessages(prev => [...prev, newMsg]);
      setNewMessage('');
    }
  };

  // Login Screen
  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-sm border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-2xl mb-4 shadow-lg">
            <Heart className="w-10 h-10 text-purple-700" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">PiMatch</h1>
          <p className="text-purple-100">Find love in the Pi Network</p>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3 text-white/90">
            <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span className="text-sm">KYC Verified Profiles Only</span>
          </div>
          <div className="flex items-center space-x-3 text-white/90">
            <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <span className="text-sm">Pi-Powered Premium Features</span>
          </div>
          <div className="flex items-center space-x-3 text-white/90">
            <Heart className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span className="text-sm">47M+ Pi Pioneers</span>
          </div>
        </div>

        <button 
          onClick={connectPi}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-800 font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Connect with Pi Network
        </button>
      </div>
    </div>
  );

  // Enhanced Match Screen
  const MatchScreen = () => {
    const matchedUser = matches[matches.length - 1];
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl">
          <div className="mb-6">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">It's a Match!</h2>
            <p className="text-gray-600">You and {matchedUser?.name} liked each other</p>
          </div>
          
          <div className="flex justify-center items-center space-x-4 mb-8">
            <img 
              src={matchedUser?.images[0]} 
              alt="Match"
              className="w-20 h-20 rounded-full object-cover border-4 border-pink-400 shadow-lg"
            />
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-red-500 animate-pulse" />
            </div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center border-4 border-pink-400 shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => openChat(matchedUser)}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              💬 Send Message
            </button>
            <button 
              onClick={() => setCurrentScreen('main')}
              className="w-full bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-all"
            >
              Keep Swiping
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Profile Card Component
  const ProfileCard = ({ user }: { user: any }) => {
    const deltaX = isDragging ? dragCurrent.x - dragStart.x : 0;
    const deltaY = isDragging ? dragCurrent.y - dragStart.y : 0;
    
    const rotation = deltaX * 0.1;
    const opacity = Math.max(0.5, 1 - Math.abs(deltaX) * 0.003);
    
    // Choice indicators
    const showLike = deltaX > 50;
    const showNope = deltaX < -50;

    return (
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div 
          ref={cardRef}
          className="relative w-full max-w-sm h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-white cursor-grab active:cursor-grabbing select-none"
          style={{
            transform: `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`,
            opacity: opacity,
            transition: isDragging ? 'none' : 'all 0.3s ease-out'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            if (isDragging) handleMouseUp({} as React.MouseEvent);
          }}
        >
          {/* Background Image */}
          <img 
            src={user.images[0]} 
            alt={user.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          {/* Choice indicators */}
          {showLike && (
            <div className="absolute top-20 right-8 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg transform rotate-12 border-4 border-white shadow-xl">
              LIKE
            </div>
          )}
          {showNope && (
            <div className="absolute top-20 left-8 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg transform -rotate-12 border-4 border-white shadow-xl">
              NOPE
            </div>
          )}
          
          {/* Online status */}
          {user.online && (
            <div className="absolute top-4 right-4 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg"></div>
          )}
          
          {/* Verification badges */}
          <div className="absolute top-4 left-4 flex space-x-2">
            {user.verified && (
              <div className="bg-blue-500 rounded-full p-1.5 shadow-lg">
                <Shield className="w-4 h-4 text-white" />
              </div>
            )}
            {user.piVerified && (
              <div className="bg-yellow-400 rounded-full p-1.5 shadow-lg">
                <Crown className="w-4 h-4 text-purple-700" />
              </div>
            )}
          </div>

          {/* User info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-2xl font-bold">{user.name}, {user.age}</h3>
              <MapPin className="w-4 h-4 text-gray-300 flex-shrink-0" />
              <span className="text-sm text-gray-300">{user.distance}km</span>
            </div>
            
            <p className="text-gray-200 mb-3 text-sm leading-relaxed">{user.bio}</p>
            
            {/* Interests */}
            <div className="flex flex-wrap gap-2 mb-4">
              {user.interests.slice(0, 4).map((interest: string, index: number) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white border border-white/30"
                >
                  {interest}
                </span>
              ))}
            </div>

            {/* Action buttons - only show when not dragging */}
            {!isDragging && (
              <div className="flex justify-center space-x-6 pt-4">
                <button 
                  onClick={() => handleSwipe('left')}
                  className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-red-500 hover:border-red-500 transition-all shadow-lg"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <button 
                  onClick={() => makePiPayment(5, 'Super Like')}
                  className="w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all border-2 border-white/30"
                >
                  <Star className="w-6 h-6 text-white" />
                </button>
                <button 
                  onClick={() => handleSwipe('right')}
                  className="w-14 h-14 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all border-2 border-white/30"
                >
                  <Heart className="w-6 h-6 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Chat Screen
  const ChatScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col">
      {/* Chat Header */}
      <div className="bg-white/90 backdrop-blur-lg border-b border-purple-100 p-4 flex items-center space-x-3 shadow-sm">
        <button 
          onClick={() => setCurrentScreen('matches')}
          className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-purple-600" />
        </button>
        <img 
          src={activeChat?.images[0]} 
          alt={activeChat?.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
        />
        <div className="flex-1">
          <h2 className="font-semibold text-gray-800 flex items-center space-x-1">
            <span>{activeChat?.name}</span>
            {activeChat?.piVerified && <Crown className="w-4 h-4 text-yellow-500" />}
          </h2>
          <p className="text-sm text-gray-500">{activeChat?.lastSeen}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-2xl ${
              msg.sender === 'me' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : 'bg-white text-gray-800 border border-gray-200'
            }`}>
              <p className="text-sm">{msg.message}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-purple-100' : 'text-gray-500'}`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-purple-100 p-4">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button 
            onClick={sendMessage}
            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  // Main App Screen
  const MainScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-purple-100 p-4 flex-shrink-0">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-purple-700" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">PiMatch</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-yellow-100 px-3 py-1.5 rounded-full">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-sm font-medium text-yellow-700">{piBalance} π</span>
            </div>
            <button 
              onClick={() => setCurrentScreen('premium')}
              className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors"
            >
              <Settings className="w-5 h-5 text-purple-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards Area */}
      <div className="flex-1 relative overflow-hidden">
        {mockUsers.length > 0 && (
          <ProfileCard user={mockUsers[currentCardIndex]} />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white/90 backdrop-blur-lg border-t border-purple-100 p-4 flex-shrink-0">
        <div className="flex justify-center space-x-8 max-w-sm mx-auto">
          <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-purple-600 transition-colors">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <span className="text-xs">Profile</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 text-purple-600">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Discover</span>
          </button>
          
          <button 
            onClick={() => setCurrentScreen('matches')}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-purple-600 transition-colors relative"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            {matches.length > 0 && (
              <div className="absolute -top-1 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">{matches.length}</span>
              </div>
            )}
            <span className="text-xs">Matches</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Premium Features Screen
  const PremiumScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="bg-white/80 backdrop-blur-lg border-b border-purple-100 p-4">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <button 
            onClick={() => setCurrentScreen('main')}
            className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-purple-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Pi Premium</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="p-4">
        <div className="max-w-sm mx-auto space-y-4">
          {/* Balance */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-2xl p-6 text-center shadow-lg">
            <div className="text-purple-800 font-bold text-lg mb-1">Your Pi Balance</div>
            <div className="text-3xl font-bold text-purple-900">{piBalance} π</div>
          </div>

          {/* Premium features */}
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 border border-purple-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">Super Like</h3>
                    <p className="text-sm text-gray-600">Stand out from the crowd</p>
                  </div>
                </div>
                <button 
                  onClick={() => makePiPayment(5, 'Super Like')}
                  className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  5π
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-purple-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
