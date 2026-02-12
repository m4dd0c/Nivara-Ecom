import React from "react";

const LoadingScreen = ({
  height,
  width,
}: {
  height?: string;
  width?: string;
}) => {
  return (
    <div
      className={`${height ?? "h-[60vh]"} ${width ?? "w-[90vw]"} mx-auto grid flex-1 place-items-center bg-background`}
    >
      <div className="size-8 animate-spin rounded-full border-4 border-foreground border-t-transparent" />
    </div>
  );
};

export default LoadingScreen;
