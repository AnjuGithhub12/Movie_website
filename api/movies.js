// api/movies.js
import fetch from "node-fetch";

export default async function handler(req, res) {
    const { query } = req.query; // example: ?query=batman
    const API_KEY = process.env.OMDB_API_KEY;

    if (!query) return res.status(400).json({ error: "Query missing" });

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
}
