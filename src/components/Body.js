import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';

// creating the router based on url pattern


const Body = () => {

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
    
    return (
        <div>
            <RouterProvider router={approuter} />
        </div>
    )
}

export default Body;
