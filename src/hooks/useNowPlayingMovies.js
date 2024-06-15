import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";


const useNowPlayingMovies = () => {

    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);

    async function getNowPlayingMovies()
    {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
        const json = await data.json();
        // console.log("Movies data");
        // console.log(json.results);

        // adding movies data in movieSlice 
        dispatch(addNowPlayingMovies(json.results));
    }
    
    useEffect( ()=> {
        
        if(!nowPlayingMovies){
            getNowPlayingMovies();
        }
        
    } , []);
}

export default useNowPlayingMovies;