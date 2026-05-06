import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[unless]',
})
export class Unless {

  private hasView = false;

  templateRef = inject(TemplateRef);
  viewContainer = inject(ViewContainerRef);

  condition = input(true, { alias: 'unless'});

  toggleTemplate = effect(() => {
    if (!this.condition() && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (this.condition() && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  });
}
