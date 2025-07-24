import React, { useState, useEffect } from 'react'
import { api, ImageApi } from '../config/apis';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserById = () => {
    const [data, setData] = useState(null);
    const { id } = useParams();
    async function get() {
        try {
            const { data } = await axios.get(`${api}/${id}`);
            setData(data.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        get()
    }, [])
    return (
        data && (
            <div className='flex flex-col items-center justify-center'>
                <article key={data.id} className='flex flex-col p-[20px] items-center gap-[10px] transition-all duration-500 justify-between dark:bg-gray-950 bg-gray-200 lg:w-[33%] w-[50%] rounded-[10px]'>
                    <h1 className='text-gray-600 font-black'>{data.name}</h1>
                    <h3 className='text-gray-600 font-black'>{data.isCompleted ? "Активен" : "Неактивен"}</h3>
                    <p className='text-gray-600 font-black'>{data.description}</p>
                    {data.images.map((image) => {
                        return (
                            <img className='shadow-2xl rounded-[8px]' src={`${ImageApi}/${image.imageName}`} alt="" />
                        )
                    })}
                </article>
            </div>
        )
    )
}

export default UserById