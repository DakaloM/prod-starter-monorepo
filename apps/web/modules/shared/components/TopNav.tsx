"use client";

import { NotificationFragment, UserFragment } from "@imax/client";
import { Loader } from "@imax/ui";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { TopNavDropDown } from "./TopNavDropDown";
import { NotificationList, Notifications } from "~/modules/notification";
import { useEffect, useState } from "react";
import { executeApi } from "~/client/api";

export function TopNav({ profile }: TopNavProps, { params }) {
  
  const [loading, setLoading] = useState<boolean>(false);

  const pathname = usePathname();
  const isDashboard: boolean = pathname.startsWith("/dashboard");

  const location = pathname.split("/")[2] || "dashboard";


  if (!isDashboard) {
    return null;
  }

  return (
    <nav className="grid bg-card px-10 py-4 gap-0 sticky w-full h-max  border-gray-200">
      <div className="flex justify-between py-2">
        <div className="flex items-center gap-4">
          <Menu size={30} className="text-gray-500 " />
          <h1 className="font-extrabold text-2xl text-gray-800 capitalize">
            {location}
          </h1>
        </div>

        <div className="max-w-[300px]">

        {loading ? (
          <Loader className="w-12 h-12"/>
        ) : (
          profile && (
            <div className="flex items-center">
              {<Notifications/>}

              <TopNavDropDown profile={profile} />
            </div>
          )
        )}
        </div>

      </div>
    </nav>
  );
}
interface TopNavProps {
  profile?: UserFragment;
}
