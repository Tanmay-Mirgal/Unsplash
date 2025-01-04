import React, { useState, useEffect } from "react";
import { Button } from "@/components/components/ui/button";
import Uploadpost from "./components/Uploadpost";
import Header from "./components/Header";
import ProfileTabs from "./components/Tabs";

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const [parsedUser, setParsedUser] = useState(null);

  useEffect(() => {
    const profileData = localStorage.getItem("user");
    if (profileData) {
      setParsedUser(JSON.parse(profileData));
    }
  }, []);

  if (!parsedUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        No profile data available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header user={parsedUser} />
      <div className="max-w-xl  px-4 py-2 -mt-9  ml-[30vh]">
        <div className="flex justify-evenly ">
          <div className="text-center">
            <h2 className="text-lg font-semibold">{parsedUser.posts?.length || 0}</h2>
            <p className="text-xs text-gray-500">Posts</p>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold">{parsedUser.followers?.length || 0}</h2>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold">{parsedUser.following?.length || 0}</h2>
            <p className="text-xs text-gray-500">Following</p>
          </div>
        </div>
      </div>
      <div className="border-t mt-4">
        <ProfileTabs />
      </div>
      <Button
        className="fixed bottom-8 right-8 rounded-full shadow-lg"
        size="lg"
        onClick={() => setOpen(true)}
      >
        Upload Photo
      </Button>
      <Uploadpost open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default ProfilePage;
