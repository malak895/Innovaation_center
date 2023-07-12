import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

 

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URI = 'http://localhost:3000/upload';

  constructor(
    private http: HttpClient
  ) { }

    
    addevent(title: string, description: string, event: File) {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('description', description);
      fd.append('image', event);
      return this.http.post(this.URI, fd);
    }
  
    getEvents() {
      return this.http.get<Event[]>(this.URI);
    }
  
    getEvent(id: string) {
      return this.http.get<Event>(`${this.URI}/${id}`);
    }
  
    deleteEvent(id: string) {
      return this.http.delete(`${this.URI}/${id}`);
    }
  
    updateEvent(id: string, title: string, description: string) {
      return this.http.put(`${this.URI}/${id}`, {title, description});
    }


}