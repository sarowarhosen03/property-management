import { langType } from "@/app/[lang]/(main)/page";
import { defaultLocale } from "./internationlization";

export const getDectionary = async (
  langCode: string,
  node?: string,
  prefix = "main",
) => {
  let data = null;
  const fileName = `${prefix}-${langCode}-${node}`;
  try {
    const dataResponse = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/dictionary/${fileName}`,
    );
    if (!dataResponse.ok) {
      return { error: true };
    }
    const jsonResponse = await dataResponse.json();

    return jsonResponse;
  } catch (error) {
    data = await import(`./db/${prefix}-${defaultLocale}.json`, {
      with: { type: "json" },
    }).then((module) => module.default);
    if (node) {
      return data?.[node] || data;
    }
  }
};

export const getAdminDictionary = async (
  lang: langType,
  node: string,
  prefix = "admin",
) => {
  return await getDectionary(lang, node, prefix);
};

export const getDectionaryInfo = async (
  langCode: string,
  node?: string,
  prefix = "main",
) => {
  let data = null;
  try {
    data = await import(`./db/${prefix}-${langCode}.json`, {
      with: { type: "json" },
    }).then((module) => module.default);
  } catch (error) {
    data = await import(`./db/${prefix}-${defaultLocale}.json`, {
      with: { type: "json" },
    }).then((module) => module.default);
  }

  if (node) {
    return data?.[node] || data;
  }
  return data;
};
