import Head from "next/head";

// import allMovies from "./api/movies/allMovies";
import MovieList from "../components/MovieList";
import ThemeContainer from "../components/ThemeContainer";
import NavBar from "../components/NavBar";

const api = process.env.API_URL || "http://localhost:3000/api";

export async function getStaticProps() {
  const res = await fetch(`${api}/movies`, {
    method: "POST",
    body: JSON.stringify({ order: "alpha" }),
  });
  // const res = await fetch(`${api}/movies`);
  let body = await res.json();

  return {
    props: {
      allMovies: body,
    },
  };
}

export default function Home(props: {
  allMovies: {
    id: string;
    name: string;
    poster: string;
  }[];
}) {
  return (
    <ThemeContainer>
      <div className="p-0 m-0 bg-slate-100 dark:bg-slate-900">
        <Head>
          <title>Movies</title>
          <meta name="description" content="Find movies you like" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <NavBar />
        <main className="flex justify-center">
          <div id="listsContainer" className="mx-auto w-auto max-w-full">
            <MovieList
              list={props.allMovies}
              listTitle={
                "Recommended Recommended Recommended Recommended Recommended Recommended Recommended Recommended Recommended"
              }
            />
            <MovieList list={props.allMovies} listTitle={"Recommended"} />
          </div>
        </main>
      </div>
    </ThemeContainer>
  );
}
