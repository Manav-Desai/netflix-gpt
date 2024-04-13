import React from 'react'
import { IMG_CDN_URL } from '../utils/constants';

const MovieCard = ({posterPath}) => {
  return (
    <div className=' w-40 pr-4'>
      <img
      className=' rounded-lg' 
      src={IMG_CDN_URL + posterPath} 
      alt='poster' />
    </div>
  )
}

export default MovieCard;
