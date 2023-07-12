import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface EventData {
  _id: string;
  titre: string;
  description: string;
  image: {
    data: string;
    contentType: string;
  };
}


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: EventData[] = [];
  errorMessage = '';
 

  constructor(private http: HttpClient) {}

 


  ngOnInit(): void {
    this.fetchEventData();
    const zoom = document.querySelector('.zoom') as HTMLElement;
  
    if (!zoom) {
      console.error('Element with class "zoom" not found.');
      return;
    }
  
    zoom.addEventListener('click', function(e: MouseEvent) {
      e.preventDefault();
      const overlay = document.createElement('div');
      overlay.classList.add('zoom-overlay');
      zoom.appendChild(overlay);
      setTimeout(function() {
        overlay.classList.add('active');
      }, 50);
    });
  }


  
fetchEventData(): void {
  this.http.get<EventData[]>('http://localhost:3000/event/getAll')
    .subscribe(
      (response) => {
        this.events = response;
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = 'An error occurred while fetching event data';
        console.error('An error occurred while fetching event data:', error);
      }
    );
}

getImageSrc(item: EventData): string {
  if (item.image && item.image.data) {
    return 'data:' + item.image.contentType + ';base64,' + item.image.data;
  } else {
    return 'placeholder-image-url';
  }
}




}
