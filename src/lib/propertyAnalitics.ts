"use server";

import { auth } from "@/auth";
import { API_URL } from "@/config/site";
import {
  StatisticsUpdateResponse,
  StatisticsYearData,
} from "@/types/fetchDataTypes";

export async function increaseViews(id: string, agentId: string) {
  try {
    await fetch(`${API_URL}/properties/${id}/views`, {
      method: "POST",
    });

    //add  view statistics

    const date = new Date();
    const dayFormatter = new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
    });
    await fetch(`${API_URL}/statistics/daily`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${dayFormatter.format(date)}`,
        actionType: "view",
        agentId,
      }),
    });

    return true;
  } catch (error) {
    // console.log("error while incrementing Views ");

    return false;
  }
}

export async function increaseLike(
  id: string,
  isFav: boolean,
  agentId: string,
) {
  try {
    await fetch(`${API_URL}/properties/${id}/likes`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ actionType: isFav ? "" : "like", agentId }),
    });

    //add  like statistics
    const date = new Date();
    const dayFormatter = new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
    });

    await fetch(`${API_URL}/statistics/daily`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${dayFormatter.format(date)}`,
        actionType: "like",
        agentId,
      }),
    });

    return { status: true };
  } catch (error) {
    // console.log("error while incrementing likes ");
    return { status: false };
  }
}
export async function increaseShare(id: string, agentId: string) {
  try {
    await fetch(`${API_URL}/properties/${id}/shares`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    //add  share statistics
    const date = new Date();
    const dayFormatter = new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
    });
    await fetch(`${API_URL}/statistics/daily`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${dayFormatter.format(date)}`,
        actionType: "share",
        agentId,
      }),
      cache: "no-store",
    });
    return { status: true };
  } catch (error) {
    // console.log("error while incrementing share ");
    return { status: false };
  }
}

export async function getStatisticsForAllYear() {
  try {
    const user = await auth();

    const response = await fetch(`${API_URL}/statistics/yearly`, {
      headers: {
        Authorization: `Bearer ${user?.user?.token}`,
      },
      cache: "no-store",
    });

    return (await response.json()) as any;
  } catch (error) {
    // console.log("error while fetching statistics");
    return { code: 500, error: "error while fetching statistics" };
  }
}

export async function getStatisticsForAMonth() {
  try {
    const user = await auth();
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const response = await fetch(
      `${API_URL}/statistics/monthly?year=${year}&month=${month + 1}`,
      {
        headers: {
          Authorization: `Bearer ${user?.user?.token}`,
        },
        cache: "no-store",
      },
    );

    return (await response.json()) as StatisticsUpdateResponse;
  } catch (error) {
    // console.log("error while fetching statistics");
    return { code: 500, error: "error while fetching statistics" };
  }
}

export async function getStatisticsForAYear() {
  try {
    const user = await auth();
    const date = new Date();
    const year = date.getFullYear();

    const response = await fetch(`${API_URL}/statistics/yearly?year=${year}`, {
      headers: {
        Authorization: `Bearer ${user?.user?.token}`,
      },
      cache: "no-cache",
    });

    return (await response.json()) as StatisticsYearData;
  } catch (error) {
    // console.log("error while fetching statistics");
    return { code: 500, error: "error while fetching statistics" };
  }
}
export async function getPropertyCount() {
  try {
    const user = await auth();

    const response = await fetch(`${API_URL}/statistics/properties`, {
      headers: {
        Authorization: `Bearer ${user?.user?.token}`,
      },
      cache: "no-cache",
    });
    return response.json();

    // return (await response.json()) as StatisticsYearData;
  } catch (error) {
    // console.log("error while fetching statistics");
    return { code: 500, error: "error while fetching statistics" };
  }
}
