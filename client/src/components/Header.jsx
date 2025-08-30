import React from 'react'

const Header = () => {
    return (
        <header className='flex justify-between items-center p-4 sticky top-0 bg-white  rounded'>
            <div className="flex text-lg items-center font-bold text-gray-900 font-mono">Bitly</div>
            <div className="flex items-center gap-6">
                <nav className='flex'>
                    <ul className='flex gap-6'>
                        <li className='text-gray-600 hover:text-gray-900'>Home</li>
                        <li className='text-gray-600 hover:text-gray-900'>About</li>
                        <li className='text-gray-600 hover:text-gray-900'>Pricing</li>
                        <li className='text-gray-600 hover:text-gray-900'>Blog</li>
                    </ul>
                </nav>
            </div>
            <div className="flex items-center gap-2.5">
                <button className='bg-green-500 text-white px-4 py-2 rounded'>Sign Up</button>
                <button className='text-gray-600 hover:text-gray-900'>Log In</button>
            </div>
        </header>
    )
}


export default Header