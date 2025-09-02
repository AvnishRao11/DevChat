import React,{use, useContext}from "react";
import {UserContext}from '../Context/User.context';
function Home() {
    const {user}=useContext(UserContext);
    return ( 
        <>
        <div>{JSON.stringify(user)}</div>
        </>
     );
}

export default Home;