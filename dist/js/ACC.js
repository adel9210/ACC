/*
 * Accessability JavaScript Library v1.0.0
 * LINK DEVELOPMENT CO.
 * Date: 2019-12-20T21:04Z
 * Author: Adel Sadek - Front-end developer at link dev.
 */
var helpersCtrl = (function () {
  "use strict";
  var on, extendObject, _$;

   /**
 * Attaches to an internal event.
 * @protected
 * @param {HTMLElement} element - The event source.
 * @param {String} event - The event name.
 * @param {Function} listener - The event handler to attach.
 * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
 */
   on = function (element, event, listener, capture) {
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
   extendObject = function (defaultOptions, options) {
      for (var key in defaultOptions) {
         if (!options.hasOwnProperty(key)) {
            options[key] = defaultOptions[key];
         }
      }
      // return new object by merge to objects
      return options;
   }


   /**
    * return a DOM selector
    * @param {HTMLElement} selector
    */
   _$ = function (selector) {
      return document.querySelector(selector);
   }


   return {
      extendObject: extendObject,
      on: on,
      _$: _$,
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
      rangeSliderInput: container + '.range-slider__range',
      increaseCursor: container + '.cursor',
      saveLocalStorage: container + '.save-preference',
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

         return { fontSize: fontSize };
      },

      highLightHeadings: function () {
         var isActive;

         _$(DOMStrings.body).classList.toggle(DOMStrings.highLightHeadingsClass);

         isActive = _$(DOMStrings.body).classList.contains(DOMStrings.highLightHeadingsClass);

         return {
            highLightHeadings: isActive
         }
      },

      highLightLinks: function () {
         var isActive;

         _$(DOMStrings.body).classList.toggle(DOMStrings.highLightLinksClass);

         isActive = _$(DOMStrings.body).classList.contains(DOMStrings.highLightLinksClass);

         return {
            highLightLinks: isActive
         }
      },

      readableFont: function () {
         _$(DOMSelector.body).classList.toggle(DOMStrings.fontReadableClass);
      },

      readerGuide: function () {
         _$(DOMStrings.readGuideClass).classList.toggle('show');
         window.onmousemove = function (e) {
            _$(DOMSelector.readGuideClass).style.top = e.y + 'px';
         }
      },

      increaseCursor: function () {
         var isActive;

         _$(DOMStrings.body).classList.toggle(DOMStrings.cursorClass);

         isActive = _$(DOMStrings.body).classList.contains(DOMStrings.cursorClass);


         return {
            increaseCursor: isActive
         }

      },

      negativeContrast: function () {
         _$(DOMStrings.body).classList.toggle(DOMStrings.negativeContrastClass);
      },

      highContrast: function () {
         _$(DOMSelector.body).classList.toggle(DOMSelector.highContrastClass);
      },
      drawProgress: function () {
         var slider = _$(DOMStrings.rangeSliderInput);
         const percentage = 100 * (slider.value - slider.min) / (slider.max - slider.min);
         const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage + 0.1}%)`;
         slider.style.background = bg;
         _$(DOMStrings.html).style.wordSpacing = slider.value + 'px';

         return slider.value;

      },
      increaseSpacing: function () {
         var value;

         // draw progress 
         value = this.drawProgress();


         return {
            increaseSpacing: value
         }
      },
      updateView: function (value) {
         // update fz
         _$(DOMStrings.html).style.fontSize = value.fontSize + 'px';
         // update zooming
         _$(DOMStrings.html).style.zoom = value.zooming + '%';
         // update spacing 
         _$(DOMStrings.html).style.wordSpacing = value.increaseSpacing + 'px';
         _$(DOMStrings.rangeSliderInput).value = value.increaseSpacing * 1;

         // draw progress 
         this.drawProgress();



         // update highLight Headings 
         value.highLightHeadings ? _$(DOMStrings.body).classList.add(DOMStrings.highLightHeadingsClass) : _$(DOMStrings.body).classList.remove(DOMStrings.highLightHeadingsClass);
         // update highLight Links 
         value.highLightLinks ? _$(DOMStrings.body).classList.add(DOMStrings.highLightLinksClass) : _$(DOMStrings.body).classList.remove(DOMStrings.highLightLinksClass);
         // update increase cursor 
         value.increaseCursor ? _$(DOMStrings.body).classList.add(DOMStrings.cursorClass) : _$(DOMStrings.body).classList.remove(DOMStrings.cursorClass);


      },
      zooming: function (type) {
         /**
          * @param {type} in out
          */

         type === 'in' ? settings.zoom++ : settings.zoom--;

         _$(DOMStrings.html).style.zoom = settings.zoom + '%';

         return {
            zooming: settings.zoom
         }

      }

   }

})(helpersCtrl);

var storageCtrl = (function () {
   "use strict";
   var ACCValues, defaultVal;

   defaultVal = {
      fontSize: 16,
      zooming: 100,
      increaseSpacing: 0,
      highLightHeadings: false,
      highLightLinks: false,
      readableFont: false,
      increaseCursor: false
   }

   if (localStorage.getItem('ACC') == null) {
      ACCValues = defaultVal

   } else {
      ACCValues = JSON.parse(localStorage.getItem('ACC'));
   }

   return {
      getACC: function () {
         let ACC;

         if (localStorage.getItem('ACC') !== null) {
            ACC = JSON.parse(localStorage.getItem('ACC'));
         } else {
            ACC = ACCValues;
         }

         return ACC;
      },
      getDefault: function () {
         return defaultVal;
      },
      updateACC: function (obj) {

         ACCValues[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]];

      },
      save: function () {
         var ACCString, ACCObj;

         // convert to string
         ACCString = JSON.stringify(ACCValues);

         // set ls
         localStorage.setItem('ACC', ACCString);
      },
      remove: function () {
         // remove from ls 
         localStorage.removeItem('ACC');

         // reset default value 
         ACCValues = defaultVal;
      }
   }
})();

var itemCtrl = (function () {
   "use strict";


   /**
   * Default options for the accessability.
   * @public
   */
   var data = {
      options: {
         fontResize: false,
         ContrastTheme: false,
         highLightLinks: false,
         highLightHeadings: false,
         readableFont: false,
         zooming: false,
         increaseSpacing: false,
         readerGuide: false,
         readSpeaker: false,
         increaseCursor: false,
         drag: false
      },
      currentValue: storageCtrl.getACC()
   };

   return {
      getOptions: function () {
         return data.options;
      },
      getCurrentValue: function () {
         return data.currentValue
      }
   }


})();

var App = (function (UI, Item, helpers, storage) {
   "use strict";
   var DOMSelector, on, extendObject, _$, setupEventListener, options;

   // GET DOM SELECTOR
   DOMSelector = UI.DOMStrings();

   // on
   on = helpers.on;

   // extend object
   extendObject = helpers.extendObject;

   // _$
   _$ = helpers._$;

   // options - set options when merged.
   options;

   // SETUP EVENT LISTENER
   setupEventListener = function () {

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

      // Save LocalStorage
      on(_$(DOMSelector.saveLocalStorage), 'click', ls);
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
      var fz;
      // update UI
      fz = UI.fontResize(type);

      // update ls
      storage.updateACC(fz)
   }

   var highLightHeadings = function (e) {
      var h;
      // update UI
      h = UI.highLightHeadings(e);

      // update ls
      storage.updateACC(h);
   }

   var highLightLinks = function (e) {
      e.preventDefault();

      var l;
      // update UI
      l = UI.highLightLinks();

      // update ls
      storage.updateACC(l);
   }

   var readableFont = function (e) {
      e.preventDefault();

      // update UI
      UI.readableFont();
   }

   var readerGuide = function (e) {
      e.preventDefault();

      // update UI
      UI.readGuide();
   }

   var increaseCursor = function (e) {
      e.preventDefault();

      var c;
      // update UI
      c = UI.increaseCursor();

      // update ls
      storage.updateACC(c);
   }

   var negativeContrast = function (e) {
      e.preventDefault();

      // update UI
      UI.negativeContrast(e);
   }

   var highContrast = function (e) {
      e.preventDefault();

      // update UI
      UI.highContrast();
   }

   var increaseSpacing = function (e) {
      e.preventDefault();

      var sp;
      // update UI
      sp = UI.increaseSpacing();

      // update ls
      storage.updateACC(sp);
   }

   var zooming = function (type) {
      var zoom;
      // update UI
      zoom = UI.zooming(type);

      // update ls 
      storage.updateACC(zoom);
   }

   var reset = function (e) {
      e.preventDefault();

      var defaultVal

      // remove from ls 
      storage.remove();

      // get default value 
      defaultVal = storage.getDefault();

      // reset UI
      UI.updateView(defaultVal);
   }

   var ls = function (e) {
      e.preventDefault();

      storage.save();
   }

   var init = function (selector, opt) {
      var ele, optionsDef, value;
      ele = _$(selector);

      // Check if the selector exist in the DOM
      if (!ele) {
         throw Error('Invalid Selector');
      }

      // GET Options
      var optionsDef = Item.getOptions();

      // Check if paramter passed isn't an object 
      if (typeof opt !== "object") {
         throw Error('Invalid Options! Options must be an object');
      }

      // merge two objects 
      options = extendObject(optionsDef, opt);

      // render html 
      UI.htmlRender(selector, options);

      // apply saved values from ls 
      value = storage.getACC();
      UI.updateView(value);

      // load event 
      setupEventListener();

   }

   window.ACC = {
      init: init
   };

})(UICtrl, itemCtrl, helpersCtrl, storageCtrl);


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
