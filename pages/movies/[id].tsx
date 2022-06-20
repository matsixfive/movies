import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import NavBar from "../../components/NavBar";
import ThemeContainer from "../../components/ThemeContainer";

const api = process.env.API_URL || "http://localhost:3000/api";

export async function getStaticProps(context: { params: { id: any } }) {
  const id = context.params.id;
  try {
    const res = await fetch(`${api}/movies/${id}`);
    const body = await res.json();

    return {
      props: {
        movie: body,
      },
    };
  } catch {
    return {
      props: {
        movie: null,
      },
    };
  }
}

export async function getStaticPaths() {
  const res = await fetch(`${api}/movies`);
  const body = await res.json();

  const possiblePaths = body.map((movie: { id: any }) => {
    return { params: { id: movie.id } };
  });

  return {
    paths: possiblePaths,
    fallback: true,
  };
}

export default function MoviePage({
  movie,
}: {
  movie: { name: string; description: string; poster: string };
}) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (movie) {
    return (
      <ThemeContainer>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <title>{`${movie.name} - Movies`}</title>
          <meta property="description" content={movie.description} />

          <meta property="og:title" content={`${movie.name} - Movies`} />
          <meta property="og:image" content={movie.poster} />
          <meta property="og:description" content={movie.description} />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="@matsixfive" />
        </Head>

        <NavBar />
        <main className="dark:bg-slate-900 bg-slate-100">
          <div
            id="gridContainer"
            className="grid sm:grid-cols-2 grid-cols-1 auto-cols-max pb-10"
          >
            <h1
              id="movieTitle"
              className="sm:col-span-2 col-span-1 text-center py-3 mb-1 text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-cyan-600 to-violet-600 dark:from-pink-500 dark:to-violet-500"
            >
              {movie.name}
            </h1>
            <Image
              id="moviePoster"
              alt={movie.name}
              src={movie.poster}
              className="rounded-xl aspect-[2/3] w-96 mx-auto mt-0 block justify-center shadow-2xl"
            />
            {movie.description ? (
              <div className="px-4">
                <h2 className="text-2xl text-slate-800 dark:text-slate-200">
                  Description:
                </h2>
                <p className="text-lg text-slate-700 dark:text-slate-300">
                  {movie.description}
                </p>
              </div>
            ) : null}
          </div>
        </main>
      </ThemeContainer>
    );
  } else {
    return (
      <ThemeContainer>
        <h1>404 - Movie Doesn&apos;t Exist</h1>
      </ThemeContainer>
    );
  }
}
