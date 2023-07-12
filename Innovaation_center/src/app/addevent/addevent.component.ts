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
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.scss']
})
export class AddeventComponent implements OnInit {
  showAddEventForm = false;
  titre = '';
  description = '';
  selectedFile?: File;
  events: EventData[] = [];
  errorMessage = '';
  showEditEventForm = false;
  eventId = '';

  constructor(private http: HttpClient) {}

  toggleAddEventForm(): void {
    this.showAddEventForm = !this.showAddEventForm;
  }

  toggleEditEventForm(): void {
    this.showEditEventForm = !this.showEditEventForm;
  }

  ngOnInit(): void {
    this.fetchEventData();
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

  save(): void {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('titre', this.titre);
    formData.append('description', this.description);
    formData.append('imageFile', this.selectedFile);

    this.http.post('http://localhost:3000/event/create', formData)
      .subscribe(
        (response) => {
          console.log('Event created successfully', response);
          alert('Event created successfully');
        },
        (error: HttpErrorResponse) => {
          console.error('Failed to create event', error);
          // Handle error, e.g., show an error message
        }
      );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  deleteEvent(id: string): void {
    if (!id || id.trim() === '') {
      console.error('Invalid event id:', id);
      return;
    }
  
    const itemIndex = this.events.findIndex(e => e._id === id);
  
    if (itemIndex === -1) {
      console.error('Event not found:', id);
      console.log('Events array:', this.events);
      return;
    }
  
    console.log(this.titre);
    console.log(this.description);
    console.log(this.selectedFile);
  
    let options = {
      body: {
        description: this.description,
        titre: this.titre,
        image: this.selectedFile,
      },
    };
  
    this.http
      .delete(`http://localhost:3000/event/delete/${id}`, options)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Event deleted successfully');
      });
  }
  
  
  
  update() {
    if (!this.titre || !this.description) {
      alert('Please provide the required information accurately!');
      return;
    }
  
    console.log(this.titre);
    console.log(this.description);
  
    let bodyData = {
      description: this.description,
      titre: this.titre,
    };
  
    let eventId = '646f7f03623cc67acbca0f23'; // Replace '123' with the actual event ID
  
    this.http
      .put(`http://localhost:3000/event/update/${eventId}`, bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Event updated successfully');
      });
  }
  
  
  
  

}
