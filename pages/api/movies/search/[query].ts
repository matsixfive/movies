import { sortedMoviesName } from "../allMovies";
import { standardize } from "../../../../lib/standardize";

export default function handler(req, res) {
  const { query }: { query: string } = req.query;

  const quereyStandard = standardize(query);
  // if (quereyStandard.length === 0) return res.status(200).json([]);

  const valid = sortedMoviesName
    .filter((movie) => {
      return standardize(movie.name).includes(quereyStandard.join(""));
    })
    .map(({ id, name }) => {
      return {
        id: id,
        name: name,
      };
    });

  return res.status(200).json(valid.slice(0, 5));
}
