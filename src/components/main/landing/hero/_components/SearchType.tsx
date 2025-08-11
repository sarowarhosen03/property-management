/* eslint-disable no-unused-vars */
import { langType } from "@/app/[lang]/(main)/page";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Options = {
  en: {
    location: "Address",
    id: "ID",
  },
  rus: {
    location: "Адрес",
    id: "ID",
  },
  hy: {
    location: "Հասցե",
    id: "ID",
  },
};

interface SearchTypeProps {
  lang: langType;
  setSearchType: (value: "id" | "address") => void;
}

export function SearchType({ setSearchType, lang }: SearchTypeProps) {
  return (
    <Select onValueChange={(value) => setSearchType(value as "id" | "address")}>
      <SelectTrigger className="h-12 w-[100px] border-none text-sm">
        <SelectValue placeholder={Options[lang]?.location} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="address">{Options[lang]?.location}</SelectItem>
          <SelectItem value="id">{Options[lang].id}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
