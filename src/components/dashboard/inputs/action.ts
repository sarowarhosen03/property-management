import { langDB } from "./YandexMap";

export async function getPlacesSuggestion(
  address: string,
  devMode = true,
  results = 50,
  type = "geo",
) {
  if (devMode) {
    return new Promise((res) =>
      setTimeout(
        () =>
          res({
            suggest_reqid: "1726123993785826-3644940109-suggest-maps-yp-11",
            results: [
              {
                title: {
                  text: "Hrachya Nersisyan Street",
                  hl: [
                    {
                      begin: 0,
                      end: 7,
                    },
                    {
                      begin: 8,
                      end: 17,
                    },
                    {
                      begin: 18,
                      end: 24,
                    },
                  ],
                },
                subtitle: {
                  text: "Yerevan",
                  hl: [
                    {
                      begin: 0,
                      end: 7,
                    },
                  ],
                },
                tags: ["street"],
                distance: {
                  value: 6337812.793,
                  text: "6337.81 km",
                },
                address: {
                  formatted_address: "Yerevan, Hrachya Nersisyan Street",
                  component: [
                    {
                      name: "Armenia",
                      kind: ["COUNTRY"],
                    },
                    {
                      name: "Yerevan",
                      kind: ["LOCALITY"],
                    },
                    {
                      name: "Hrachya Nersisyan Street",
                      kind: ["STREET"],
                    },
                  ],
                },
              },
            ],
          }),
        2000,
      ),
    );
  }

  const resultData = await Promise.all(
    Object.values(langDB).map(async (langCode, index) => {
      const url = new URL("https://suggest-maps.yandex.ru/v1/suggest");
      url.searchParams.set(
        "apikey",
        process.env.NEXT_PUBLIC_YANDEX_MAP_SUGGEST_API!,
      );
      url.searchParams.set("types", type);
      url.searchParams.set("text", address);
      url.searchParams.set("lang", langCode);
      url.searchParams.set("results", String(results));
      const res = await fetch(url.toString());

      const result = await res.json();
      return { lang: Object.keys(langDB)[index], data: result?.results || [] };
    }),
  );
  return resultData;
}

export async function getPlacesSuggestionByLang(
  address: string,
  lang: keyof typeof langDB,
  devMode = true,
  results = 50,
  type = "geo",
) {
  if (devMode) {
    return new Promise((res) =>
      setTimeout(
        () =>
          res({
            lang,
            results: [
              {
                title: {
                  text: "Hrachya Nersisyan Street",
                  hl: [
                    { begin: 0, end: 7 },
                    { begin: 8, end: 17 },
                    { begin: 18, end: 24 },
                  ],
                },
                subtitle: {
                  text: "Yerevan",
                  hl: [{ begin: 0, end: 7 }],
                },
                tags: ["street"],
                distance: {
                  value: 6337812.793,
                  text: "6337.81 km",
                },
                address: {
                  formatted_address: "Yerevan, Hrachya Nersisyan Street",
                  component: [
                    { name: "Armenia", kind: ["COUNTRY"] },
                    { name: "Yerevan", kind: ["LOCALITY"] },
                    { name: "Hrachya Nersisyan Street", kind: ["STREET"] },
                  ],
                },
              },
            ],
          }),
        2000,
      ),
    );
  }

  const url = new URL("https://suggest-maps.yandex.ru/v1/suggest");
  url.searchParams.set(
    "apikey",
    process.env.NEXT_PUBLIC_YANDEX_MAP_SUGGEST_API!,
  );
  url.searchParams.set("types", type);
  url.searchParams.set("text", address);
  url.searchParams.set("lang", langDB[lang]);
  url.searchParams.set("results", String(results));
  const res = await fetch(url.toString());
  const result = await res.json();
  return { lang, data: result?.results || [] };
}

export async function getGeoInfo(
  options: {} & (
    | {
        cordMode: true;
        cords: [number, number];
      }
    | {
        cordMode: false;
        address: string;
      }
  ),
) {
  const resultData = await Promise.all(
    Object.values(langDB).map(async (langCode, index) => {
      const url = new URL("https://geocode-maps.yandex.ru/1.x");
      let geoCode = "";
      if (options.cordMode) {
        geoCode = `${options.cords[1]},${options.cords[0]}`;
      } else {
        geoCode = options.address;
      }
      url.searchParams.set("geocode", geoCode);
      url.searchParams.set(
        "apikey",
        process.env.NEXT_PUBLIC_YANDEX_MAP_GEOCODER_API!,
      );
      url.searchParams.set("format", "json");
      url.searchParams.set("lang", langCode);

      const res = await fetch(url.toString());
      const result = await res.json();
      return { lang: Object.keys(langDB)[index], data: result };
    }),
  );

  return resultData;
}
