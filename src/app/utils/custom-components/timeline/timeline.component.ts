import {Component, ContentChild, Input, TemplateRef} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  @Input() events: any[] = [];
  @ContentChild(TemplateRef) customTemplate!: TemplateRef<any>;
}
