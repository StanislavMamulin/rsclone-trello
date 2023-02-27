import { Injectable, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from '../core/services/app-state.service';

@Injectable({
  providedIn: 'root',
})
export class AudioServiceService {
  isSoundEnable: boolean = true;
  subscription: Subscription;

  constructor(private appStateService: AppStateService) {
    this.appStateService.isSoundEnable$.subscribe((enableSound) => {
      this.isSoundEnable = enableSound;
    });
  }

  playAudio(audioLink: string) {
    if (this.isSoundEnable) {
      const audio = new Audio();
      audio.src = audioLink;
      audio.ondurationchange = () => {
        console.log(audio.duration);
        console.log(audio.currentTime);
        audio.duration ? audio.play() : console.log('no');
      };
    }
  }
}
