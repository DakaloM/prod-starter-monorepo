"use client";

import { FullUserFragment, UserFragment } from "@imax/client";
import { Calendar, Fingerprint, Mail, MailOpen } from "lucide-react";
import Image from "next/image";
import React from "react";
import { formatDate } from "utils/formatDate";
import avatar from "~/assets/profileAvatar.webp";
import { ItemLabel } from "~/modules/shared";

export const UserProfile = ({ user }: UserProfileProps) => {


  return (
    <div className="flex-1 h-max flex flex-col gap-y-4 items-center w-full">
      <Image
        height={200}
        width={200}
        alt="avatar"
        src={avatar}
        className="w-[150px] h-[150px] object-cover rounded-full"
      />

      <div className="flex flex-col items-center gap-y-2 w-full">
        <h1 className="text-2xl font-bold flex flex-col items-center">
          <span className="text-lg text-primary mr-4 ">{user.title}</span>
          {`${user.name} ${user.middleName} ${user.surname}`}
        </h1>
        <p className="font-normal text-gray-500 flex items-center gap-2"> <Mail className="text-gray-500" size={15}/> {user.email}</p>
        <div className="w-full flex flex-col gap-y-2">
          <ItemLabel
            label="Date of birth"
            value={formatDate(user.birthDate)}
            className="w-full justify-center"
          />
          <ItemLabel
            label="ID Number"
            value={user.idNumber}
             className="w-full justify-center"
          />
          {user.gender && (
            <ItemLabel
              label="Gender"
              value={user.gender}
               className="w-full justify-center"
            />
          )}
          {user.race && (
            <ItemLabel
              label="Race"
              value={user.race}
               className="w-full justify-center"
            />
          )}
        </div>
      </div>
    </div>
  );
};

type UserProfileProps = {
  user: FullUserFragment;
};
