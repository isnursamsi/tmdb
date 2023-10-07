import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { TokenStorageService } from "../services/token-storage.service";
import { Observable } from "rxjs";
import { inject } from "@angular/core";

export const LogGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  
    const router: Router = inject(Router);
    const tokenStorage: TokenStorageService = inject(TokenStorageService);
  
    if (tokenStorage.getToken()) {
      return router.navigate(['dashboard-movies']);    
    }
    else {
      if (tokenStorage.getToken()) {
        return router.navigate(['dashboard-movies']);
      }
      else
        return true;
    }
  
  }