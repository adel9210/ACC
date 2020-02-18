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

   var DOMStrings, htmlRender
   DOMStrings = {
      body: 'body',
      head: 'head',
      html: 'html',
      fontIncrease: '.accessability__href--increase',
      fontDecrease: '.accessability__href--decrease',

      accessability__link: '.accessability__link',
      accessability__main: '.accessability__main',
      accessability__items: '.accessability__items',

      fontUnderLine: '.accessability__href--underLine',
      fontReadable: '.accessability__href--font-readable',
      highContrast: '.accessability__href--high-contrast',
      negativeContrast: '.accessability__href--negative-contrast',
      readGuide: '.accessability__href--read-guide',
      highLightLinks: '.accessability__href--hight-light-links',
      letterSpacing: '.accessability__href--letter-spacing',
      wordSpacing: '.accessability__href--word-spacing',
      reset: '.accessability__href--reset',

      // HELPERS CSS CLASSES
      underLineClass: 'ACC__UNDERLINECLASS',
      negativeContrastClass: 'ACC__NIGATIVECONTRAST',
      highContrastClass: 'ACC__HIGHCONTRAST',
      fontReadableClass: 'ACC__FONTREADABLE',
      readGuideClass: '.ACC__READGUIDELINE',
      highLightLinksClass: 'ACC__HIGHLIGHTLINKD',
      letterSpacingClass: 'ACC__LETTERSPACING',
      wordSpacingClass: 'ACC__WORDSPACING'

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
      itemList += markup.reset;

      markup.wrapper = markup.wrapper.replace('%items%', itemList);
      _$(selector).innerHTML = markup.wrapper;
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
      headingHighlight: false,
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
         this.on(_$(DOMSelector.fontIncrease), 'click', fontResize.bind(null, this.options.fontSize, 'increase'))
         this.on(_$(DOMSelector.fontDecrease), 'click', fontResize.bind(null, this.options.fontSize, 'decrease'))
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

      // LETTER SPACING
      if (this.options.letterSpacing) {
         this.on(_$(DOMSelector.letterSpacing), 'click', letterSpacing);
      }

      // WORD SPACING
      if (this.options.wordSpacing) {
         this.on(_$(DOMSelector.wordSpacing), 'click', wordSpacing);
      }
      // RESET
      _$(DOMSelector.reset).addEventListener('click', reset);

      // MENU TOGGLE FUNCTION
      _$(DOMSelector.accessability__link).addEventListener('click', function () {
         _$(DOMSelector.accessability__main).classList.toggle('rightPosition');
         this.classList.toggle('rightPosition-link');
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
    * @variable {number} fontIndex - to handle toggle between font sizes
    */
   var fontIndex = 0;
   var fontResize = function (size, type) {

      var fontSize;
      fontSize = size;



      // check if size is an array not single size
      if (typeof fontSize === 'object' && Array.isArray(fontSize)) {

         /**
         * increase the index and the count if type increase else decrease
         * @var {fontIndex}
         */
         type == "increase" ? fontIndex++ : fontIndex--;

         /**
          * check  if @counter more than the array itself
          */
         if (fontIndex > fontSize.length) {
            fontIndex = fontSize.length - 1;
         } else if (fontIndex < 0) {
            /**
             * check if index counter less than 0 ex. -1
             * font index will be first index ex. 0
             */
            fontIndex = 0;
         }

         // html render
         _$(DOMSelector.html).style.fontSize = fontSize[fontIndex];

      } else if (typeof fontSize === 'string') { // if the font size is just one size
         /**
          * check if the user pass a one value so we have to ways
          * @first type === increase
          * otherwise the type will be decrease
          */
         if (type === 'increase') {
            /**
             *
             * @HTML render
             */
            _$(DOMSelector.html).style.fontSize = fontSize;

         } else {
            /**
             *
             * @HTML render
             */
            _$(DOMSelector.html).style.fontSize = '100%';
         }
      }
   }

   var linkUnderline = function (e) {
      e.preventDefault();

      _$(DOMSelector.body).classList.toggle(DOMSelector.underLineClass);
   }

   var headingHighlight = function (style) {
      _$('head').appendChild(style);
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

   var increaseCursor = function () {

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

      _$(DOMSelector.body).classList.toggle(DOMSelector.wordSpacingClass);
   }

   var reset = function (e) {
      e.preventDefault();

      Array.from(_$(DOMSelector.body).classList).forEach(function (ele) {
         if (ele.indexOf('ACC__') > -1) {
            _$(DOMSelector.body).classList.remove(ele);
         }
      });
      _$(DOMStrings.html).style.fontSize = ACC.prototype.options.fontSize[0];
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

      if (typeof options.fontSize !== "object" && !Array.isArray(options.fontSize)) {
         throw Error('Invalid FontSize! FontSize must be an Array');
      }
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

// ACC.init('#app', {
//    fontSize: ['50px', '90px', '100px'],
//    fontIncrease: true,
//    fontDecrease: true,
//    highContrast: false,
//    negativeContrast: false,
//    linkUnderLine: false,
//    highLightLinks: false,
//    fontReadable: false,
//    readGuide: false,
//    letterSpacing: false,
//    wordSpacing: false,
//    drag: false
// })



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