import React from "react";
import { BiSearch } from "react-icons/bi";
import { useTheme } from "../../providers/ThemeProvider";

export const SearchBox = () => {
  const { colors } = useTheme();

  return (
    <>
      <form>
        <div className="flex">
          <label
            htmlFor="search-dropdown"
            className="mb-2 text-sm font-medium text-gray-900 sr-only "
          >
            Your Email
          </label>
          <div className="relative rounded-lg">
            <input
              style={{
                backgroundColor: colors.bg,
              }}
              type="search"
              className="block p-3 w-96 z-20 text-sm text-gray-900 bg-gray-50 rounded-lg  border-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Search anything..."
              required
            />
            <button
              style={{
                backgroundColor: colors.primary,
              }}
              type="submit"
              className={`absolute top-0 right-0 p-3 text-sm font-medium text-white bg-[colors.primary] rounded-r-lg border hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800`}
            >
              <BiSearch size={21.5} />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
