import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";

import SearchBar from "./SearchBar";
import ToggleThemeButton from "./ToggleThemeButton";

export default function NavBar() {
  const router = useRouter();
  const [path, setPath] = useState(router.asPath.split("/")[1]);

  type PageInfo = {
    active?: boolean;
    title: string;
    href: string;
  }[];

  const [pages, setPages]: [
    pages: PageInfo,
    setPages: Dispatch<SetStateAction<PageInfo>>
  ] = useState([
    { title: "Home", href: "/" },
    { title: "Movies", href: "/movies" },
    { title: "Contact", href: "/api/hello" },
  ]);

  useEffect(() => {
    const setActive = () => {
      if (path === "") setPath("/");

      let newLayout = pages.map(page => {
        if (page.href === "/" + path) {
          page.active = true;
        }
        return page;
      });

      setPages(newLayout);
    };

    setActive();
  }, [path, pages]);

  return (
    <nav className="sticky top-0 z-50 bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
      <div className="flex">
        <span className="flex-1 flex justify-center mr-auto">
          <Link href="/" className="flex items-center cursor-pointer">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white cursor-pointer">
              Movies
            </span>
          </Link>
        </span>
        <span className="flex-1 flex justify-center">
          <ul className="flex items-center flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            {pages.map(page => {
              return (
                <li
                  key={page.href}
                  className={"block py-2 pr-4 pl-3 ".concat(
                    page.active
                      ? "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                      : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  )}>
                  <Link
                    href={page.href}
                    aria-current={page.active ? "true" : "false"}>
                    {page.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </span>
        <span className="flex-1 flex justify-center ml-auto">
          <SearchBar />
          <ToggleThemeButton className="px-2" />
        </span>
      </div>
      <SearchBar mobile={true} />
    </nav>
  );
}
