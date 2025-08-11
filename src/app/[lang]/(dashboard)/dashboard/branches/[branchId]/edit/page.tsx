import { ScrollArea } from "@/components/ui/scroll-area";
import { API_URL } from "@/config/site";
import { Branch } from "@/lib/BranchSchema";
import { BranchTypes } from "@/lib/db/type";
import { getAdminDictionary } from "@/lib/getDictionary";
import { BranchForm } from "../../add/_components/BranchForm";

interface EditBranchPageProps {
  params: {
    branchId: string;
    lang: string;
  };
}

const fetchBranch = async (branchId: string): Promise<Branch> => {
  const response = await fetch(`${API_URL}/branches/${branchId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch branch with id ${branchId}`);
  }
  const branch = await response.json();
  return branch.data;
};

export default async function EditBranchPage({ params }: EditBranchPageProps) {
  const { branchId, lang } = params;

  const branch = await fetchBranch(branchId);

  const branchDict: BranchTypes = await getAdminDictionary(lang, "branches");

  return (
    <div className="-m-8 flex flex-col bg-secondary-100">
      <ScrollArea className="font-medium">
        <div className="space-y-8 bg-secondary-100">
          <BranchForm initialData={branch} branchDict={branchDict} />
        </div>
      </ScrollArea>
    </div>
  );
}
