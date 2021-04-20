$(document).ready(function() {
    // $("button").on("click", function() {
    //   $("h1").slideToggle();
    // });

    $("#button").on("click", function() {
      $("h1").animate({margin: "20%"});      // Takes as argument a CSS style with only NUMERIC values.
    });
});
