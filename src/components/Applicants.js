import React from "react";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { ActiveUser } from "../pages/_app";
import AppUsers from "./AppUsers";
import ApplicantInfo from "./ApplicantInfo";

export default function Applicants() {
    const activeUser = useContext(ActiveUser);
    const [users, setUsers] = useState(null);
    const [groups, setGroups] = useState([]);
    const [toogleSelection, setToogleSelection] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        setUsers(activeUser.users);
        setGroups(activeUser.group);
    }, [activeUser]);

    const handleUserSelection = (e, user) => {
        e.preventDefault(); 
        selectedUser === user ? setToogleSelection(!toogleSelection) : setToogleSelection(true);
        setSelectedUser(user); 

    }
    return (
        <div>
            <p className=" mb-10 text-center font-bold text-5xl">Applicants List</p>
            {
            users ? 
                groups.filter(group => group != "Faculty").length > 0 ? 
                    <AppUsers /> :   
                    <div className="m-10 max-w-lg rounded-lg bg-[rgb(238,231,231)]">
                        <ul className="max-w-lg divide-y divide-gray-200 dark:divide-gray-700"> 
                        {
                            users.filter((user) => !user.email.endsWith('@ulm.edu')).map((user) => {
                                return (
                                    // list of applicants
                                    <li className="p-5 hover:bg-violet-300 cursor-pointer" key={user.id} value={user.id} onClick={(e) => {handleUserSelection(e, user)}}>
                                    <div className="p-3 flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <Image className="w-8 h-8 rounded-full" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-lg font-medium text-gray-900 truncate dark:text-black">
                                            {user.name}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-black-400">
                                            {user.email}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold">
                                            {user.fileURL ? 
                                                <span className="text-green-600">Complete</span> : 
                                            <span className="text-red-600">Incomplete</span>
                                            }
                                        </div>
                                    </div>
                                    </li>
                                )
                            })
                        }
                        </ul>
                    </div>
                :
                <></>
            }

           
            {toogleSelection && selectedUser ? 
                <div className="mt-5 ml-5 p-8 bg-slate-300 max-w-[100vh] rounded-lg">
                    <ApplicantInfo user={selectedUser} key={selectedUser.id}/>
                </div>
            :
                <></>
            }
            
                    
        </div>
    )
}