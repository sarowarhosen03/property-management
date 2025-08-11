import { useEffect } from "react";

export default function RequestLoader() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = null;
    };
  }, []);
  return (
    <>
      <section className="fixed inset-0 left-0 top-0 z-50 flex h-screen w-full items-center justify-center backdrop-blur-[2px]">
        <div className="request-loader"></div>
      </section>
    </>
  );
}
