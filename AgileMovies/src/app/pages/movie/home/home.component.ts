import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CardMovieComponent } from '../../../components/card-movie/card-movie.component';
import { Movie } from '../../../models/movies/movie';
import { MoviesService } from '../../../services/movies/movies.service';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CardMovieComponent, NgFor, NgClass, InfiniteScrollDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {




  peliculasEstreno!: Movie[];
  peliculasPopulares!: Movie[];
  page: number = 1;
  public imgUrl: string = "";
  public imgUrlPopulares: string = "";

  constructor(private moviesService: MoviesService) {

  }

  async ngOnInit() {



    (await this.moviesService.Playing(this.page)).subscribe({
      next: resp => {
        //console.log("resp", resp);
        //debugger
        this.imgUrl = resp.imageBaseUrl;

        this.peliculasEstreno = resp.data;
      }
    });

    (await this.moviesService.Popular(this.page)).subscribe({
      next: resp => {
        //console.log("resp", resp);
        //debugger
        this.imgUrlPopulares = resp.imageBaseUrl;

        this.peliculasPopulares = resp.data;
      }
    });
  }


  async onScroll() {
    this.page = this.page + 1;
    (await this.moviesService.Popular(this.page)).subscribe({
      next: resp => {
        //console.log("resp", resp);
        //debugger
        this.imgUrlPopulares = resp.imageBaseUrl;

        resp.data.forEach(e => {
          this.peliculasPopulares.push(e);
        });

      }
    });
  }
}
