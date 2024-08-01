"use client";

import { UserFragment } from "@imax/client";
import { Button } from "@imax/ui";
import { BellIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Logo } from "~/assets/index";
import { TopNavDropDown } from "./TopNavDropDown";
import { Notifications } from "~/modules/notification";

export function PublicTopNav({ profile }: TopNavProps, { params }) {
  const pathname = usePathname();

  const isDashboard: boolean = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return null;
  }

  return (
    <nav className="grid bg-card px-4 py-2 gap-0 sticky w-full border-b border-gray-200 shadow-sm">
      <div className="flex justify-between py-2">
        <div className="flex items-center gap-4">
          <Image src={Logo} alt="logo" className="w-10" />

          <div className="hidden md:flex flex-col items-start gap-0">
            <h4 className="font-semibold text-sm ">National Union</h4>
            <h4 className="font-semibold text-sm ">of Mine workers</h4>
          </div>
        </div>

        <div className="flex items-center">
          { profile ?
            <div className="flex items-center">
              {<Notifications/>}

              <TopNavDropDown profile={profile} />
            </div>

            :
          
          <TopNavDropDown profile={profile} />
          }

        </div>
      </div>
    </nav>
  );
}
interface TopNavProps {
  profile?: UserFragment;
}
