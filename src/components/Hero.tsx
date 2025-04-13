import React from 'react';
import { Play, Info } from 'lucide-react';
import type { Movie } from '../types';

interface HeroProps {
  movie: Movie;
}

export function Hero({ movie }: HeroProps) {
  return (
    <div className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      </div>
      
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">{movie.title}</h1>
            <p className="text-lg text-gray-300 mb-8">{movie.overview}</p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition">
                <Play className="w-5 h-5" /> Play
              </button>
              <button className="flex items-center gap-2 px-8 py-3 bg-gray-500/70 text-white font-bold rounded hover:bg-gray-500/90 transition">
                <Info className="w-5 h-5" /> More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}