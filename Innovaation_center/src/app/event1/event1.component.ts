import { Component,ViewChild, OnInit  } from '@angular/core';

@Component({
  selector: 'app-event1',
  templateUrl: './event1.component.html',
  styleUrls: ['./event1.component.css']
})
export class Event1Component {

  ngOnInit(): void {
    const myBox = document.querySelector('#my-box') as HTMLElement;
    myBox.addEventListener('click', () => {
      
    });

}
}