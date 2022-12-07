export default class Movie {
    Title: string;
    Year: string;
    Rated: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    Poster: string;
    Metascore: string;
    imdbRating: string;

    constructor(obj : Movie | any ) {
        this.Title = obj.Title;
        this.Year = obj.Year;
        this.Rated = obj.Rated;
        this.Runtime = obj.Runtime;
        this.Genre = obj.Genre;
        this.Director = obj.Director;
        this.Actors = obj.Actors;
        this.Plot = obj.Plot;
        this.Poster = obj.Poster;
        this.Metascore = obj.Metascore;
        this.imdbRating = obj.imdbRating;
    }
}
