import SearchIcon from "@/svgs/search.svg";

const HeroSearch = () => {
  return (
    <div className="relative text-gray-600 w-full max-w-[577px] mx-auto flex items-center">
      <input
        type="search"
        name="saerch"
        placeholder="Search by location"
        className="bg-white h-12 px-5 pr-10 rounded-full text-sm focus:outline-none w-full"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 bottom-0 w-14 flex items-center justify-center"
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default HeroSearch;
