import { Card, CardContent, CardImage, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PropertyCardWithSkeleton = () => {
  return (
    <Card className="relative flex flex-col">
      <CardImage className="relative h-[290px]">
        <Skeleton className="h-full w-full" />
      </CardImage>

      <CardContent className="p-0">
        <CardTitle className="mt-4 text-sm">
          <Skeleton className="h-6 w-3/4" />
        </CardTitle>

        <div className="mt-4">
          <Skeleton className="h-4 w-1/2" />
        </div>

        <div className="mt-4">
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCardWithSkeleton;
