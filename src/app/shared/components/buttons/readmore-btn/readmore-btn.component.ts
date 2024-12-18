import { Component, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-readmore-btn',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './readmore-btn.component.html',
  styleUrl: './readmore-btn.component.scss',
})
export class ReadmoreBtnComponent {
  @Input() routing: string = '';
}
