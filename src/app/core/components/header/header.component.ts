import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IBoard } from 'src/app/modules/board/model/Board.model';
import { BoardService } from 'src/app/modules/board/board-service.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalLogOutComponent } from '../modal-log-out/modal-log-out.component';
import { TranslocoService } from '@ngneat/transloco';
import { ModalHotkeysComponent } from '../modal-hotkeys/modal-hotkeys.component';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component';
import { AccessLevel, UserProfile } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/modules/services/user.service';
import { AppStateService } from '../../services/app-state.service';
import { Subscription } from 'rxjs';

interface ILanguage {
  img: string;
  icon: string
}



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') private searchInput: ElementRef<HTMLInputElement>;

  boards: IBoard[] = [];

  user: UserProfile = {
    id:'1111111111',
    firstName: 'user name',
    lastName: '',
    email: 'user email',
    gender: 'user gender',
    registrationDate: new Date(),
    accessLevel: AccessLevel.Anonymous,
  };

  audioChecked = true;

  selectedLanguage: string = localStorage.getItem('language') || 'en';

  selectedFlag: string = localStorage.getItem('flag') || '../../../../assets/images/en.svg';

  isAuth = false;

  indexBoard = -1;

  searchStr = '';

  person = '../../../../assets/images/man.svg';

  languages: ILanguage[] = [{ img: '../../../../assets/images/en.svg', icon: 'done' }, { img: '../../../../assets/images/ru.svg', icon: '' }];

  isEditActive = false;

  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private boardService: BoardService,
    public auth: AuthService,
    public userService: UserService,
    public dialog: MatDialog,
    private translocoService: TranslocoService,
    private appStateService: AppStateService,
  ) { }

  ngOnInit(): void {
    this.isAuth = this.auth.isAuthenticated();
    this.setIconForLang();

    this.addSubscriptions();

    this.userService.getCurrentUserProfile()
      .subscribe(res=>{
        this.user = { ...res };
        this.appStateService.setCurrentUser(res);
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  @HostListener('window:keyup', ['$event'])
  hotkeyHandler(event: KeyboardEvent) {
    if (this.isEditActive) return;
  
    if (event.key === '/') {
      this.appStateService.setIsItemEdit(true);
      this.searchInput.nativeElement.focus();
      this.updateBoards();
    }

    if (event.key === 'B') {
      this.openBoards();
    }
  }

  private addSubscriptions() {
    this.appStateService.currentUser$.subscribe(user => {
      this.user = user;
      this.person = '../../../../assets/images/' + user.gender + '.svg';
    });

    this.subscriptions.push(this.appStateService.isItemEdit$.subscribe((editActive: boolean) => {
      this.isEditActive = editActive;
    }));
  }

  updateToggleSlider() {
    this.appStateService.setIsSoundEnable(this.audioChecked);
  }

  openDialogEditProfile(user:UserProfile) {
    this.appStateService.setIsItemEdit(true);
    const dialogRef = this.dialog.open(EditProfileModalComponent, {
      data: { user },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {

        this.user = result.user;
      }
    });
  }

  changeLanguage(e: MouseEvent) {
    const btn = e.currentTarget as HTMLButtonElement;
    const img = btn.querySelector('img') as HTMLImageElement;
    this.selectedLanguage = img?.src.slice(img?.src.length - 6, -4);
    this.selectedFlag =  `../../../../assets/images/${this.selectedLanguage}.svg`;
    this.translocoService.setActiveLang(this.selectedLanguage);
    this.setIconForLang();
    localStorage.setItem('language', this.selectedLanguage);
    localStorage.setItem('flag', this.selectedFlag);
  }

  setIconForLang() {
    if (this.selectedLanguage === 'en') {
      this.languages[0].icon = 'done';
      this.languages[1].icon = '';
    } else {
      this.languages[0].icon = '';
      this.languages[1].icon = 'done';
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ModalLogOutComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialogHotFix(enterAnimationDuration:string, exitAnimationDuration: string) {
    this.dialog.open(ModalHotkeysComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }



  openBoards(): void {
    this.router.navigate(['/board']);
  }

  openMainPage(): void {
    this.router.navigate(['/main']);
  }

  openRegistrationPage() {
    this.router.navigate(['/registration']);
  }

  openLoginPage() {
    this.router.navigate(['/login']);
  }

  updateBoards() {
    this.getBoards();
  }

  getBoards(): void {
    this.boardService.getBoards().subscribe((res) => {
      this.boards = res;
    });
  }

  openBoard(board: IBoard): void {
    this.appStateService.setIsItemEdit(false);
    this.router.navigate(['main']).then(() => {
      this.router.navigate(['/board', board.idBoard]);
    });
  }

  reduceSearchInput() {
    this.appStateService.setIsItemEdit(false);
    const rightSide = document.querySelector('.right-side') as HTMLTemplateElement;
    rightSide.className = 'right-side';
  }

  increaseSerchInput() {
    this.appStateService.setIsItemEdit(true);
    const rightSide = document.querySelector('.right-side') as HTMLTemplateElement;
    rightSide.className = 'right-side active';
  }
}
