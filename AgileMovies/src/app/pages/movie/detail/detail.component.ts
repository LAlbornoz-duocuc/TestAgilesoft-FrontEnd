import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CardActorComponent } from '../../../components/card-actor/card-actor.component';
import { Actors } from '../../../models/movies/actors';
import { MoviesService } from '../../../services/movies/movies.service';
import { Movie } from '../../../models/movies/movie';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NavbarComponent, CardActorComponent, NgFor, InfiniteScrollDirective],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {

  data!: {
    movie: Movie,
    imgURL: string
  };
  movie!: Movie;
  public imgURL!: string;
  actors: Actors[] = [];
  page:number = 0;
  elementsView: number = 4;
  listView!:Actors[];
  public imgUrlActors: string = "";

  constructor(private router: Router, private moviesService: MoviesService) {
    const navigation = this.router.getCurrentNavigation();

    this.data = navigation?.extras.state?.['data'];
    this.movie = this.data.movie;
    this.imgURL = this.data.imgURL;
    console.log(this.movie);
    console.log(this.imgURL);


  }

  async ngOnInit() {


    (await this.moviesService.Actors(this.movie.id)).subscribe({
      next: resp => {
        this.imgUrlActors = resp.imageBaseUrl;

        this.actors = resp.data;
        this.listView = this.actors.slice(0,this.elementsView)
      }
    })
  }

  async onScroll() {
    this.page = this.page + 1;
    let desde = this.page * this.elementsView
    let hasta = (this.page + 1) * this.elementsView

    if(this.page * this.elementsView > this.actors.length)
      return;
    
    let sliceActors = this.actors.slice(desde,hasta);

    sliceActors.forEach(e => {
      this.listView.push(e);
    });

  }
}
