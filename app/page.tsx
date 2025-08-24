'use client';

import React, { useState, useEffect } from 'react';
import { Heart, X, Zap, Eye, MessageCircle, Settings, User, Crown, Shield, Sparkles, MapPin, Star } from 'lucide-react';

const PiMatchApp = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentScreen, setCurrentScreen] = useState('login');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [matches, setMatches] = useState<any[]>([]);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Touch/Mouse handlers for swiping
  const handleStart = (clientX: number, clientY: number) => {
    setDragStart({ x: clientX, y: clientY });
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(true);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      const direction = dragOffset.x > 0 ? 'right' : 'left';
      handleSwipe(direction);
    }
    
    setDragOffset({ x: 0, y: 0 });
  };
  
  // Mock users data
  const mockUsers = [
    {
      id: 1,
      name: "Emma",
      age: 28,
      bio: "Pi Pioneer since 2021 💜 Love hiking and coffee",
      images: ["https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face"],
      distance: 2.3,
      interests: ["Coffee", "Hiking", "Pi Network", "Photography"],
      verified: true,
      piVerified: true,
      online: true
    },
    {
      id: 2, 
      name: "Sophie",
      age: 25,
      bio: "Building the future with Pi ⚡ Yoga instructor & tech enthusiast",
      images: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face"],
      distance: 4.1,
      interests: ["Yoga", "Tech", "Pi Network", "Travel"],
      verified: true,
      piVerified: true,
      online: false
    },
    {
      id: 3,
      name: "Olivia", 
      age: 31,
      bio: "Artist & Pi enthusiast 🎨 Looking for genuine connections",
      images: ["https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop&crop=face"],
      distance: 1.8,
      interests: ["Art", "Museums", "Pi Network", "Wine"],
      verified: true,
      piVerified: true,
      online: true
    }
  ];

  // Mock Pi authentication
  const connectPi = () => {
    // In real app: window.Pi.authenticate(...)
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

  // Swipe actions
  const handleSwipe = (direction: string) => {
    if (direction === 'right') {
      // Simulate match
      if (Math.random() > 0.7) {
        const matchedUser = mockUsers[currentCardIndex];
        setMatches(prev => [...prev, matchedUser]);
        setCurrentScreen('match');
        setTimeout(() => setCurrentScreen('main'), 3000);
      }
    }
    
    setCurrentCardIndex(prev => (prev + 1) % mockUsers.length);
  };

  // Pi payment simulation
  const makePiPayment = (amount: number, feature: string) => {
    // In real app: window.Pi.createPayment(...)
    if (piBalance >= amount) {
      setPiBalance(prev => prev - amount);
      alert(`${feature} activated! -${amount} Pi`);
      return true;
    }
    alert('Insufficient Pi balance');
    return false;
  };

  // Login Screen
  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-sm border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-2xl mb-4 shadow-lg">
            <Heart className="w-10 h-10 text-purple-700" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">PiMatch</h1>
          <p className="text-purple-100">Find love in the Pi Network</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-white/90">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-sm">KYC Verified Profiles Only</span>
          </div>
          <div className="flex items-center space-x-3 text-white/90">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm">Pi-Powered Premium Features</span>
          </div>
          <div className="flex items-center space-x-3 text-white/90">
            <Heart className="w-5 h-5 text-red-400" />
            <span className="text-sm">47M+ Pi Pioneers</span>
          </div>
        </div>

        <button 
          onClick={connectPi}
          className="w-full mt-8 bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-800 font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Connect with Pi Network
        </button>
      </div>
    );
  };

  // Match Screen
  const MatchScreen = () => {
    const matchedUser = matches[matches.length - 1];
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl">
          <div className="mb-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">It's a Match!</h2>
            <p className="text-gray-600">You and {matchedUser?.name} liked each other</p>
          </div>
          
          <div className="flex justify-center space-x-4 mb-6">
            <img 
              src={matchedUser?.images[0]} 
              alt="Match"
              className="w-20 h-20 rounded-full object-cover border-4 border-pink-400"
            />
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-red-500" />
            </div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center border-4 border-pink-400">
              <User className="w-10 h-10 text-white" />
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-xl">
            Send Message
          </button>
        </div>
      </div>
    );
  };

  // Profile Card Component
  const ProfileCard = ({ user, onSwipe }: { user: any; onSwipe: (direction: string) => void }) => {
    const cardRotation = dragOffset.x * 0.1;
    const cardOpacity = 1 - Math.abs(dragOffset.x) * 0.002;
    
    return (
    <div 
      className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-white cursor-grab active:cursor-grabbing"
      style={{
        transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${cardRotation}deg)`,
        opacity: cardOpacity,
        transition: isDragging ? 'none' : 'all 0.3s ease-out'
      }}
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={handleEnd}
    >
      <img 
        src={user.images[0]} 
        alt={user.name}
        className="w-full h-full object-cover"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
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
          <MapPin className="w-4 h-4 text-gray-300" />
          <span className="text-sm text-gray-300">{user.distance}km away</span>
        </div>
        
        <p className="text-gray-200 mb-3">{user.bio}</p>
        
        {/* Interests */}
        <div className="flex flex-wrap gap-2">
          {user.interests.slice(0, 3).map((interest: string, index: number) => (
            <span 
              key={index}
              className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white border border-white/30"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Swipe buttons */}
      <div className="absolute bottom-6 right-6 flex space-x-4">
        <button 
          onClick={() => onSwipe('left')}
          className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        <button 
          onClick={() => onSwipe('right')}
          className="w-14 h-14 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all"
        >
          <Heart className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );

  // Main App Screen
  const MainScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-purple-100 p-4">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-purple-700" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">PiMatch</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 bg-yellow-100 px-3 py-1.5 rounded-full">
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
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

      {/* Cards */}
      <div className="p-6">
        <div className="max-w-sm mx-auto">
          {mockUsers.length > 0 && (
            <ProfileCard 
              user={mockUsers[currentCardIndex]} 
              onSwipe={handleSwipe}
            />
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-purple-100 p-4">
        <div className="flex justify-center space-x-8 max-w-sm mx-auto">
          <button className="flex flex-col items-center space-y-1 text-gray-400">
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
            className="flex flex-col items-center space-y-1 text-gray-400 relative"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            {matches.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
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
            className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-purple-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Pi Premium</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-sm mx-auto space-y-4">
          {/* Balance */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-2xl p-4 text-center">
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
                  <div>
                    <h3 className="font-semibold text-gray-800">Super Like</h3>
                    <p className="text-sm text-gray-600">Stand out from the crowd</p>
                  </div>
                </div>
                <button 
                  onClick={() => makePiPayment(5, 'Super Like')}
                  className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg font-medium"
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
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Profile Boost</h3>
                    <p className="text-sm text-gray-600">Be seen by more people</p>
                  </div>
                </div>
                <button 
                  onClick={() => makePiPayment(10, 'Profile Boost')}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium"
                >
                  10π
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-purple-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Who Viewed Me</h3>
                    <p className="text-sm text-gray-600">See your secret admirers</p>
                  </div>
                </div>
                <button 
                  onClick={() => makePiPayment(15, 'Who Viewed Me')}
                  className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg font-medium"
                >
                  15π
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Matches Screen
  const MatchesScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="bg-white/80 backdrop-blur-lg border-b border-purple-100 p-4">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <button 
            onClick={() => setCurrentScreen('main')}
            className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-purple-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Matches</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-sm mx-auto">
          {matches.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No matches yet</h3>
              <p className="text-gray-500">Start swiping to find your Pi soulmate!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {matches.map((match: any) => (
                <div key={match.id} className="bg-white rounded-xl p-4 border border-purple-100 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={match.images[0]} 
                      alt={match.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-pink-200"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-800">{match.name}</h3>
                        {match.piVerified && (
                          <Crown className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">You matched!</p>
                    </div>
                    <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Main render
  if (currentScreen === 'login') return <LoginScreen />;
  if (currentScreen === 'match') return <MatchScreen />;
  if (currentScreen === 'premium') return <PremiumScreen />;
  if (currentScreen === 'matches') return <MatchesScreen />;
  
  return <MainScreen />;
};

export default PiMatchApp;
