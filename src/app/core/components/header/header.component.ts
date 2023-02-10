import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchField: HTMLElement;

  constructor(private router: Router) {}

  openBoards() {
    this.router.navigate(['/board']);
  }

  openMainPage() {
    this.router.navigate(['/main']);
  }

  searchFocus() {
    this.searchField = document.querySelector(
      'input[type="search"]',
    ) as HTMLInputElement;
    if (this.searchField) {
      this.searchField.focus();
    }
  }

  changeSearchIcon(event: Event) {
    const searchIcon = document.querySelector('.search span') as HTMLElement;
    const searchContainer = (event.target as HTMLElement).closest('.search') as HTMLDivElement;

    // event.type === 'focus'
    //   ? ((searchIcon.style.color = 'black'),
    //     (searchIcon.style.top = '1px'),
    //     (searchContainer.style.left = '-50px'))
    //   : ((searchIcon.style.color = 'white'), (searchIcon.style.top = '0'));

    if (event.type === 'focus') {
      searchIcon.style.color = 'black';
      searchIcon.style.top = '1px';
      if (window.innerWidth <= 750) {
        searchContainer.style.left = '-100px';
      }
    } else if (event.type === 'blur') {
      searchIcon.style.color = 'white';
      searchIcon.style.top = '0';
      if (window.innerWidth <= 750) {
        searchContainer.style.left = '0';
      }
    }
  }
}
