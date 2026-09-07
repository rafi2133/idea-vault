'use client'
import { authClient } from "@/lib/auth-client"
import Link from "next/link";
import NavLink from "./NavLink";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import dynamic from 'next/dynamic';
import { Avatar } from "@heroui/react";




const Navbar = () => {

    const {
        data: session,
        isPending,
    } = authClient.useSession()

    const user = session?.user

    const handleLogout = async () => {
        await authClient.signOut();
    }

    const ThemeToggole = dynamic(
        () => import('./ThemeToggole'),
        {
            ssr: false,
            loading: () => <div className="w-12 h-6"></div>
        }
    );
    const nav = <>
        <NavLink className='text-white' href={'/'}>Home</NavLink>
        <NavLink className='text-white' href={'/ideas'}>Ideas</NavLink>
        <NavLink className='text-white' href={'/addidea'}>Add Idea</NavLink>
        <NavLink className='text-white' href={'/myideas'}>My Ideas</NavLink>
        <NavLink className='text-white' href={'/myinteractions'}>My Interactions</NavLink>
    </>
    return (
        <div className="mb-10">
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-5 mt-3 w-52 p-2 shadow ">
                            {nav}
                        </ul>
                    </div>
                    <Link href={'/'} className="btn btn-ghost  font-bold text-xl">Idea<span className="text-[#44cc62]">Vault</span></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-4">
                        {nav}

                    </ul>
                </div>
                <div className="navbar-end gap-2">
                    <ThemeToggole></ThemeToggole>
                    <Link href={'/search'}>

                    </Link>
                    {isPending ? <span className="loading text-white loading-spinner loading-lg"></span> : user ? <>
                        <Avatar className="rounded-lg">
                            <Avatar.Image alt="John Doe" src={user?.image} />
                            <Avatar.Fallback className="rounded-lg">{user.name.charAt(0)}</Avatar.Fallback>
                        </Avatar>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300"
                        >
                            <FaSignOutAlt />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </> :
                        <>
                            <Link href={'/signin'}>
                                <button className=" px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-4xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transform inline-flex items-center gap-2 cursor-pointer">
                                    Login
                                </button>
                            </Link>
                        </>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;