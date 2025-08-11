import { ScrollArea } from "@/components/ui/scroll-area";
import { BranchTypes } from "@/lib/db/type";
import { getAdminDictionary } from "@/lib/getDictionary";
import { BranchForm } from "./_components/BranchForm";

export default async function AddBranchPage({ params: { lang } }) {
  const branchDict: BranchTypes = await getAdminDictionary(lang, "branches");
  return (
    <div className="-m-8 flex flex-col bg-secondary-100">
      <ScrollArea className="font-medium">
        <div className="space-y-8 bg-secondary-100">
          <BranchForm initialData={null} branchDict={branchDict} />
        </div>
      </ScrollArea>
    </div>
  );
}
