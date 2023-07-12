import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstname: string = '';
  email: string = '';
  password: string = '';
  provider: any = new GoogleAuthProvider();
  auth :any = getAuth();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  signInWithGoogle() {
    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        const user = result.user;
        if (user) {
          this.email = user.email!;
          console.log(user, this.email);
        } else {
          console.log('User is undefined');
        }
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
      // Access the email property of myObject
    } else {
      // Handle the case where myObject or myObject.email is undefined
    }
  }

  register() {
    if (!this.firstname || !this.email || !this.password) {
      // Vérification des champs requis
      if (!this.firstname) {
        alert('Please enter your name!');
      } else if (!this.email) {
        alert('Please enter your email!');
      } else {
        alert('Please enter your password!');
      }
      return;
    }

    // Effectuer une requête GET pour vérifier si le compte existe déjà
    const url = `http://localhost:3000/client?email=${encodeURIComponent(this.email)}`;
    this.http.get(url).subscribe(
      (resultData: any) => {
        // Vérifier si la réponse contient des données
        if (resultData && resultData.length > 0) {
          // Le compte existe déjà
          alert('Account already exists!');
        } else {
          // Le compte n'existe pas encore, procéder à l'enregistrement
          let bodyData = {
            firstname: this.firstname,
            email: this.email,
            password: this.password,
          };
          this.http.post('http://localhost:3000/client/create', bodyData).subscribe(
            (resultData: any) => {
              console.log(resultData);
              alert('Student Registered Successfully');
              this.router.navigate(['/login']);
            },
            (error: any) => {
              console.error(error);
              alert('Failed to add event!');
            }
          );
        }
      },
      (error: any) => {
        // Gérer les erreurs de la requête GET
        if (error.status === 404) {
          // Le compte n'existe pas
          // Procéder à l'enregistrement
          let bodyData = {
            firstname: this.firstname,
            email: this.email,
            password: this.password,
          };
          this.http.post('http://localhost:3000/client/create', bodyData).subscribe(
            (resultData: any) => {
              console.log(resultData);
              alert('Student Registered Successfully');
              this.router.navigate(['/login']);
            },
            (error: any) => {
              console.error(error);
              alert('Failed to add event!');
            }
          );
        } else {
          console.error(error);
          alert('Failed to check account existence!');
        }
      }
    );
  }
  

 
}
