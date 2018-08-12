/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/** IE9, IE10 and IE11 requires all of the following polyfills. **/
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/weak-map';
import 'core-js/es6/set';

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
import 'classlist.js';  // Run `npm install --save classlist.js`.

/** IE10 and IE11 requires the following for the Reflect API. */
import 'core-js/es6/reflect';


/** Evergreen browsers require these. **/
// Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.
import 'core-js/es7/reflect';


/**
 * Required to support Web Animations `@angular/platform-browser/animations`.
 * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation
 **/
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.



/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js/dist/zone';  // Included with Angular CLI.



/***************************************************************************************************
 * APPLICATION IMPORTS
 */
/*----forEach support for all browser----*/
if ((<any>window).NodeList && !(<any>window).NodeList.prototype.forEach) {
  (<any>window).NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || (<any>window);
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}


/*---querySelector pollyfills for ie-----*/
if (!(<any>document).querySelectorAll) {
  (<any>document).querySelectorAll = function (selectors) {
    const style = (<any>document).createElement('style')
    let elements = [];
    let element;
    (<any>document).documentElement.firstChild.appendChild(style);
    (<any>document)._qsa = [];

    style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
    (<any>window).scrollBy(0, 0);
    style.parentNode.removeChild(style);

    while ((<any>document)._qsa.length) {
      element = (<any>document)._qsa.shift();
      element.style.removeAttribute('x-qsa');
      elements.push(element);
    }
    (<any>document)._qsa = null;
    return elements;
  };
}

if (!(<any>document).querySelector) {
  (<any>document).querySelector = function (selectors) {
    const elements = (<any>document).querySelectorAll(selectors);
    return (elements.length) ? elements[0] : null;
  };
}


/*outerHtml solution*/
Object.defineProperty(SVGElement.prototype, 'outerHTML', {
  get: function () {
    var $node, $temp;
    $temp = document.createElement('div');
    $node = this.cloneNode(true);
    $temp.appendChild($node);
    return $temp.innerHTML;
  },
  enumerable: false,
  configurable: true
});
