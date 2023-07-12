import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhotoService } from '../services/photo.service';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {
  
  status = false;
  chartOptions: any;
  EventArray: any[] = [];
  currentEventID = "";
  photoSelected: string | ArrayBuffer | null = null;
  file: File | null = null;
  description: string | null = null;
  imagePath = "";
  title = 'chartDemo';

  addToggle()
  {
    this.status = !this.status;       
  }
  ngAfterViewInit() {
    // Code to run after the view has been initialized goes here
  }
  //Charts
  type = 'line';
  type2 = 'bar';
  dataa = {
    labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
    datasets: [{
            label: "Visitor",
            data: [15, 30, 55, 45, 70, 65, 85],
            backgroundColor: " #a445b2",
            fill: true
        },
        {
            label: "Interaction",
            data: [99, 135, 170, 130, 190, 180, 270],
            backgroundColor: "hsl(332, 78%, 60%)",
            fill: true
        }
    ]
    }
    dataaa = {
      labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
      datasets: [{
              label: "Salse",
              data: [15, 30, 55, 45, 70, 65, 85],
              backgroundColor: "#a445b2",
              fill: true
          },
          {
              label: "Revenue",
              data: [99, 135, 170, 130, 190, 180, 270],
              backgroundColor: "hsl(332, 78%, 60%)",
              fill: true
          }
      ]
      }
           options = {
             
              
              maintainAspectRatio: true,
              scales: {
                  yAxes : [{
                      ticks : {
                          max : 90,    
                          min : 30
                      }
                  }]
              }
          };




          
  
  
  
  constructor(
    private photoService: PhotoService,
    private router: Router,
    private http: HttpClient
  ) {}



  ngOnInit(){
  
  }
  


  onPhotoSelected(event: any): void {
    this.file = event.target.files[0] as File;
    // image preview
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result;
      if (typeof result === 'string' || result instanceof ArrayBuffer) {
        this.photoSelected = result;
      }
    };
    reader.readAsDataURL(this.file);
  }
  

 
  
    

 
 
  register() {
    
  
}



  getAllEvent() {
   



    const options = {
      startAngle: -1.55,
      size: 150,
      value: 0.85,
      fill: { gradient: ['#a445b2', '#fa4299'] }
    };
    
    $(".circle .bar").circleProgress(options).on('circle-animation-progress', (event: any, progress: any, stepValue: any) => {
      const percent = String(stepValue.toFixed(2).substr(2)) + "%";
      $(event.target).parent().find("span").text(percent);
    });
    
    $(".js .bar").circleProgress({
      value: 0.70
    });
    
    $(".node .bar").circleProgress({
      value: 0.90
    });
    
    $(".react .bar").circleProgress({
     
    });


   const viewAllBtn = document.getElementById("view-all-btn") as HTMLButtonElement;
   const viewAllForm = document.getElementById("view-all-form") as HTMLFormElement;
    
    viewAllBtn.addEventListener("click", () => {
      if (viewAllForm.style.display === "none") {
        viewAllForm.style.display = "block";
      } else {
        viewAllForm.style.display = "none";
      }
    });
  }


  assistant() {
    this.http.post('http://localhost:5000/assistant', { intent: 'assistant' }).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
  }

  logout() {
    const navigationExtras: NavigationExtras = {
      skipLocationChange: true
    };
    this.router.navigate(['/login']);
  }
  
  
  
   
  

  

}



