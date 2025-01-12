import { Link } from "react-router-dom";
import { Button } from "@/components/components/ui/button";
import { Settings, MapPin, Link as LinkIcon, Instagram, Twitter } from "lucide-react";

const Header = () => {
  const profile = localStorage.getItem("user");
  const parsedUser = profile ? JSON.parse(profile) : {};

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-8">
        <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden">
          <img src={parsedUser.profilePic || "../../../assets/default-profile-pic.jpg"} className="h-full w-full object-cover" alt="Profile Picture" />
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold">{`${parsedUser.firstName} ${parsedUser.lastName}` || "Anonymous"}</h2>
              {parsedUser.username && <p className="text-gray-600">@{parsedUser.username}</p>}
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <Link to="/update-profile"><Button>Edit Profile</Button></Link>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="mb-4 text-center md:text-left">{parsedUser.bio || "No bio available"}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 text-sm text-gray-600 mb-4">
            {parsedUser.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {parsedUser.location}
              </div>
            )}
            {parsedUser.website && (
              <div className="flex items-center gap-1 hover:underline">
                <LinkIcon className="h-4 w-4" />
                <a href={parsedUser.website} target="_blank" rel="noopener noreferrer">{parsedUser.website}</a>
              </div>
            )}
            {parsedUser.instagram && (
              <div className="flex items-center gap-1 hover:underline">
                <Instagram className="h-4 w-4" />
                <a href={`https://instagram.com/${parsedUser.instagram}`} target="_blank" rel="noopener noreferrer">{parsedUser.instagram}</a>
              </div>
            )}
            {parsedUser.twitter && (
              <div className="flex items-center gap-1 hover:underline">
                <Twitter className="h-4 w-4" />
                <a href={`https://twitter.com/${parsedUser.twitter}`} target="_blank" rel="noopener noreferrer">{parsedUser.twitter}</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

