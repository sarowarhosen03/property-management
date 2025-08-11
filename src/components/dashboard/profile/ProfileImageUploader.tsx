import { useSession } from "next-auth/react";
import { useState } from "react";
import { ProfileAvatar } from "./ProfileAvatar";
import ProfileImageUploaderModal from "./ProfileImageUploaderModal";

const ProfileImageUploader = ({
  onImageSrc,
  profileDict,
}: {
  onImageSrc: any;
  profileDict: any;
}) => {
  const { data: session } = useSession();
  const { user } = session || {};

  const [isOpen, setOpen] = useState(false);
  const avatar = user?.avatar;

  return (
    <div className="mb-8 flex items-center">
      <ProfileAvatar
        avatar={avatar as string}
        name="er"
        className="h-14 w-14"
      />
      <h6
        className="ml-6 cursor-pointer text-2xl font-semibold"
        onClick={() => setOpen(true)}
      >
        {avatar ? profileDict.changePhoto : profileDict.AddPhoto}
      </h6>
      <ProfileImageUploaderModal
        open={isOpen}
        onOpen={setOpen}
        avatar={avatar as string}
        onImageSrc={onImageSrc}
        userDict={profileDict}
      />
    </div>
  );
};

export default ProfileImageUploader;
