import { langType } from "@/app/[lang]/(main)/page";
import { CreateUserForm } from "@/components/dashboard/forms/UserForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users } from "@/lib/db/type";
import { getAdminDictionary } from "@/lib/getDictionary";

export default async function AddUserPage({
  params: { lang },
}: {
  params: { lang: langType };
}) {
  const userDict: Users = await getAdminDictionary(lang, "users");
  return (
    <div className="-m-8 flex flex-col bg-secondary-100">
      <ScrollArea className="font-medium">
        <div className="space-y-8 bg-secondary-100">
          <div className="">
            <CreateUserForm initialData={null} key={null} userDict={userDict} />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
