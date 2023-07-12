import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {
 
  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post('http://localhost:3000/login', data);
  } 




}
