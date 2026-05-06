import { Directive, ElementRef, inject, input } from '@angular/core';
import { App } from '../app';
import { Slider } from '../components/slider';

// Attribute directive
@Directive({
  selector: '[highlight]',
  host: {
    '(mouseenter)': `highlight(bgColor() || 'yellow')`,
    '(mouseleave)': `highlight('')`,
  },
})
export class Highlight {
  el = inject(ElementRef);

  bgColor = input('', { alias: 'highlight' });
  textColor = input('', { alias: 'text' });

  highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.color = color ? this.textColor() : 'black';
  }
}
