$(document).ready(() => {
  let headerSelector = $("h1");
  $("button").click(() => headerSelector.toggleClass("big-title"));
  $("body").on("keypress", (event) => {
    headerSelector.text(event.key);
    console.log(event.key);
  });
  headerSelector.before("<button>New Button!</button>");
  headerSelector.on("mouseover", () => headerSelector.toggleClass("big-title"));
});
