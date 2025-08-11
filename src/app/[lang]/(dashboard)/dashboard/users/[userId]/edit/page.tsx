import { CreateUserForm } from "@/components/dashboard/forms/UserForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { API_URL } from "@/config/site";
import { Users } from "@/lib/db/type";
import { getAdminDictionary } from "@/lib/getDictionary";
import { User } from "@/types/userType";

interface UserPageProps {
  params: {
    userId: string;
  };
}

const fetchUser = async (userId: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    next: { tags: ["users"] },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch user with id ${userId}`);
  }
  const user = await response.json();
  return user.data;
};

export default async function EditUserPage({ params }: UserPageProps) {
  const { userId, lang } = params;

  const user = await fetchUser(userId);
  const userDict: Users = await getAdminDictionary(lang, "users");
  user.branchId = user.branchId._id;
  // user.branchId.label = user.branchId.name;
  delete user.branchId._id;
  delete user.branchId.name;

  return (
    <div className="-m-8 flex flex-col bg-secondary-100">
      <ScrollArea className="font-medium">
        <div className="space-y-8 bg-secondary-100">
          <div className="">
            <CreateUserForm initialData={user} userDict={userDict} />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
