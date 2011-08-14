(function ($, window) {
   
   if (!window.ko || !window.ko.bindingHandlers) {
      throw "ko.bindingHandlers is required.";
   }
   
   var handlers = {};
   
   // Sets the text of the element to be the relative time ago.
   handlers.timeAgo = {
      update: function (element, valueAccessor) {
         $(element).attr('title', ko.utils.unwrapObservable(valueAccessor())).timeago();
      }
   }
   
   // Calls a function when an element is scrolled within a certain number
   // of pixels from the top or bottom.
   handlers.scroll = {
      init: function (element, valueAccessor) {
         var $element = $(element);
         var settings = valueAccessor();
         
         if (!settings || !settings.call || !settings.within || !settings.of) {
            throw "Parameters call, within, and of are required.";
         }
         
         // If a "watch" parameter was provided, subscribe to its changes and
         // fire a scroll event.
         if (settings.watch) {
            ko.utils.unwrapObservable(settings.watch);
         }
         
         var $viewport = $element;
         var $view = $element;
         
         // If we're detecting scrolling on the body instead of an overflowed
         // div, then the view and viewport aren't the same.
         if ($element.is("body")) {
            $view = $("html");
            $viewport = $(window);
         }
         
         $viewport.bind("scroll.bindingHandler", function () {
            var offset;
            
            if (settings.of === "top") {
               offset = $element.scrollTop();
            }
            else {
               offset = $view[0].scrollHeight - $viewport.height() - $viewport.scrollTop();
            }
            
            if (offset <= settings.within) {
               settings.call();
            }
         });
      },
      update: function (element, valueAccessor) {
         // Maintain subscription
         ko.utils.unwrapObservable(valueAccessor().watch);
         
         var $element = $(element);
         if ($element.is("body")) {
            $element = $(window);
         }
         
         $element.trigger("scroll.bindingHandler");
      }
   };
   
   // Export to global namespace: ko.bindingHandlers
   $.extend(window.ko.bindingHandlers, handlers);
   
})(jQuery, window);