import { Input } from "@/components/ui/input";
import { PropertyForm } from "@/lib/db/type";
import { PreviewFile } from "@/types";
import { MAX_IMAGE_UPLOAD } from "@/utils/constant";
import { uniqueId } from "lodash";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

const ImageUploader = ({
  images = [],
  dict,
}: {
  images: any;
  dict: PropertyForm;
}) => {
  const [files, setFiles] = useState<PreviewFile[]>(images);
  const { setValue, getValues, clearErrors } = useFormContext();
  const hasImages = getValues("images");

  useEffect(() => {
    if (hasImages && typeof hasImages === "string") {
      setFiles([
        {
          name: hasImages.split("/").pop() || "existing-image",
          preview: hasImages,
          lastModified: new Date().getTime(),
          size: 0,
          type: "image/*",
          slice: () => new Blob(),
        } as PreviewFile,
      ]);
    }
  }, [hasImages]);

  const onDrop = (acceptedFiles: File[]) => {
    const newImages: PreviewFile[] = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        id: uniqueId(),
      }),
    );
    clearErrors("images");
    setFiles((prevImages) => [...prevImages, ...newImages]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const handleRemoveImage = (removeImageIndex: number) => {
    setFiles((prevImages) =>
      prevImages.filter((_, index) => index !== removeImageIndex),
    );
  };

  const moveImage = (dragIndex: any, hoverIndex: any) => {
    const draggedImage = files[dragIndex];
    const reorderedFiles = [...files];
    reorderedFiles.splice(dragIndex, 1);
    reorderedFiles.splice(hoverIndex, 0, draggedImage);
    setFiles(reorderedFiles);
  };

  useEffect(() => {
    setValue("images", files);
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files, setValue]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div
          {...getRootProps()}
          className="dropzone flex h-[214px] items-center justify-center rounded-md border-2 border-dashed border-secondary bg-secondary-100 p-4"
        >
          <Input {...getInputProps()} type="file" multiple />

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
              {dict["Drop or upload photo (max"]}
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2 md:grid-cols-6 lg:grid-cols-9">
          {files.map((file, index) => (
            <DraggableImage
              key={file?.name}
              index={index}
              file={file}
              moveImage={moveImage}
              handleRemoveImage={handleRemoveImage}
              length={files?.length}
            />
          ))}
        </div>
        {files?.length > MAX_IMAGE_UPLOAD && (
          <h1 className="text-sm capitalize text-red-500">
            {dict["imageUploadError"]}{" "}
          </h1>
        )}
      </div>
    </DndProvider>
  );
};

const DraggableImage = ({
  file,
  index,
  length,
  moveImage,
  handleRemoveImage,
}: {
  file: any;
  index: any;
  length: any;
  moveImage: any;
  handleRemoveImage: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "image",
    hover: (item: any, monitor) => {
      if (item.index === index) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect() as any;
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset() as any;
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      // Adjusts the positioning sensitivity for smoother reordering
      if (item.index < index && hoverClientX < hoverMiddleX) return;
      if (item.index > index && hoverClientX > hoverMiddleX) return;

      moveImage(item.index, index);
      item.index = index;
    },
  });

  drag(drop(ref));
  let className = "col-span-1";
  if (length <= 3) {
    className = "col-span-3";
  } else if (length <= 4) {
    className = "col-span-2";
  } else if (length <= 5) {
    className = "col-span-1";
  }
  return (
    <div
      ref={ref}
      className={`relative ${className} mb-5 w-full cursor-move`}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div className="relative h-32 w-full overflow-hidden rounded-lg">
        <Image
          src={file.preview || file}
          alt="Preview"
          className={`h-full w-full rounded-md object-cover ${index >= 20 ? "blur-sm" : ""}`}
          layout="fill"
        />
      </div>
      <button
        type="button"
        onClick={() => handleRemoveImage(index)}
        className="absolute right-2 top-2 rounded-full bg-white bg-opacity-75 p-1"
      >
        <Image src={"/svgs/x-circle.svg"} width={24} height={24} alt="close" />
      </button>
    </div>
  );
};

export default ImageUploader;
