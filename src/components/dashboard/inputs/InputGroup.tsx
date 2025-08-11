import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import AddField from "@/svgs/add-button.svg";
import { ControllerRenderProps } from "react-hook-form";

interface CollapsibleTextAreaProps {
  placeholder: string;
  field: ControllerRenderProps<any, any>;
  label: string;
}

export const InputGroup: React.FC<CollapsibleTextAreaProps> = ({
  field,
  placeholder,
  label,
  ...rest
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center justify-between">
        <CollapsibleTrigger asChild>
          <div className="flex cursor-pointer gap-2">
            <div className="h-6 w-6">
              <AddField />
            </div>
            <h4 className="text-lg font-semibold">{label}</h4>
          </div>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2">
        <Input placeholder={placeholder} {...field} {...rest} />
      </CollapsibleContent>
    </Collapsible>
  );
};
