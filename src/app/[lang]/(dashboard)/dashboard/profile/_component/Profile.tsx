"use client";
import PasswordChangeForm from "@/components/dashboard/forms/ChangePasswordForm";
import ProfileForm from "@/components/dashboard/forms/ProfileForm";
import { Profile as ProfileType } from "@/lib/db/type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ImageUploaderModal from "./ImageUploaderModal";

interface ProfileProps {
  profileDict: ProfileType;
}

export default function Profile({ profileDict }: ProfileProps) {
  const session = useSession();
  const userId = session?.data?.user.id as string;
  const token = session?.data?.user.token as string;

  const [imageSrc, setImageSrc] = useState("");
  const handleImageSrc = (src: string) => setImageSrc(src);
  return (
    <div className="relative min-h-screen">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="space-x-4">
          <TabsTrigger value="profile" asChild>
            <button className="rounded-full px-3 py-1.5 text-sm text-secondary transition-all duration-300 hover:bg-secondary hover:text-white data-[state=active]:bg-secondary data-[state=active]:text-white">
              {profileDict.profile}
            </button>
          </TabsTrigger>
          <TabsTrigger value="password" asChild>
            <button className="rounded-full px-3 py-1.5 text-sm text-secondary transition-all duration-300 hover:bg-secondary hover:text-white data-[state=active]:bg-secondary data-[state=active]:text-white">
              {profileDict.changePassword}
            </button>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          {session?.data && (
            <ProfileForm
              session={session}
              onImageSrc={handleImageSrc}
              profileDict={profileDict}
            />
          )}
          {imageSrc && (
            <ImageUploaderModal
              imageSrc={imageSrc}
              onClose={setImageSrc}
              profileDict={profileDict}
            />
          )}
        </TabsContent>
        <TabsContent value="password">
          <PasswordChangeForm
            userId={userId}
            token={token}
            profileDict={profileDict}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
