import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { api, CompleteApi } from '../config/apis';
import { Link } from 'react-router-dom';
const Home = () => {
    const [data, setData] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [search, setSearch] = useState("");
    const [select, setSelect] = useState("");

    function showAddModal() {
        setAddModal(!addModal);
    }

    async function get() {
        try {
            const { data } = await axios.get(api);
            setData(data.data);
        } catch (error) {
            console.error(error);
        }
    }
    async function delUser(id) {
        try {
            await axios.delete(`${api}?id=${id}`);
            get();
        } catch (error) {
            console.error(error);
        }
    }
    async function addUser(e) {
        e.preventDefault();
        let target = e.target;
        let formData = new FormData();
        formData.append("Name", target["Name"].value)
        formData.append("Description", target["Description"].value)
        formData.append("Images", target["Images"].files[0])
        try {
            await axios.post(api, formData);
            get();
            setAddModal(false)
        } catch (error) {
            console.error(error);
        }
    }
    async function checkStatus(e) {
        let obj = {
            ...e,
            isCompleted: !e.isCompleted
        }
        try {
            await axios.put(`${CompleteApi}?id=${e.id}`, obj);
            get();
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        get()
    }, [])
    return (
        <div className='flex flex-col gap-[20px] items-center'>
            <div className='flex flex-col lg:flex-row gap-[5px]'>
                <button className='bg-blue-500 dark:bg-blue-700 dark:border-blue-700 transition-all duration-500 py-[5px] px-[10px] rounded-[5px] border border-blue-500 text-white' onClick={() => showAddModal()}>Добавить</button>
                <input value={search} onChange={(e) => setSearch(e.target.value)} className='bg-gray-200 transition-all duration-500 border border-gray-500 py-[5px] px-[10px] dark:bg-gray-950 dark:border-gray-950 dark:text-gray-500 rounded-[5px]' type="search" placeholder='Поиск...' />
                <select value={select} onChange={(e) => setSelect(e.target.value)} name="" className='bg-gray-200 transition-all duration-500 border border-gray-500 py-[5px] px-[10px] dark:bg-gray-950 dark:border-gray-950 dark:text-gray-500 rounded-[5px]' id="">
                    <option value="">Все</option>
                    <option value="true">Активные</option>
                    <option value="false">Неактивные</option>
                </select>
            </div>
            {addModal && (
                <div className='fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-[5px]'>
                    <form className='flex flex-col gap-[5px] w-[85%] dark:bg-gray-950 bg-gray-200 p-[20px] rounded-[12px]' onSubmit={addUser} action="">
                        <input className='bg-white border dark:bg-gray-900 dark:border-none dark:text-white border-gray-500 py-[5px] px-[10px] rounded-[5px]' type="text" name='Name' placeholder='Имя' />
                        <input className='bg-white border dark:bg-gray-900 dark:border-none dark:text-white border-gray-500 py-[5px] px-[10px] rounded-[5px]' type="text" name='Description' placeholder='Информация' />
                        <input className='bg-white border dark:bg-gray-900 dark:border-none dark:text-white border-gray-500 py-[5px] px-[10px] rounded-[5px]' type="file" name='Images' />
                        <button className='bg-blue-500 py-[5px] px-[10px] rounded-[5px] cursor-pointer hover:bg-blue-700 text-white' type="submit">Сохранить</button>
                        <button onClick={() => setAddModal(false)} className='bg-red-500 py-[5px] px-[10px] cursor-pointer hover:bg-red-700 rounded-[5px] text-white'>Отмена</button>
                    </form>
                </div>
            )}
            <div className='dark:bg-gray-950 transition-all duration-500 bg-gray-300 w-[90%] rounded-[12px] p-[20px]'>
                <h1 className='dark:text-gray-500 text-gray-950 transition-all duration-500 text-center font-black pb-[15px]'>Пользователи: {data.length}</h1>
                <div className='gap-[20px] flex overflow-scroll h-[250px] flex-col lg:flex-row items-start justify-start'>
                    {data
                        .filter((e) => e.name.toLowerCase().trim().includes(search.toLowerCase()))
                        .filter((e) => e.isCompleted.toString().includes(select))
                        .map((e, i) => {
                            return (
                                <article key={i} className='flex flex-col gap-[10px] justify-between dark:bg-gray-900 transition-all duration-500 bg-gray-200 lg:w-[100%] w-[100%] p-[10px] rounded-[10px]'>
                                    <h1 className='text-gray-600 font-black'>{e.name}</h1>
                                    <h3 className={`font-bold transition-all duration-1500 ${e.isCompleted ? 'text-green-500' : 'text-red-500'}`}>
                                        {e.isCompleted ? "Активен" : "Неактивен"}
                                    </h3>
                                    <div className='flex flex-col lg:flex-row gap-[5px]'>
                                        <button onClick={() => delUser(e.id)} className='hover:bg-red-500 hover:text-white bg-white dark:border-gray-900 dark:bg-gray-950 dark:hover:text-red-500 dark:hover:bg-red-950 cursor-pointer dark:text-red-500 transition-all duration-500 border text-[12px] border-red-500 text-red-500 px-[10px] py-[5px] rounded-[5px] font-[600]'>Удалить</button>
                                        <button className='hover:bg-orange-500 hover:text-white bg-white dark:border-gray-900 dark:bg-gray-950 dark:hover:text-orange-500 dark:hover:bg-orange-950 cursor-pointer dark:text-orange-500 duration-500 transition-all border text-[12px] border-orange-500 text-orange-500 px-[10px] py-[5px] rounded-[5px] font-[600]'>Изменить</button>
                                        <button onClick={() => checkStatus(e)} className='hover:bg-green-500 hover:text-white bg-white dark:border-gray-900 dark:bg-gray-950 dark:hover:text-green-500 dark:hover:bg-green-950 cursor-pointer dark:text-green-500 duration-500 transition-all border text-[12px] border-green-500 text-green-500 px-[10px] py-[5px] rounded-[5px] font-[600]'>Статус</button>
                                        <Link to={`userById/${e.id}`}>
                                            <button className='hover:bg-gray-500 hover:text-white bg-white dark:border-gray-900 dark:bg-gray-950 dark:hover:text-gray-500 dark:hover:bg-gray-800 cursor-pointer dark:text-gray-500 duration-500 transition-all border text-[12px] border-gray-500 text-gray-500 px-[10px] py-[5px] rounded-[5px] font-[600]'>Подробнее</button>
                                        </Link>
                                    </div>
                                </article>
                            )
                        })}
                </div>
            </div>
        </div >
    )
}

export default Home