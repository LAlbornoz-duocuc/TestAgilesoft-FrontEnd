export class Movie{
      adult :                   boolean;
      backdrop_path :           string;
      genre_ids:                [];
      id:                       number;
      original_language:        string;
      original_title:           string;
      overview:                 string;
      popularity:               number;
      poster_path:              string;
      release_date:             Date;
      title:                    string;
      video:                    boolean;
      vote_average:             number;
      vote_count:               number;

      constructor(){
        this.adult                  = false;
        this.backdrop_path          = "";
        this.genre_ids              = [];
        this.id                     = 0;
        this.original_language      = "";
        this.original_title         = "";
        this.overview               = "";
        this.popularity             = 0;
        this.poster_path            = "";
        this.release_date           = new Date;
        this.title                  = "";
        this.video                  = false;
        this.vote_average           = 0;
        this.vote_count             = 0;
      }
}