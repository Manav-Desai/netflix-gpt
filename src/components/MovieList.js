import React from 'react'
import MovieCard from './MovieCard';

const MovieList = ({title,movies}) => {
    console.log(movies);

  return (
    <div className=' px-2 pl-8 pt-2 text-white'>
        <h1 className=' text-3xl py-6 '>{title}</h1>
        <div className=' flex overflow-x-scroll'>
            <div className=' flex'>
                {
                    movies?.map( movie => <MovieCard key={movie.id} posterPath={movie.poster_path}/>)
                }
                
            </div>
        </div>
    </div>
  )
}

export default MovieList;