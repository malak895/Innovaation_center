import { Component,ViewChild, OnInit  } from '@angular/core';

@Component({
  selector: 'app-event2',
  templateUrl: './event2.component.html',
  styleUrls: ['./event2.component.css']
})
export class Event2Component {

  ngOnInit(): void {
    const myBox = document.querySelector('#my-box') as HTMLElement;
    myBox.addEventListener('click', () => {
      
    });

}
}
