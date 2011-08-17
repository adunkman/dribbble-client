(function ($, window) {
   
   if (!window.courrrt || !window.courrrt.viewModel) {
      throw "courrrt.viewModel is required."
   }
   
   var shot = {
   };
      
   // Export to global namespace: courrrt.viewModel.list
   $.extend(window.courrrt.viewModel, { shot: shot });
   
})(jQuery, window);