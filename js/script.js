(function($) {
  "use strict";
  // Windows load
  $(window).load(function() {
    // Site loader
    $(".loader-inner").fadeOut();
    $(".loader")
      .delay(200)
      .fadeOut("slow");
  });
})(jQuery);
