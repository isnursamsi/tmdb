import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import {ToastService} from "../services/toast.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor( private alertService: ToastService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        next: () => null,
        error: (err: HttpErrorResponse) => {
          const error = err.error?.message || err.error || err.status;
          if (err.status === 500) {
            this.alertService.show(err.status, error, 'error', {
              classname: 'bg-danger text-light',
              delay: 5000,
            });
          } else if (err.status === 403) {
            localStorage.clear();
          } else if (err.status === 401) {
            localStorage.clear();
          }
          this.alertService.setMessage(err.error?.message.toString());
          return throwError(error);
        },
      })
    );
  }
}
