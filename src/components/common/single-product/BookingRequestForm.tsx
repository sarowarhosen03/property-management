"use client";
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
import { BookingSchemaType } from "@/lib/BookingSchema";
import { Contact } from "@/lib/db/type";
import { createInboxMutation } from "@/utils/mutations";
import phone, { countryPhoneData } from "phone";
import { useForm } from "react-hook-form";
import { showToast } from "../toaster/toaster";

export default function BookingRequestForm({
  propertyId,
  agentId,
  dict,
  ipinfo: [countryCodeInfo, ip],
}: {
  propertyId: string;
  agentId: string;
  dict: Contact;
  ipinfo: [string, string];
}) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
    watch,
    reset,
    setError,
  } = useForm<BookingSchemaType>({
    defaultValues: {
      countryCode: "+1",
      fullName: "",
      email: "",
      phone: "",
      comment: "",
      propertyId: propertyId,
      agentId: agentId,
    },
  });
  const phoneNo = watch("phone");
  const [selectedCountry, setSelectedCountry] = useCountryCodes({
    countryCodeInfo,
    phoneNo,
    setError,
    setValue,
  });

  const onSubmit = async (data: BookingSchemaType) => {
    try {
      const status = phone(phoneNo, {
        country: selectedCountry?.alpha2,
      });
      if (!status.isValid) {
        setError("phone", { type: "manual", message: "Invalid phone number" });
      }

      await createInboxMutation({
        ...data,
        isRead: false,
      });

      showToast({
        message:
          "Message has been successfully submitted! We will contact with you soon.",
        type: "success",
        title: "Success",
      });
      reset();
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      <form
        className="space-y-4 lg:px-7 xl:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-1.5">
          <Label className="text-sm text-light lg:text-base" htmlFor="name">
            {dict.fullName}
          </Label>
          <Input
            id="name"
            placeholder={dict.nameDesc}
            {...register("fullName", { required: dict.nameError })}
            className={`input-shadow bg-white placeholder:text-gray-650 ${errors.fullName && "border-danger"}`}
          />
          {errors.fullName && (
            <p className="text-sm text-danger">{errors.fullName.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <div className="relative">
            <Label className="text-sm text-light lg:text-base" htmlFor="email">
              {dict.email}
            </Label>
            <Input
              {...register("email", {
                required: dict.emailError,
              })}
              id="email"
              name="email"
              placeholder={dict.emailDesc}
              type="email"
              className={`input-shadow bg-white ps-10 placeholder:text-gray-650 ${errors.email && "border-danger"}`}
            />
            <div className="absolute left-2.5 top-[37px] h-5 w-5">
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3334 3.00004C18.3334 2.08337 17.5834 1.33337 16.6667 1.33337H3.33341C2.41675 1.33337 1.66675 2.08337 1.66675 3.00004M18.3334 3.00004V13C18.3334 13.9167 17.5834 14.6667 16.6667 14.6667H3.33341C2.41675 14.6667 1.66675 13.9167 1.66675 13V3.00004M18.3334 3.00004L10.0001 8.83337L1.66675 3.00004"
                  stroke="#667085"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {errors.email && (
              <p className="text-sm text-danger">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="grid">
          <div className="space-y-1.5">
            <Label className="text-sm text-light lg:text-base" htmlFor="phone">
              {dict.phone}
            </Label>
            <div>
              <div className="flex items-center">
                <Select
                  value={selectedCountry?.country_code} // Ensure value is bound to state
                  {...register("countryCode")}
                  onValueChange={(value) => {
                    const newVal = countryPhoneData.find(
                      (item) => item.country_code === value,
                    );
                    setSelectedCountry(newVal);
                    setValue("countryCode", value);
                    //trigger("phone");
                  }}
                >
                  <SelectTrigger
                    className={`select input-shadow h-[2.75rem] w-24 rounded-br-none rounded-tr-none border-r-0 bg-white text-dark placeholder:text-gray-650 ${errors.phone && "!border-danger"}`}
                  >
                    <SelectValue placeholder={selectedCountry?.alpha2} />
                  </SelectTrigger>
                  <SelectContent>
                    {countryPhoneData
                      .reduce((prev: any, curr) => {
                        if (
                          prev?.some(
                            (item: any) =>
                              item?.country_code === curr?.country_code,
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
                  className={`input-shadow flex h-[2.75rem] w-full rounded-bl-none rounded-br-md rounded-tl-none rounded-tr-md border border-l-0 border-input bg-white py-2 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-650 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.phone && "!border-danger"}`}
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
        <div className="space-y-1.5">
          <Label className="text-sm text-light lg:text-base" htmlFor="comment">
            {dict.comment}
          </Label>
          <Textarea
            {...register("comment", { required: dict.commentError })}
            className={`input-shadow min-h-[110px] bg-white placeholder:text-gray-650 ${errors.comment && "border-danger"}`}
            id="comment"
            name="comment"
            placeholder={dict.commentMessage}
          />
          {errors.comment && (
            <p className="text-sm text-danger">{errors.comment.message}</p>
          )}
        </div>
        <Button
          className="relative w-full"
          type="submit"
          disabled={isSubmitting}
          size={"lg"}
        >
          {isSubmitting ? (
            <span className="flex gap-2">
              Sending
              <span className="loader"></span>
            </span>
          ) : (
            dict.sendRequest
          )}
        </Button>
      </form>
    </>
  );
}
