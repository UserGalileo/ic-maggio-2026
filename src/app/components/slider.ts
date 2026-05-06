import { Component, input, model, output, signal } from '@angular/core';


@Component({
  selector: 'app-slider',
  template: `
    <div class="slidecontainer">
      <input
        type="range"
        min="1"
        max="100"
        class="slider"
        [style.opacity]="disabled() ? '0.2' : '1'"
        [disabled]="disabled()"
        [value]="value()"
        (input)="onInput($event)"
      />
      <p>Value: {{ value() }}</p>
    </div>
  `,
  styles: `
    .slidecontainer {
      width: 100%;
    }

    .slider {
      -webkit-appearance: none;
      width: 100%;
      height: 15px;
      border-radius: 5px;
      background: #d3d3d3;
      outline: none;
      opacity: 0.7;
      -webkit-transition: 0.2s;
      transition: opacity 0.2s;
    }

    .slider:hover {
      opacity: 1;
    }

    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #04aa6d;
      cursor: pointer;
    }

    .slider::-moz-range-thumb {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #04aa6d;
      cursor: pointer;
    }
  `,
  host: {
    'role': 'slider',
    '[attr.aria-valuenow]': 'value()',
    '[tabIndex]': "disabled() ? -1 : 0",
    '(click)': 'log()'
  }
})
export class Slider {

  value = model(50);
  disabled = input(false);

  onInput(e: Event) {
    this.value.set(+(e.target as HTMLInputElement).value);
  }

  log() {
    console.log('slider clicked!');
  }
}
