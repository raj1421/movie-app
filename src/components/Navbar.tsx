import React, { useState, useEffect } from 'react';
import { Search, Bell, User } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-black' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-red-600 text-3xl font-bold">MovieFlix</h1>
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-300 hover:text-white">Home</a>
              <a href="#" className="text-gray-300 hover:text-white">TV Shows</a>
              <a href="#" className="text-gray-300 hover:text-white">Movies</a>
              <a href="#" className="text-gray-300 hover:text-white">New & Popular</a>
              <a href="#" className="text-gray-300 hover:text-white">My List</a>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <Search className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
            <Bell className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
            <User className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </nav>
  );
}