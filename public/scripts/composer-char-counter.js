$(function() {
  $("#tweet-text").on("input", function() {
    let currentLength = $(this).val().length;
    let counter = $(this).siblings("div").children("output.counter");

    counter.text(140 - currentLength);
    counter.toggleClass("counter-over-limit", currentLength > 140);
  });

  $(".fab").hide();
  $(".fab").click(function() {
    $('html, body').animate({
      scrollTop: $("#error").offset().top
    }, 1000);
    $('#tweet-text').focus();
  });
});