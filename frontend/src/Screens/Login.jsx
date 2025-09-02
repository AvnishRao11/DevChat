
import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Config/axios";
import {UserContext}from '../Context/User.context';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setUser}=useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/users/login',{email,password})
        .then((res)=>{
            console.log(res.data);
            localStorage.setItem('token',res.data.token);
            setUser(res.data.user);
            navigate('/');
        }).catch((err)=>{
            console.log(err);
        })
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign in to DevChat</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <span className="text-gray-400">Don't have an account?</span>
                    <Link to="/register" className="ml-2 text-blue-500 hover:underline">Create one</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;