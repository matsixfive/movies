import { sortedMoviesName } from "../allMovies";
import { standardize } from "../../../../lib/standardize";
import url from "url";

export default function handler(req: { url: string }, res) {
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query.q;

  if (typeof query !== "string") query = "";

  // console.log(standardize(query));

  const queryStandard = standardize(query);
  if (queryStandard.length === 0) return res.status(204).json([]);

  const valid = sortedMoviesName
    .filter(movie => {
      const movieNameWords = standardize(movie.name);

      const result = movieNameWords.filter((movieNameWord: string) => {

        // ret
        const result = queryStandard.map((quereyWord: string) =>
          movieNameWord.includes(quereyWord)
        );
        console.log(result, movieNameWord);
        return result;
      });
      console.log(result);
      return result;
    })
    .map(({ id, name }) => {
      return {
        id: id,
        name: name,
      };
    });

  return res.status(200).json(valid.slice(0, 5));
}
