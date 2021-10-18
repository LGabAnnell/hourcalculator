import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private http: HttpClient, private router: Router) {}

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return <Promise<boolean>>this.http.get('api/test-auth').toPromise()
      .then(() => true)
      .catch(() => {
        this.router.navigate(['remote/login'], { queryParams: { returnUrl: state.url } });
        return false;
      });
  }
}