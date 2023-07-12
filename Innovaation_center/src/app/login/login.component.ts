import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  email: string = '';
  password: string = '';
  isLogin: boolean = true;
  errorMessage: string = "";
  clientStatus: boolean = true; 
  
  provider: any = new GoogleAuthProvider();
  auth :any = getAuth();

  constructor(private router: Router,private http: HttpClient )
   {}

  login() {
    if ( !this.email || !this.password) {
      alert('Please provide the required information accurately! ');
      return;
    }
    console.log(this.email);
    console.log(this.password);
    let bodyData = {
      email: this.email,
      password: this.password,
    };
    this.http.post("http://localhost:3000/client/login", bodyData).subscribe((resultData: any) => {
      console.log(resultData);

      if (resultData.status) {
        localStorage.setItem('token', resultData.token); 
        this.isLogin = false;
        this.router.navigateByUrl('/home');
      } else {
        this.errorMessage = "Incorrect Email or Password";
        this.clientStatus = false; 
        console.log("Error login");
      }
    });
  }

  signInWithGoogle() { 
    signInWithPopup(this.auth, this.provider) 
      .then((result) => {
        const user = result.user;
        this.email = user.email!; 
        console.log(user, this.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
  ifMethod(myObject: any) {
    if (myObject && myObject.email) {
      
    } else {
      
    }
  }

}
