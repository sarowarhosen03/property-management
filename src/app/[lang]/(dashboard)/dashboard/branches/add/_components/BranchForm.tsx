"use client";
import { Loader } from "@/components/common/Loader";
import { showToast } from "@/components/common/toaster/toaster";
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
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { API_URL } from "@/config/site";
import { Branch, createBranchSchema } from "@/lib/BranchSchema";
import { BranchTypes } from "@/lib/db/type";
import { revalidateByTag } from "@/lib/revalidateCache";
import { ApiResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { assetsUploadsWithoutWatermark } from "../../../../../../../components/dashboard/forms/_utils/assetsUpload";
import Dropzone from "../_components/ImageUploader";

interface BranchFormProps {
  initialData: any | null;
  branchDict: BranchTypes;
}

async function addBranch(
  token: string,
  body: FormData,
): Promise<ApiResponse<Branch[]>> {
  const response = await fetch(`${API_URL}/branches`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json: ApiResponse<Branch[]> = await response.json();
  return json;
}

async function updateBranch(
  branchId: string,
  token: string,
  body: FormData,
): Promise<ApiResponse<Branch[]>> {
  const response = await fetch(`${API_URL}/branches/${branchId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json: ApiResponse<Branch[]> = await response.json();
  return json;
}

export const BranchForm: React.FC<BranchFormProps> = ({
  initialData,
  branchDict,
}) => {
  const { data } = useSession();
  const router = useRouter();
  const title = initialData ? "Edit branch" : "Add New Branch";
  const description = "";
  const action = initialData ? "Save changes" : "Create Branch";

  const token = data?.user.token as string;

  const defaultValues = initialData
    ? initialData
    : {
        name: "",
        coverImage: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        },
        contact: {
          phone: "",
          email: "",
        },
      };

  const form = useForm<Branch>({
    mode: "onChange",
    resolver: zodResolver(createBranchSchema(branchDict)),
    defaultValues,
  });
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: Branch): Promise<void> => {
    try {
      if (typeof data?.coverImage !== "string") {
        const uploadedImages = await assetsUploadsWithoutWatermark([
          data.coverImage,
        ]);
        if (!uploadedImages?.length) {
          throw new Error("Cover image upload failed");
        }
        data.coverImage = uploadedImages[0];
      }

      let user;
      if (initialData) {
        const { _id: branchId } = initialData;
        user = await updateBranch(branchId, token, data);
      } else {
        user = await addBranch(token, data);
      }

      // Handle response and show notifications
      if (!user.success) {
        showToast({
          message: user?.message,
          type: "error",
          title: branchDict.error,
        });
        return;
      }

      showToast({
        message: user?.message,
        type: "success",
        title: branchDict.success,
      });
      revalidateByTag("branch");
      router.push(`/dashboard/branches`);
    } catch (error: any) {
      showToast({
        message: error?.message,
        type: "error",
        title: branchDict.error,
      });
    }
  };

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

              <Button
                variant="normal"
                size="normal"
                className="self-start"
                asChild
              >
                <Link href="/dashboard/branches">
                  {branchDict.BackToBranch}
                  <ArrowRight className="mr-2" size={20} />
                </Link>
              </Button>
            </div>
            <Separator className="!mt-4" />
            <div className="w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{branchDict.CoverImage} *</FormLabel>
                    <FormControl>
                      <Dropzone
                        className="w-full"
                        fieldName="coverImage"
                        i18Data={branchDict}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="gap-8 md:grid md:grid-cols-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{branchDict.name} *</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder={branchDict.BranchName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{branchDict.Email} *</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder={branchDict.EmailAddress}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{branchDict.Phone} *</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder={branchDict.PhoneNumber}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-8 rounded-lg bg-secondary-50 px-8 pb-10 pt-8">
            <div className="flex items-center justify-between">
              <Heading
                title={branchDict.AddressAndLocation}
                description={branchDict.AddLocationandaddress}
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
                      <FormLabel>{branchDict.StreetAddress} *</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder={branchDict.StreetAddress}
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
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{branchDict.City} *</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder={branchDict.City}
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
                    <FormLabel>{branchDict.State} *</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder={branchDict.State}
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
                    <FormLabel>{branchDict.ZipCode} *</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder={branchDict.ZipCode}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{branchDict.Country} *</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder={branchDict.Country}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Button
                disabled={isSubmitting}
                className="ml-auto flex gap-4"
                type="submit"
              >
                {action} {isSubmitting && <Loader />}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
