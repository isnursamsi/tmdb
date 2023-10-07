import { Component, OnInit } from "@angular/core";
import { BaseService } from "src/app/core/services/base.service";
import { takeUntil, Subject } from 'rxjs';
import { Router } from "@angular/router";
import { API_KEY } from "../../../core/constants/constants";

@Component({
    selector: 'dashboard-component',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
    destroy$ = new Subject();
    popular: any = []
    top_rated: any = []
    upcoming: any = []
    active_nav: string = 'upcoming'
    type_movies: any = [
        {
            title: 'Upcoming Movies',
            value: 'upcoming',
        },
        {
            title: 'Top Rated Movies',
            value: 'top_rated',
        },
        {
            title: 'Popular Movies',
            value: 'popular',
        },
        {
            title: 'Your Favorite Movies',
            value: 'favorite',
        },
    ]
    movie_item: any = [];
    mark_item: any = [];

    constructor(
        private baseService: BaseService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.mark_item = localStorage.getItem('markItems')
        this.mark_item = JSON.parse(this.mark_item) !== null ? JSON.parse(this.mark_item) : []
        this.fetchMovie()
    }

    fetchMovie(): void {
        this.baseService.getDataWithToken(`https://api.themoviedb.org/3/movie/popular?page=2&api_key=${API_KEY}`).pipe(takeUntil(this.destroy$)).subscribe(response => {
            this.popular = response
        })
        this.baseService.getDataWithToken(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`).pipe(takeUntil(this.destroy$)).subscribe(response => {
            this.top_rated = response
        })
        this.baseService.getDataWithToken(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`).pipe(takeUntil(this.destroy$)).subscribe(response => {
            this.upcoming = response
            this.movie_item = response
        })
    }

    setTypeMovies(state: any): void {
        this.active_nav = state.value
        switch (state.value) {
            case ('upcoming'):
                this.movie_item = this.upcoming.results
                break;
            case ('top_rated'):
                this.movie_item = this.top_rated.results
                break;
            case ('popular'):
                this.movie_item = this.popular.results
                break;
            case ('favorite'):
                this.movie_item = this.mark_item
                break;
        }
    }
    getPoster(state: string): string {
        return `https://image.tmdb.org/t/p/original/${state}`
    }

    detail(data: number | string): void {
      this.router.navigate(['dashboard-movies/detail', data])
    }
    logout(): void {
        localStorage.clear()
        window.location.reload()
    }

    markFavorite(data: any): void {
      const find = this.mark_item.find((item: any) => item.title === data.title)
      if (find) {
        const findIndex = this.mark_item.findIndex((item: any) => item.title === data.title)
        this.mark_item.splice(findIndex, 1)
        localStorage.setItem('markItems', JSON.stringify(this.mark_item))
      } else {
        this.mark_item.push(data)
        localStorage.setItem('markItems', JSON.stringify(this.mark_item))
      }
    }

    stateMarks(data: any): string {
      const find = this.mark_item.find((item: any) => item.title === data.title)
      if (find) {
        return 'Marked Favorite'
      }
      return 'Mark as Favorite'
    }

    classMarks(data: any): string {
      const find = this.mark_item.find((item: any) => item.title === data.title)
      if (find) {
        return 'btn btn-danger'
      }
      return 'btn btn-outline-danger'
    }
}
