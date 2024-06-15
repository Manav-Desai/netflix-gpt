import React from 'react'
import { useSelector } from 'react-redux';
import MovieList from "./MovieList"

const GptMovieSuggestions = () => {

  const {movieResults,movieNames} = useSelector( (store) => store.gpt );

  if(!movieNames)
  {
      return null;
  }

  return (
    <>
      <div className='p-4 m-4 bg-zinc-800 text-white bg-opacity-90'>
        <div>
          {
            movieNames.map( (moviename , index) => <MovieList key={index} title={moviename} movies={movieResults[index]}/>)
          }
        </div>
      </div>
    </>
  )
}

export default GptMovieSuggestions;
