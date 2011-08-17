(function ($, window) {
   
   if (!window.courrrt || !window.courrrt.viewModel) {
      throw "courrrt.viewModel is required."
   }
   
   var shot = ko.observable();
   
   shot.reset = function () {
      
      this(null);
      
   }.bind(shot);
   
   shot.open = function () {
     if (this() === null) {
        return;
     }
     
     // Open a new window with this shot in it.
     window.open(this().url, "_blank"); 
   }.bind(shot);
   
   shot.openPlayer = function () {
     if (this() === null) {
        return;
     }
     
     // Open a new window with this shot in it.
     window.open(this().player.dribbble.profile, "_blank");
   }.bind(shot);
   
   window.courrrt.viewModel.reset.subscribe(shot.reset);
   window.courrrt.viewModel.list.subscribe(shot.reset);
      
   // Export to global namespace: courrrt.viewModel.list
   $.extend(window.courrrt.viewModel, { shot: shot });
   
})(jQuery, window);