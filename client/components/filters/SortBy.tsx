import { MouseEvent } from "react";
import { formUrlQuery, removeKeysFromQuery } from "$/lib/utils/query-string";
import { useSearchParams, useRouter } from "next/navigation";
import { tSortBy } from "$/types/api";

export const SortBy = ({ data }: { data: tSortBy }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    const value = e.currentTarget.id;
    const key = e.currentTarget.name;

    if (e.currentTarget.checked) {
      const url = formUrlQuery({
        params: params.toString(),
        key,
        value,
      });
      router.push(url, { scroll: false });
    } else {
      const url = removeKeysFromQuery({
        params: params.toString(),
        keysToRemove: [key],
      });
      router.push(url, { scroll: false });
    }
  };
  return (
    <div id="sort" className="rounded-full border p-1 px-2">
      <div className="flex items-center">
        <input type="radio" id={data} name="sort" onClick={handleClick} />
        <label
          htmlFor={data}
          className="mx-1 cursor-pointer text-sm capitalize"
        >
          {data}
        </label>
      </div>
    </div>
  );
};
