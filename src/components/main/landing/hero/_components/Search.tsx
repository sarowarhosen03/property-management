"use client";

import { langType } from "@/app/[lang]/(main)/page";
import { getPlacesSuggestionByLang } from "@/components/dashboard/inputs/action";
import { SuggestResponse } from "@/components/dashboard/inputs/MapResponseType";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import React, {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SearchType } from "./SearchType";

export default function Search({
  search,
  lang,
}: {
  search: string;
  lang: langType;
}) {
  const searchTermRef = useRef<HTMLInputElement | null>({});
  const router = useRouter();

  const handleSearch = () => {
    if (searchTermRef?.current) {
      const searchTerm = searchTermRef.current?.value;
      if (searchTerm) {
        router.push(`/${lang}/properties?location=${searchTerm}`);
      }
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const [searchType, setSearchType] = useState<"address" | "id">("address");
  const [suggestions, setSuggestions] = useState<any>([]);
  const [idResult, setIdResult] = useState<any>([]);
  const debounceFetchSuggestions = useRef<any>(null);

  // const addressSuggestions = suggestions as any;

  const fetchSuggestionsFromServer = useCallback(
    async (value: string) => {
      startTransition(async () => {
        try {
          if (searchType == "id") return;
          const apiData = (await getPlacesSuggestionByLang(
            value,
            lang,
            false,
          )) as {
            lang: langType;
            data: SuggestResponse;
          }[];
          setSuggestions(apiData?.data as any);
        } catch (error) {
          // console.log(error);
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang, searchType],
  );

  useEffect(() => {
    debounceFetchSuggestions.current = debounce((value: string) => {
      if (value?.trim()) {
        fetchSuggestionsFromServer(value);
      } else {
        setIdResult({});
        setSuggestions([]);
      }
    }, 1000);
    return () => {
      debounceFetchSuggestions.current.cancel();
    };
  }, [fetchSuggestionsFromServer]);

  return (
    <div className="relative z-[2000] mx-auto w-full text-gray-600 md:max-w-[577px]">
      <div className="absolute left-0 flex items-center pl-4">
        <span>
          <svg
            className="size-3 fill-current leading-10"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            xmlSpace="preserve"
            width="512px"
            height="512px"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </span>
        <SearchType setSearchType={setSearchType} lang={lang} />
      </div>
      <input
        onKeyDown={handleKeyDown}
        ref={searchTermRef}
        type="search"
        name="search"
        placeholder={search}
        onChange={(e) => {
          setSuggestions([]);
          setIdResult({});
          const value = e.target.value;
          if (debounceFetchSuggestions?.current) {
            debounceFetchSuggestions.current(value);
          }
        }}
        className="search-shadow h-12 w-full rounded-full bg-white pl-[124px] pr-3 text-sm focus:outline-none"
      />
      {/* <button
        onClick={handleSearch}
        className="absolute right-0 top-0 mr-3 flex h-12 w-10 flex-col items-center justify-center"
      >
        <svg
          className="size-4 fill-current leading-10"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          xmlSpace="preserve"
          width="512px"
          height="512px"
        >
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </button> */}

      {suggestions && (
        <ul className="absolute left-0 right-0 top-full z-10 mt-2 max-h-60 overflow-y-auto rounded-md bg-white shadow-lg">
          {suggestions.map((item: any, i: number) => (
            <li
              key={i}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onMouseDown={(e) => {
                e.preventDefault();
                router.push(`/${lang}/properties?location=${item.title.text}`);
                // handle selection
              }}
            >
              {item.title.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
