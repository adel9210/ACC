/*
 * Accessability JavaScript Library v1.0.0
 * LINK DEVELOPMENT CO.
 * Date: 2019-12-20T21:04Z
 * Author: Adel Sadek - Front-end developer at link dev.
 */
var helpersCtrl = (function () {
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

var UICtrl = (function (helpers) {
   "use strict";

   /**
   * HANDEL UI TASKS
   * RENDER THE HTML
   * CONTROL HIDE AND SHOW ELEMENT
   */

   //////////////////////////////////////////////////////////////////////////
   /////////////////////// VIEW

   var DOMStrings, container, settings, _$, fontSize;

   container = '#accessibility.accessibility ';
   /*
      fontResize: true,
      ContrastTheme: true,
      highLightLinks: true,
      highLightHeadings: true,
      readableFont: true,
      zooming: true,
      increaseSpacing: true,
      readerGuide: true,
      readSpeaker: true,
      increaseCursor: true,
      drag: false
   */
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

      highLightLinks: container + '.highlight-links',
      highLightHeadings: container + '.highlight-headings',
      fontReadable: '.accessability__href--font-readable',
      highContrast: '.accessability__href--high-contrast',
      negativeContrast: '.accessability__href--negative-contrast',
      readerGuide: '.accessability__href--read-guide',
      reset: '.reset',

      // HELPERS CSS CLASSES
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

   settings = {
      fontSize: 16,
      zoom: 100,
      spacing: 0,
      fill: '#083689',
      background: '#d7dcdf'
   };

   fontSize = settings.fontSize;

   _$ = helpers._$;


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

      highLightHeadings: function (e) {
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

      readerGuide: function (e) {
         e.preventDefault();

         _$(DOMStrings.readGuideClass).classList.toggle('show');
         window.onmousemove = function (e) {
            _$(DOMSelector.readGuideClass).style.top = e.y + 'px';
         }
      },

      increaseCursor: function (e) {
         e.preventDefault();

         _$(DOMStrings.body).classList.toggle(DOMStrings.cursorClass);
      },

      negativeContrast: function (e) {
         e.preventDefault();

         _$(DOMStrings.body).classList.toggle(DOMStrings.negativeContrastClass);
      },

      highContrast: function (e) {
         e.preventDefault();

         _$(DOMSelector.body).classList.toggle(DOMSelector.highContrastClass);
      },

      increaseSpacing: function (e) {
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

         type === 'in' ? settings.zoom++ : settings.zoom--;

         _$(DOMStrings.html).style.zoom = settings.zoom + '%';

      }

   }

})(helpersCtrl);

var storageCtrl = (function () {
   var defaultValues = {
      fontSize: '16px',
      zooming: '100%',
      increaseSpacing: '0'
   }

   return {
      getACC: function () {
         let ACC;

         if (localStorage.getItem('ACC') !== null) {
            ACC = JSON.parse(localStorage.getItem('ACC'));
         } else {
            ACC = defaultValues;
         }

         return ACC;
      },
      updateACC: function (obj) {
         let ACC, ACCString;

         // get items
         ACC = StorageCtrl.getACC();

         ACC[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]];

         // convert to string
         ACCString = JSON.stringify(ACC);

         // set ls
         localStorage.setItem('ACC', ACCString);
      },
   }
})();

var itemCtrl = (function () {


   /**
   * Default options for the accessability.
   * @public
   */
   var data = {
      options: {
         fontResize: false, // has a value
         ContrastTheme: false, // boolean
         highLightLinks: false, // boolean 
         highLightHeadings: false, // boolean 
         readableFont: false, // boolean 
         zooming: false, // has a value
         increaseSpacing: false, // has a value 
         readerGuide: false, // boolean 
         readSpeaker: false, // 
         increaseCursor: false, // boolean 
         drag: false // boolean
      },
      currentValue: storageCtrl.getACC()
   };

   return {
      getOptions: function () {
         return data.options;
      },
      getCurrentValue: function(){
         return data.currentValue
      }
   }


})();

var App = (function (UI, Item, helpers) {
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

      if (options.fontResize) {
         // FONT RESIZE EVENT
         on(_$(DOMSelector.fontIncrease), 'click', fontResize.bind(null, 'increase'));
         on(_$(DOMSelector.fontDecrease), 'click', fontResize.bind(null, 'decrease'));
         on(_$(DOMSelector.fontDefault), 'click', fontResize.bind(null, 'default'));
      }

      // FONT READABLE
      if (options.readableFont) {
         on(_$(DOMSelector.fontReadable), 'click', readableFont);
      }

      // CONTRAST THEME
      if (options.ContrastTheme) {
         on(_$(DOMSelector.negativeContrast), 'click', negativeContrast);
         on(_$(DOMSelector.highContrast), 'click', highContrast);
      }

      // READ GUIDE LINE
      if (options.readerGuide) {
         on(_$(DOMSelector.readerGuide), 'click', readerGuide);
      }

      // HIGHT LIGHT LINKS
      if (options.highLightLinks) {
         on(_$(DOMSelector.highLightLinks), 'click', highLightLinks);
      }

      // HIGHT LIGHT HEADINGS
      if (options.highLightHeadings) {
         on(_$(DOMSelector.highLightHeadings), 'click', highLightHeadings);
      }

      // SPACING
      if (options.increaseSpacing) {
         on(_$(DOMSelector.rangeSlider), 'input', increaseSpacing);
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

      // DRAG AND DROP
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

      // RESET
      _$(DOMSelector.reset).addEventListener('click', reset);
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



   var fontResize = function (type) {
      // update UI
      UI.fontResize(type);
   }

   var highLightHeadings = function (e) {
      // update UI
      UI.highLightHeadings(e);
   }

   var highLightLinks = function (e) {
      // update UI
      UI.highLightLinks(e);
   }

   var readableFont = function (e) {
      // update UI
      UI.readableFont(e);
   }

   var readerGuide = function (e) {
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

   var increaseSpacing = function (e) {
      // update UI
      UI.increaseSpacing(e);
   }

   var reset = function (e) {
      // update UI
      UI.reset(e);
   }

   var zooming = function (type) {
      // update UI
      UI.zooming(type);

   }


   var init = function (selector, opt) {
      var ele, optionsdef, value;
      ele = _$(selector);

      // Check if the selector exist in the DOM
      if (!ele) {
         throw Error('Invalid Selector');
      }

      // GET Options
      var optionsdef = Item.getOptions();

      // Check if paramter passed isn't an object 
      if (typeof opt !== "object") {
         throw Error('Invalid Options! Options must be an object');
      }

      // merge two objects 
      options = extendObject(optionsdef, opt);

      // render html 
      UI.htmlRender(selector, options);

      // apply saved values from ls 
      value = Item.getCurrentValue();
      UI.updateView(value);

      // load event 
      setupEventListener();

   }

   window.ACC = {
      init: init
   };

})(UICtrl, itemCtrl, helpersCtrl);


ACC.init('#app', {
   fontResize: true,
   ContrastTheme: true,
   highLightLinks: true,
   highLightHeadings: true,
   readableFont: true,
   zooming: true,
   increaseSpacing: true,
   readerGuide: true,
   readSpeaker: true,
   increaseCursor: true,
   drag: false
});
