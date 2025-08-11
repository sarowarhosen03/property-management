"use server";

import { headers } from "next/headers";

interface IpResponse {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

export default async function getIp() {
  const header = headers();
  let ip =
    header.get("cf-connecting-ip") ||
    header.get("x-forwarded-for")?.split(",")[0] ||
    "127.0.0.1";
  if (ip === "::1") ip = "103.249.239.255";
  const ipInfo = await fetch(`http://ip-api.com/json/${ip}`)
    .catch(() => ({
      json: async () => ({
        status: "fail",
        country: "Unknown",
        countryCode: "AM",
        region: "",
        regionName: "",
        city: "",
        zip: "",
        lat: 0,
        lon: 0,
        timezone: "",
        isp: "",
        org: "",
        as: "",
      }),
    }))
    .then((r) => r);
  const countryInfo: IpResponse = await ipInfo.json();

  return [countryInfo?.countryCode || "AM", ip];
}
