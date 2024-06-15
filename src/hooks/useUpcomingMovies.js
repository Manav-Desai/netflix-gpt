import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {

    const dispatch = useDispatch();
    const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

    async function getUpcomingMovies()
    {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS);
        const json = await data.json();
        console.log("Upcoming Movies data : ");
        console.log(json.results);

        // adding movies data in movieSlice 
        dispatch(addUpcomingMovies(json.results));
    }
    
    useEffect( ()=> {
        
        if(!upcomingMovies){
            getUpcomingMovies();
        }
        
    } , []);
}

export default useUpcomingMovies;