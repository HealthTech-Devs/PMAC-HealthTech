import React from 'react';
import Image from 'next/image';
import { useState, useContext, useRef} from 'react';
import { Storage } from '@aws-amplify/storage';
import { ActiveUser } from '@/pages/_app';
import { API } from '@aws-amplify/api';
import { updateUser } from '@/graphql/mutations.js';
import AppStatus from './Dashboard'; 

export default function ApplicantInfo(props){
    const activeUser = useContext(ActiveUser);
    const [user, setUser] = useState(props.user);
    const [selectedFile, setSelectedFile] = useState(null);
    const [changeFile, setChangeFile] = useState(false);

    const handleInvisibleInput = useRef(null);

    const handleClick= (e) => {
        e.preventDefault();
        handleInvisibleInput.current.click();
    }

    const handleFileSelect = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setSelectedFile(file);
        setChangeFile(true);
    } 
    
    const handleFileRemove = async (e) => {
        e.preventDefault();
        setSelectedFile(null);
        setChangeFile(false)
    }
    
    const handleFileUpload = async (e) => {
        e.preventDefault();
        const bucketName = 'pmacbetafiles135904-dev';
        const path = `public/${selectedFile.name}`;

        const objectURL = `https://s3.amazonaws.com/${bucketName}/${path}`;

        const file = selectedFile;
        try{
            const result = await Storage.put(file.name, file, {
                contentType: file.type,
                metadata: {
                    id: activeUser.id,
                    owner: activeUser.username
                }
            });
        }
        catch(err){
            console.log(err);
        }
    
        try{
            await API.graphql({
                query: updateUser,
                variables: {
                    input: {
                        id: user.id,
                        fileURL: objectURL
                    }
                },
            })
            .then((res) => {
                console.log(res);
            }
            )
            .catch((err) => {
                console.log(err);
            }
            )
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <div className='bg-white p-5 rounded-lg'>
            <div className="p-3 flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <Image className="w-12 h-12 rounded-full shadow-2xl" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-4xl font-medium text-gray-900 truncate dark:text-black">
                    {user.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-black-400">
                    {user.email}
                    </p>
                </div>
            </div>

            <div className="mt-2">
                <AppStatus student={user}/>
                {user.fileURL && !changeFile? 
                <>
                    <a href={user.fileURL} target="_blank" rel='noreferrer' className="mt-2 ml-[3.5rem] p-2 bg-[rgb(245,142,58)] text-[rgb(255,255,255) rounded-lg">Download File</a> 
                    <input type="file" id="myfile" name="myfile" style={{display: 'none'}} ref={handleInvisibleInput} onChange={(e) => handleFileSelect(e)}/> 
                    <button className="mt-2 ml-[1rem] p-2 bg-[rgb(245,142,58)] text-[rgb(255,255,255) rounded-lg" onClick={(e) => {e.preventDefault; handleClick(e);}}>Change</button> 
                </> :
                selectedFile ?
                    <>
                        <button className="mt-2 ml-[3.5rem] p-2 bg-[rgb(245,142,58)] text-[rgb(255,255,255) rounded-lg" onClick={(e) => handleFileUpload(e)}>Upload {selectedFile.name.substring(0,10) + "..."}</button> 
                        <button className="mt-2 ml-[1rem] p-2 bg-[rgb(245,142,58)] text-[rgb(255,255,255) rounded-lg" onClick={(e) => handleFileRemove(e)}>Remove</button>
                    </> :
                    <>
                        <input type="file" id="myfile" name="myfile" style={{display: 'none'}} ref={handleInvisibleInput} onChange={(e) => handleFileSelect(e)}/> 
                        <button className=" ml-[3.5rem] p-2 bg-[rgb(245,142,58)] text-[rgb(255,255,255) rounded-lg" onClick={(e) => handleClick(e)}>Choose File</button>
                    </>
            }
            </div>
        </div>
    )
}