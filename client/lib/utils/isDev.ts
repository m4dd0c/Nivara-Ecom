const isDev = () => {
  if (process.env.NODE_ENV === "production") return false;
  return true;
};

export default isDev;
