import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import CustomizedSwitches from '../components/switch'
import useDarkSide from '../config/useDarkMode'
const Layout = () => {
    const [theme, toggleTheme] = useDarkSide();
    return (
        <div className='min-h-screen dark:bg-gray-900 transition-all duration-500 bg-gray-100'>
            <div className='flex dark:bg-gray-950 transition-all duration-500 bg-gray-200 py-[25px] items-center justify-center text-center'>
                <CustomizedSwitches toggleTheme={toggleTheme} />
                <Link to={'/'}>
                    <h1 className='font-black text-gray-950 transition-all duration-500 dark:text-gray-500 border-l-[2px] pl-[30px] text-[25px]'>Пользователи</h1>
                </Link>
            </div>
            <div className='py-[20px]'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout