import Link from "next/link";
import Image from "next/image";

export default function MovieGrid(props: {
  list: { id: string; name: string; poster: string }[];
}) {
  return (
    <div id="movieGrid" className="max-w-[1120px] my-3 flex flex-wrap justify-center">
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
                          {movie.name}
                        </span>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            }
          )}
    </div>
  );
}
