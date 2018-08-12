import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
   email: string;
   password: string;
  constructor(private dastor: DataStorageService) { }

  ngOnInit() {
  }

  onSignin(form: NgForm){
    this.email = form.value.email;
    this.password = form.value.password;
    this.dastor.checkUaer(this.email, this.password);
   }

   

        
}
