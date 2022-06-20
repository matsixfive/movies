import allMovies from "./allMovies";

export default function handler(req, res) {
  const { movieId } = req.query;

  for (var movie in allMovies) {
    if (allMovies[movie].id === movieId) {
      allMovies[movie].description =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
      return res.status(200).json(allMovies[movie]);
    }
  }
  res.status(404).send("Id not found");
}
