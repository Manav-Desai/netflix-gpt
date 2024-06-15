import React from 'react';
import 'boxicons/css/boxicons.min.css';

const VideoTitle = ({title , overview}) => {
  return (
    <div className=' w-screen aspect-video pt-[15%]  text-base pl-[2.75%] absolute text-white bg-gradient-to-r from-black'>

        <h1 className=' font-bold text-5xl'>{title}</h1>
        <p className=' hidden md:block w-1/4 mt-4'>{overview}</p>

        <div className=' my-4 text-white'>
            <button className=' ml-4 bg-white text-black rounded-md px-2 py-2 w-24 hover:bg-opacity-80'> 
                <i className='bx bx-play text-xl pr-1'></i>
                Play
            </button>
            <button className=' ml-4 bg-gray-500 rounded-md px-2 py-2 w-28 hover:bg-opacity-80'>
                <i className='bx bx-info-circle text-xl pr-1'></i>
                More Info
            </button>
        </div>
    </div>
  )
}

export default VideoTitle;