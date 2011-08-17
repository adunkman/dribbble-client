(function ($, window) {
   
   if (!window.courrrt || !window.courrrt.viewModel) {
      throw "courrrt.viewModel is required."
   }
   
   if (!window.courrrt.shot) {
      throw "courrrt.shot is required."
   }
   
   var shot = window.courrrt.shot;
   
   var list = $.extend(ko.observable(), {
      feeds: {
         popular: "http://api.dribbble.com/shots/popular",
         everyone: "http://api.dribbble.com/shots/everyone",
         debuts: "http://api.dribbble.com/shots/debuts"
      }, 
      
      shots: ko.observableArray(),
      state: ko.observable()
   });
   
   list.subscribe(function () {
      
      this.state("loading");
      
      $.ajax({
         url: this.feeds[this()],
         method: "get",
         data: { page: 1, per_page: 30 },
         dataType: "jsonp",
         success: function (data) {
            
            var shots = [];
            $.each(data.shots, function (index, shotData) {
               shots.push(new shot(shotData));
            });
            this.shots(shots);
            this.state("");
            
         }.bind(this)
      });
      
   }, list);
   
   // Export to global namespace: courrrt.viewModel.list
   $.extend(window.courrrt.viewModel, { list: list });
   
})(jQuery, window);