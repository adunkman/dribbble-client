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
      state: ko.observable(),
      stats: ko.observable()
   });
   
   list.reset = function () {
      
      this.stats({
         page: null,
         pages: null,
         per_page: null,
         total: null
      });
      
      this.shots([]);
      
   }.bind(list);
   
   list.reset();
   
   list.fetch = function () {
      
      var page = this.stats().page;
      page = page === null ? 1 : page + 1;
      
      if (this.stats().pages !== null && this.stats().pages < page) {
         return;
      }
      
      if (this.state() === "loading") {
         return;
      }
      
      this.state("loading");
      
      $.ajax({
         url: this.feeds[this()],
         method: "get",
         data: { page: page, per_page: 30 },
         dataType: "jsonp",
         success: function (data) {
            
            var shots = this.shots();
            $.each(data.shots, function (index, shotData) {
               shots.push(new shot(shotData));
            });
            this.shots(shots);
            this.state("");
            
            this.stats({
               page: data.page,
               pages: data.pages,
               per_page: data.per_page,
               total: data.total
            });
            
         }.bind(this)
      });
      
   }.bind(list);
   
   list.subscribe(function () {
      this.reset();
      this.fetch();
   }, list);
   
   // Export to global namespace: courrrt.viewModel.list
   $.extend(window.courrrt.viewModel, { list: list });
   
})(jQuery, window);