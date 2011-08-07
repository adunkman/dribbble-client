(function ($, window) {
   
   var player = function (api) {
      return {
         id: api.id,
         name: api.name,
         username: api.username,
         avatar: api.avatar_url,
         createdAt: new Date(api.created_at),
      
         location: {
            description: api.location,
            map: "http://maps.googleapis.com/maps/api/staticmap?zoom=13&size=200x150&sensor=false&maptype=terrain&center=" + api.location
         },
         
         twitter: {
            username: api.twitter_screen_name,
            profile: "http://twitter.com/" + api.twitter_screen_name
         },
      
         counts: {
            shots: api.shots_count,
            draftees: api.draftees_count,
            followers: api.followers_count,
            following: api.following_count,
            comments: api.comments_count,
            commentsReceived: api.comments_received_count,
            likes: api.likes_count,
            likesReceived: api.likes_received_count,
         }
      };
   };
   
   // Export to global namespace: courrrt.player
   $.extend(window, { courrrt: window.courrrt || { } });
   $.extend(window.courrrt, { player: player });
   
})(jQuery, window);