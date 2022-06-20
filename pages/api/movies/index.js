import allMovies, { sortedMoviesName } from "./allMovies";

export default function handler(req, res) {
  console.log("yo");
  if (req.method === "GET") {
    console.log("get");
    res.status(200).send(
      allMovies.map((movie) => {
        const { id, name, poster } = movie;
        return { id, name, poster };
      })
    );
  } else if (req.method === "POST") {
    // console.log("post", JSON.parse(req.body).order);
    if (JSON.parse(req.body).order === "alpha") {
      res.status(200).send(
        sortedMoviesName.map(({ id, name, poster }) => {
          return { id, name, poster };
        })
      );
    } else {
      res.status(400).send(
        allMovies.map((movie) => {
          const { id, name, poster } = movie;
          return { id, name, poster };
        })
      );
    }
  }
}
