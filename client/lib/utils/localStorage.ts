export const getLocalStorage = (key: string) => {
  if (typeof window === "undefined") {
    return []; // Return a default value on the server
  }

  try {
    const data = localStorage.getItem(key);
    if (!data) return []; // Return an empty array if no data is found
    return JSON.parse(data);
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    return []; // Return a default value in case of error
  }
};
