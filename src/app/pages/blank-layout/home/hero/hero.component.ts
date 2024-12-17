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
      url: './assets/rev/home-carousel/1.jpg',
      alt: 'first doctor',
      isActive: true,
    },
    {
      url: './assets/rev/home-carousel/2.jpg',
      alt: 'second doctor',
      isActive: false,
    },
    {
      url: './assets/rev/home-carousel/3.jpg',
      alt: 'third doctor',
      isActive: false,
    },
  ];
}
