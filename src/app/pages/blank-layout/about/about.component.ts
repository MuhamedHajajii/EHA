import { Component } from '@angular/core';
import { ABOUT_IMAGES_BASE_URL } from '../../../core/constants/ABOUT_IMAGES_BASE_URL';
import { IAboutUs } from '../../../core/interfaces/about-us/IAboutUs';
import { AboutUsService } from '../../../core/services/about-us/about-us.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  aboutUsData!: IAboutUs;
  about_image_base_url = ABOUT_IMAGES_BASE_URL;
  constructor(private _AboutUsService: AboutUsService) {}

  ngOnInit(): void {
    this.getAboutUsData();
  }

  getAboutUsData(): void {
    this._AboutUsService.getAboutUsData().subscribe({
      next: (response) => {
        this.aboutUsData = response;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
