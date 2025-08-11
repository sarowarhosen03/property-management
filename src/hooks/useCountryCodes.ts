import phone, { countryPhoneData } from "phone";
import { useEffect, useState } from "react";
import { UseFormSetError, UseFormSetValue } from "react-hook-form";

export default function useCountryCodes({
  countryCodeInfo,
  phoneNo,
  setError,
  setValue,
}: {
  countryCodeInfo: string;
  phoneNo: string;
  setError: UseFormSetError<{
    countryCode: string;
    phone: string;
    email: string;
    fullName: string;
    comment: string;
    propertyId: string;
    agentId: string;
  }>;
  setValue: UseFormSetValue<{
    propertyId: string;
    agentId: string;
    countryCode: string;
    phone: string;
    email: string;
    fullName: string;
    comment: string;
  }>;
}) {
  const [selectedCountry, setSelectedCountry] = useState(
    countryPhoneData.find((item) => {
      return item.alpha2 === countryCodeInfo;
    }) ||
      countryPhoneData.find((item) => {
        return item.alpha2 === "AM";
      }),
  );
  const countryCode = selectedCountry?.country_code;
  useEffect(() => {
    setValue("phone", "+" + countryCode);
  }, [countryCode, setValue]);

  useEffect(() => {
    if (phoneNo !== "+" + selectedCountry?.country_code && phoneNo !== "") {
      const status = phone(phoneNo, {
        country: selectedCountry?.alpha2,
      });

      if (!status.isValid || phoneNo.length < 6) {
        setError("phone", { type: "manual", message: "Invalid phone number" });
      } else {
        setError("phone", { type: "manual", message: "" });
      }
    }
  }, [phoneNo, selectedCountry, setError]);

  return [selectedCountry, setSelectedCountry];
}
