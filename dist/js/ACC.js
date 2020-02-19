/*
 * Accessability JavaScript Library v1.0.0
 * LINK DEVELOPMENT CO.
 * Date: 2019-12-20T21:04Z
 * Author: Adel Sadek - Front-end developer at link dev.
 */


(function () {

   "use strict";

   /**
   * HANDEL UI TASKS
   * RENDER THE HTML
   * CONTROL HIDE AND SHOW ELEMENT
   */

   //////////////////////////////////////////////////////////////////////////
   /////////////////////// VIEW

   var DOMStrings, htmlRender, container
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

   htmlRender = function (selector, settings) {
      var htmlTemplate, itemList, fontIncreaseMarkup, fontDecreaseWrapper, markup;

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
   }








   //////////////////////////////////////////////////////////////////////////
   /////////////////////// CONTROLLER


   // CONSTRUCTOR FUNCTION
   function ACC() {

   }


   /**
    * Attaches to an internal event.
    * @protected
    * @param {HTMLElement} element - The event source.
    * @param {String} event - The event name.
    * @param {Function} listener - The event handler to attach.
    * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
    */
   ACC.prototype.on = function (element, event, listener, capture) {
      if (element) {
         if (element.addEventListener) {
            element.addEventListener(event, listener, capture);
         } else if (element.attachEvent) {
            element.attachEvent('on' + event, listener);
         }
      }
   };


   /**
    * @public
    */
   ACC.version = '1.0.0';

   /**
   * Default options for the accessability.
   * @public
   */
   ACC.prototype.options = {
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

   // GET DOM SELECTOR
   var DOMSelector = DOMStrings;

   // SETUP EVENT LISTENER
   ACC.prototype.setupEventListener = function () {

      if (this.options.fontSize) {
         // FONT RESIZE EVENT
         this.on(_$(DOMSelector.fontIncrease), 'click', fontResize.bind(null, 'increase'));
         this.on(_$(DOMSelector.fontDecrease), 'click', fontResize.bind(null, 'decrease'));
         this.on(_$(DOMSelector.fontDefault), 'click', fontResize.bind(null, 'default'));
      }

      // LINK UNDERLINE
      if (this.options.linkUnderLine) {
         this.on(_$(DOMSelector.fontUnderLine), 'click', linkUnderline);
      }

      // FONT READABLE
      if (this.options.fontReadable) {
         this.on(_$(DOMSelector.fontReadable), 'click', readableFont);
      }


      // NEGATIVE CONTRAST
      if (this.options.negativeContrast) {
         this.on(_$(DOMSelector.negativeContrast), 'click', negativeContrast);
      }

      // HIGH CONTRAST
      if (this.options.highContrast) {
         this.on(_$(DOMSelector.highContrast), 'click', highContrast);
      }

      // READ GUIDE LINE
      if (this.options.readGuide) {
         this.on(_$(DOMSelector.readGuide), 'click', readGuide);
      }

      // HIGHT LIGHT LINKS
      if (this.options.highLightLinks) {
         this.on(_$(DOMSelector.highLightLinks), 'click', highLightLinks);
      }

      // HIGHT LIGHT HEADINGS
      if (this.options.highLightHeadings) {
         this.on(_$(DOMSelector.highLightHeadings), 'click', headingHighlight);
      }

      // LETTER SPACING
      if (this.options.letterSpacing) {
         this.on(_$(DOMSelector.letterSpacing), 'click', letterSpacing);
      }

      // WORD SPACING
      if (this.options.wordSpacing) {
         this.on(_$(DOMSelector.rangeSlider), 'input', wordSpacing);
      }

      // INCREASE CURSOR
      if (this.options.increaseCursor) {
         this.on(_$(DOMSelector.increaseCursor), 'click', increaseCursor);
      }

      // ZOOMING
      if (this.options.zooming) {
         this.on(_$(DOMSelector.zoomIn), 'click', zooming.bind(this, 'in'));
         this.on(_$(DOMSelector.zoomOut), 'click', zooming.bind(this, 'out'));
      }

      // RESET
      _$(DOMSelector.reset).addEventListener('click', reset);

      // MENU TOGGLE FUNCTION
      _$(DOMSelector.accessability__toggle).addEventListener('click', function () {
         _$(DOMSelector.container).classList.toggle('hide');
      });

      _$(DOMSelector.accessability__close).addEventListener('click', function () {
         _$(DOMSelector.container).classList.toggle('hide');
      });


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


      /////////////////////////////////////////////////////////
      ///////////////////////////// DRAG AND DROP
      if (this.options.drag) {

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

         this.on(_$(DOMStrings.body), 'dragover', dragOver, false);
         this.on(_$(DOMStrings.body), 'drop', drop, false);
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
   var fontSize = 16;
   var fontResize = function (type) {

      /**
      * increase the index and the count if type increase else decrease
      * @var {fontSize}
      */
      type == "increase" ? fontSize++ : type === 'default' ? fontSize = 16 : fontSize--;


      // html resize font
      _$(DOMSelector.html).style.fontSize = fontSize + 'px';
   }

   var linkUnderline = function (e) {
      e.preventDefault();

      _$(DOMSelector.body).classList.toggle(DOMSelector.underLineClass);
   }

   var headingHighlight = function (e) {
      e.preventDefault();

      _$('body').classList.toggle(DOMStrings.highLightHeadingsClass);
   }

   var highLightLinks = function (e) {
      e.preventDefault();

      _$('body').classList.toggle(DOMStrings.highLightLinksClass);
   }

   var readableFont = function (e) {
      e.preventDefault();

      _$(DOMSelector.body).classList.toggle(DOMStrings.fontReadableClass)
   }

   var readGuide = function (e) {
      e.preventDefault();

      _$(DOMStrings.readGuideClass).classList.toggle('show');
      window.onmousemove = function (e) {
         _$(DOMSelector.readGuideClass).style.top = e.y + 'px';
      }
   }

   var increaseCursor = function (e) {
      e.preventDefault();

      _$(DOMSelector.body).classList.toggle(DOMSelector.cursorClass);
   }

   var negativeContrast = function (e) {
      e.preventDefault();

      _$(DOMSelector.body).classList.toggle(DOMSelector.negativeContrastClass);
   }

   var highContrast = function (e) {
      e.preventDefault();

      _$(DOMSelector.body).classList.toggle(DOMSelector.highContrastClass);
   }

   var letterSpacing = function (e) {
      e.preventDefault();

      _$(DOMSelector.body).classList.toggle(DOMSelector.letterSpacingClass);
   }

   var wordSpacing = function (e) {
      e.preventDefault();

      const slider = e.target;
      const settings = {
         fill: '#083689',
         background: '#d7dcdf'
      }


      const percentage = 100 * (slider.value - slider.min) / (slider.max - slider.min);
      const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage + 0.1}%)`;
      slider.style.background = bg;

      _$(DOMSelector.html).style.wordSpacing = slider.value + 'px';
   }

   var reset = function (e) {
      e.preventDefault();

      // Reset element with class start with ACC 
      Array.from(_$(DOMSelector.body).classList).forEach(function (ele) {
         if (ele.indexOf('ACC__') > -1) {
            _$(DOMSelector.body).classList.remove(ele);
         }
      });

      // Reset font size to default 
      _$(DOMStrings.html).style.fontSize = ACC.prototype.options.fontSize[0];

      // Reset active classes 
      Array.from(document.querySelectorAll(DOMSelector.container + '.active')).forEach(function (element) {
         element.classList.remove('active');
      });

      // Reset word spacing
      _$(DOMSelector.html).style.wordSpacing = '0px';

      // Reset zooming
      _$(DOMSelector.html).style.zoom = '100%';

   }

   var zoom = 100;
   var zooming = function (type) {

      /**
       * @param {type} in out
       */

      type === 'in' ? zoom++ : zoom--;

      _$(DOMSelector.html).style.zoom = zoom + '%';

   }
   /// HELPERS FUNCTIONS

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

   // RENDER THE HTML TEMPLATE FOR ACCESSABILITY TOOL
   ACC.prototype.initialize = function (selector) {
      htmlRender(selector, this.options);

      this.setupEventListener();
   }


   /**
   * init the function with passed params.
   * @public
   */
   ACC.prototype.init = function (selector, options) {
      var ele, options, elem, defaultSize
      ele = _$(selector);

      // Check if the selector exist in the DOM
      if (!ele) {
         throw Error('Invalid Selector');
      }

      /**
      * Current options set by the caller including defaults.
      * @public;
      */
      options = options;
      if (typeof options !== "object") {
         throw Error('Invalid Options! Options must be an object');
      }

      // if (typeof options.fontSize !== "object" && !Array.isArray(options.fontSize)) {
      //    throw Error('Invalid FontSize! FontSize must be an Array');
      // }
      this.options = extendObject(this.options, options);
      /**
       *  GET DEFAULT FONT SIZE TO RESET IN CASE NON SIZES
       */
      elem = _$("html");
      defaultSize = window.getComputedStyle(elem, null).getPropertyValue("font-size");

      /**
       * APPEND DEFAULT SIZE TO SIZE ARRAY
       */
      this.options.fontSize.unshift(defaultSize);

      // Render HTML Template
      this.initialize(selector);
   }

   window.ACC = ACC.prototype;


})();


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