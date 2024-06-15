import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {

    const dispatch = useDispatch();
    const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

    async function getTopRatedMovies()
    {
        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS);
        const json = await data.json();
        console.log("Top Rated Movies data : ");
        console.log(json.results);

        // adding movies data in movieSlice 
        dispatch(addTopRatedMovies(json.results));
    }
    
    useEffect( ()=> {

        if(!topRatedMovies){
            getTopRatedMovies();
        }
        
    } , []);
}

export default useTopRatedMovies;