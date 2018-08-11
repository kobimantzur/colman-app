import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private dataStor: DataStorageService) { }

  ngOnInit() {
  }

   onSignup(form: NgForm){
     const firsname = form.value.firstname;
     const lastname = form.value.lastname;
     const email = form.value.email;
     const password = form.value.password;
     this.dataStor.register(firsname, lastname, email, password);
   }

}
