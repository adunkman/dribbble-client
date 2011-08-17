(function ($, window) {
   
   if (!window.ko || !window.ko.bindingHandlers) {
      throw "ko.bindingHandlers is required.";
   }
   
   var handlers = {};
   
   
   
   // Export to global namespace: ko.bindingHandlers
   $.extend(window.ko.bindingHandlers, handlers);
   
})(jQuery, window);