import { auth } from "../utils/firebase";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";

const ModifiedHeader = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout()
    {
        signOut(auth).then(() => {
        // Sign-out successful.

            dispatch(removeUser());
            navigate("/");

        }).catch((error) => {
            console.log(error);
        });
    }

    return (

        <div className=" flex justify-between absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full">
            <img
            src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt="Logo"
            className="w-44"
            />
            <button className=" bg-red-500 rounded-lg text-white text-base w-20 h-8 my-4"
            onClick={handleLogout}>Sign Out</button>
        </div>
        
    )
}


export default ModifiedHeader;