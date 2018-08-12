import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {forEach} from "@angular/router/src/utils/collection";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit, AfterViewInit {
  @Input('accordion-data') data;
  @Input('expandedIcon') expandedIcon;
  @Input('collapsedIcon') collapsedIcon;
  @Input('allOpen') isAll = false;

  public accordionData;
  private iconImg;
  private item;
  
  constructor(private renderer: Renderer2, private ele: ElementRef,private sharedService: SharedService) {
  }

  url() {
    let href;
    if(this.sharedService.getUSerLocalData('en')=='true')
      href = "http://www.tvlicensing.co.uk/about/making-a-complaint-AB7";
    else
      href = "http://www.tvlicensing.co.uk/cy/about/making-a-complaint-AB7";
      return href;
  }
  ngOnInit() {
    this.accordionData = this.data;
  }

  ngAfterViewInit() {
    this.item = this.ele.nativeElement.querySelectorAll('.panel');
    this.iconImg = this.ele.nativeElement.querySelectorAll('.accorIcon');
    this.iconImg.forEach((ele, index) => {
      if(this.isAll == false){
        if (this.collapsedIcon)
          ele.src = this.collapsedIcon;
      }else{
        this.expand(index);
        if (this.expandedIcon)
          ele.src = this.expandedIcon;
      }
    })
    if(this.isAll == false){
      if (this.expandedIcon)
        this.iconImg[0].src = this.expandedIcon;
        this.item[0].style.display = 'block';
    }
  }

  expand(index) {
    if(this.isAll === false){
      this.item.forEach((ele, i) => {
        ele.style.display = 'block';
        if (this.collapsedIcon)
          this.iconImg[i].src = this.collapsedIcon;
      })
    }
    if(this.item[index].style.display == 'block' || this.item[index].style.display == ''){
      this.item[index].style.display = 'none';
      if (this.expandedIcon)
        this.iconImg[index].src = this.expandedIcon;
    }else{
      this.item[index].style.display = 'block';
      if (this.collapsedIcon)
        this.iconImg[index].src = this.collapsedIcon;
    }

  }

}
