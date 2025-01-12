import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/components/ui/tabs";
import { Camera, Grid, Heart, BookmarkIcon } from "lucide-react";
import PhotosGrid from "./PhotosGrid";
import EmptyState from "./EmptyState";

const ProfileTabs = () => {
  return (
    <Tabs defaultValue="photos" className="w-full sm:max-w-md mx-auto">
      <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <TabsTrigger value="photos" className="flex gap-2 justify-center">
          <Grid className="h-4 w-4" /> Photos
        </TabsTrigger>
        <TabsTrigger value="likes" className="flex gap-2 justify-center">
          <Heart className="h-4 w-4" /> Likes
        </TabsTrigger>
      </TabsList>

      <TabsContent value="photos">
        <PhotosGrid />
      </TabsContent>
      <TabsContent value="likes">
        <EmptyState message="Photos you like will appear here" />
      </TabsContent>
      <TabsContent value="collections">
        <EmptyState message="Your collections will appear here" />
      </TabsContent>
      <TabsContent value="stats">
        <EmptyState message="Your photo stats will appear here" />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;

