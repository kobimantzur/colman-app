import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.isAuthenticate();
    }

    isAuthenticate(){
        return localStorage.getItem('id_token')!= null;
    }

    
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('id_token');
}
}