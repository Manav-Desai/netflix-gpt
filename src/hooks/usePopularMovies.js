import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const usePopularMovies = () => {

    const dispatch = useDispatch();
    const popularMovies = useSelector((store) => store.movies.popularMovies);

    async function getPopularMovies()
    {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS);
        const json = await data.json();
        console.log("Popular Movies data : ");
        console.log(json.results);

        // adding movies data in movieSlice 
        dispatch(addPopularMovies(json.results));
    }
    
    useEffect( ()=> {

        if(!popularMovies){
            getPopularMovies();
        }
        
    } , []);
}

export default usePopularMovies;