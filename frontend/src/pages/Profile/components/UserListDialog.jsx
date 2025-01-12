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
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchUsers = async () => {
        setIsLoading(true);
        try {
          const cachedData = localStorage.getItem(isFollowers ? 'followers' : 'following');
          if (cachedData) {
            setUsers(JSON.parse(cachedData));
            setIsLoading(false);
            return;
          }
          const usersData = isFollowers ? await getFollowers() : await getFollowing();
          setUsers(usersData);
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
  }, [user, isFollowers, getFollowers, getFollowing]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md mx-auto sm:w-11/12">
        <DialogHeader>
          <DialogTitle>{isLoading ? "Loading..." : isFollowers ? "Followers" : "Following"}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center py-4">
          {isLoading ? (
            <Spinner />
          ) : hasError ? (
            <div className="text-center text-red-500">An error occurred while fetching data.</div>
          ) : (
            <ul className="overflow-auto max-h-80">
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
                    <span className="truncate">{user.username}</span>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserListDialog;

