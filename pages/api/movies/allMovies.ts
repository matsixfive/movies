import allMoviesJSON from "./movies.json";
const allMovies: {
  name: string;
  id: string;
  poster: string;
  description?: string;
}[] = allMoviesJSON;

const sortAlpha = (movieList: { name: string; id: string }[]) => {
  return movieList.sort(({ name: a }, { name: b }) => {
    return a <= b ? -1 : 1;
  });
};

const sortedMoviesName = sortAlpha(allMovies.slice(0));

export { sortedMoviesName };
export default allMovies;
