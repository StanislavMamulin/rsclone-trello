import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../board-service.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.boardService.getBoards().subscribe((element) => console.log(element));
  }
}
