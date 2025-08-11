import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { PropertyForm } from "@/lib/db/type";
import { useSession } from "next-auth/react";
export default function IsBestOffer({
  form,
  dict,
}: {
  form: any;
  dict: PropertyForm;
}) {
  const { data } = useSession();

  return (
    <div
      className={`${data?.user?.role !== "admin" ? "hidden" : ""} mt-8 flex flex-col`}
    >
      <div className="relative">
        <FormField
          control={form.control}
          name="isBestOffers"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex gap-3">
                  <Checkbox
                    id="best-offer"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="best-offer">{dict["Best offer?"]}</Label>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
