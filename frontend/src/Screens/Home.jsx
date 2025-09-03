import React,{ useContext, useState}from "react";
import {UserContext}from '../Context/User.context';
import axios from "../Config/axios";
function Home() {
    const {user}=useContext(UserContext);
    const[isModalOpen,setIsModalOpen]=useState(false);
    const[projectName,setProjectName]=useState(null);
    function createProject(e){
        e.preventDefault();
        console.log(projectName);

        axios.post('/projects/create',{
            name:projectName
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <>
        <main className="p-4">
            <div className="projects">
                <button className="project p-4 border border-slate-300 rounded-md " onClick={() => setIsModalOpen(true)}>
                    New Project
                    <i className="ri-link ml-2"></i>
                </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
                        <form
                            onSubmit={createProject} 

                        >
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Project Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 mb-4" onChange={(e)=>setProjectName(e.target.value)} value={projectName}
                                required
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            </div>
        </main>
        </>
     );
}

export default Home;