$(function() {
  console.log("ready!");
  $("#tweet-text").on("input", function() {
    let currentLength = $(this).val().length;
    let counter = $(this).siblings("div").children("output.counter");

    console.log(counter);
    counter.text(140 - currentLength);
    counter.toggleClass("counter-over-limit", currentLength > 140);
  });
});