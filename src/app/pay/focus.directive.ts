import {AfterContentChecked, Directive, ElementRef, Inject, Input} from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements AfterContentChecked{
  @Input('appFocus') focus = false;
  constructor(@Inject(ElementRef) private element: ElementRef) {}
  ngAfterContentChecked() {
    if(this.focus === true){
      this.element.nativeElement.focus();
    }
  }
}
