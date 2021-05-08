$(document).ready(function() {
  alert("Hi!");
});

$('button[name="change-color"]').click(function() {

  $("body").toggleClass("colored-background");
});

$(":button").click(function() {
  alert("Ho!");
});
