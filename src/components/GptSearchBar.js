import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/GptSlice";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_SECRET_KEY);

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {

      const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", API_OPTIONS);
      const json = await data.json();

      return json.results;
  }

  const handleSearch = async () => {

    if (!searchText.current.value) {
      toast.error("Please enter prompt in search bar.");
      return;
    }

    //Making API call to gemini and getting the answer

   try {
      const model = genAI.getGenerativeModel({model : "gemini-pro"});
      
      const prompt = "Act as a Movie Recommendation system and suggest some movies for the query : " + searchText.current.value + 
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Don, Sholay, Heropanti, Koi Mil Gaya";
  
      const result = await model.generateContent(prompt);
      const res = result.response;
      const text = res.text();
  
      console.log(text);

      const gptMovies = text.split(",");

      const promiseArray = gptMovies.map( (movie) => searchMovieTMDB(movie));

      const tmdbResults = await Promise.all(promiseArray);

      console.log("TMDBresults : ");
      console.log(tmdbResults);

      if(!tmdbResults)
      {
          toast.error("Gpt not able to any movie for requested query")
          return;
      }

      dispatch(addGptMovieResult({movieNames : gptMovies ,movieResults : tmdbResults}));

   } catch (error) {
      toast.error("Some error occurred : " + error.message);
   }
  };

  return (
    <>
      <div className="pt-[10%] text-[20px] flex justify-center">
        <form
          className="w-1/2 bg-zinc-800 grid grid-cols-12 rounded-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            type="text"
            className="col-span-9 p-4 m-4 rounded-lg h-[45px]"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button
            className="m-4 col-span-3 px-4 bg-red-700 text-white rounded-lg h-[45px] hover:opacity-70"
            onClick={handleSearch}
          >
            {lang[langKey].search}
          </button>
        </form>
      </div>

      <Toaster
        toastOptions={{
          style: {
            fontSize : "18px",
          },
        }}
        position="top-center"
        reverseOrder={true}
      />
    </>
  );
};

export default GptSearchBar;
