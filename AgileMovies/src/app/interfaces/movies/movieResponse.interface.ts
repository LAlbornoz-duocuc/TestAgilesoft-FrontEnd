import { Movie } from "../../models/movies/movie";

export interface MovieResponse{
    imageBaseUrl: string;
    data: Movie[];
}