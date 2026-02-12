import { spacedWords } from "$/lib/utils/matcher";
import {
  doesExistsInQuery,
  formUrlQuery,
  removeValuesFromQuery,
} from "$/lib/utils/query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const Filters = ({
  data,
  filterName,
}: {
  data: string;
  filterName: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(false);

  const handleFilter = (e: any) => {
    const value = e.target.value;
    const filterName = e.target.name;

    if (e.target.checked) {
      setActive(true);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: filterName,
        value,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(false);
      const newUrl = removeValuesFromQuery({
        params: searchParams.toString(),
        key: filterName,
        valueToRemove: value,
      });
      router.push(newUrl, { scroll: false });
    }
  };

  // useEffect to setActive onLoad
  useEffect(() => {
    setActive(doesExistsInQuery(searchParams.toString(), filterName, data));
  }, [data, filterName, searchParams]);

  // Ensure a stable ID by replacing spaces and removing non-alphanumeric characters
  const uid = `${filterName}-${data.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "")}`;

  return (
    <div
      className={`flex items-center space-x-1 rounded-full ${active && "border-zinc-400"} border px-2 py-1 hover:border-zinc-400`}
    >
      <input
        checked={active}
        id={uid}
        name={filterName}
        value={data}
        type="checkbox"
        onChange={handleFilter}
      />
      <label
        className={`cursor-pointer select-none text-xs tracking-wider ${filterName === "size" ? "uppercase" : "capitalize"}`}
        htmlFor={uid}
      >
        {spacedWords(data)}
      </label>
    </div>
  );
};
