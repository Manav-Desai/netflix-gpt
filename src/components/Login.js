import React, { useState } from 'react'
import Header from './Header';

const Login = () => {
    
    const [issignin,setissignin] = useState(true);

    function toggleSignInForm()
    {
        setissignin(!issignin);
    }

    return (
        <div>
            <Header />
            <div className=' absolute'>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b7c7-20aa-42a8-a278-f801b0d65fa1/fb548c0a-8582-43c5-9fba-cd98bf27452f/IN-en-20240326-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
                alt="background image" 
                className=''/>
            </div>
            
            <form className='absolute p-12 bg-black w-3/12 my-36 mx-auto left-0 right-0 text-white text-xl rounded-xl bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4'>
                     {issignin ? "Sign In" : "Sign Up"} 
                </h1>

                {
                    !issignin ? <input type="text" placeholder="Username" className=' p-2 my-4 w-full bg-gray-800 rounded-md'/> : null
                }

                
                <input type="email" placeholder="Email Address" className=' p-2 my-4 w-full bg-gray-800 rounded-md'/>
                <input type="password" placeholder="Password" className='p-2 my-4 w-full bg-gray-800 rounded-md'/>

                <button className='p-4 my-6 bg-red-600 w-full rounded-md'>
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
