import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Screens/Login";
import Register from "../Screens/Register";
import Home from "../Screens/Home";

function AppRoutes() {
    return ( 
        <BrowserRouter>
            <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/> } />
            </Routes>
        </BrowserRouter>
     );
}

export default AppRoutes;