import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionDirective } from '../Directives/accordion.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AccordionDirective],
  exports: [
    AccordionDirective
  ]
})
export class AccordionModule { }
