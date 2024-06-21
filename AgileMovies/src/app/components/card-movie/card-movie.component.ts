import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../models/movies/movie';

@Component({
  selector: 'app-card-movie',
  standalone: true,
  imports: [],
  templateUrl: './card-movie.component.html',
  styleUrl: './card-movie.component.css'
})
export class CardMovieComponent {
  @Input() pelicula!: Movie;
  @Input() imgUrl!: string;

  constructor(private router:Router){}

  DetailMovie() {
    let movie = this.pelicula;
    let imgURL = this.imgUrl;
    let data = {
      movie: movie,
      imgURL: imgURL
    }
    this.router.navigate(['movie'], { state: {data} });
  }
}
