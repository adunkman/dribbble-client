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
      stats: ko.observable(),
      state: ko.observable()
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
   
   list.next = function () {
      this.go(1);
   }.bind(list);
   
   list.previous = function () {
      this.go(-1);
   }.bind(list);
   
   list.go = function (shift) {
      var index, selected = this.shot(), shots = this.list.shots();
      
      if (selected === null) {
         this.shot(shots[0]);
         this.list.scrollTo(shots[0]);
         return;
      }
      
      // Find the index of the selected shot.
      $.each (shots, function (i, shot) {
         if (selected.id === shot.id) {
            index = i;
            return false; // break
         }
      });
      
      if (index === undefined) {
         return;
      }
      
      index += shift;
      
      if (index < 0) {
         index = 0;
      }
      if (index >= shots.length) {
         index = shots.length - 1;
      }
      
      this.shot(shots[index]);
      this.list.scrollTo(shots[index]);
   }.bind(window.courrrt.viewModel);
   
   list.scrollTo = function (shot) {
      var $element = $("img[src='" + shot.image.teaser_url + "']");
      var scrollTop = $("html, body").scrollTop(), 
         windowHeight = $(window).height(),
         offset = $element.offset().top,
         height = $element.height();
      
      if (offset + height > scrollTop + windowHeight || offset < scrollTop) {
         $("html, body").stop().animate({
            scrollTop: offset + height - windowHeight / 2
         }, 500, "easeInOutExpo");
      }
   }.bind(list);

   list.subscribe(function () {
      this.reset();
      this.fetch();
   }, list);
   
   // Export to global namespace: courrrt.viewModel.list
   $.extend(window.courrrt.viewModel, { list: list });
   
})(jQuery, window);