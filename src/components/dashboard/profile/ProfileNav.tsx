export const ProfileNav = () => {
  return (
    <div className="flex flex-wrap">
      <ul className="flex gap-4">
        <li>
          <button className="py-1.5 px-3 text-sm text-secondary rounded-full hover:bg-secondary hover:text-white transition-all duration-300 group [&.active]:bg-secondary [&.active]:text-white active">
            Profile
          </button>
        </li>

        <li>
          <button className="py-1.5 px-3 text-sm text-secondary rounded-full hover:bg-secondary hover:text-white transition-all duration-300 group [&.active]:bg-secondary [&.active]:text-white">
            Change password
          </button>
        </li>
      </ul>
    </div>
  );
};
