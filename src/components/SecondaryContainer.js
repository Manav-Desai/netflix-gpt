import React from 'react'
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {

  const movies = useSelector((store) => store.movies);

  return (
    <div className='bg-black bg-opacity-[0.92]'>

      <div className=' -mt-60 relative z-20'>
        <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies}/>  
        <MovieList title={"Top Rated Movies"} movies={movies?.topRatedMovies}/>  
        <MovieList title={"Popular Movies"} movies={movies?.popularMovies}/>  
        <MovieList title={"Upcoming Movies"} movies={movies?.upcomingMovies}/>    
      </div>
    </div>
  )
}

export default SecondaryContainer
