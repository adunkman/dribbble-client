(function ($, window) {
   
   var viewModel = {
      title: "courrrt"
   };
   
   // Export to global namespace: courrrt.viewModel
   $.extend(window, { courrrt: window.courrrt || { } });
   $.extend(window.courrrt, { viewModel: viewModel });
   
})(jQuery, window);