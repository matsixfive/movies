import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import RightCaret from "../icons/RightCaret";
import LeftCaret from "../icons/LeftCaret";

function ScrollButton({
  direction,
  reference,
}: {
  direction: string;
  reference: React.MutableRefObject<HTMLInputElement | null>;
}) {
  const isRight = direction === ">";
  const multi = isRight ? 1 : -1;

  const handleClick = (
    element: React.MutableRefObject<HTMLInputElement | null>
  ) => {
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
      id="scrollButton"
      className={"bg-transparent border-none cursor-pointer h-full p-7 absolute top-0 z-10 from-slate-100 dark:from-slate-900 to-transparent".concat(
        isRight ? " right-0 bg-gradient-to-l" : " bg-gradient-to-r left-0"
      )}
      onClick={() => {
        if (reference.current) handleClick(reference);
      }}
    >
      {isRight ? (
        <RightCaret
          className="w-2"
          colorClass="fill-black dark:fill-white stroke-white dark:stroke-transparent"
        />
      ) : (
        <LeftCaret
          className="w-2"
          colorClass="fill-black dark:fill-white stroke-white dark:stroke-transparent"
        />
      )}
    </button>
  );
}

export default function MovieList(props: {
  listTitle: string;
  list: { id: string; name: string; poster: string }[];
}) {
  const container = useRef(null);

  function limitLength(str: string, len = 35) {
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
    <div id="movieList" className="max-w-[1660px] my-3">
      <h2
        id="listTitle"
        className="m-0 ml-16 whitespace-nowrap overflow-hidden text-ellipsis w-1/2 dark:text-white text-black text-2xl "
      >
        {props.listTitle}
      </h2>
      <div id="scrollButtonContainer" className="max-w-full relative flex">
        <ScrollButton direction="<" reference={container} />
        <div
          id="scrollContainer"
          className="snap-x snap-mandatory overflow-x-scroll flex px-14 no-scrollbar"
          ref={container}
        >
          {props.list.map(
            (movie: { id: string; name: string; poster: string }) => {
              return (
                <Link
                  id="movieCardLink"
                  href={`/movies/${movie.id}`}
                  key={movie.id}
                >
                  <a>
                    <div
                      id="cardContainer"
                      title={movie.name}
                      className="m-3 aspect-[2/3] w-[200px] h-[300px] rounded-2xl relative snap-start scroll-ml-16 shadow-md"
                    >
                      <Image
                        id="cardImage"
                        alt={movie.name}
                        className="rounded-2xl"
                        src={movie.poster}
                        width={200}
                        height={300}
                      />
                      <div
                        id="carsTitleGradient"
                        className="h-20 rounded-t-none rounded-b-2xl w-full bg-gradient-to-t from-black to-transparent absolute bottom-0"
                      >
                        <span
                          id="cardTitle"
                          className="font-display leading-5 text-white text-center text-xl bottom-0 absolute left-0 right-0 mx-auto p-3"
                        >
                          {limitLength(movie.name)}
                        </span>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            }
          )}
        </div>
        <ScrollButton direction=">" reference={container} />
      </div>
    </div>
  );
}
