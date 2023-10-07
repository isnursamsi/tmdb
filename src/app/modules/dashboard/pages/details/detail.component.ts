import { Component, OnInit, inject } from "@angular/core";
import { BaseService } from "src/app/core/services/base.service";
import { Router } from "@angular/router";
import { takeUntil, Subject } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { API_KEY } from "../../../../core/constants/constants";

@Component({
  selector: 'detail-component',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})

export class DetailComponent implements OnInit {
  destroy$ = new Subject()
  private route = inject(ActivatedRoute)
  detailItem: any = {}

  constructor(
    private baseService: BaseService,
    private router: Router,
  ) {}
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.baseService.getDataWithToken(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response => {
        this.detailItem = response
    }))
  }

  getPoster(state: string): string {
    return `https://image.tmdb.org/t/p/original/${state}`
  }
}
