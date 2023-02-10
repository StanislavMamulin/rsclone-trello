import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  cardNumber: number;

  constructor() {
    this.cardNumber = 1;
  }

  changeCard(event: Event): void {
    const targetElement = (event.target as HTMLElement).closest('.card');
    const cardsList = document.querySelectorAll('.card');
    const cardIndex = Array.from(cardsList).indexOf(targetElement as HTMLElement);
    if (cardIndex === -1) return;
    this.cardNumber = cardIndex + 1;
    cardsList.forEach((item: Element) => {
      item === targetElement ? item.classList.add('selected') : item.classList.remove('selected');
    });

    this.changeCardImage();
  }

  private changeCardImage(): void {
    const cardImage = document.querySelector('figure img') as HTMLImageElement;
    cardImage.src = `../../../../assets/images/main-image-${this.cardNumber}.png`;
  }
}
