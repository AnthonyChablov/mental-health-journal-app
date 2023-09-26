import React from 'react'
import Icons from '../Icons';
import Link from 'next/link';

const AppNav = () => {

  const navItems = [
    { link: '/dashboard', icon: 'home', iconSize: 25, iconColor: '#7861f3' },
    { link: '/dashboard/journal', icon: 'journal', iconSize: 28, iconColor: '#7861f3' },
    { link: '/dashboard/profile', icon: 'user', iconSize: 28, iconColor: '#7861f3' },
    
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-slate-50 shadow-2xl py-2 px-4 w-full border-t-2"
    >
      <div className="max-w-screen-sm flex justify-between mx-auto items-center">
        {navItems.map((item, index) => (
          <Link key={index} href={item.link}>
            <div className="text-gray-600 hover:text-gray-900">
              <Icons type={item.icon} size={item.iconSize} color={item.iconColor} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AppNav;