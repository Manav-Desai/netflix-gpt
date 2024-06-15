import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useDispatch , useSelector} from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from 'firebase/auth';
import { LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/GptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/languageConstants";
import {changeLanguage} from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector( (store) => store.user );
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

    function handleLogout()
    {
        signOut(auth).then(() => {
        // Sign-out successful.

            dispatch(removeUser());

        }).catch((error) => {
            // console.log(error);
        });
    }

    function handleLanguageChange(e)
    {
      dispatch(changeLanguage(e.target.value));
    }

    function handleGptSearchClick()
    {
      // Toggle GPT search
      dispatch(toggleGptSearchView());
    }

    useEffect( () => {

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const {uid , email, displayName} = user;

            dispatch(addUser({ uid : uid , email : email , displayName : displayName}));

            // if the user data is found it means it is already loggin in so redirects him to browse page
            // console.log("on auth state change : user not null");
            navigate("/browse");

        } else {
            // User is signed out
            dispatch(removeUser());

            // if the user signs out so redirects him to login page
            // console.log("on auth state change : user null");
            navigate("/");
        }
        });
        
        /* 
        When the header component unmounts from the page . Then we are removing the onauthstatechanged function .
        Refer the doc of firebase to get idea about unsubscribe , onauthstatechange return a function , when we call it
        using it we can remove its effect
        */


        return () => unsubscribe();
    } , []);

    return (

        <div className=" flex flex-col justify-between absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full md:flex-row">
            <img
            src={LOGO}
            alt="Logo"
            className="w-44 mx-auto md:mx-0"
            />
            
            {
              user && (
                <div>
                  
                  { showGptSearch &&
                      (<select className="text-base p-1 m-1 rounded-md bg-zinc-500 text-white" onChange={handleLanguageChange}>
                      {
                        SUPPORTED_LANGUAGES.map( (language) =>  
                        <option key={language.identifier} value={language.identifier}>{language.name}</option>)
                      }
                      </select>)
                  }

                  <button className=" bg-green-500 rounded-lg text-white text-base w-24 h-8 my-4 mx-6"
                  onClick={handleGptSearchClick}>
                    {
                      showGptSearch ? "Home" : "GptSearch"
                    }
                  </button>
                  <button className=" bg-red-500 rounded-lg text-white text-base w-20 h-8 my-4"
                  onClick={handleLogout}>Sign Out</button>
                </div>
                
              )
            }
            
        </div>
        
    )
};

export default Header;
