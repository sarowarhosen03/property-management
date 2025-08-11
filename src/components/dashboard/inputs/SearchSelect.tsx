import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { forwardRef, useState } from "react";

interface Option {
  value: string;
  label: string;
}

export interface SelectSearchProps {
  options: Option[];
  className?: string;
  notFoundFallback: string;
  selectLabel: string;
  searchInputPlaceholder: string;
  onChange?: (value: string) => void;
  value?: string;
}

export const SelectSearch = forwardRef<HTMLButtonElement, SelectSearchProps>(
  (
    {
      options,
      className,
      notFoundFallback,
      selectLabel,
      searchInputPlaceholder,
      onChange,
      value,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);

    const handleSelect = (currentValue: string) => {
      if (onChange) {
        onChange(currentValue);
      }
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "flex h-10 w-full justify-between rounded-md border border-input bg-background px-3 py-2 text-left text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:bg-transparent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : selectLabel}
            <ChevronDown
              className={cn("ml-2 h-4 w-4 shrink-0 opacity-50", {
                "rotate-180": open,
              })}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder={searchInputPlaceholder} />
            <CommandList>
              <CommandEmpty>{notFoundFallback}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

SelectSearch.displayName = "SelectSearch";
