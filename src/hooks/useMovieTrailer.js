import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {API_OPTIONS} from "../utils/constants";
import {addTrailerVideo} from "../utils/movieSlice";


const useMovieTrailer = (movieId) => {

    const dispatch = useDispatch();
    const trailerVideo = useSelector((store) => store.movies.trailerVideo);

    async function getMovieVideos() {
        const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
        );
        const json = await data.json();

        // console.log(json);

        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];

        // console.log(trailer);

        //adding trailer to redux store of movieSlice
        dispatch(addTrailerVideo(trailer));
    }

    useEffect(() => {

        if(!trailerVideo){
            getMovieVideos();
        }
        
    }, []);
}

export default useMovieTrailer;