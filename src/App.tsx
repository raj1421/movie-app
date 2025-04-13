import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MovieRow } from './components/MovieRow';
import type { Movie, MovieResponse, Genre } from './types';

const API_KEY = '2dca580c2a14b55200e784d157207b4d';
const API_URL = 'https://api.themoviedb.org/3';

function App() {
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [moviesByGenre, setMoviesByGenre] = useState<Record<number, Movie[]>>({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch trending movies
        const trendingResponse = await fetch(
          `${API_URL}/trending/movie/week?api_key=${API_KEY}`
        );
        const trendingData: MovieResponse = await trendingResponse.json();
        setTrendingMovies(trendingData.results);
        setHeroMovie(trendingData.results[0]);

        // Fetch top rated movies
        const topRatedResponse = await fetch(
          `${API_URL}/movie/top_rated?api_key=${API_KEY}`
        );
        const topRatedData: MovieResponse = await topRatedResponse.json();
        setTopRatedMovies(topRatedData.results);

        // Fetch genres
        const genresResponse = await fetch(
          `${API_URL}/genre/movie/list?api_key=${API_KEY}`
        );
        const genresData = await genresResponse.json();
        setGenres(genresData.genres);

        // Fetch movies by genres
        const genreMovies: Record<number, Movie[]> = {};
        await Promise.all(
          genresData.genres.slice(0, 5).map(async (genre: Genre) => {
            const response = await fetch(
              `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}`
            );
            const data: MovieResponse = await response.json();
            genreMovies[genre.id] = data.results;
          })
        );
        setMoviesByGenre(genreMovies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  }, []);

  if (!heroMovie) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero movie={heroMovie} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <MovieRow title="Trending Now" movies={trendingMovies} />
        <MovieRow title="Top Rated" movies={topRatedMovies} />
        
        {genres.slice(0, 5).map((genre) => (
          moviesByGenre[genre.id] && (
            <MovieRow
              key={genre.id}
              title={genre.name}
              movies={moviesByGenre[genre.id]}
            />
          )
        ))}
      </div>
    </div>
  );
}

export default App;