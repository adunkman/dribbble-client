(function ($, window) {
   
   var viewModel = {
      reset: ko.observable()
   };
   
   viewModel.reset.subscribe(function () {
      
      // Scroll to top
      $("html, body").stop().animate({
         scrollTop: 0
      }, 1000, "easeInOutExpo");
      
   });
   
   // Export to global namespace: courrrt.viewModel
   $.extend(window, { courrrt: window.courrrt || { } });
   $.extend(window.courrrt, { viewModel: viewModel });
   
})(jQuery, window);