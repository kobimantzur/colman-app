import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthGuard } from '../auth/autoguard';



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{
    constructor(private dataStorageService: DataStorageService , private authguard: AuthGuard){}
    onSaveData(){
        this.dataStorageService.storeRecipes();        
    }

    onFetchFata(){
        this.dataStorageService.getRecipe();
    }

    onLogout(){
        this.authguard.logout();
    }



}