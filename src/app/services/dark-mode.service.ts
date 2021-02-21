
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { computed } from 'mobx-angular';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  white: '#ffffff';
  black: '#141313';

  darkModeEnabled: boolean;
  private darkMode: Subject<boolean> = new Subject<boolean>();
  isThemeDark = this.darkMode.asObservable();
  constructor() { }

  setDarkTheme(isThemeDark: boolean) {
    this.darkMode.next(isThemeDark);

    if (isThemeDark === true) {
      console.log('Dark Used');
      document.documentElement.style.setProperty('--white-color', this.black);
      document.documentElement.style.setProperty('--black-color', this.white);
      localStorage.setItem('dark', 'true');
    } else {
      console.log('Light Used');
      document.documentElement.style.setProperty('--white-color', this.white);
      document.documentElement.style.setProperty('--black-color', this.black);
      localStorage.setItem('dark', 'false');
    }
  }

  // @computed get darkModeSet() {
  //   if (this.isThemeDark === true) {
  //     return
  //   }
  // }
}
