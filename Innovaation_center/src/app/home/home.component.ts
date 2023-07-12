import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AuthGuard]
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {

    const slider:any = document.querySelector('.slider1');
    const leftArrow:any = document.querySelector('.left');
    const rightArrow:any = document.querySelector('.right');
    const indicatorParents:any = document.querySelector('.controls ul');

    function setIndex(index:any) {
      const cont:any=document.querySelector('.controls .selected');
        cont.classList.remove('selected')
        slider.style.transform = 'translate(' + (index) * -25 + '%)'
    }

    let sectionIndex = 0;

    document.querySelectorAll('.controls li').forEach((indicator, ind) => {
        indicator.addEventListener('click', function () {
            sectionIndex = ind;
            indicator.classList.add('selected')
            setIndex(sectionIndex)
        })
    })

    rightArrow.addEventListener('click', () => {
        sectionIndex = (sectionIndex < 3) ? sectionIndex + 1 : 3
        indicatorParents.children[sectionIndex].classList.add('selected')
        setIndex(sectionIndex)
    })
    leftArrow.addEventListener('click', () => {
        sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 0
        indicatorParents.children[sectionIndex].classList.add('selected')
        setIndex(sectionIndex)
    })

  }
}

