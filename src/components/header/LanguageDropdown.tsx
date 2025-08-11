"use client";
import useLanguage from "@/hooks/useLanguage";
import { locales } from "@/lib/internationlization";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function LanguageDropdown() {
  const [selectedLang, handleSwitchLanguage] = useLanguage();
  return (
    <div className="lg:relative lg:left-[8px]">
      <Select
        onValueChange={handleSwitchLanguage}
        defaultValue={selectedLang?.code}
      >
        <SelectTrigger className="w-auto justify-start gap-2 border-0 p-0">
          <SelectValue placeholder={selectedLang?.language} />
        </SelectTrigger>
        <SelectContent>
          {locales.map((local, i) => (
            <SelectItem key={i} value={local.code}>
              {local.language}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
