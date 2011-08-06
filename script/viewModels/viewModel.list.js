(function ($, window) {
   
   if (!window.dribbble || !window.dribbble.viewModel) {
      throw "dribbble.viewModel is required."
   }
   
   var list = ko.observable();
   $.extend(list, {
      feeds: {
         popular: "http://api.dribbble.com/shots/popular",
         everyone: "http://api.dribbble.com/shots/everyone",
         debuts: "http://api.dribbble.com/shots/debuts"
      },

      items: ko.observableArray(),
      stats: ko.observable(),
      state: ko.observable()
   });

   list.reset = function () {
      this.items([]);
      this.stats({
         page: null,
         pages: null,
         per_page: null,
         total: null
      });
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
         data: { page: page },
         dataType: "jsonp",
         success: function (data) {
            
            var items = this.items();
            $.each(data.shots, function (index, item) {
               items.push(item);
            });
            this.items(items);
            
            this.stats({
               page: data.page,
               pages: data.pages,
               per_page: data.per_page,
               total: data.total
            });
            
            this.state("");
            
         }.bind(this)
      });
   }.bind(list);

   list.subscribe(function () {
      this.reset();
      this.fetch();
   }, list);
   
   // Export to global namespace: dribbble.viewModel.list
   $.extend(window.dribbble.viewModel, { list: list });
   
})(jQuery, window);