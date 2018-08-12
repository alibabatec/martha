import {Directive, ElementRef, HostListener, HostBinding, Renderer2, Input} from '@angular/core';
import {Router} from "@angular/router";

@Directive({
  selector: '[appAccordion]'
})
export class AccordionDirective {
  @Input('appAccordion') all = false;
  @HostListener('click') onclick (e:Event){

    const main = this.element.nativeElement.parentElement.parentElement;
    const ele = this.element.nativeElement.parentElement;
    const target = ele.querySelector('.accord-content');
    const imgsr = ele.querySelector('.img-full');
    const length = main.children.length;

    for(let i=0; i<length; i++) {
      if(this.all === false){
        this.render.addClass(main.children[i].querySelector('.accord-content'), 'expand');
        this.render.removeClass(main.children[i].querySelector('.accord-content'), 'show');
      }
    }

    if(!target.classList.contains('show')){
      this.render.removeClass(target, 'expand');
      this.render.addClass(target, 'show');
      this.render.setAttribute(imgsr, "src","assets/img/up_arrow.png")
    }else{
      this.render.removeClass(target, 'show');
      this.render.addClass(target, 'expand');
      this.render.setAttribute(imgsr, "src","assets/img/down_arrow.png")
    }
  }
  constructor(private element: ElementRef, private render: Renderer2, private router: Router) { }

}
