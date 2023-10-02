'use client';
import React from 'react'
import Icons from '../Icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AppNav = () => {

  const pathname = usePathname();


  const navItems = [
    { link: '/dashboard', icon: 'home', iconSize: 25, iconColor: 'gray' },
    { link: '/dashboard/journal', icon: 'journal', iconSize: 28, iconColor: 'gray' },
    { link: '/dashboard/profile', icon: 'user', iconSize: 28, iconColor: 'gray' },
    
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-indigo-900 shadow-2xl py-2 px-4 w-full "
    >
      <div className="max-w-screen-sm flex justify-between mx-auto items-center">
        {navItems.map((item, index) => (
          <Link key={index} href={item.link}>
            <div className="text-gray-600 hover:text-gray-900">
              <Icons type={item.icon} size={item.iconSize} color={pathname ===  item.link ? 'white' : item.iconColor } />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AppNav;