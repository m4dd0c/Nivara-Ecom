import React from "react";

const Heading = ({ title, desc }: { title: string; desc: string }) => {
  const [first, second] = desc.split(".");
  return (
    <div className="px-4 text-center">
      <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="mb-6 text-sm text-foreground/70">
        {first}.
        <br />
        {second}
      </p>
    </div>
  );
};

export default Heading;
