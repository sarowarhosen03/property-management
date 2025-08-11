import { Skeleton } from "@/components/ui/skeleton";

export default function SingleLoader() {
  return (
    <section className="container mb-10">
      <div className="mt-6 flex flex-col">
        <div className="flex justify-between">
          <Skeleton className="h-8 w-1/3" />
          <div className="flex items-center gap-4 text-sm 2xl:text-base">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <div className="flex gap-4">
              <Skeleton className="h-6 w-10" />
              <Skeleton className="h-6 w-10" />
              <Skeleton className="h-6 w-10" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-8 overflow-hidden rounded-3xl">
        <div className="relative flex h-full w-full">
          <Skeleton className="h-96 w-full" />
          <div className="absolute left-6 top-6 flex gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-28" />
          </div>
        </div>
        <div className="relative grid grid-cols-2 gap-x-8 gap-y-6">
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-44 w-full" />
        </div>
      </div>
      <div className="my-12 grid grid-cols-2 gap-8">
        <div className="flex flex-col">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="mt-3 h-6 w-full" />
          <div className="mt-3 flex gap-5">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="mt-8">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="mt-2 h-6 w-full" />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-24">
            <div className="col">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="mt-3 h-6 w-full" />
              <Skeleton className="mt-3 h-6 w-full" />
              <Skeleton className="mt-3 h-6 w-full" />
            </div>
            <div className="col">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="mt-3 h-6 w-full" />
              <Skeleton className="mt-3 h-6 w-full" />
              <Skeleton className="mt-3 h-6 w-full" />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="rounded-3xl bg-gray-200">
            <div className="property__agent flex gap-4 rounded-2xl bg-white p-6 2xl:p-10">
              <div className="relative overflow-hidden rounded-2xl">
                <Skeleton className="h-[243px] w-[205px]" />
              </div>

              <div className="flex w-full flex-col space-y-4 pt-4">
                <Skeleton className="h-6 w-3/4" />
                <div className="flex flex-col gap-5 text-sm 2xl:text-lg">
                  <div className="flex w-full items-start gap-6">
                    <Skeleton className="h-6 w-1/3" />
                    <div className="flex w-full flex-wrap gap-2 2xl:gap-6">
                      <Skeleton className="max-h-8 w-1/4 max-w-8" />
                      <Skeleton className="max-h-8 w-1/4 max-w-8" />
                      <Skeleton className="max-h-8 w-1/4 max-w-8" />
                      <Skeleton className="max-h-8 w-1/4 max-w-8" />
                    </div>
                  </div>
                  <div className="flex w-full items-start gap-6">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="max-h-8 w-1/4 max-w-8" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10">
              <div className="space-y-2">
                <div className="space-y-2">
                  <Skeleton className="h-2 w-[10%] rounded-md" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-2 w-[10%] rounded-md" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
                <div className="grid">
                  <div className="space-y-2">
                    <Skeleton className="h-2 w-[10%] rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-2 w-[10%] rounded-md" />
                  <Skeleton className="h-[100px] w-full rounded-md" />
                </div>
                <Skeleton className="h-10 w-full rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
