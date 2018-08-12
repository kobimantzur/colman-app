import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthGuard } from '../auth/autoguard';



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent{
    constructor(public dataStorageService: DataStorageService , public authguard: AuthGuard){}
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