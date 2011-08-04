(function ($, window) {
   
   var viewModel = {
      url: ko.observable(),
      error: ko.observable(false),
      
      items: ko.observableArray()
   };
   
   // Boolean observable, true if error has occurred, else false.
   viewModel.hasError = ko.dependentObservable(function () {
      return (this.error() !== false);
   }, viewModel);
   
   
   
   // Reset data and fetch new results on URL change.
   viewModel.url.subscribe(function (url) {
      this.items([]);
      
      $.ajax({
         url: url,
         method: "get",
         dataType: "jsonp",
         success: function (data) {
            this.error(false);
            var items = this.items();
            
            $.each(data.shots, function (index, item) {
               items.push(item);
            });
            
            this.items(items);
            
         }.bind(this)
      });
   }, viewModel);
   
   $.extend(window, { dribbble: window.dribbble || { } });
   $.extend(window.dribbble, { viewModels: window.dribbble.viewModels || { } });
   $.extend(window.dribbble.viewModels, { listView: viewModel });
   
})(jQuery, window);