import { cn } from "@/lib/utils";
import Image from "next/image";
import { forwardRef, useCallback, useEffect } from "react";
import {
  DropEvent,
  DropzoneOptions,
  FileRejection,
  useDropzone,
} from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";

import CloseCircle from "@/svgs/x-circle.svg";
import { showToast } from "./common/toaster/toaster";

interface PreviewFile extends File {
  preview: string;
}

interface ImageUploaderProps {
  className?: string;
  fieldName: string;
}

const ImageUploader = forwardRef<HTMLInputElement, ImageUploaderProps>(
  ({ className, fieldName, onOpen, files, setFiles, userDict }, ref) => {
    const { setValue, getValues } = useFormContext();

    const hasImage = getValues(fieldName);

    useEffect(() => {
      if (hasImage && typeof hasImage === "string") {
        setFiles([
          {
            name: hasImage.split("/").pop() || "existing-image",
            preview: hasImage,
            lastModified: new Date().getTime(),
            size: 0,
            type: "image/*",
            slice: () => new Blob(),
          } as PreviewFile,
        ]);
      }
    }, [hasImage, fieldName]);

    const onDrop: DropzoneOptions["onDrop"] = useCallback(
      (
        acceptedFiles: File[],
        rejectedFiles: FileRejection[],
        _event: DropEvent,
      ) => {
        if (acceptedFiles?.length) {
          const [firstAcceptedFile] = acceptedFiles;
          setFiles((previousFiles) => [
            ...previousFiles,
            Object.assign(firstAcceptedFile, {
              preview: URL.createObjectURL(firstAcceptedFile),
            }),
          ]);

          setValue(fieldName, firstAcceptedFile);
          onOpen();
        } else {
          showToast({
            type: "warning",
            title: userDict.ImageSizeLimit,
            message: userDict.ImageExceedsSizeLimit,
          });
        }
      },
      [setValue, fieldName],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: {
        "image/*": [],
      },
      maxSize: 1024 * 1000,
      onDrop,
    });

    useEffect(() => {
      return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    const removeFile = (name: string) => {
      setFiles((files) => files.filter((file) => file.name !== name));
      setValue(fieldName, null); // Clear the field value in the form
    };

    return (
      <>
        <div
          {...getRootProps({
            className: cn(
              "dropzone p-4 border-2 border-dashed border-seondary rounded-md h-[214px] flex items-center justify-center bg-secondary-100 w-full cursor-pointer",
              className,
              { hidden: files.length > 0 },
            ),
          })}
        >
          <Input {...getInputProps()} ref={ref} className="cursor-pointer" />
          <div className="flex items-center gap-4">
            <div className="h-[54px] w-[54px]">
              <Image
                src={"/svgs/photo.svg"}
                width={54}
                height={54}
                alt="photo"
              />
            </div>
            <p className="text-lg font-semibold">
              {userDict.DropOrUploadPhoto}
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <section className="mt-10">
            <div
              key={files[0].name}
              className="relative h-[214px] overflow-hidden rounded-md border border-secondary-100"
            >
              <Image
                src={files[0].preview}
                alt={files[0].name}
                fill
                onLoad={() => {
                  URL.revokeObjectURL(files[0].preview);
                }}
                className="h-full w-full rounded-md object-contain"
              />
              <button
                type="button"
                className="absolute right-2 top-2 h-7 w-7"
                onClick={() => removeFile(files[0].name)}
              >
                <CloseCircle />
              </button>
            </div>
            <p className="mt-2 text-[12px] font-medium text-neutral-500">
              {files[0].name}
            </p>
          </section>
        )}
      </>
    );
  },
);

ImageUploader.displayName = "ImageUploader";

export default ImageUploader;
