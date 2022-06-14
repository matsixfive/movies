// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import allMovies from "./allMovies";

export default function handler(req, res) {
  if (req.method === "GET") {
    // res.status(200).send(allMovies.slice(0, 6))
    res.status(200).send(
      allMovies.map((movie) => {
        const { id, name, poster } = movie;
        return { id, name, poster };
      })
    );
  }
}
