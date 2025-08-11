"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { API_URL } from "@/config/site";
import { AgentType, generateAgentSchema } from "@/lib/AgentSchema";

import { ApiResponse, PreviewFile } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { SelectSearchField } from "../inputs/SearchSelectField";

import { Toaster } from "@/components/ui/sonner";
import { revalidateByTag } from "@/lib/revalidateCache";
import AddField from "@/svgs/add-button.svg";
import RemoveField from "@/svgs/x-circle.svg";

import AvatarUploaderModal from "@/app/[lang]/(dashboard)/dashboard/users/add/_components/AvatarUploaderModal";
import { showToast } from "@/components/common/toaster/toaster";
import ImageUploader from "@/components/ImageUploader";
import { BranchTypes, Users } from "@/lib/db/type";
import { assetsUploadsWithoutWatermark } from "./_utils/assetsUpload";
interface ProductFormProps {
  initialData: any | null;
  userDict: Users;
}

interface Options {
  value: string;
  label: string;
}

async function fetchBranches(
  token: string,
): Promise<ApiResponse<BranchTypes[]>> {
  const response = await fetch(`${API_URL}/branches`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const json: ApiResponse<BranchTypes[]> = await response.json();
  return json;
}

async function addUser(
  token: string,
  body: AgentType,
): Promise<ApiResponse<AgentType[]>> {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json: ApiResponse<AgentType[]> = await response.json();
  return json;
}

async function updateUser(
  id: string,
  token: string,
  body: AgentType,
): Promise<ApiResponse<AgentType[]>> {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json: ApiResponse<AgentType[]> = await response.json();
  return json;
}

export const CreateUserForm: FC<ProductFormProps> = ({
  initialData,
  userDict,
}) => {
  const { data } = useSession();
  const router = useRouter();
  const [branches, setBranches] = useState<Options[]>([]);
  const title = initialData ? userDict.EditUser : userDict.addNewUser;
  const description = initialData ? userDict.EditAUser : userDict.AddANewUser;
  const action = initialData ? userDict.SaveChanges : userDict.Create;

  const [showAvatarModalEditor, setShowAvatarModalEditor] =
    useState<Boolean>(false);

  const token = data?.user.token as string;

  useEffect(() => {
    const getBranches = async () => {
      try {
        const { data } = await fetchBranches(token);
        const getBranchesLabelAndId = data?.map(({ name, _id = "" }) => ({
          label: name,
          value: _id,
        }));
        setBranches(getBranchesLabelAndId);
        revalidateByTag("users");
      } catch (error) {
        console.error("Failed to fetch branches", error);
      }
    };

    if (token) {
      getBranches();
    }
  }, [token]);

  const defaultValues = initialData
    ? initialData
    : {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumbers: [
          {
            number: "",
            types: [],
          },
        ],
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        },
        avatar: "",
        bio: "",
        role: "",
        branchId: "",
      };

  const form = useForm<AgentType>({
    mode: "onChange",
    resolver: zodResolver(generateAgentSchema(userDict)),
    defaultValues,
  });

  const {
    formState: { isLoading, isSubmitting },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "phoneNumbers",
  });

  const onSubmit = async (data: AgentType): Promise<void> => {
    try {
      const avatar = await assetsUploadsWithoutWatermark([data?.avatar]);

      if (!initialData) {
        const newUser = await addUser(token, { ...data, avatar: avatar[0] });
        handleUserResponse(newUser);
        return;
      }

      const { _id: userId, email: defaultEmail } = initialData;

      const updatedData = {
        ...data,
        avatar: avatar[0],
        ...(defaultEmail !== data.email ? { email: data.email } : {}),
      };

      const updatedUser = await updateUser(userId, token, updatedData);
      handleUserResponse(updatedUser);
    } catch (error: any) {
      console.error("An error occurred during user submission:", error);
      showToast({
        message: error.message || userDict.anUnexpectedErrorOccurred,
        type: "error",
        title: userDict.Error,
      });
    }
  };

  const handleUserResponse = (user: any): void => {
    if (user.success) {
      showToast({
        type: "success",
        message: user.message,
        title: "Success",
      });
      revalidateByTag("users");
      router.push(`/dashboard/users`);
    } else {
      showToast({
        message: user.message,
        type: "error",
        title: userDict.Error,
      });
    }
  };

  const addPhoneNumberField = () => {
    append({ number: "", types: [] });
  };

  const [files, setFiles] = useState<PreviewFile[]>([]);

  const handleCloseAvatarEditor = () => {
    setShowAvatarModalEditor(false);
  };

  const handleOpenAvatarEditor = () => {
    setShowAvatarModalEditor(true);
  };

  const socialOptions = [
    { value: "telegram", label: userDict.telegram },
    { value: "whatsApp", label: userDict.whatsApp },
    { value: "viber", label: userDict.viber },
    { value: "messenger", label: userDict.messenger },
  ];

  return (
    <>
      <Toaster className="bg-white" duration={1000} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="space-y-8 rounded-lg bg-secondary-50 px-8 pb-10 pt-8">
            <div className="flex items-center justify-between">
              <Heading title={title} description={description} />
            </div>
            <Separator className="!mt-4" />

            <div className="w-full">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{userDict.Avatar} *</FormLabel>
                    <FormControl>
                      <ImageUploader
                        files={files}
                        setFiles={setFiles}
                        onOpen={handleOpenAvatarEditor}
                        className="w-full"
                        fieldName="avatar"
                        userDict={userDict}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="gap-8 md:grid md:grid-cols-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{userDict.FirstName} *</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder={userDict.FirstName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{userDict.LastName} *</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder={userDict.LastName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{userDict.Email} *</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder={userDict.EmailAddress}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{userDict.Role}</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder={userDict.SelectARole}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"agent"}>
                          {userDict.Agent}
                        </SelectItem>
                        <SelectItem value={"manager"}>
                          {userDict.Manager}
                        </SelectItem>
                        <SelectItem value={"director"}>
                          {userDict.Director}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="branchId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{userDict.Branch}</FormLabel>
                    <FormControl>
                      <SelectSearchField
                        name="branchId"
                        options={branches}
                        notFoundFallback={userDict.NoBranchesFound}
                        selectLabel={userDict.SelectABranch}
                        searchInputPlaceholder={userDict.SearchForABranch}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {fields.map((field, index) => (
                <div key={field.id}>
                  <FormField
                    control={form.control}
                    name={`phoneNumbers[${index}].number` as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{userDict.PhoneNumber}</FormLabel>

                        <div className="flex gap-4">
                          <FormControl>
                            <Input {...field} placeholder="+374 xx xxx xxx" />
                          </FormControl>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="flex items-center"
                          >
                            {index > 0 ? (
                              <RemoveField />
                            ) : (
                              <span className="block h-6 w-6"></span>
                            )}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mt-2 flex flex-row flex-wrap gap-5">
                    {socialOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-3"
                      >
                        <Controller
                          name={`phoneNumbers.${index}.types`}
                          control={form.control}
                          render={({ field }) => {
                            const handleChange = (checked: boolean) => {
                              const newValue = checked
                                ? [...field.value, option.value]
                                : field.value.filter(
                                    (type: string) => type !== option.value,
                                  );
                              field.onChange(newValue);
                            };

                            return (
                              <Checkbox
                                id={`phoneNumbers.${index}.types.${option.value}`}
                                onCheckedChange={handleChange}
                                checked={field.value?.includes(option.value)}
                              />
                            );
                          }}
                        />
                        <label
                          htmlFor={`phoneNumbers.${index}.types.${option.value}`}
                          className="flex w-full items-center justify-between font-medium"
                        >
                          {option.label}
                          <Image
                            src={`/svgs/${option.value.toLowerCase()}-l.svg`}
                            width={32}
                            height={32}
                            alt={option.label}
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addPhoneNumberField}
                className="flex items-center"
              >
                <span className="mr-2 h-6 w-6">
                  <AddField />
                </span>
                {userDict.AddNewNumber}
              </button>

              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{userDict.Bio}</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isLoading}
                          placeholder={userDict.description}
                          {...field}
                          className="min-h-[200px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="space-y-8 rounded-lg bg-secondary-50 px-8 pb-10 pt-8">
            <div className="flex items-center justify-between">
              <Heading
                title={userDict.AddressAndLocation}
                description={userDict.AddLocationAndAddress}
              />
            </div>
            <Separator className="my-4" />

            <div className="gap-8 md:grid md:grid-cols-4">
              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name="address.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{userDict.StreetAddress} *</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder={userDict.StreetAddress}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{userDict.Country} *</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder={userDict.Country}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{userDict.City} *</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder={userDict.City}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{userDict.ZipCode} *</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder={userDict.ZipCode}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{userDict.State} *</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder={userDict.State}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={isLoading || isSubmitting}
              className="ml-auto"
              type="submit"
            >
              {action}
            </Button>
          </div>
        </form>
      </Form>

      {showAvatarModalEditor && (
        <AvatarUploaderModal
          imageSrc={files}
          onClose={handleCloseAvatarEditor}
          setImageSrc={setFiles}
        />
      )}
    </>
  );
};
