"use client";
import { SingeProperty } from "@/lib/db/type";
import { increaseShare } from "@/lib/propertyAnalitics";
import numberToAbbreviation from "@/utils/numberToAbbreviation";
import { Copy, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
} from "react-share";
import { showToast } from "../toaster/toaster";

export default function Share({
  shareCount,
  id,
  description,
  title,
  dict,
  agentId,
}: {
  shareCount: number;
  id: string;
  description: string;
  title: string;
  dict: SingeProperty;
  agentId: string;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.includes("dashboard");
  const [open, setOpen] = useState(false);
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/properties/${id}`;
  const [share, setShare] = useState(shareCount);
  async function handleShare() {
    try {
      if (!isAdmin) {
        await increaseShare(id, agentId);
      }

      setShare((prev) => prev + 1);
    } catch (error) {
      console.log("failed to increase share count");
    }
  }
  return (
    <>
      <ShareModal
        {...{ open, setOpen, url, description, title, handleShare, dict }}
      />
      <div className="flex items-center">
        <div className="2xl:h6 relative mr-1 h-4 w-4 2xl:mr-2 2xl:w-6">
          <Image
            onClick={() => setOpen(true)}
            title={dict.share}
            src={"/svgs/share.svg"}
            width={24}
            height={24}
            alt={"views"}
            className="2xl:h6 h-4 w-4 2xl:w-6"
          />
        </div>
        <span>{numberToAbbreviation(share)}</span>
      </div>
    </>
  );
}

export function ShareModal({
  open,
  setOpen,
  url,
  title,
  description,
  handleShare,
  dict,
}: {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (b: boolean) => void;
  url: string;
  description: string;
  title: string;
  handleShare: () => Promise<void>;
  dict: SingeProperty;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [setOpen]);

  return (
    <section
      style={{
        opacity: open ? 1 : 0,
      }}
      onClick={() => setOpen(false)}
      id="default-modal"
      tabIndex={-1}
      className={`fixed inset-0 z-50 ${open ? "translate-y-0" : "-translate-y-20"} flex flex-col items-center bg-[#423B4E99] bg-opacity-50 px-5 backdrop-blur-sm transition-all duration-200 ease-in-out ${open ? "visible" : "invisible"}`}
    >
      <div className="relative mx-auto my-auto min-h-11 w-[80%] rounded-xl bg-white pb-5 text-center">
        {/* Close Icon */}
        <X
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => setOpen(false)}
        />

        <h2 className="my-3 text-xl font-bold">{dict.shareWith}</h2>
        <div className="mx-auto flex items-center justify-center gap-3">
          <div title={`${dict.shareWith} Facebook`}>
            <FacebookShareButton
              onClick={async () => {
                await handleShare();
              }}
              hashtag="#property #bestPropertyDeal"
              url={url}
            >
              <FacebookIcon size={40} round={true} />
            </FacebookShareButton>
          </div>
          <div title={`${dict.shareWith} Email`}>
            <EmailShareButton
              url={url}
              subject={title}
              body={description + "\n" + url}
              onClick={async () => await handleShare()}
            >
              <EmailIcon size={40} round={true} />
            </EmailShareButton>
          </div>
          <div title={dict.CopyToClipboard}>
            <Copy
              onClick={async () => {
                navigator.clipboard.writeText(url);
                showToast({
                  message: dict.copied,
                  type: "success",
                  title: "Clipboard",
                });
                await handleShare();
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
