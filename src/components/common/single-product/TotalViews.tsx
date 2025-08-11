"use client";
import { increaseViews } from "@/lib/propertyAnalitics";
import datePassed from "@/utils/datePassed";
import numberToAbbreviation from "@/utils/numberToAbbreviation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function TotalViews({
  views,
  id,
  agentId,
}: {
  agentId: string;
  views: number;
  id: string;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.includes("dashboard");
  useEffect(() => {
    // set our variable to true
    let isApiSubscribed = false;

    const updateViews = async () => {
      try {
        const visitedProperties = localStorage.getItem("viewsList");
        const viewsArray: {
          id: string;
          date: number;
        }[] = JSON.parse(visitedProperties || "[]");
        const findItem = viewsArray.find((v) => v.id === id);

        if (!findItem || datePassed(findItem.date)) {
          if (isAdmin) return;

          const addedView = await increaseViews(id, agentId);
          if (addedView && findItem) {
            localStorage.setItem(
              "viewsList",
              JSON.stringify(
                viewsArray.map((v) => {
                  if (v.id === id) {
                    return {
                      ...v,
                      date: Date.now(),
                    };
                  }
                  return v;
                }),
              ),
            );
          } else {
            localStorage.setItem(
              "viewsList",
              JSON.stringify([
                ...viewsArray,
                {
                  id,
                  date: Date.now(),
                },
              ]),
            );
          }
        }
      } catch (error) {
        // console.error("Failed to update views", error);
      }
    };
    if (isApiSubscribed === false) {
      updateViews();
    }

    return () => {
      isApiSubscribed = true;
    };
  }, [agentId, id]);

  return <span>{numberToAbbreviation(views + 1)}</span>;
}
