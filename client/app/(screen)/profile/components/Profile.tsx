"use client";
import fallback from "$/public/images/2.webp";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Button } from "$/components/ui/button";
import Signout from "$/components/shared/Signout";
import { useGetLoggedInUserQuery } from "$/store/services/user";
import ProfileSkeleton from "$/components/skeleton/ProfileSkeleton";

const Profile = () => {
  const { data: loggedInUser, error, isLoading } = useGetLoggedInUserQuery();
  const router = useRouter();
  if (isLoading) return <ProfileSkeleton />;
  if (error) router.replace("/");
  return (
    <div className="flex justify-start gap-3 p-3 md:p-10">
      <div className="size-32 overflow-hidden rounded-full">
        <Image
          height="100"
          width="100"
          src={fallback}
          alt="alt-profile"
          className="block size-full object-cover"
        />
      </div>
      <div>
        <p className="text-xl font-bold md:text-3xl">{loggedInUser?.name}</p>
        <p className="text-muted-foreground text-center text-sm">
          {loggedInUser?.email}
          {" • "}
          {loggedInUser?.phone}
        </p>
        <div className="flex items-center gap-1">
          {/*<Button
            variant={"outline"}
            className="my-3 flex justify-center text-center md:block"
            onClick={() => router.push("/profile/edit")}
          >
            Edit
          </Button>*/}
          {/* signout button */}
          <Signout />
        </div>
      </div>
    </div>
  );
};

export default Profile;
