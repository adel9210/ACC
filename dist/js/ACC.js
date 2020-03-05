import '../css/main.css';
/*
 * Accessability JavaScript Library v1.0.0
 * LINK DEVELOPMENT CO.
 * Date: 2019-12-20T21:04Z
 * Author: Adel Sadek - Front-end developer at link dev.
 *   Functionalities
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
         if (options.hasOwnProperty(key) && Array.isArray(options[key])) {
            // theme=[]
            if (!options[key].length) {
               console.log('Case 1')
               options[key] = defaultOptions[key]
            }

            // theme [1]
            if (options[key].length === 1) {
               console.log('Case 2')

               var index = options[key][0].type === 'primary' ? 1 : 0;
               console.log(index)
               options[key].push(defaultOptions[key][index])
            }

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
      var element, returnedElement;
      element = document.querySelectorAll(selector);
      returnedElement = element.length > 1 ? element : element[0];

      return returnedElement;
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


      themePrimary: container + '.theme-primary',
      themeSecondary: container + '.theme-secondary',


      active: 'active',
      activeClass: container + '.active',


      readableFont: '.readable-font',
      readerGuide: container + '.reader',
      reset: '.reset',

      themePrimaryClass: 'ACC__THEMEPRIMARY',
      themeSecondaryClass: 'ACC__THEMESECONDARY',
      readableFontClass: 'ACC__FONTREADABLE',
      readerGuideClass: '.ACC__READGUIDELINE',
      highLightLinksClass: 'ACC__HIGHLIGHTLINK',
      highLightHeadingsClass: 'ACC__HIGHLIGHTHEADINGS',
      cursorClass: 'ACC__CURSOR',

   };

   settings = {
      fontSize: 16,
      fontSteps: [18, 20],
      zoomSteps: [100, 125, 150, 200],
      zoomCurrentStep: 0,
      zoom: 100,
      spacing: 0,
      fill: '#083689',
      background: '#d7dcdf'
   };

   fontSize = settings.fontSize;

   _$ = helpers._$;


   // ADD CLASS ACTIVE 
   window.onload = function () {
      _$(DOMStrings.container).addEventListener('click', function (e) {
         // check if container has a group remove all active and select just on
         if (e.target.parentNode.classList.contains(DOMStrings.itemBox)) {
            // add active class
            e.target.classList.add(DOMStrings.active);

            // enable save button 
            UICtrl.enableSaveButton();

            Array.from(e.target.parentNode.children).forEach(function (ele, i) {
               if (ele !== e.target) {

                  // enable save button 
                  UICtrl.enableSaveButton();

                  // remove active class 
                  ele.classList.remove(DOMStrings.active);
               }
            })
         }

         // check if container has just one item 
         if (e.target.parentNode.classList.contains(DOMStrings.itemCircle) && e.target.classList.contains('circle')) {
            // add active class
            e.target.classList.toggle(DOMStrings.active);

            // enable save button 
            UICtrl.enableSaveButton();
         }

      });
      // MENU TOGGLE FUNCTION
      // _$(DOMStrings.accessability__toggle).addEventListener('click', function () {
      //    _$(DOMStrings.container).classList.toggle('hide');
      // });

      // _$(DOMStrings.accessability__close).addEventListener('click', function () {
      //    _$(DOMStrings.container).classList.toggle('hide');
      // });
   }



   return {
      DOMStrings: function () {
         return DOMStrings;
      },

      htmlRender: function (selector, settings) {
         var itemList, markup;

         markup = {
            wrapper: '<section id="accessibility" class="accessibility"><span class="icon icon-close accessibility--close"></span> <h2 class="accessibility__heading">Accessibility tool Panel</h2> %items% </section>',
            fontResize: ' <div class="accessibility__item accessibility__font-resize"> <h3 class="accessibility__item--heading">Font Resize</h3> <div class="accessibility__item--box"> <div class="box increase">A++</div> <div class="box decrease">A+</div> <div class="box default">A</div> </div> </div>',
            ContrastTheme: ' <div class="accessibility__item accessibility__contrast-theme"> <h3 class="accessibility__item--heading">Contrast Theme</h3> <div class="accessibility__item--box"> <div class="box theme-primary"> <span class="theme-primary--1"></span> <span class="theme-primary--2"></span> </div> <div class="box theme-secondary"> <span class="theme-secondary--1"></span> <span class="theme-secondary--2"></span> </div> </div> </div>',
            highLightLinks: '<div class="accessibility__item accessibility__highlight-links"> <div class="accessibility__item--circle"> <h3 class="accessibility__item--heading">Highlight Links</h3> <span class="icon icon-link circle highlight-links"></span> </div> </div>',
            highLightHeadings: '<div class="accessibility__item accessibility__highlight-heading"> <div class="accessibility__item--circle"> <h3 class="accessibility__item--heading">Highlight Heading</h3> <span class="icon icon-think circle highlight-headings"></span> </div> </div>',
            readableFont: '<div class="accessibility__item accessibility__readable-font"> <div class="accessibility__item--circle"> <h3 class="accessibility__item--heading">Readable Font</h3> <span class="icon icon-font circle readable-font"></span> </div> </div>',
            zooming: '<div class="accessibility__item accessibility__zooming"> <h3 class="accessibility__item--heading">Zooming</h3> <div class="accessibility__item--box"> <span class="icon icon-zoom-in box zoom-in"></span> <span class="icon icon-zoom-out box zoom-out"></span> </div> </div>',
            increaseSpacing: ' <div class="accessibility__item accessibility__increase-spacing"> <div class="accessibility__item--circle"> <h3 class="accessibility__item--heading">Increase Spacing</h3> <div class="range-slider"> <input class="range-slider__range" type="range" value="0" min="0" max="10"> </div> </div> </div>',
            readerGuide: ' <div class="accessibility__item accessibility__reader-guide"> <div class="accessibility__item--circle"> <h3 class="accessibility__item--heading">Reader Guide</h3> <span class="icon icon-underline circle reader"></span> </div></div>',
            readerGuideEle: '<div class="ACC__READGUIDELINE"></div>',
            readSpeaker: ' <div class="accessibility__item accessibility__read-speaker"> <h3 class="accessibility__item--heading">Read Speaker</h3> <span class="icon icon-play"></span> <a href="" class="accessibility__item--heading-2"> Start </a> </div>',
            increaseCursor: ' <div class="accessibility__item accessibility__increase-cursor"> <div class="accessibility__item--circle"> <h3 class="accessibility__item--heading">Increase cursor</h3> <span class="icon icon-click circle cursor"></span> </div> </div>',
            buttons: '<div class="accessibility__buttons"> <button class="save-preference" disabled="disabled">Save Preference</button> <a href="" class="reset">Reset</a> </div>',
            drag: '<span class="icon icon-drag"></span>'
         }

         itemList = '';

         for (var key in settings) {
            if (markup.hasOwnProperty(key) && settings[key] == true) {
               itemList += markup[key];
            }
         }

         // Append Reset
         itemList += markup.buttons;

         // append reader guide 
         itemList += markup.readerGuideEle;

         markup.wrapper = markup.wrapper.replace('%items%', itemList);
         _$(selector).innerHTML = markup.wrapper;
      },
      fontResize: function (type) {

         /**
         * increase the index and the count if type increase else decrease
         * @var {fontSize}
         */
         type == "increase" ? fontSize = settings.fontSteps[1] : type === 'default' ? fontSize = settings.fontSize : fontSize = settings.fontSteps[0];


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
         var isActive;

         _$(DOMStrings.body).classList.toggle(DOMStrings.readableFontClass);

         isActive = _$(DOMStrings.body).classList.contains(DOMStrings.readableFontClass);


         return {
            readableFont: isActive
         }

      },

      readerGuide: function () {
         var isActive;

         _$(DOMStrings.readerGuideClass).classList.toggle('show');
         window.onmousemove = function (e) {
            _$(DOMStrings.readerGuideClass).style.top = e.y + 'px';
         }

         isActive = _$(DOMStrings.readerGuideClass).classList.contains('show');

         return {
            readerGuide: isActive
         }
      },

      increaseCursor: function () {
         var isActive;

         _$(DOMStrings.html).classList.toggle(DOMStrings.cursorClass);

         isActive = _$(DOMStrings.html).classList.contains(DOMStrings.cursorClass);


         return {
            increaseCursor: isActive
         }

      },

      themePrimary: function (theme) {
         var isActive, primaryTheme, secondaryTheme;

         primaryTheme = theme.filter(th => th.type === 'primary')[0];
         secondaryTheme = theme.filter(th => th.type === 'secondary')[0];

         _$(DOMStrings.body).classList.remove(secondaryTheme.cssClass);
         _$(DOMStrings.body).classList.toggle(primaryTheme.cssClass);

         isActive = _$(DOMStrings.body).classList.contains(primaryTheme.cssClass);

         return {
            themePrimary: isActive
         }

      },

      themeSecondary: function (theme) {
         var isActive, primaryTheme, secondaryTheme;

         primaryTheme = theme.filter(th => th.type === 'primary')[0];
         secondaryTheme = theme.filter(th => th.type === 'secondary')[0];

         _$(DOMStrings.body).classList.remove(primaryTheme.cssClass);
         _$(DOMStrings.body).classList.toggle(secondaryTheme.cssClass);

         isActive = _$(DOMStrings.body).classList.contains(secondaryTheme.cssClass);

         return {
            themeSecondary: isActive
         }
      },

      addCSSFiles: function (files) {
         files.map(function (obj) {
            // Get HTML head element 
            var head = document.getElementsByTagName('HEAD')[0];

            // Create new link Element 
            var link = document.createElement('link');

            // set the attributes for link element  
            link.rel = 'stylesheet';

            link.href = obj.cssFile;

            // Append link element to HTML head 
            head.appendChild(link);
         });
      },

      drawProgress: function () {
         var slider = _$(DOMStrings.rangeSliderInput);
         const percentage = 100 * (slider.value - slider.min) / (slider.max - slider.min);
         const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage + 0.1}%)`;
         slider.style.background = bg;
         _$(DOMStrings.html).style.wordSpacing = slider.value + 'px';

         return slider.value;

      },

      toggleClass: function (status, selector, className) {
         if (status) {
            _$(selector).classList.add(className);
         } else {
            _$(selector).classList.remove(className);
         }

      },

      increaseSpacing: function () {
         var value;

         // draw progress 
         value = this.drawProgress();

         return {
            increaseSpacing: value
         }
      },

      updateView: function () {
         // update fz
         _$(DOMStrings.html).style.fontSize = settings.fontSize + 'px';
         // update zooming
         _$(DOMStrings.html).style.zoom = settings.zoom + '%';

         // update spacing 
         _$(DOMStrings.html).style.wordSpacing = settings.spacing;
         _$(DOMStrings.rangeSliderInput).value = settings.spacing;
         this.drawProgress();


         // Remove Classes from the body
         Array.from(_$(DOMStrings.body).classList).map(function (cls) {
            if (cls.indexOf('ACC') > -1) {
               _$(DOMStrings.body).classList.remove(cls);
            }
         });

         // Remove Active classes from the elements 
         if (_$(DOMStrings.activeClass)) {

            if (_$(DOMStrings.activeClass).length > 1) {
               Array.from(_$(DOMStrings.activeClass)).map(function (ele) {
                  ele.classList.remove(DOMStrings.active);
               });
               return;
            }
            _$(DOMStrings.activeClass).classList.remove(DOMStrings.active);
         }
      },

      zooming: function (type) {
         /**
          * @param {type} in out
          */
         var zoom;

         if (type === 'in') {
            zoom = settings.zoomCurrentStep += 1
         } else {
            zoom = 0;
            settings.zoomCurrentStep = 0
         }

         _$(DOMStrings.html).style.zoom = settings.zoomSteps[zoom] + '%';

         return {
            zooming: settings.zoomSteps[zoom]
         }

      },

      disableSaveButton: function () {
         _$(DOMStrings.saveLocalStorage).setAttribute('disabled', 'disabled');
      },

      enableSaveButton: function () {
         _$(DOMStrings.saveLocalStorage).removeAttribute('disabled');
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
      increaseCursor: false,
      zoomIn: false,
      zoomOut: false,
      FIncrease: false,
      FDecrease: false,
      FDefault: false,
      themePrimary: false,
      themeSecondary: false,
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
         var ACCString;

         // check zoom status 
         ACCValues.zooming >= 100 ? ACCValues.zoomIn = true : ACCValues.zoomIn = false;
         ACCValues.zooming < 100 ? ACCValues.zoomOut = true : ACCValues.zoomOut = false;

         // check font size 
         ACCValues.fontSize > 16 ? ACCValues.FIncrease = true : ACCValues.FIncrease = false;
         ACCValues.fontSize < 16 ? ACCValues.FDecrease = true : ACCValues.FDecrease = false;
         ACCValues.fontSize == 16 ? ACCValues.FDefault = true : ACCValues.FDefault = false;


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

         return ACCValues;

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
         drag: false,
         theme: [{
            type: 'primary',
            cssFile: './css/theme-primary.css',
            cssClass: 'ACC__THEMEPRIMARY',
            color: '#FCC016',
            colorReverse: '#083689'
         },
         {
            type: 'secondary',
            cssFile: './css/theme-primary.css',
            cssClass: 'ACC__THEMESECONDARY',
            color: '#B0D34B',
            colorReverse: '#171717'
         }],
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
   setupEventListener = function (value) {
      if (options.fontResize) {
         // FONT RESIZE EVENT
         on(_$(DOMSelector.fontIncrease), 'click', fontResize.bind(null, 'increase'));
         on(_$(DOMSelector.fontDecrease), 'click', fontResize.bind(null, 'decrease'));
         on(_$(DOMSelector.fontDefault), 'click', fontResize.bind(null, 'default'));

         // update FZ
         _$(DOMSelector.html).style.fontSize = value.fontSize + 'px';
         UI.toggleClass(value.FIncrease, DOMSelector.fontIncrease, DOMSelector.active);
         UI.toggleClass(value.FDecrease, DOMSelector.fontDecrease, DOMSelector.active);
         UI.toggleClass(value.FDefault, DOMSelector.fontDefault, DOMSelector.active);
      }

      // FONT READABLE
      if (options.readableFont) {
         on(_$(DOMSelector.readableFont), 'click', readableFont);

         // update font family
         UI.toggleClass(value.readableFont, DOMSelector.readableFont, DOMSelector.active);
         UI.toggleClass(value.readableFont, DOMSelector.body, DOMSelector.readableFontClass);
      }

      // CONTRAST THEME
      if (options.ContrastTheme) {
         on(_$(DOMSelector.themePrimary), 'click', themePrimary);
         on(_$(DOMSelector.themeSecondary), 'click', themeSecondary);

         // update contrast
         var primary = options.theme.filter(obj => obj.type === 'primary')[0];
         var secondary = options.theme.filter(obj => obj.type === 'secondary')[0];
         UI.toggleClass(value.themePrimary, DOMSelector.body, primary.cssClass);
         UI.toggleClass(value.themeSecondary, DOMSelector.body, secondary.cssClass);

         // update 
         _$(DOMSelector.themePrimary + '--1').style.borderBottomColor = primary.color;
         _$(DOMSelector.themePrimary + '--2').style.borderTopColor = primary.colorReverse;
         _$(DOMSelector.themeSecondary + '--1').style.borderBottomColor = secondary.color;
         _$(DOMSelector.themeSecondary + '--2').style.borderTopColor = secondary.colorReverse;
      }

      // READ GUIDE LINE
      if (options.readerGuide) {
         on(_$(DOMSelector.readerGuide), 'click', readerGuide);
      }

      // HIGHT LIGHT LINKS
      if (options.highLightLinks) {
         on(_$(DOMSelector.highLightLinks), 'click', highLightLinks);

         // update High Light Links
         UI.toggleClass(value.highLightLinks, DOMSelector.highLightLinks, DOMSelector.active);
         UI.toggleClass(value.highLightLinks, DOMSelector.body, DOMSelector.highLightLinksClass);

      }

      // HIGHT LIGHT HEADINGS
      if (options.highLightHeadings) {
         on(_$(DOMSelector.highLightHeadings), 'click', highLightHeadings);

         // update HIGHT LIGHT
         UI.toggleClass(value.highLightHeadings, DOMSelector.highLightHeadings, DOMSelector.active);
         UI.toggleClass(value.highLightHeadings, DOMSelector.body, DOMSelector.highLightHeadingsClass);
      }

      // SPACING
      if (options.increaseSpacing) {
         var isIE = /*@cc_on!@*/false || !!document.documentMode;
         if (isIE) {
            on(_$(DOMSelector.rangeSlider), 'click', increaseSpacing);

         } else {
            on(_$(DOMSelector.rangeSlider), 'input', increaseSpacing);
         }

         // // update spacing 
         _$(DOMSelector.html).style.wordSpacing = value.increaseSpacing + 'px';
         _$(DOMSelector.rangeSliderInput).value = value.increaseSpacing * 1;
         UI.drawProgress();
      }

      // INCREASE CURSOR
      if (options.increaseCursor) {
         on(_$(DOMSelector.increaseCursor), 'click', increaseCursor);

         // update cursor  
         UI.toggleClass(value.increaseCursor, DOMSelector.increaseCursor, DOMSelector.active);
         UI.toggleClass(value.increaseCursor, DOMSelector.body, DOMSelector.cursorClass);
      }

      // ZOOMING
      if (options.zooming) {
         on(_$(DOMSelector.zoomIn), 'click', zooming.bind(this, 'in'));
         on(_$(DOMSelector.zoomOut), 'click', zooming.bind(this, 'out'));

         // update zooming
         _$(DOMSelector.html).style.zoom = value.zooming + '%';
         UI.toggleClass(value.zoomIn, DOMSelector.zoomIn, DOMSelector.active);
         UI.toggleClass(value.zoomOut, DOMSelector.zoomOut, DOMSelector.active);
      }

      // theme 
      if (options.theme) {
         // add css files 
         UI.addCSSFiles(options.theme);
      }

      // DRAG AND DROP
      if (options.drag) {

         // Internet Explorer
         var isIE = /*@cc_on!@*/false || !!document.documentMode;
         if (isIE) {
            console.info("Please Note that the drag and drop feature doesn't support in your browser!");
         }

         // add drag attribute
         _$('.icon-drag').setAttribute('draggable', 'true');

         var dragStart, dragOver, drop, element, offset, wrapper, style

         element = _$('#accessibility');
         wrapper = _$(DOMSelector.container);

         dragStart = function (event) {
            style = window.getComputedStyle(event.target, null);

            event.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));
         }

         dragOver = function (event) {
            event.preventDefault();
            return false;
         }

         drop = function (event) {
            // console.log(event.clientX)

            offset = event.dataTransfer.getData("text/plain").split(',');
            element.style.left = (event.clientX) + 'px';
            element.style.top = (event.clientY) + 'px';



            // wrapper.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
            // wrapper.style.left = (event.clientX + parseInt(offset[0], 10) + 70) + 'px';

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


   var fontResize = function (type) {
      var fz;
      // update UI
      fz = UI.fontResize(type);

      // update ls
      storage.updateACC(fz)
   }

   var highLightHeadings = function (e) {
      e.preventDefault();

      var h;
      // update UI
      h = UI.highLightHeadings();

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
      var rf;

      // update UI
      rf = UI.readableFont();

      // update ls
      storage.updateACC(rf);
   }

   var readerGuide = function (e) {
      e.preventDefault();

      var rg;

      // update UI
      rg = UI.readerGuide();

      // update ls
      storage.updateACC(rg);
   }

   var increaseCursor = function (e) {
      e.preventDefault();

      var c;
      // update UI
      c = UI.increaseCursor();

      // update ls
      storage.updateACC(c);
   }

   var themePrimary = function (e) {
      e.preventDefault();

      var tp, status;

      // update UI
      tp = UI.themePrimary(options.theme);

      // toggle first theme
      status = tp.themePrimary === true ? false : false;
      storage.updateACC({ themeSecondary: status });

      // update ls
      storage.updateACC(tp);
   }

   var themeSecondary = function (e) {
      e.preventDefault();
      var ts, status;

      // update UI
      ts = UI.themeSecondary(options.theme);

      // toggle second theme
      status = ts.themeSecondary === true ? false : false;
      storage.updateACC({ themePrimary: status });

      // update ls
      storage.updateACC(ts);
   }

   var increaseSpacing = function (e) {
      e.preventDefault();

      var sp;

      // enable save button 
      UI.enableSaveButton();

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
      defaultVal = storage.remove();

      // reset UI
      UI.updateView(defaultVal);


      // enable save button 
      // UI.toggleSaveButton();
   }

   var ls = function (e) {
      e.preventDefault();

      // save ls
      storage.save();

      // disable save button 
      UI.disableSaveButton();
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

      // load event 
      setupEventListener(value);

   }

   window.ACC = {
      init: init
   };

})(UICtrl, itemCtrl, helpersCtrl, storageCtrl);

