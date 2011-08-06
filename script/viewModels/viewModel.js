(function ($, window) {
   
   var viewModel = {
      title: "courrrt"
   };
   
   // Export to global namespace: dribbble.viewModel
   $.extend(window, { dribbble: window.dribbble || { } });
   $.extend(window.dribbble, { viewModel: viewModel });
   
})(jQuery, window);