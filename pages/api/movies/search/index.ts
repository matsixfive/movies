import { sortedMoviesName } from "../allMovies";
import { standardize } from "../../../../lib/standardize";
import url from "url";

export default function handler(req: { url: string }, res) {
  let urlParts = url.parse(req.url, true);
  let query = urlParts.query.q;

  if (typeof query !== "string") query = "";

  // console.log(standardize(query));

  const queryStandard = standardize(query);
  if (queryStandard.length === 0) return res.status(204).json([]);

  const valid = sortedMoviesName
    .filter(movie => {
      const movieName = standardize(movie.name);
      return movieName.includes(queryStandard);
    })
    .map(({ id, name }) => {
      return {
        id: id,
        name: name,
      };
    });

  return res.status(200).json(valid.slice(0, 5));
}
