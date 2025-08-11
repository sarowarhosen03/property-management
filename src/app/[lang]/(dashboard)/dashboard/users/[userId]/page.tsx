import { langType } from "@/app/[lang]/(main)/page";
import UserDetails from "@/components/dashboard/user/UserDetails";
import UserProperties from "@/components/dashboard/user/UserProperties";
import UserSummary from "@/components/dashboard/user/UserSummary";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/config/site";
import { Users } from "@/lib/db/type";
import { getAdminDictionary } from "@/lib/getDictionary";
import { PropertyType } from "@/lib/Propertyschema";
import ArrowLeft from "@/svgs/arrow-left.svg";
import { User } from "@/types/userType";
import Link from "next/link";

interface UserPageProps {
  params: {
    userId: string;
    lang: langType;
  };
}

const fetchUser = async (userId: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    next: {
      tags: ["users"],
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch user with id ${userId}`);
  }
  const { data: user } = await response.json();
  return user;
};

const fetchProperties = async (userId: string): Promise<PropertyType[]> => {
  const response = await fetch(`${API_URL}/properties?agentId=${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch properties for user with id ${userId}`);
  }
  const { data: properties } = await response.json();

  return properties;
};

const UserPage = async ({ params: { userId, lang } }: UserPageProps) => {
  const userDict: Users = await getAdminDictionary(lang, "users");
  const [userResult, propertiesResult] = await Promise.allSettled([
    fetchUser(userId),
    fetchProperties(userId),
  ]);

  const user = userResult.status === "fulfilled" ? userResult.value : null;
  const properties =
    propertiesResult.status === "fulfilled" ? propertiesResult.value : [];

  // console.log(propertiesResult, "no properties", userId);

  return (
    <>
      <Button
        variant="normal"
        size="normal"
        className="-ml-4 self-start"
        asChild
      >
        <Link href="/dashboard/users">
          <ArrowLeft className="mr-2" />
          Back
        </Link>
      </Button>

      {user ? (
        <div className="mt-4 grid grid-cols-3 gap-4">
          <UserDetails user={user} userDict={userDict} />
          <UserSummary user={user} userDict={userDict} />
        </div>
      ) : (
        <p className="text-red-500">{userDict.FailedToLoadUserDetails}</p>
      )}

      {properties.length > 0 ? (
        <UserProperties properties={properties} lang={lang} />
      ) : (
        <p className="mt-4 text-sm">{userDict.NoPropertiesFoundForThisUser}</p>
      )}
    </>
  );
};

export default UserPage;
