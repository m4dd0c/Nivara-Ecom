import { Skeleton } from "$/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="flex animate-pulse justify-start gap-3 p-3 md:p-10">
      <Skeleton className="size-32 rounded-full" />
      <div>
        {/* Name Skeleton */}
        <Skeleton className="mb-2 h-8 w-48 rounded-lg" />
        {/* Email and Phone Skeleton */}
        <Skeleton className="mb-2 h-4 w-64 rounded-lg" />
        <div className="flex items-center gap-2">
          {/* Edit Button Skeleton */}
          <Skeleton className="h-10 w-24 rounded" />
          {/* Signout Button Skeleton */}
          <Skeleton className="h-10 w-24 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
