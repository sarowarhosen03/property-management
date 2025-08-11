import { langType } from "@/app/[lang]/(main)/page";
import { getAdminDictionary } from "@/lib/getDictionary";
import Profile from "./_component/Profile";
interface ProfileProps {
  params: {
    lang: string;
  };
}
export default async function ProfilePage({ params: { lang } }: ProfileProps) {
  const proflieDict = await getAdminDictionary(lang as langType, "profile");
  return <Profile profileDict={proflieDict} />;
}
