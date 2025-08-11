import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import AddField from "@/svgs/add-button.svg";
import { ControllerRenderProps } from "react-hook-form";

interface CollapsibleTextAreaProps {
  placeholder: string;
  field: ControllerRenderProps<any, any>;
  label: string;
}

export const TextareaGroup: React.FC<CollapsibleTextAreaProps> = ({
  field,
  placeholder,
  label,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center justify-between">
        <CollapsibleTrigger asChild>
          <div className="flex gap-2 cursor-pointer">
            <div className="w-6 h-6">
              <AddField />
            </div>
            <h4 className="text-lg font-semibold">{label}</h4>
          </div>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2">
        <Textarea className="h-[240px]" placeholder={placeholder} {...field} />
      </CollapsibleContent>
    </Collapsible>
  );
};
