import { Component } from '@angular/core';
import { ABOUT_IMAGES_BASE_URL } from '../../../../core/constants/ABOUT_IMAGES_BASE_URL';
import { IAboutUs } from '../../../../core/interfaces/about-us/IAboutUs';
import { AboutUsService } from '../../../../core/services/about-us/about-us.service';
import { ReadmoreBtnComponent } from '../../../../shared/components/buttons/readmore-btn/readmore-btn.component';
@Component({
  selector: 'app-home-about-us',
  standalone: true,
  imports: [ReadmoreBtnComponent],
  templateUrl: './home-about-us.component.html',
  styleUrl: './home-about-us.component.scss',
})
export class HomeAboutUsComponent {
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
