import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioServiceService {
  constructor() {}

  playAudio(audioLink: string) {
    const audio = new Audio();
    audio.src = audioLink;
    audio.play();
  }
}
