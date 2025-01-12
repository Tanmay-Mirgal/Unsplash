import React from "react";

const Stats = ({ photos, followers, following }) => {
  return (
    <div className="flex justify-around py-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{photos}</h2>
        <p className="text-sm text-gray-600">Posts</p>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold">{followers}</h2>
        <p className="text-sm text-gray-600">Followers</p>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold">{following}</h2>
        <p className="text-sm text-gray-600">Following</p>
      </div>
    </div>
  );
};

export default Stats;