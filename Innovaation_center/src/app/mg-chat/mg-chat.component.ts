import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-mg-chat',
  templateUrl: './mg-chat.component.html',
  styleUrls: ['./mg-chat.component.scss']
})

export class MgChatComponent implements OnInit {
  intents: any = {
    tag: '',
    patterns: '',
    responses: ''
  };
  status = false;
  EventArray: any[] = [];
  currentEventID = "";
  photoSelected: string | ArrayBuffer | null = null;
  showAddEventForm = false;
  showEditEventForm: boolean = false;
  newIntents: any[] = [];

  constructor(
    private photoService: PhotoService,
    private http: HttpClient
  ) { }
 
  
  toggleMode(): void {
    this.photoService.toggleMode();
  }
  toggleAddEventForm(): void {
    this.showAddEventForm = !this.showAddEventForm;
  }
  
  toggleEditEventForm(): void {
    this.showEditEventForm = !this.showEditEventForm;
  }
  ngOnInit(): void {
    this.getIntents();
  }

  geteditEvent(): void {
    const viewAllBtn = document.getElementById(
      'view-all-btn'
    ) as HTMLButtonElement;
    const viewAllForm = document.getElementById(
      'view-all-form'
    ) as HTMLFormElement;

    viewAllBtn.addEventListener('click', () => {

      if (viewAllForm.style.display === 'none') {
        viewAllForm.style.display = 'block';
      } else {
        viewAllForm.style.display = 'none';
      }
    });
  }
  getAllEvent(): void {
    const viewAllBtn = document.getElementById(
      'view-all-btn'
    ) as HTMLButtonElement;
    const viewAllForm = document.getElementById(
      'view-all-form'
    ) as HTMLFormElement;

    viewAllBtn.addEventListener('click', () => {
      if (viewAllForm.style.display === 'none') {
        viewAllForm.style.display = 'block';
      } else {
        viewAllForm.style.display = 'none';
      }
    });
  }

  addEvent() {
    const tag = (document.getElementById('tag') as HTMLInputElement).value;
    const patterns = (document.getElementById('patterns') as HTMLInputElement).value.split(',');
    const responses = (document.getElementById('responses') as HTMLInputElement).value.split(',');
  
    
    if (!tag || !patterns || !responses) {
      alert('Please fill all required fields!');
      return;
    }
  
    const intent = {
      tag: tag,
      patterns: patterns,
      responses: responses
    };
    this.http.post('http://localhost:5000/save-intents', intent).subscribe(
      (response: any) => {
        console.log(response);
        alert('Event added successfully!');
       
        (document.getElementById('add-event-form') as HTMLFormElement).reset();
        this.showAddEventForm = false; // Cacher le formulaire après soumission réussie
      },
      (error: any) => {
        console.error(error);
        alert('Failed to add event!');
      }
    );
  }

  getIntents(): void {
    this.http.get<any[]>('http://localhost:5000/getIntents').subscribe(
      (data: any[]) => {
        this.intents = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  editIntent (intentObj: any): void {
    const intent = {
      patterns: intentObj.patterns,
      tag: intentObj.tag,
      responses: intentObj.responses,
    };
  
    this.http.put('http://localhost:5000/editIntent', intent).subscribe(
      (response: any) => {
        console.log('Intent modified successfully');
      },
      (error: any) => {
        console.error('Error while modifying the intent', error);
      }
    );
  }
  
  
  
  
  
  
  
  deleteIntent(intent: any): void {
    this.http.post('http://localhost:5000/deleteIntent', intent).subscribe(
      (response: any) => {
        console.log('Intent deleted successfully');
      },
      (error: any) => {
        console.error('Error deleting intent', error);
      }
    );
  }
  
  

  
}
  





