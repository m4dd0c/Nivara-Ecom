import React from "react";
import Profile from "./components/Profile";
import Orders from "./components/Orders";

const page = () => {
  return (
    <div className="container mx-auto">
      <Profile />
      <Orders />
    </div>
  );
};

export default page;
