import React from "react";

const Stats = ({ photos, followers, following }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-around items-center py-4 gap-4 sm:gap-0">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold">{photos}</h2>
        <p className="text-sm text-gray-600">Posts</p>
      </div>
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold">{followers}</h2>
        <p className="text-sm text-gray-600">Followers</p>
      </div>
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold">{following}</h2>
        <p className="text-sm text-gray-600">Following</p>
      </div>
    </div>
  );
};

export default Stats;
