// components/Navbar.jsx
"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import NavLink from "./NavLink";
import { FaSearch, FaSignOutAlt, FaUser, FaCog, FaBookmark, FaUserCircle } from "react-icons/fa";
import dynamic from 'next/dynamic';
import { Avatar } from "@heroui/react";
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    setIsDropdownOpen(false);
    router.push('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const ThemeToggole = dynamic(
    () => import('./ThemeToggole'),
    {
      ssr: false,
      loading: () => <div className="w-12 h-6"></div>
    }
  );

  const nav = <>
    <NavLink  href={'/'}>Home</NavLink>
    <NavLink  href={'/ideas'}>Ideas</NavLink>
    <NavLink  href={'/addidea'}>Add Idea</NavLink>
    <NavLink  href={'/myideas'}>My Ideas</NavLink>
    <NavLink  href={'/myinteractions'}>My Interactions</NavLink>
  </>;

  return (
    <div className="mb-10">
      <div className="navbar bg-[#12203A] shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content text-black bg-[#d9ebd8] rounded-box z-5 mt-3 w-52 p-2 shadow ">
              {nav}
            </ul>
          </div>
          <Link href={'/'} className="btn btn-ghost font-bold text-xl"><span className="text-white">Idea</span><span className="text-[#44cc62]">Vault</span></Link>
        </div>
        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu text-white menu-horizontal px-1 gap-4">
            {nav}
          </ul>
        </div>
        
        <div className="navbar-end gap-2">
          <ThemeToggole />
          
          
          
          {isPending ? (
            <span className="loading text-white loading-spinner loading-lg"></span>
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              {/* User Avatar - Click to toggle dropdown */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Avatar className="rounded-lg cursor-pointer">
                  <Avatar.Image alt={user.name || 'User'} src={user?.image} />
                  <Avatar.Fallback className="rounded-lg">{user?.name?.charAt(0) || 'U'}</Avatar.Fallback>
                </Avatar>
                <span className="hidden md:inline text-sm font-medium text-gray-300 dark:text-gray-300">
                  {user?.name || 'User'}
                </span>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaUser className="text-gray-400" />
                      My Profile
                    </Link>
                    <Link
                      href="/myideas"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaBookmark className="text-gray-400" />
                      My Ideas
                    </Link>
                    <Link
                      href="/myinteractions"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaCog className="text-gray-400" />
                      My Interactions
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-200 dark:border-gray-800 py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href={'/signin'}>
              <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-4xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transform inline-flex items-center gap-2 cursor-pointer">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;