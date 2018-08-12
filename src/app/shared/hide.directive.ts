import {Directive, ElementRef, HostBinding, Inject, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appHide]'
})
export class HideDirective implements OnInit{
  @Input('appHide') _hide: Array<string>;
  constructor(@Inject(ElementRef) private element: ElementRef) { }

  ngOnInit() {
    this._hide.forEach((ele, index) => {
      if(this.getBrowser().toLowerCase().indexOf(ele.toLowerCase()) > -1){
        this.element.nativeElement.style.display='none';
      }
    })
  }
  getBrowser() {
    return (() => {
      let ua= navigator.userAgent, tem,
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
      }
      if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }
      M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
      if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
      return M.join(' ');
    })();
  }
}
