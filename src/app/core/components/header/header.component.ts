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

  searchStr = '';

  constructor(private router: Router, private boardService: BoardService) {}

  openBoards(): void {
    this.router.navigate(['/board']);
  }

  openMainPage(): void {
    this.router.navigate(['/main']);
  }

  openRegistrationPage() {
    this.router.navigate(['/registration']);
  }

  openLoginPage(){
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.getBoards();
  }

  updateBoards(){
    this.getBoards();
  }

  getBoards(): void {
    this.boardService.getBoards().subscribe((res) => {
      this.boards = res;
    });
  }

  openBoard(board: IBoard): void {
    this.router.navigate(['main']).then(() => {
      this.router.navigate(['/board', board.idBoard]);
    });
  }
}
