'use client'
import Link from 'next/link';
import {  usePathname } from 'next/navigation';
import React from 'react';

const NavLink = ({href, children, className}) => {
    const pathname = usePathname();
    

    const isActive = href === pathname ;
    
    return (
        <div>
            <Link href={href} className={`${isActive ? "border-b-2 border-b-[#44cc62] " : "relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#44cc62] hover:after:w-full after:transition-all after:duration-300"} ${className}`}>
            {children}
            </Link>
        </div>
    );
};

export default NavLink;