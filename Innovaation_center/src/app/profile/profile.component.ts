import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  firstname: string = '';
  email: string = '';
  password: string = '';
  status = false;
  constructor(private http: HttpClient) {}
  addToggle()
  {
    this.status = !this.status;       
  }

  update() {
    if ( !this.email || !this.password  || !this.firstname ) {
      alert('Please provide the required information accurately! ');
      return;
    }
    console.log(this.email);
    console.log(this.password);
    let bodyData = {
      password: this.password,
      email: this.email,
      firstname: this.firstname,
    };
    
    this.http
      .put(`http://localhost:3000/admin/update/64641819cb9b9492493b10dc`, bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Admin updated successfully');
      });
  }
  save() {
    this.update();
  }

}

