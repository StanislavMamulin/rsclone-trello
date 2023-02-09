import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IBoard } from 'src/app/modules/board/model/Board.model';
import { BoardService } from 'src/app/modules/board/board-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchField: HTMLElement;
  boards: IBoard[] = [];

  constructor(private router: Router, private boardService: BoardService) {}

  openBoards() {
    this.router.navigate(['/board']);
  }

  openMainPage() {
    this.router.navigate(['/main']);
  }

  searchFocus(event: Event) {
    this.searchField = document.querySelector(
      'input[type="search"]'
    ) as HTMLInputElement;
    if (this.searchField) {
      this.searchField.focus();
    }
  }

  changeSearchIcon(event: Event) {
    const searchIcon = document.querySelector('.search span') as HTMLElement;
    const searchContainer = (event.target as HTMLElement).closest(
      '.search'
    ) as HTMLDivElement;

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

  ngAfterViewChecked() {
    document.addEventListener('click', this.changeVisibility);
  }

  getBoards() {
    this.boardService.getBoards().subscribe((res) => {
      this.boards = res;
    });
  }

  openBoard(event: Event, board: IBoard) {
    this.router.navigate(['/board', board.idBoard]);
  }

  changeVisibility(event: Event) {
    const result = document.querySelector('.result-container') as HTMLElement;
    const input = document.querySelector(
      'input[type="search"]'
    ) as HTMLInputElement;
    (event.target as HTMLElement).closest('.search') &&
    !(event.target as HTMLElement).classList.contains('result')
      ? (result.style.display = 'block')
      : ((result.style.display = 'none'), input.blur());
  }
}
