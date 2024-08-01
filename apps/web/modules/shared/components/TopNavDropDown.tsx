import { UserFragment, UserRole } from '@imax/client';
import {
  DropdownMenuTrigger,
  DropdownMenu,
  Button,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@imax/ui';

import { ChevronDown, FileText, HelpCircle, LayoutDashboard, LogIn, LogOut, PowerOff, User, User2Icon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const TopNavDropDown = (props: TopNavDropDownProps) => {
  const { profile } = props;

  const isApplicant = profile?.role === UserRole.Applicant;  
  return (
    <div className="flex w-max">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex my-auto gap-2 w-max cursor-pointer">
            <div className="rounded-full bg-primary text-white h-8 w-8 grid place-items-center">
              <User2Icon size={16} />
            </div>
            <div className="flex flex-col items-center text-xs">
              <span className="font-semibold text-sm">
                {profile?.name} {profile?.surname}
              </span>
              <span className="text-primary font-semibold text-xs">{profile?.role}</span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-full bg-card p-0 gap-2 flex flex-col mt-3">
          { profile ?
            <>
              <DropdownMenuItem className="gap-2 px-6 py-2">
                {
                  isApplicant ? 
                  <Link href={`/profile/${profile.id}`} className="flex gap-4 items-center my-auto">
                  <User size={20} />
                  Profile
                </Link>
                :

                <Link href={`/dashboard/profile/${profile.id}`} className="flex gap-4 items-center my-auto">
                  <User size={20} />
                  Profile
                </Link>
                }
              </DropdownMenuItem>
              {isApplicant && <DropdownMenuItem className="gap-2 px-6 py-2">
                <Link href={`/offers/${profile.id}`} className="flex gap-4 items-center my-auto">
                  <FileText size={20} />
                  Offers
                </Link>
              </DropdownMenuItem>}
              {!isApplicant && <DropdownMenuItem className="gap-2 px-6 py-2">
                <Link href="/dashboard" className="flex gap-4 items-center my-auto">
                  <LayoutDashboard size={20} />
                  Dashboard
                </Link>
              </DropdownMenuItem>}
              <DropdownMenuItem className="gap-2 px-6">
                <Link href="/help" className="flex gap-4 items-center my-auto">
                  <HelpCircle size={20} />
                  Help center
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 px-6">
                <Link href="/logout" className="flex gap-4 items-center my-auto">
                  <LogOut size={20} />
                  Logout
                </Link>
              </DropdownMenuItem>
            </>
            :
            <DropdownMenuItem className="gap-2 px-6">
                <Link href="/login" className="flex gap-4 items-center my-auto">
                  <LogIn size={20} />
                  Login
                </Link>
              </DropdownMenuItem>
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

interface TopNavDropDownProps {
  profile?: UserFragment;
}
