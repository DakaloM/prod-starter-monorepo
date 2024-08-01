'use client';

import { ChevronRight, Play, Triangle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { Component, useEffect, useState } from 'react';

export const NavLink = (props: NavLinkProps) => {
  const [active, setActive] = useState(false);
  const { title, url, Icon } = props;

  const location = usePathname().split('/')[2];
  const smallLocation = usePathname().split('/')[1];
  const pathLocation = location ? location : smallLocation;
  const linkLocation = url.split('/')[2] || url.split('/')[1];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const list = document.querySelectorAll('.navLink');
    for (var i = 0; i < list.length; i++) {
      list[i].classList.remove('bg-primary', 'font-semibold', 'text-white');
      list[i].classList.add('text-gray-500');
    }
    e.currentTarget.classList.add('bg-primary', 'text-white', 'font-semibold');
  };

  useEffect(() => {
    const list = document.querySelectorAll('.navLink');
    for (var i = 0; i < list.length; i++) {
      list[i].classList.remove('bg-primary', 'font-semibold', 'text-white');
      list[i].classList.add('text-gray-500');

      if (pathLocation.toLocaleLowerCase() === linkLocation.toLocaleLowerCase()) {
        setActive(true);
      }
    }
  }, [linkLocation, pathLocation]);

  const cls = active
    ? 'bg-primary text-white font-semibold '
    : 'bg-transparent text-gray-500 hover:text-primary hover:bg-transparent';
  const iconStyle = active ? 'hidden md:flex rotate-90' : 'hidden md:flex ';

  return (
    <Link
      href={url}
      className={`navLink flex items-center justify-center  text-md   md:justify-between gap-4 w-fit md:w-full py-3 px-3 md:px-4 rounded-full md:rounded-lg ${cls} `}
      onClick={(e) => handleClick(e)}
    >
      <div className="flex items-center gap-0 md:gap-4 text-inherit">
        <Icon size={18} className="text-inherit " />
        <p className={`hidden md:flex text-inherit text-sm`}>{title}</p>
      </div>

      <Play size={12} className={iconStyle} />
    </Link>
  );
};

type NavLinkProps = {
  title: string;
  url: string;
  Icon: React.ElementType;
  
};
