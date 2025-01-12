import React, { useState, useEffect } from "react";
import { useUserStore } from "../../../Store/useUserStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/components/ui/dialog";


const Spinner = () => (
  <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
);

export { Spinner };

const UserListDialog = ({ isOpen, onClose, user, isFollowers }) => {
  const { getFollowers, getFollowing } = useUserStore();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [hasError, setHasError] = useState(false); // Track errors

  useEffect(() => {
    if (user) {
      const fetchUsers = async () => {
        setIsLoading(true);
        try {
          // Check if data is in localStorage
          const cachedData = localStorage.getItem(isFollowers ? 'followers' : 'following');
          if (cachedData) {
            setUsers(JSON.parse(cachedData)); // Load from cache
            setIsLoading(false);
            return;
          }

          // If no cached data, fetch from API
          const usersData = isFollowers ? await getFollowers() : await getFollowing();
          setUsers(usersData);

          // Cache the fetched data
          localStorage.setItem(isFollowers ? 'followers' : 'following', JSON.stringify(usersData));
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setHasError(true);
          setIsLoading(false);
        }
      };

      fetchUsers();
    }
  }, [user, isFollowers, getFollowers, getFollowing]); // Trigger re-fetch if these values change

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-md">
          <DialogHeader>
            <DialogTitle>Loading...</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center py-4">
            <Spinner /> {/* Show loading spinner */}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (hasError) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-md">
          <DialogHeader>
            <DialogTitle>{isFollowers ? "Followers" : "Following"}</DialogTitle>
          </DialogHeader>
          <div className="text-center text-red-500 py-4">An error occurred while fetching data.</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>{isFollowers ? "Followers" : "Following"}</DialogTitle>
        </DialogHeader>
        <div>
          <ul>
            {users.length === 0 ? (
              <li className="text-center text-gray-500">No {isFollowers ? "followers" : "following"} available</li>
            ) : (
              users.map((user) => (
                <li key={user._id} className="flex items-center space-x-2 mb-2">
                  <img
                    src={user.profilePic || "/default-profile.png"}
                    alt={user.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.username}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserListDialog;
