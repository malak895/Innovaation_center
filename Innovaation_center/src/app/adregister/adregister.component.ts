import { Component ,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adregister',
  templateUrl: './adregister.component.html',
  styleUrls: ['./adregister.component.css']
})
export class AdregisterComponent {

  firstname: string = '';
  email: string = '';
  password: string = '';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  register() {
    let bodyData = {
      firstname: this.firstname,
      email: this.email,
      password: this.password,
    };

    
    this.http
      .post('http://localhost:3000/admin/create', bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Student Registered Successfully');
      });
  }
  save() {
    this.register();

  }


}



