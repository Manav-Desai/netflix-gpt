import React, { useRef, useState } from 'react'
import Header from './Header';
import { useNavigate } from "react-router-dom";
import { checkValidateData } from '../utils/validate';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile} from 'firebase/auth';

const Login = () => {
    

    const [issignin,setissignin] = useState(true);
    const [errMessage,seterrMessage] = useState(null);

    const email = useRef(null);
    const password = useRef(null);
    const fullname = useRef(null);
    
    function toggleSignInForm()
    {
        setissignin(!issignin);
    }

    function handleButtonClick()
    {
        // validate the form data
        const message = checkValidateData(email.current.value,password.current.value);
        seterrMessage(message);

        // if the credentials are valid then we are going to create newuser
        if(message)
            return;     // if message is null then cond. is false and below code is executed
        
        
        // sing in or sign up logic
        if(issignin)
        {
            // sign in logic

            signInWithEmailAndPassword(auth, email.current.value,password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                seterrMessage("Invalid Credentials . Please check your email and password");
            });

        }
        else
        {
            // sign up logic

            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // console.log(user);

                updateProfile(auth.currentUser, {
                    displayName: fullname.current.value
                  }).then(() => {
                        // console.log("Profile Updated Successfully");
                  }).catch((error) => {
                        // console.log(error);
                  });
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                seterrMessage(errorCode + " : " + errorMessage);
                // ..
            });


            
        }
    }
    
    return (
        <div>
            <Header />
            <div className=' absolute'>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b7c7-20aa-42a8-a278-f801b0d65fa1/fb548c0a-8582-43c5-9fba-cd98bf27452f/IN-en-20240326-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
                alt="background image" 
                className=''/>
            </div>
            
            <form
            onSubmit={(e) => {e.preventDefault()}}

            className='absolute p-12 bg-black w-3/12 my-36 mx-auto left-0 right-0 text-white text-base rounded-xl bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4'>
                     {issignin ? "Sign In" : "Sign Up"} 
                </h1>

                {
                    !issignin ? <input ref={fullname} type="text" placeholder="Full Name" className=' p-2 my-4 w-full bg-gray-800 rounded-md'/> : null
                }

                
                <input ref={email} type="email" placeholder="Email Address" className=' p-2 my-4 w-full bg-gray-800 rounded-md'/>
                <input ref={password} type="password" placeholder="Password" className='p-2 my-4 w-full bg-gray-800 rounded-md'/>
                
                <p 
                className=' text-red-500 font-bold text-lg py-2'>{errMessage}</p>

                <button 
                onClick={handleButtonClick}
                className='p-4 my-6 bg-red-600 w-full rounded-md'>
                    {issignin ? "Sign In" : "Sign Up"}
                </button>

                <p className=' text-base py-6 hover:underline cursor-pointer' onClick={toggleSignInForm}>
                    {issignin ? "New to Netflix?  Sign Up Now" : "Already registered ? Sign In Now"}
                    </p>
            </form>
            
        </div>
    )
}

export default Login;
