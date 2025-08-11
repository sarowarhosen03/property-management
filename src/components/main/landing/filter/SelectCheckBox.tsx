import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function SelectCheckBox({
  list,
  placeholder,
  handleChange,
  isChecked,
}: {
  list: string[];
  placeholder: string;
  handleChange: Function;
  isChecked: Function;
}) {
  return (
    <Select>
      <SelectTrigger className="h-9 rounded-full border border-secondary-700 text-base font-medium text-foreground outline-none">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="w-full max-w-[300px] border-transparent bg-[#cfcad7d9] outline-none backdrop-blur-[56px] focus:border-transparent">
        <div className="space-y-2 p-4">
          {list.map((opt: string, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <Checkbox
                onCheckedChange={() => handleChange(opt, i)}
                checked={isChecked(opt, i)}
                className="bg-white"
                id={opt}
              />
              <Label htmlFor={opt}>{opt}</Label>
            </div>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
}
