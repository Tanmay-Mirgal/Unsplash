const Stats = ({ photos, followers, following }) => {
  return (
    <div className="flex gap-6">
      <div>
        <span className="font-bold">{photos}</span>
        <span className="text-gray-600 ml-1">Photos</span>
      </div>
      <div>
        <span className="font-bold">{followers}</span>
        <span className="text-gray-600 ml-1">Followers</span>
      </div>
      <div>
        <span className="font-bold">{following}</span>
        <span className="text-gray-600 ml-1">Following</span>
      </div>
    </div>
  );
};

export default Stats;
