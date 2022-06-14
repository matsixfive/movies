import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import RightCaret from "../icons/RightCaret";
import LeftCaret from "../icons/LeftCaret";

/**
 * Returns a button to scroll the MovieList
 * @param {string} direction either "<" for left or ">" for right 
 * @param {object} reference the DOM element to scroll
 * @returns A button to scroll the referenced element (MovieList)
 */

function ScrollButton({ direction, reference: element }) {
  const isRight = direction === ">";
  const multi = isRight ? 1 : -1;

  const handleClick = (element) => {
    if (element.current) {
      const cardsInView = Math.floor(element.current.clientWidth / 220); // 200 instead of 220 for a bit of leway
      element.current.scrollTo({
        top: 0,
        left:
          element.current.scrollLeft +
          220 * (cardsInView < 1 ? 1 : cardsInView) * multi,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      className={"bg-transparent border-none cursor-pointer h-full p-7 absolute top-0 z-10 from-slate-100 dark:from-slate-900 to-transparent".concat(
        isRight ? " right-0 bg-gradient-to-l" : " bg-gradient-to-r left-0"
      )}
      onClick={() => handleClick(element)}
    >
      {isRight ? (
        <RightCaret className="w-2" colorClass="fill-black dark:fill-white" />
      ) : (
        <LeftCaret className="w-2" colorClass="fill-black dark:fill-white" />
      )}
    </button>
  );
}

export default function MovieList(props) {
  const container = useRef();

  function limitLength(str, len = 35) {
    if (str.length < len) {
      return str;
    } else {
      return (
        str
          .substring(0, len - 3)
          // .trim()
          .concat("...")
      );
    }
  }
  return (
    <div className="max-w-[1660px] my-3">
      <h2 className="m-0 ml-16 whitespace-nowrap overflow-hidden text-ellipsis w-1/2 dark:text-white text-black text-2xl ">
        {props.listTitle}
      </h2>
      <div className="max-w-full relative flex">
        <ScrollButton direction="<" reference={container} />
        <div
          className="snap-x snap-mandatory overflow-x-scroll flex px-14 no-scrollbar"
          ref={container}
        >
          {props.list.map((movie) => {
            return (
              <Link href={`/movies/${movie.id}`} key={movie.id}>
                <a>
                  <div
                    title={movie.name}
                    className="m-3 aspect-[2/3] w-[200px] h-[300px] rounded-2xl relative snap-start scroll-ml-16 shadow-md"
                  >
                    <Image
                      className="rounded-2xl"
                      src={movie.poster}
                      width={200}
                      height={300}
                    />
                    <div className="h-20 rounded-t-none rounded-b-2xl w-full bg-gradient-to-t from-black to-transparent absolute bottom-0">
                      <p className=" font-display leading-5 text-white text-center text-xl bottom-0 absolute left-0 right-0 mx-auto p-3">
                        {limitLength(movie.name)}
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
        <ScrollButton direction=">" reference={container} />
      </div>
    </div>
  );
}
