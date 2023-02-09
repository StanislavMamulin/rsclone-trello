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
  boards: IBoard[] = [];
  searchStr: string = '';

  constructor(private router: Router, private boardService: BoardService) {}

  openBoards(): void {
    this.router.navigate(['/board']);
  }

  openMainPage(): void {
    this.router.navigate(['/main']);
  }

  searchFocus(): void {
    const searchField = document.querySelector(
      'input[type="search"]'
    ) as HTMLInputElement;
    searchField.focus();
  }

  changeSearchIcon(event: Event): void {
    const searchIcon = document.querySelector(
      '.search span'
    ) as HTMLSpanElement;
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

  ngAfterViewChecked(): void {
    document.addEventListener('click', this.changeVisibility);
  }

  getBoards(): void {
    this.boardService.getBoards().subscribe((res) => {
      this.boards = res;
    });
  }

  openBoard(board: IBoard): void {
    this.router.navigate(['/board', board.idBoard]);
  }

  changeVisibility(event: Event): void {
    const result = document.querySelector(
      '.result-container'
    ) as HTMLDivElement;
    const input = document.querySelector(
      'input[type="search"]'
    ) as HTMLInputElement;
    (event.target as HTMLElement).closest('.search') &&
    !(event.target as HTMLElement).classList.contains('result')
      ? (result.style.display = 'block')
      : ((result.style.display = 'none'), input.blur());
  }
}
