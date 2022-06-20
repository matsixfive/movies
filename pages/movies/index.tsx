import Head from "next/head";

import NavBar from "../../components/NavBar";
import ThemeContainer from "../../components/ThemeContainer";
import MovieGrid from "../../components/MovieGrid";

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/movies");
  const body = await res.json();

  return {
    props: {
      allMovies: body,
    },
  };
}

export default function ExplorePage(props) {
  return (
    <ThemeContainer>
      <Head>
        <title>Explore - Movies</title>
      </Head>
        <NavBar />
        <main className="flex justify-center">
          <MovieGrid list={props.allMovies} />
        </main>
    </ThemeContainer>
  );
}
