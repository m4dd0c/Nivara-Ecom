import {
  IFormQuery,
  IRemoveKeysFromQuery,
  IRemoveValueFromQuery,
} from "$/types/types";
import qs from "query-string";

export const formUrlQuery = ({ params, key, value }: IFormQuery) => {
  // Parse the current URL query parameters
  const currentUrl = qs.parse(params); // getting all the queries from the url as object

  // handling search query or sort query functionality
  if (key === "q" || key === "sort") {
    currentUrl[key] = value;
    // handling filtering
  } else {
    // Ensure the key is always an array
    if (!currentUrl[key]) {
      // If the key is not in the URL, initialize it as an array with the value
      currentUrl[key] = [value];
    } else {
      // If the key exists but is not an array, convert it to an array
      currentUrl[key] = Array.isArray(currentUrl[key])
        ? currentUrl[key]
        : [currentUrl[key]];

      // Add the new value if it's not already in the array
      if (!currentUrl[key].includes(value)) {
        currentUrl[key].push(value);
      }
    }
  }

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true, arrayFormat: "none" },
  );
};

export const removeValuesFromQuery = ({
  params,
  key,
  valueToRemove,
}: IRemoveValueFromQuery) => {
  const currentUrl = qs.parse(params);

  // removing the valueToRemove from the key query if there is more than one items eg: `?color=red&color=blue`
  if (Array.isArray(currentUrl[key])) {
    currentUrl[key] = currentUrl[key].filter((item) => item !== valueToRemove);
    // if only one value exists in the key query then removing whole key from the url eg: `?color=red`
  } else {
    delete currentUrl[key];
  }

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
};

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: IRemoveKeysFromQuery) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
};

export const doesExistsInQuery = (
  params: string,
  filterType: string,
  value: string,
) => {
  const exists = qs.parse(params)[filterType]?.includes(value);
  return !!exists;
};
