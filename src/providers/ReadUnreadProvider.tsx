"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface ReadUnreadContextType {
  unreadInboxCount: number;
  unreadContactCount: number;
  totalInboxCount: number;
  totalContactCount: number;
  handleUnreadInboxDecrement: () => void;
  handleUnreadContactDecrement: () => void;
  handleSetUnreadInboxCount: (countItems: number) => void;
  handleSetUnreadContactCount: (countItems: number) => void;
  handleSetTotalInboxCount: (countItems: number) => void;
  handleSetTotalContactCount: (countItems: number) => void;
}

const readUnreadContext = createContext<ReadUnreadContextType | null>(null);

interface ReadUnreadProviderProps {
  children: ReactNode;
}

export default function ReadUnreadProvider({
  children,
}: ReadUnreadProviderProps) {
  const [unreadInboxCount, setUnreadInboxCount] = useState<number>(0);
  const [unreadContactCount, setUnreadContactCount] = useState<number>(0);
  const [totalInboxCount, setTotalInboxCount] = useState<number>(0);
  const [totalContactCount, setTotalContactCount] = useState<number>(0);

  const handleUnreadInboxDecrement = () => {
    setUnreadInboxCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleUnreadContactDecrement = () => {
    setUnreadContactCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleSetUnreadInboxCount = (countItems: number) => {
    setUnreadInboxCount(countItems);
  };

  const handleSetUnreadContactCount = (countItems: number) => {
    setUnreadContactCount(countItems);
  };

  const handleSetTotalInboxCount = (countItems: number) => {
    setTotalInboxCount(countItems);
  };

  const handleSetTotalContactCount = (countItems: number) => {
    setTotalContactCount(countItems);
  };

  return (
    <readUnreadContext.Provider
      value={{
        unreadInboxCount,
        unreadContactCount,
        totalInboxCount,
        totalContactCount,
        handleUnreadInboxDecrement,
        handleUnreadContactDecrement,
        handleSetUnreadInboxCount,
        handleSetUnreadContactCount,
        handleSetTotalInboxCount,
        handleSetTotalContactCount,
      }}
    >
      {children}
    </readUnreadContext.Provider>
  );
}

export const useReadUnread = (): ReadUnreadContextType => {
  const context = useContext(readUnreadContext);
  if (!context) {
    throw new Error("useReadUnread must be used within a ReadUnreadProvider");
  }
  return context;
};
