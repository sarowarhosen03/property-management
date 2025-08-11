import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { FC } from "react";

interface PropertyStatusProps {
  title: string;
  status: "active" | "inactive" | "disabled";
  className?: string;
  isHideBorder?: boolean;
}

interface StatusProps {
  status: PropertyStatusProps["status"];
}

const StatusIndicator: FC<StatusProps> = ({ status }) => {
  const activeClasses = status === "active" ? "bg-secondary" : "";
  const inactiveClasses =
    status === "inactive" ? "bg-secondary w-3 h-3 rounded-full" : "";

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full",
        activeClasses,
      )}
    >
      {status === "active" && <Check className="w-4 text-white" />}
      {status === "inactive" && <div className={inactiveClasses}></div>}
    </div>
  );
};

export const PropertyStatusCheckbox: FC<PropertyStatusProps> = ({
  status,
  title,
  className,
  isHideBorder = false,
}) => {
  const borderStatusClasses =
    status === "active" ? "bg-secondary" : "bg-gray-200";

  return (
    <div
      className={cn(
        "group flex flex-1 items-center last:flex-initial",
        className,
      )}
    >
      <div className="relative mr-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 group-last:mr-0">
        <StatusIndicator status={status} />
        <span className="absolute -bottom-10 whitespace-nowrap">{title}</span>
      </div>
      {!isHideBorder && (
        <div
          className={cn(
            "mr-1.5 h-[2px] w-full flex-1 rounded-full group-last:hidden",
            borderStatusClasses,
          )}
        />
      )}
    </div>
  );
};
