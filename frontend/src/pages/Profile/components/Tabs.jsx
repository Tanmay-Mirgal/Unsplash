import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/components/ui/tabs";
import { Camera, Grid, Heart, BookmarkIcon } from "lucide-react";
import PhotosGrid from "./PhotosGrid";
import EmptyState from "./EmptyState";

const ProfileTabs = () => {
  return (
    <Tabs defaultValue="photos" className="w-full">
      <TabsList className="grid w-full sm:w-auto grid-cols-4 sm:inline-flex gap-4">
        <TabsTrigger value="photos" className="flex gap-2">
          <Grid className="h-4 w-4" /> Photos
        </TabsTrigger>
        <TabsTrigger value="likes" className="flex gap-2">
          <Heart className="h-4 w-4" /> Likes
        </TabsTrigger>
        <TabsTrigger value="collections" className="flex gap-2">
          <BookmarkIcon className="h-4 w-4" /> Collections
        </TabsTrigger>
        <TabsTrigger value="stats" className="flex gap-2">
          <Camera className="h-4 w-4" /> Stats
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
