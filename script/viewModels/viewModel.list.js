(function ($, window) {
   
   if (!window.courrrt || !window.courrrt.viewModel) {
      throw "courrrt.viewModel is required."
   }
   
   if (!window.courrrt.shot) {
      throw "courrrt.shot is required."
   }
   
   var shot = window.courrrt.shot;
   
   var list = {
   };
   
   // Export to global namespace: courrrt.viewModel.list
   $.extend(window.courrrt.viewModel, { list: list });
   
})(jQuery, window);