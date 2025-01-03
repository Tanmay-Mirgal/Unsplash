import React, { useState } from "react";

import { Button } from "@/components/components/ui/button";
import Uploadpost from "./components/Uploadpost";
import Header from "./components/Header";
import Stats from "./components/Stats";
import ProfileTabs from "./components/Tabs";

const ProfilePage = () => {
  const [open, setOpen] = useState(false);

  // Mock data - replace with real data in production
  const parsedUser = JSON.parse(localStorage.getItem("profile"));

  return (
    <div className="min-h-screen bg-white">
      <Header user={parsedUser} />
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* <Stats 
          photos={parsedUser?.stats?.photos || 0}
          followers={parsedUser?.stats?.followers || 0}
          following={parsedUser?.stats?.following || 0} 
        /> */}
      </div>
      <div className="border-t">
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

