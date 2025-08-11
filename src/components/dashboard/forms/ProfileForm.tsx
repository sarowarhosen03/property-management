import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generateProfileSchema, ProfileFormType, profileSchema } from "@/lib/ProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Loader } from "@/components/common/Loader";
import { showToast } from "@/components/common/toaster/toaster";
import { Profile } from "@/lib/db/type";
import AddField from "@/svgs/add-button.svg";
import { getUserById } from "@/utils/fetchData";
import { updateUserProfile } from "@/utils/mutations";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import ProfileImageUploader from "../profile/ProfileImageUploader";

const ProfileForm = ({
  onImageSrc,
  session,
  profileDict,
}: {
  session: any;
  onImageSrc: (src: string) => void;
  profileDict: Profile;
}) => {
  const { update } = useSession();
  const { user } = session?.data || {};

  const [isLoading, setIsLoading] = useState(true);
  const form = useForm<ProfileFormType>({
    resolver: zodResolver(generateProfileSchema(profileDict)),
    defaultValues: {},
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const responseUser = await getUserById(user?.id);
        const userData = responseUser.data;
        const defaultValueUser = {
          name: userData.firstName + " " + userData.lastName,
          email: userData.email,
          phoneNumbers: userData.phoneNumbers,
        };
        form.reset(defaultValueUser);
      } catch (error) {
        showToast({
          type: "error",
          title: profileDict.error,
          message: profileDict.thereWasAnProblem,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "phoneNumbers",
  });

  const onSubmit = async (data: ProfileFormType) => {
    try {
      const fullName = data.name.trim().split(" ");
      const body = {
        ...data,
        firstName: fullName[0],
        lastName: fullName.slice(1).join(" "),
      };
      delete (body as Partial<typeof body>).name;
      await updateUserProfile(body);
      showToast({
        message: profileDict.profileUpdateSuccess,
        type: "success",
        title: profileDict.success,
      });
      update(data);
    } catch (err) {
      if (err instanceof Error) {
        showToast({
          message: err.message,
          type: "error",
          title: profileDict.error,
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[70dvh] items-center justify-center">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-b-8 border-t-8 border-gray-200"></div>
          <div className="absolute left-0 top-0 h-24 w-24 animate-spin rounded-full border-b-8 border-t-8 border-blue-500"></div>
        </div>
      </div>
    );
  }

  const socialOptions = [
    { value: "telegram", label: profileDict.telegram },
    { value: "whatsApp", label: profileDict.whatsApp },
    { value: "viber", label: profileDict.viber },
    { value: "messenger", label: profileDict.messenger },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 w-full space-y-8"
      >
        <div className="w-1/2 space-y-4 2xl:w-1/3">
          <ProfileImageUploader
            onImageSrc={onImageSrc}
            profileDict={profileDict}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{profileDict.fullName}</FormLabel>
                <FormControl className="pr-20">
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="relative">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{profileDict.email} </FormLabel>
                  <FormControl className="pl-10">
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="absolute left-2.5 top-[42px] h-5 w-5">
              <Image
                src="/svgs/envelop.svg"
                width={20}
                height={20}
                alt="envelop"
                className="h-5 w-5"
              />
            </div>
          </div>

          {fields.map((field, index) => (
            <div key={field.id}>
              <FormField
                control={form.control}
                name={`phoneNumbers[${index}].number` as any}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>{profileDict.phoneNumber}</FormLabel>
                      <X
                        onClick={(e) => {
                          e.preventDefault();
                          remove(index);
                        }}
                        className="text-red-500"
                      />
                    </div>
                    <FormControl>
                      <Input {...field} placeholder="+374 xx xxx xxx" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-2">
                <FormField
                  control={form.control}
                  name={`phoneNumbers[${index}].types` as any}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <>
                            <FormLabel>
                              {" "}
                              {profileDict.selectMessengersAttachedToThisNumber}
                            </FormLabel>
                            <div className="flex flex-col gap-5">
                              {socialOptions.map(({ value, label }) => {
                                return (
                                  <div
                                    key={value}
                                    className="flex w-[200px] items-center justify-between space-x-3"
                                  >
                                    <Checkbox
                                      id={`${Math.random()}` as any}
                                      {...field}
                                      checked={field.value?.includes(value)} // Check against the value
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          field.onChange([
                                            ...field.value,
                                            value,
                                          ]);
                                        } else {
                                          field.onChange(
                                            field.value.filter(
                                              (op: any) => op !== value,
                                            ),
                                          );
                                        }
                                      }}
                                    />
                                    <label
                                      htmlFor={
                                        `phoneNumbers[${index}].${value}` as any
                                      }
                                      className="flex w-full items-center justify-between font-medium"
                                    >
                                      {label.charAt(0).toUpperCase() +
                                        label.slice(1)}{" "}
                                      {/* Use label for display */}
                                      <div className="ml-5 h-8 w-8">
                                        <Image
                                          src={`/svgs/${value.toLocaleLowerCase()}-l.svg`}
                                          width={32}
                                          height={32}
                                          alt={value}
                                        />
                                      </div>
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => append({ number: "", types: [] } as any)}
          className="flex items-center"
        >
          <span className="mr-2 h-6 w-6">
            <AddField />
          </span>
          {profileDict.addNewNumber}
        </button>
        <div className="flex gap-4">
          <Button variant={"tertiary"}>{profileDict.cancel}</Button>
          <Button
            disabled={form.formState.isSubmitting}
            className="flex gap-2"
            type="submit"
          >
            {profileDict.saveChanges}{" "}
            {form.formState.isSubmitting && <Loader />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
