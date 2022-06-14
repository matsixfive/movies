import allMovies from "./allMovies";

export default function handler(req, res) {
  const { movieId } = req.query;

  for (var movie in allMovies) {
    if (allMovies[movie].id === movieId) {
      return res.status(200).json(allMovies[movie]);
    }
  }
  res.status(404).send("Id not found");
}
