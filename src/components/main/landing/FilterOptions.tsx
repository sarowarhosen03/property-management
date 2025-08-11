import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function FilterOptions({
  onSearch,
  moreFilter,
  search,
}: {
  onSearch: () => void;
  moreFilter: string;
  search: string;
}) {
  return (
    <>
      <div
        onClick={() => onSearch()}
        className="hidden flex-1 cursor-pointer items-center justify-center space-x-2 text-center lg:flex"
      >
        <button className="flex-[0_0_24px]">
          <Image
            className="h-6 w-6"
            src={`/svgs/filter.svg`}
            alt="Filter svg icon"
            width={60}
            height={60}
          />
        </button>
        <span className="text-lg font-semibold">{moreFilter}</span>
      </div>
      <div className="w-full flex-1 text-center lg:w-auto 2xl:relative">
        <Button
          onClick={() => onSearch()}
          className="hidden w-full md:block lg:relative"
          variant={"primary"}
          size={"lg"}
        >
          {search}
        </Button>
        <Button
          onClick={() => onSearch()}
          className="w-full md:hidden"
          variant={"primary"}
          size={"lg"}
        >
          {search}
        </Button>
      </div>
    </>
  );
}
