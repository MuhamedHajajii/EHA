import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ICarouselImagesArr {
  url: string;
  alt: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  carouselImagesArr: ICarouselImagesArr[] = [
    {
      url: './assets/rev/1-6.jpg',
      alt: 'first doctor',
      isActive: true,
    },
    {
      url: './assets/rev/2-6.jpg',
      alt: 'second doctor',
      isActive: false,
    },
  ];
}
