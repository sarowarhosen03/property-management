"use client";
import { publicAssetsUploads } from "@/components/dashboard/forms/_utils/assetsUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useCountryCodes from "@/hooks/useCountryCodes";
import { ContactType, contactSchema } from "@/lib/ContactSchema";
import { Contact } from "@/lib/db/type";
import { createContactMutation } from "@/utils/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import phone, { countryPhoneData } from "phone";
import { useForm } from "react-hook-form";
import { showToast } from "../toaster/toaster";
export default function ContactForm({
  dict,
  ipInfo: [countryCodeInfo, ip],
}: {
  dict: Contact;
  ipInfo: string[];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    trigger,
    reset,
    setError,
  } = useForm<ContactType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      countryCode: "+1",
      fullName: "",
      email: "",
      phone: "",
      comment: "",
      attachments: "",
    },
  });

  const phoneNo = watch("phone");
  const fileList = watch("attachments");

  const [selectedCountry, setSelectedCountry] = useCountryCodes({
    countryCodeInfo,
    phoneNo,
    setError,
    setValue,
  });

  const fileNames =
    fileList && fileList.length > 0
      ? Array.from(fileList)
          .map((file: any) => file.name)
          .join(", ")
      : dict.noFileSelected;

  const onSubmit = async (data: ContactType) => {
    try {
      const status = phone(phoneNo, {
        country: selectedCountry?.alpha2,
      });

      if (!status.isValid) {
        setError("phone", { type: "manual", message: "Invalid phone number" });
        return;
      }

      const attachFile = await publicAssetsUploads(data?.attachments);
      await createContactMutation({
        ...data,
        phone: status?.phoneNumber || data.phone,
        attachments: attachFile,
      });

      showToast({
        message:
          "Thanks for contacting us! We will get in touch with you soon.",
        type: "success",
        title: "Success",
      });

      reset();
    } catch (err) {
      showToast({
        message: "Failed to submit form",
        type: "error",
        title: "Error",
      });
    }
  };

  return (
    <>
      <form
        className="space-y-4 lg:space-y-6"
        onSubmit={handleSubmit(onSubmit, () => {})}
      >
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-sm leading-5">
            {dict.fullName}
          </Label>
          <Input
            id="name"
            placeholder={dict.nameDesc}
            {...register("fullName", { required: dict.nameError })}
            className={errors.fullName && "border-danger"}
          />
          {errors.fullName && (
            <p className="text-sm text-danger">{errors?.fullName?.message}</p>
          )}
        </div>

        <div>
          <div className="relative space-y-2">
            <Label htmlFor="email" className="mb-1.5 text-sm leading-5">
              {dict.email}
            </Label>
            <Input
              id="email"
              placeholder={dict.emailDesc}
              type="email"
              className={`errors.email && "border-danger" ps-10`}
              {...register("email", { required: dict.emailError })}
            />
            <div className="absolute left-2.5 top-[35px] h-5 w-5">
              <Image
                src="/svgs/envelop.svg"
                width={20}
                height={20}
                alt="envelop"
                className="h-5 w-5"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-danger">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="grid">
          <div className="space-y-2">
            <Label htmlFor="phone" className="mb-1.5 text-sm leading-5">
              {dict.phone}
            </Label>

            <div>
              <div className="flex items-center">
                <Select
                  value={selectedCountry?.country_code} // Ensure value is bound to state
                  {...{ ...register("countryCode"), ref: undefined }}
                  onValueChange={(value) => {
                    const newVal = countryPhoneData.find(
                      (item) => item.country_code === value,
                    );
                    setSelectedCountry(newVal);
                    setValue("countryCode", value);
                    trigger("phone");
                  }}
                >
                  <SelectTrigger className="h-[2.75rem] w-24 rounded-br-none rounded-tr-none border-r-0 border-input bg-transparent text-dark">
                    <SelectValue placeholder={selectedCountry?.alpha2 || ""} />
                  </SelectTrigger>
                  <SelectContent>
                    {countryPhoneData
                      .reduce((prev, curr) => {
                        if (
                          prev?.some(
                            (item) => item?.country_code === curr?.country_code,
                          )
                        ) {
                          return prev;
                        }
                        return [...prev, { ...curr }];
                      }, [])
                      .map((item: any) => (
                        <SelectItem
                          key={`${item.country_code}-${item.alpha2}`}
                          value={item.country_code}
                        >
                          {item?.alpha2}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <Input
                  {...register("phone", {
                    required: dict.phoneError,
                  })}
                  className="flex h-[2.75rem] w-full rounded-bl-none rounded-br-md rounded-tl-none rounded-tr-md border border-l-0 border-input bg-transparent py-2 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="phone"
                  placeholder={
                    selectedCountry?.country_code
                      ? "+" + selectedCountry?.country_code
                      : ""
                  }
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-danger">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="comment" className="mb-1.5 text-sm leading-5">
            {dict.comment}
          </Label>
          <Textarea
            className={`min-h-[100px]${errors.comment && "border-danger"}`}
            id="comment"
            placeholder={dict.optional}
            {...register("comment")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="file" className="text-sm leading-5">
            {dict.attachFile}
          </Label>
          <div className="relative">
            <Input
              id="file"
              type="file"
              {...register("attachments")}
              className="file:none hidden cursor-pointer pl-10 pt-2.5 file:hidden"
              accept="image/*,application/pdf,application/zip"
            />
            <button className="pointer-events-none absolute left-3 top-2.5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0004 17V8.99996C14.0004 7.89396 13.1064 6.99596 12.0004 6.99196V6.99196C10.8884 6.98696 9.9834 7.88796 9.9834 8.99996V16"
                  stroke="#474747"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 8V17.05"
                  stroke="#474747"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 8V15"
                  stroke="#474747"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 17V17.5C14 19.433 12.433 21 10.5 21V21C8.567 21 7 19.433 7 17.5V17"
                  stroke="#474747"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 8V8C17 5.239 14.761 3 12 3V3C9.239 3 7 5.239 7 8V8"
                  stroke="#474747"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <label htmlFor="file" className="input">
              {fileNames && <span>{fileNames}</span>}
            </label>
          </div>
        </div>
        <Button className="h-12 w-full" type="submit" size={"lg"}>
          {isSubmitting ? (
            <span className="flex gap-2">
              {dict.send}
              <span className="loader"></span>
            </span>
          ) : (
            dict.send
          )}
        </Button>
      </form>
    </>
  );
}
