/*
 * Accessability JavaScript Library v1.0.0
 * LINK DEVELOPMENT CO.
 * Date: 2019-12-20T21:04Z
 * Author: Adel Sadek - Front-end developer at link dev.
 */
var helpers = (function () {
   /// HELPERS FUNCTIONS

   /**
 * Attaches to an internal event.
 * @protected
 * @param {HTMLElement} element - The event source.
 * @param {String} event - The event name.
 * @param {Function} listener - The event handler to attach.
 * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
 */
   var on = function (element, event, listener, capture) {
      if (element) {
         if (element.addEventListener) {
            element.addEventListener(event, listener, capture);
         } else if (element.attachEvent) {
            element.attachEvent('on' + event, listener);
         }
      }
   };

   /**
    * to merge between two objects
    * @param {object} defaultOptions
    * @param {object} options
    */
   var extendObject = function (defaultOptions, options) {
      for (var key in defaultOptions) {
         if (!options.hasOwnProperty(key)) {
            options[key] = defaultOptions[key];
         }
      }
      // return new object by merge to objects
      return options;
   }


   /**
    * @param {HTMLElement} selector
    */
   var _$ = function (selector) {
      return document.querySelector(selector);
   }

   return {
      extendObject: extendObject,
      on: on,
      _$: _$
   }

})();

var UI = (function (helpers) {
   "use strict";

   /**
   * HANDEL UI TASKS
   * RENDER THE HTML
   * CONTROL HIDE AND SHOW ELEMENT
   */

   //////////////////////////////////////////////////////////////////////////
   /////////////////////// VIEW

   var DOMStrings, container, settings, _$, fontSize;

   settings = {
      fontSize: 16,
      zoom: 100,
      spacing: 0,
      fill: '#083689',
      background: '#d7dcdf'
   }


   fontSize = settings.fontSize;
   _$ = helpers._$;


   container = '#accessibility.accessibility ';

   DOMStrings = {
      body: 'body',
      head: 'head',
      html: 'html',
      container: container,
      fontIncrease: container + '.increase',
      fontDecrease: container + '.decrease',
      fontDefault: container + '.default',
      zoomIn: container + '.zoom-in',
      zoomOut: container + '.zoom-out',
      rangeSlider: container + '.range-slider',
      increaseCursor: container + '.cursor',
      accessability__toggle: '.accessibility--toggle',
      accessability__close: '.accessibility--close',

      itemBox: 'accessibility__item--box',
      itemCircle: 'accessibility__item--circle',

      accessability__link: '.accessability__link',
      accessability__main: '.accessability__main',
      accessability__items: '.accessability__items',

      highLightLinks: container + '.highlight-links',
      highLightHeadings: container + '.highlight-headings',
      fontUnderLine: '.accessability__href--underLine',
      fontReadable: '.accessability__href--font-readable',
      highContrast: '.accessability__href--high-contrast',
      negativeContrast: '.accessability__href--negative-contrast',
      readGuide: '.accessability__href--read-guide',
      letterSpacing: '.accessability__href--letter-spacing',
      wordSpacing: '.accessability__href--word-spacing',
      reset: '.reset',

      // HELPERS CSS CLASSES
      underLineClass: 'ACC__UNDERLINECLASS',
      negativeContrastClass: 'ACC__NIGATIVECONTRAST',
      highContrastClass: 'ACC__HIGHCONTRAST',
      fontReadableClass: 'ACC__FONTREADABLE',
      readGuideClass: '.ACC__READGUIDELINE',
      highLightLinksClass: 'ACC__HIGHLIGHTLINK',
      highLightHeadingsClass: 'ACC__HIGHLIGHTHEADINGS',
      letterSpacingClass: 'ACC__LETTERSPACING',
      wordSpacingClass: 'ACC__WORDSPACING',
      cursorClass: 'ACC__CURSOR',

   };

   // ADD CLASS ACTIVE 
   _$(DOMStrings.container).addEventListener('click', function (e) {
      // check if container has a group remove all active and select just on
      if (e.target.parentNode.classList.contains(DOMStrings.itemBox)) {
         e.target.classList.add('active');

         Array.from(e.target.parentNode.children).forEach(function (ele, i) {
            if (ele !== e.target) {
               ele.classList.remove('active');
            }
         })
      }

      // check if container has just one item 
      if (e.target.parentNode.classList.contains(DOMStrings.itemCircle)) {
         e.target.classList.toggle('active');
      }

   });

   // MENU TOGGLE FUNCTION
   _$(DOMStrings.accessability__toggle).addEventListener('click', function () {
      _$(DOMStrings.container).classList.toggle('hide');
   });

   _$(DOMStrings.accessability__close).addEventListener('click', function () {
      _$(DOMStrings.container).classList.toggle('hide');
   });


   return {
      DOMStrings: function () {
         return DOMStrings;
      },

      htmlRender: function (selector, settings) {
         var itemList, markup;

         markup = {
            wrapper: '<nav class="accessability" id="accessability"><div class="ACC__READGUIDELINE"></div><div class="accessability__link" draggable="true" id="dragMe"> <svg class="accessability__link--icon"> <use xlink:href="sprite.svg#icon-accessibility"></use> </svg> </div> <div class="accessability__main"> <h2 class="accessability__title"> Accessibility Tools </h2> <ul class="accessability__items">%items%</ul> </div> </nav>',
            fontIncrease: '<li class="accessability__item"><a class="accessability__href accessability__href--increase"><svg class="accessability--icon"><use xlink:href="sprite.svg#icon-zoom-in"></use></svg><span class="accessability--text">Increase Text</span></a></li>',
            fontDecrease: '<li class="accessability__item"> <a class="accessability__href accessability__href--decrease"> <svg class="accessability--icon"> <use xlink:href="sprite.svg#icon-zoom-out"></use> </svg> <span class="accessability--text">Decrease Text</span> </a> </li>',
            highContrast: '<li class="accessability__item"> <a class="accessability__href accessability__href--high-contrast"> <svg class="accessability--icon"> <use xlink:href="sprite.svg#icon-contrast"></use> </svg> <span class="accessability--text">High Contrast</span> </a> </li>',
            negativeContrast: '<li class="accessability__item"> <a class="accessability__href accessability__href--negative-contrast"> <svg class="accessability--icon"> <use xlink:href="sprite.svg#icon-eye"></use> </svg> <span class="accessability--text">Negative Contrast</span> </a> </li>',
            linkUnderLine: '<li class="accessability__item"> <a class="accessability__href accessability__href--underLine"> <svg class="accessability--icon"> <use xlink:href="sprite.svg#icon-link"></use> </svg> <span class="accessability--text">Links Underline</span> </a> </li>',
            fontReadable: '<li class="accessability__item"> <a class="accessability__href accessability__href--font-readable"> <svg class="accessability--icon"> <use xlink:href="sprite.svg#icon-text-color"></use> </svg> <span class="accessability--text">Readable Font</span> </a> </li>',
            readGuide: ' <li class="accessability__item"> <a class="accessability__href accessability__href--read-guide"> <svg class="accessability--icon"> <use xlink:href="sprite.svg#icon-align-top"></use> </svg> <span class="accessability--text">Read Guide</span> </a> </li>',
            readGuideWrapper: '<div class="ACC__READGUIDELINE"></div>',
            highLightLinks: '<li class="accessability__item"> <a class="accessability__href accessability__href--hight-light-links"> <svg class="accessability--icon"> <use xlink:href="sprite.svg#icon-shuffle"></use> </svg> <span class="accessability--text">High Light Links</span> </a> </li>',
            letterSpacing: '<li class="accessability__item"> <a class="accessability__href accessability__href--letter-spacing"> <svg class="accessability--icon"> <use xlink:href="sprite.svg#icon-align-horizontal-middle"></use> </svg> <span class="accessability--text">Letter Spacing</span> </a> </li>',
            wordSpacing: '<li class="accessability__item"> <a class="accessability__href accessability__href--word-spacing"> <svg class="accessability--icon"> <use xlink:href="sprite.svg#icon-align-horizontal-middle"></use> </svg> <span class="accessability--text">Word Spacing</span> </a> </li>',
            reset: '<li class="accessability__item"> <a class="accessability__href accessability__href--reset"> <svg class="accessability--icon"> <use xlink:href="sprite.svg#icon-reload"></use> </svg> <span class="accessability--text">Reset</span> </a> </li>'
         }

         itemList = '';

         for (var key in settings) {
            if (markup.hasOwnProperty(key) && settings[key] == true) {
               itemList += markup[key];
            }
         }

         // Append Reset
         // itemList += markup.reset;

         // markup.wrapper = markup.wrapper.replace('%items%', itemList);
         // _$(selector).innerHTML = markup.wrapper;
      },

      fontResize: function (type) {

         /**
         * increase the index and the count if type increase else decrease
         * @var {fontSize}
         */
         type == "increase" ? fontSize++ : type === 'default' ? fontSize = settings.fontSize : fontSize--;


         // html resize font
         _$(DOMStrings.html).style.fontSize = fontSize + 'px';
      },

      linkUnderline: function (e) {
         e.preventDefault();

         _$(DOMSelector.body).classList.toggle(DOMSelector.underLineClass);
      },

      headingHighlight: function (e) {
         e.preventDefault();

         _$('body').classList.toggle(DOMStrings.highLightHeadingsClass);
      },

      highLightLinks: function (e) {
         e.preventDefault();

         _$('body').classList.toggle(DOMStrings.highLightLinksClass);
      },

      readableFont: function (e) {
         e.preventDefault();

         _$(DOMSelector.body).classList.toggle(DOMStrings.fontReadableClass)
      },

      readGuide: function (e) {
         e.preventDefault();

         _$(DOMStrings.readGuideClass).classList.toggle('show');
         window.onmousemove = function (e) {
            _$(DOMSelector.readGuideClass).style.top = e.y + 'px';
         }
      },

      increaseCursor: function (e) {
         e.preventDefault();

         _$(DOMSelector.body).classList.toggle(DOMSelector.cursorClass);
      },

      negativeContrast: function (e) {
         e.preventDefault();

         _$(DOMSelector.body).classList.toggle(DOMSelector.negativeContrastClass);
      },

      highContrast: function (e) {
         e.preventDefault();

         _$(DOMSelector.body).classList.toggle(DOMSelector.highContrastClass);
      },

      letterSpacing: function (e) {
         e.preventDefault();

         _$(DOMSelector.body).classList.toggle(DOMSelector.letterSpacingClass);
      },

      wordSpacing: function (e) {
         e.preventDefault();

         const slider = e.target;

         const percentage = 100 * (slider.value - slider.min) / (slider.max - slider.min);
         const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage + 0.1}%)`;
         slider.style.background = bg;

         _$(DOMStrings.html).style.wordSpacing = slider.value + 'px';
      },

      reset: function (e) {
         e.preventDefault();

         // Reset element with class start with ACC 
         Array.from(_$(DOMStrings.body).classList).forEach(function (ele) {
            if (ele.indexOf('ACC__') > -1) {
               _$(DOMStrings.body).classList.remove(ele);
            }
         });

         // Reset font size to default 
         _$(DOMStrings.html).style.fontSize = settings.fontSize + 'px';

         // Reset active classes 
         Array.from(document.querySelectorAll(DOMStrings.container + '.active')).forEach(function (element) {
            element.classList.remove('active');
         });

         // Reset word spacing
         _$(DOMStrings.html).style.wordSpacing = settings.spacing + 'px';

         // Reset zooming
         _$(DOMStrings.html).style.zoom = settings.zoom + '%';

      },

      zooming: function (type) {

         /**
          * @param {type} in out
          */

         type === 'in' ? zoom++ : zoom--;

         _$(DOMStrings.html).style.zoom = zoom + '%';

      }

   }

})(helpers);

var Item = (function () {


   /**
   * Default options for the accessability.
   * @public
   */
   var options = {
      fontSize: [],
      readableFont: false,

      zooming: false,
      letterSpacing: false,
      wordSpacing: false,
      increaseCursor: false,

      // CONTROL SHOW AND HIDE ELEMENTS
      fontIncrease: false,
      fontDecrease: false,
      highLightHeadings: false,
      linkHighlight: false,
      linkUnderLine: false,
      highContrast: false,
      negativeContrast: false,
      readGuide: false,
      drag: false
   }

   return {
      getOptions: function () {
         return options;
      }
   }


})();

var controller = (function (UI, Item, helpers) {
   "use strict";


   //////////////////////////////////////////////////////////////////////////
   /////////////////////// CONTROLLER


   // GET DOM SELECTOR
   var DOMSelector = UI.DOMStrings();

   // on
   var on = helpers.on;

   // extend object
   var extendObject = helpers.extendObject;

   // _$
   var _$ = helpers._$;

   // options - set options when merged.
   var options;

   // SETUP EVENT LISTENER
   var setupEventListener = function () {

      if (options.fontSize) {
         // FONT RESIZE EVENT
         on(_$(DOMSelector.fontIncrease), 'click', fontResize.bind(null, 'increase'));
         on(_$(DOMSelector.fontDecrease), 'click', fontResize.bind(null, 'decrease'));
         on(_$(DOMSelector.fontDefault), 'click', fontResize.bind(null, 'default'));
      }

      // LINK UNDERLINE
      if (options.linkUnderLine) {
         on(_$(DOMSelector.fontUnderLine), 'click', linkUnderline);
      }

      // FONT READABLE
      if (options.fontReadable) {
         on(_$(DOMSelector.fontReadable), 'click', readableFont);
      }


      // NEGATIVE CONTRAST
      if (options.negativeContrast) {
         on(_$(DOMSelector.negativeContrast), 'click', negativeContrast);
      }

      // HIGH CONTRAST
      if (options.highContrast) {
         on(_$(DOMSelector.highContrast), 'click', highContrast);
      }

      // READ GUIDE LINE
      if (options.readGuide) {
         on(_$(DOMSelector.readGuide), 'click', readGuide);
      }

      // HIGHT LIGHT LINKS
      if (options.highLightLinks) {
         on(_$(DOMSelector.highLightLinks), 'click', highLightLinks);
      }

      // HIGHT LIGHT HEADINGS
      if (options.highLightHeadings) {
         on(_$(DOMSelector.highLightHeadings), 'click', headingHighlight);
      }

      // LETTER SPACING
      if (options.letterSpacing) {
         on(_$(DOMSelector.letterSpacing), 'click', letterSpacing);
      }

      // WORD SPACING
      if (options.wordSpacing) {
         on(_$(DOMSelector.rangeSlider), 'input', wordSpacing);
      }

      // INCREASE CURSOR
      if (options.increaseCursor) {
         on(_$(DOMSelector.increaseCursor), 'click', increaseCursor);
      }

      // ZOOMING
      if (options.zooming) {
         on(_$(DOMSelector.zoomIn), 'click', zooming.bind(this, 'in'));
         on(_$(DOMSelector.zoomOut), 'click', zooming.bind(this, 'out'));
      }

      // RESET
      _$(DOMSelector.reset).addEventListener('click', reset);

      /////////////////////////////////////////////////////////
      ///////////////////////////// DRAG AND DROP
      if (options.drag) {

         // Internet Explorer
         var isIE = /*@cc_on!@*/false || !!document.documentMode;
         if (isIE) {
            console.info("Please Note that the drag and drop feature doesn't support in your browser!");
         }


         var dragStart, dragOver, drop, element, offset, wrapper, style

         element = _$('#dragMe');
         wrapper = _$('.accessability__main');

         dragStart = function (event) {
            style = window.getComputedStyle(event.target, null);

            event.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));
         }

         dragOver = function (event) {
            event.preventDefault();
            return false;
         }

         drop = function (event) {
            offset = event.dataTransfer.getData("text/plain").split(',');

            element.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
            element.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';



            wrapper.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
            wrapper.style.left = (event.clientX + parseInt(offset[0], 10) + 70) + 'px';

            event.preventDefault();
            return false;
         }

         element.addEventListener('dragstart', dragStart, false);

         on(_$(DOMSelector.body), 'dragover', dragOver, false);
         on(_$(DOMSelector.body), 'drop', drop, false);
      }

   }

   /** Functionalities
 
   •	Highlight Links
   •	Highlight Heading
   •	Font resize
   •	Readable font
   •	Zooming
   •	Increase Spacing
   •	Reader Guide
   •	Read Speaker
   •	Increase cursor
   •	Reset
   */




   /**
    * Attaches to an internal event.
    * @protected
    * @param {string} size - The font size.
    * @variable {number} fontSize - to handle toggle between font sizes
    */
   var fontResize = function (type) {
      // update UI
      UI.fontResize(type);
   }

   var linkUnderline = function (e) {
      // update UI
      UI.linkUnderline(e);
   }

   var headingHighlight = function (e) {
      // update UI
      UI.headingHighlight(e);
   }

   var highLightLinks = function (e) {
      // update UI
      UI.highLightLinks(e);
   }

   var readableFont = function (e) {
      // update UI
      UI.readableFont(e);
   }

   var readGuide = function (e) {
      // update UI
      UI.readGuide(e);
   }

   var increaseCursor = function (e) {
      // update UI
      UI.increaseCursor(e);
   }

   var negativeContrast = function (e) {
      // update UI
      UI.negativeContrast(e);
   }

   var highContrast = function (e) {
      // update UI
      UI.highContrast(e);
   }

   var letterSpacing = function (e) {
      // update UI
      UI.letterSpacing(e);
   }

   var wordSpacing = function (e) {
      // update UI
      UI.wordSpacing(e);
   }

   var reset = function (e) {
      // update UI
      UI.reset(e);
   }

   var zooming = function (type) {
      // update UI
      UI.zooming(type);

   }


   // RENDER THE HTML TEMPLATE FOR ACCESSABILITY TOOL
   var initialize = function (selector) {
      UI.htmlRender(selector, options);

      setupEventListener();
   }


   /**
   * init the function with passed params.
   * @public
   */
   var init = function (selector, opt) {
      var ele, optionsdef;
      ele = _$(selector);

      // Check if the selector exist in the DOM
      if (!ele) {
         throw Error('Invalid Selector');
      }

      // GET Options
      var optionsdef = Item.getOptions();

      /**
      * Current options set by the caller including defaults.
      * @public;
      */

      if (typeof opt !== "object") {
         throw Error('Invalid Options! Options must be an object');
      }

      // if (typeof options.fontSize !== "object" && !Array.isArray(options.fontSize)) {
      //    throw Error('Invalid FontSize! FontSize must be an Array');
      // }
      options = extendObject(optionsdef, opt);
      /**
       *  GET DEFAULT FONT SIZE TO RESET IN CASE NON SIZES
       */
      // elem = _$("html");
      // defaultSize = window.getComputedStyle(elem, null).getPropertyValue("font-size");

      /**
       * APPEND DEFAULT SIZE TO SIZE ARRAY
       */
      // this.options.fontSize.unshift(defaultSize);

      // Render HTML Template
      initialize(selector);
   }

   window.ACC = {
      init: init
   };


})(UI, Item, helpers);


// var synth = window.speechSynthesis;
// synth.cancel();

// var voices = [];

// function populateVoiceList() {
//   voices = synth.getVoices().sort(function (a, b) {
//       const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
//       if ( aname < bname ) return -1;
//       else if ( aname == bname ) return 0;
//       else return +1;
//   });
// }

// populateVoiceList();
// if (speechSynthesis.onvoiceschanged !== undefined) {
//   speechSynthesis.onvoiceschanged = populateVoiceList;
// }

// function speak(text){
//     if (synth.speaking) {
//         console.error('speechSynthesis.speaking');
//         return;
//     }
//     if (text !== '') {
//     var utterThis = new SpeechSynthesisUtterance(text);
//     utterThis.onend = function (event) {
//         console.log('SpeechSynthesisUtterance.onend');
//     }
//     utterThis.onerror = function (event) {
//         console.error('SpeechSynthesisUtterance.onerror');
//     }
//     utterThis.voice = voices[0]
//     utterThis.pitch = 1;
//     utterThis.rate = 1;
//     synth.speak(utterThis);
//   }
// }

// let prevTarget = null;
// document.addEventListener('mouseover', (e)=>{
//    synth.cancel();
//    prevTarget ? prevTarget.classList.remove('flashClass') : '';

//    if (e.target.textContent && !synth.speaking && e.target.nodeName !== 'BODY') {
//       e.target.classList.add('flashClass');
//       prevTarget = e.target;

//       speak(e.target.textContent.trim());
//    }
// })

ACC.init('#app', {
   // fontSize: ['50px', '90px', '100px'],
   fontIncrease: true,
   // fontDecrease: true,
   // highContrast: false,
   // negativeContrast: false,
   // linkUnderLine: false,
   highLightLinks: true,
   highLightHeadings: true,
   // fontReadable: false,
   // readGuide: false,
   // letterSpacing: false,
   wordSpacing: true,
   // drag: false
   zooming: true,
   increaseCursor: true
})



// INTERFACES

// export interface ACC {
//    init(selector: string, options: ACCOptions)
//  }

//  export interface ACCOptions {
//    fontSize: string[];
//    fontIncrease: boolean;
//    fontDecrease: boolean;
//    highContrast: boolean;
//    negativeContrast: boolean;
//    linkUnderLine: boolean;
//    highLightLinks: boolean;
//    fontReadable: boolean;
//    readGuide: boolean;
//    letterSpacing: boolean;
//    wordSpacing: boolean;
//  }