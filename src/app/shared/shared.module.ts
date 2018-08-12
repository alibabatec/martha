import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxBarcodeModule} from "ngx-barcode";
import {AccordionComponent} from "./accordion/accordion.component";
import { TranslateModule } from "@ngx-translate/core";
import {RouterModule} from '@angular/router'
import {HideDirective} from "./hide.directive";

@NgModule({
  imports: [
    CommonModule,
    NgxBarcodeModule,
    TranslateModule,
    RouterModule
  ],
  declarations: [AccordionComponent, HideDirective],
  exports: [
    NgxBarcodeModule,
    AccordionComponent,
    HideDirective
  ]
})
export class SharedModule { }
