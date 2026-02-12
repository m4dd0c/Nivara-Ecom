import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  doesExistsInQuery,
  formUrlQuery,
  removeValuesFromQuery,
} from "$/lib/utils/query-string";
import { tColors } from "$/types/api";

export const ColorsCard = ({ color }: { color: tColors }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [active, setActive] = useState(false);

  const handleColorsFilter = (e: any) => {
    const value = e.target.id;

    if (e.target.checked) {
      // Set active state
      setActive(true);
      // Update the URL with the selected color
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "color",
        value,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(false);
      // Remove the color from the URL
      const newUrl = removeValuesFromQuery({
        params: searchParams.toString(),
        key: "color",
        valueToRemove: value,
      });
      router.push(newUrl, { scroll: false });
    }
  };

  // useEffect to setActive onLoad
  useEffect(() => {
    // Check if the color exists in the search parameters
    setActive(doesExistsInQuery(searchParams.toString(), "color", color));
  }, [color, searchParams]);

  return (
    <div
      className={`flex items-center rounded-full border ${active && "border-zinc-400"} p-1 hover:border-zinc-400`}
    >
      <label
        className={`${color === "multicolor" ? "bg-multicolor" : `bg-[${color}]`} mx-1 block size-4 cursor-pointer rounded-full border`}
        style={{ backgroundColor: color }}
        htmlFor={color}
      ></label>
      <input
        type="checkbox"
        name="color"
        id={color}
        className="hidden"
        onChange={handleColorsFilter}
        checked={active}
      />
      <label
        className="cursor-pointer px-1 text-xs capitalize tracking-wider"
        htmlFor={color}
      >
        {color}
      </label>
    </div>
  );
};
