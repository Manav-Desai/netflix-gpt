import React, { useEffect } from 'react'
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';

// creating the router based on url pattern


const Body = () => {
    
    const dispatch = useDispatch();

    const approuter = createBrowserRouter([
        {
            path : "/",
            element : <Login />
        },
        {
            path : "/browse",
            element : <Browse />
        }
    ]);
    

    /*
    Firebase provides an api which will be called automatically whenever user sign in , sign out , sign up etc. It is like an event
    listner . And to hold the user credentials we have created redux store and inside it there is one userSlice which holds all the user
    data which can be used from any part of application . If we don't want to use that firebase api we can do it manually also

    For sign in and sign up . We have used signInWithEmailAndPassword and createUserWithEmailAndPassword api and if it is success
    then we can call dispatch to redux store , similarly on click of logout button , we can dispatch an event to removeuser , but
    the code will be lengthy and not clean so we are using this api . Nothing special... Api is onAuthStateChanged
    */

    useEffect( () => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const {uid , email, displayName} = user;

                dispatch(addUser({ uid : uid , email : email , displayName : displayName}));
            } else {
                // User is signed out
                dispatch(removeUser());
            }
            });

    } , []);

    return (
        <div>
            <RouterProvider router={approuter} />
        </div>
    )
}

export default Body;
