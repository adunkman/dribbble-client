(function ($, window) {
   
   if (!window.courrrt || !window.courrrt.viewModel) {
      throw "courrrt.viewModel is required."
   }
   
   var shot = ko.observable();
   
   // Export to global namespace: courrrt.viewModel.list
   $.extend(window.courrrt.viewModel, { shot: shot });
   
})(jQuery, window);