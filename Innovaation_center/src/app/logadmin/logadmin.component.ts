import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logadmin',
  templateUrl: './logadmin.component.html',
  styleUrls: ['./logadmin.component.css']
})

export class LogadminComponent implements OnInit {
  
  ngOnInit(): void {}

  errorMessage: string = '';
  email: string = '';
  password: string = '';
  isLogin: boolean = true;
  erroMessage: string = "";
  constructor(private router: Router,private http: HttpClient) {}
 
  login() {
    if (!this.email || !this.password) {
      alert('Please provide the required information accurately! ');
      return;
    }
  
    let bodyData = {
      email: this.email,
      password: this.password,
    };
  
    this.http.post("http://localhost:3000/admin/login", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
  
      if (resultData.status) {
        localStorage.setItem('token', resultData.token); // store token in local storage
        this.isLogin = false;
        this.router.navigateByUrl('/admin');
      } else {
        this.errorMessage = "Incorrect Email or Password";
        console.log("Error login");
      }
    });
  }
}


