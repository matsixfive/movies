import Link from "next/link";
import { useRouter } from "next/router";
import {
  useState,
  useEffect,
  useRef,
  FormEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from "react";
import SearchIcon from "../icons/SearchIcon";

const api: string = process.env.API_URL || "http://localhost:3000/api";
console.log(api)

export default function SearchBar({ mobile = false }) {
  const [searchQuerey, setSearchQuerey] = useState("");
  const [results, setResults]: [
    { name: string; id: string; active?: boolean }[],
    Dispatch<
      SetStateAction<
        {
          name: string;
          id: string;
          active?: boolean;
        }[]
      >
    >
  ] = useState([{ name: "", id: "" }]);
  const [hideResults, setHideResults] = useState(true);

  const input = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const path = encodeURIComponent(searchQuerey.trim());

      if (path.length === 0) return;

      const res = await fetch(`${api}/movies/search?q=${path}`, {
        headers: {
          "Access-Control-Allow-Origin": api,
        },
      });
      // const res = await fetch(`http://localhost:3000/api/movies/search`, {
      //   method: "POST",
      //   body: JSON.stringify({ querey: searchQuerey.trim() }),
      // });
      const json = await res.json();

      setResults(json);

      // show results (if not empty)
      setHideResults(json.length === 0);
    };

    if (searchQuerey.length) fetchData().catch(console.error);
    else {
      setResults([]);
      setHideResults(true);
    }
  }, [searchQuerey]);

  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (results.length !== 0) router.push(`/movies/${results[0].id}`);
  };

  const arrowHandler = (key: KeyboardEvent<HTMLInputElement>) => {
    if (key.key === "ArrowDown" || key.key === "ArrowUp") {
      key.preventDefault();
      if (key.key === "ArrowDown") {
        console.log("Down");
      } else {
        console.log("Up");
      }
    }
  };

  return (
    <>
      {mobile ? (
        <div className="relative mt-3 md:hidden">
          <SearchIcon className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none" />
          <input
            type="text"
            id="searchBarInput"
            className={"block p-2 pl-10 w-full outline-none text-gray-900 bg-gray-50 border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500".concat(
              hideResults
                ? " rounded-lg"
                : " rounded-t-lg border-b-none pb-[9px]" // extra padding on bottom makes up for no bottom border
            )}
            placeholder="Search..."
            autoComplete="off"
            ref={input}
            value={searchQuerey}
            onChange={e => setSearchQuerey(e.target.value)}
            onFocus={() => {
              if (results.length !== 0) {
                setHideResults(false);
              }
            }}
            onBlur={() => setHideResults(true)}
            onKeyDown={key => arrowHandler(key)}
          />
          <ol
            id="searchResults"
            className={"absolute z-50 top-full left-0 right-0 bg-gray-50 dark:bg-gray-700 rounded-b-lg p-1".concat(
              hideResults
                ? " hidden"
                : " border border-t-none ring-blue-500 border-blue-500 dark:ring-violet-500 dark:border-violet-500"
            )}>
            {results.slice(0, 5).map(result => {
              return (
                <li
                  className={"search-suggestion".concat(
                    result.active ? " search-suggestion-active" : ""
                  )}
                  key={result.id}>
                  <Link href={`/movies/${result.id}`}>
                    <div
                      onMouseDown={() => {
                        router.push(`/movies/${result.id}`);
                      }}
                      className="search-suggestion-inside">
                      {result.name}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      ) : (
        <form
          id="searchBar"
          onSubmit={e => handleSubmit(e)}
          className="hidden relative md:block">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-500" />
          </div>

          <input
            type="text"
            id="searchBarInput"
            className={"block p-2 pl-10 w-full outline-none text-gray-900 bg-gray-50 border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500".concat(
              hideResults
                ? " rounded-lg"
                : " rounded-t-lg border-b-none pb-[9px]" // extra padding on bottom makes up for no bottom border
            )}
            placeholder="Search..."
            autoComplete="off"
            ref={input}
            value={searchQuerey}
            onChange={e => setSearchQuerey(e.target.value)}
            onFocus={() => {
              if (results.length !== 0) {
                setHideResults(false);
              }
            }}
            onBlur={() => setHideResults(true)}
            onKeyDown={key => arrowHandler(key)}
          />
          <ol
            id="searchResults"
            className={"absolute z-50 top-full left-0 right-0 bg-gray-50 dark:bg-gray-700 rounded-b-lg p-1".concat(
              hideResults
                ? " hidden"
                : " border border-t-none ring-blue-500 border-blue-500 dark:ring-violet-500 dark:border-violet-500"
            )}>
            {results.slice(0, 5).map(result => {
              return (
                <li
                  className={"search-suggestion".concat(
                    result.active ? " search-suggestion-active" : ""
                  )}
                  key={result.id}>
                  <Link href={`/movies/${result.id}`}>
                    <div
                      onMouseDown={() => {
                        router.push(`/movies/${result.id}`);
                      }}
                      className="search-suggestion-inside">
                      {result.name}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </form>
      )}
      {/* <form
        id="searchBar"
        onSubmit={(e) => handleSubmit(e)}
        className="relative inline-block m-2"
      >
        <input
          id="searchBarInput"
          className="text-slate-800 dark:text-slate-200 dark:bg-slate-800 bg-slate-300 p-2 rounded-l-md outline-none"
          type="text"
          placeholder="Search..."
          autoComplete="off"
          ref={input}
          value={searchQuerey}
          onChange={(e) => setSearchQuerey(e.target.value)}
          onFocus={() => {
            if (results.length !== 0) {
              setHideResults(false);
            }
          }}
          onBlur={() => setTimeout(() => setHideResults(true), 100)}
          onKeyDown={(key) => arrowHandler(key)}
        />
        <input
          id="searchBarSubmit"
          type="submit"
          value="Search"
          className="cursor-pointer text-slate-100 dark:text-slate-200 dark:bg-slate-700 bg-blue-600 p-2 rounded-r-md"
        />
        <ol
          id="searchResults"
          className={"absolute z-50 top-full left-0 right-0 bg-slate-200 dark:bg-slate-700 rounded-lg m-2 p-1".concat(
            hideResults ? " hidden" : ""
          )}
        >
          {results.map((result) => {
            return (
              <li
                id="searchSuggestion"
                className="text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md"
                key={result.id}
              >
                <Link id="movieCardLink" href={`/movies/${result.id}`}>
                  <div className="w-full block cursor-pointer p-2 overflow-clip whitespace-nowrap text-ellipsis">
                    {result.name}
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </form> */}
    </>
  );
}
