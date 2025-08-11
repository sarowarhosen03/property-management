import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Profile } from "@/lib/db/type";
import React, { FC, SetStateAction } from "react";
import Dropzone from "react-dropzone";

interface ProfileImageUploaderProps {
  open: boolean;
  close?: boolean;
  avatar: string;
  userDict: Profile;
  setAvatar?: React.Dispatch<SetStateAction<string>>;
  onOpen: any;
  onImageSrc: (src: string) => void;
}

const ProfileImageUploaderModal: FC<ProfileImageUploaderProps> = ({
  open,
  onOpen,
  onImageSrc,
  userDict,
}) => {
  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      onImageSrc(reader.result as string);
    };
    onOpen(false);
    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="profile-avatar-shadow rounded-lg bg-white"
        onOpen={onOpen}
      >
        <Dropzone onDrop={handleDrop} multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="cursor-pointer border-2 border-dashed border-gray-300 p-6 text-center"
            >
              <input {...getInputProps()} />
              <p>{userDict.dragAndDrop}</p>
            </div>
          )}
        </Dropzone>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileImageUploaderModal;
