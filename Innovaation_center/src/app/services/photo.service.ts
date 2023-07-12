import { Injectable } from '@angular/core';


export interface Event {
  title: string;
  description: string;
  image: File;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private isDarkMode = false;

  constructor() { }

  toggleMode(): void {
    this.isDarkMode = !this.isDarkMode;
    const mode = this.isDarkMode ? 'dark-mode' : 'light-mode';
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(mode);
  }
}
