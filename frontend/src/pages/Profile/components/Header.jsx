import { Link } from "react-router-dom";
import { Button } from "@/components/components/ui/button";
import { Settings, MapPin, Link as LinkIcon, Instagram, Twitter } from "lucide-react";

const Header = () => {
  const profile = localStorage.getItem("user");
  const parsedUser = profile ? JSON.parse(profile) : {};

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
        <div className="h-32 w-32 rounded-full overflow-hidden">
          <img src={parsedUser.profilePic || "../../../assets/default-profile-pic.jpg"} className="h-full w-full object-cover" alt="Profile Picture" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold">{`${parsedUser.firstName} ${parsedUser.lastName}` || "Anonymous"}</h2>
              {parsedUser.username && <p className="text-gray-600">@{parsedUser.username}</p>}
            </div>
            <div className="flex gap-2">
              <Link to="/update-profile"><Button>Edit Profile</Button></Link>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="mb-4">{parsedUser.bio || "No bio available"}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            {parsedUser.location ? (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {parsedUser.location}
              </div>
            ) : null}
            {parsedUser.website ? (
              <div className="flex items-center gap-1 hover:underline">
                <LinkIcon className="h-4 w-4" />
                <a href={parsedUser.website} target="_blank" rel="noopener noreferrer">{parsedUser.website}</a>
              </div>
            ) : null}
            {parsedUser.instagram ? (
              <div className="flex items-center gap-1 hover:underline">
                <Instagram className="h-4 w-4" />
                <a href={`https://instagram.com/${parsedUser.instagram}`} target="_blank" rel="noopener noreferrer">{parsedUser.instagram}</a>
              </div>
            ) : null}
            {parsedUser.twitter ? (
              <div className="flex items-center gap-1 hover:underline">
                <Twitter className="h-4 w-4" />
                <a href={`https://twitter.com/${parsedUser.twitter}`} target="_blank" rel="noopener noreferrer">{parsedUser.twitter}</a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

