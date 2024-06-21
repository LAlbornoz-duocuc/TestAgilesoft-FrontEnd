import { Actors } from "../../models/movies/actors";

export interface ActorResponse{
    imageBaseUrl: string;
    data: Actors[];
}