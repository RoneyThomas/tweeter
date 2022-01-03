const createTweetElement = (tweet) => {
  // timeago used for better date formatting
  let timeagoInst = new timeago();

  // Using jQuery .text method to encode tweet to avoid XSS
  // Using <p class="name">${tweet.user.name}</p> can cause XSS
  const $userName = $('<p></p>').addClass('name').text(tweet.user.name);
  const $userHandle = $('<p></p>').addClass('handle').text(tweet.user.handle);
  const $tweetText = $('<p></p>').addClass('tweet-text').text(tweet.content.text);
  const $tweetTime = $('<p></p>').addClass('tweet-time').text(timeagoInst.format(tweet.created_at));
  const $socialIcons = $('<div></div>').addClass('tweet-icons').append('<i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>');

  const $article = $('<article></article>').append(
    $('<header></header').append(
      $('<div></div>').addClass('profile')
        .append($('<img>', { src: tweet.user.avatars }).addClass('profile-pic'))
        .append($userName)
    ).append($userHandle)
  ).append($tweetText)
    .append($('<footer></footer>')
      .append($('<hr>'))
      .append($('<div></div>').addClass('tweet-footer')
        .append($tweetTime)
        .append($socialIcons)));

  return $article;
};

const renderTweets = (tweets) => {
  // If we already have tweets rendered
  // then only render the last created tweet
  if ($("#tweet-container").contents().length > 1) {
    const $tweet = createTweetElement(tweets[0]);
    $("#tweet-container").prepend($tweet);
  } else {
    // If there are no tweets rendered then render all tweets.
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweet-container").append($tweet);
    }
  }
};

// Check if tweet is valid, mainly checking if the tweet is empty or over the limit.
const validate = (text) => {
  return (text === "" || text === null || text === undefined || text.trim() === "" || text.length > 140 || text.length === 0) ? false : true;
};

// Our tweet failed validate func, now return the error to be displayed
const validateError = (text) => {
  if (text === "" || text === null || text === undefined || text.trim() === "") {
    return "🛑 Empty Tweet ❌";
  } else {
    return "😬 Tweet length too long. Please stay within 140 characters ❌";
  }
};

// Load tweets and renders them based last added to first
const loadTweets = () => {
  $.get("/tweets").then(data => renderTweets(data.reverse()));
};

$(() => {
  // Loads the tweets when page is ready
  loadTweets();

  // Form handler for create tweet
  $("#createTweet").on("submit", e => {
    e.preventDefault();
    // Check for error before posting to server
    if (validate($("#tweet-text").val())) {
      $("#error").slideUp();
      const data = $(e.currentTarget).serialize();
      console.log(data);
      $.post("/tweets", data).done((data) => loadTweets());
      $("#tweet-text").val("");
      $(".counter").text(140);
    } else {
      // If there is an error then error is shown
      $("#error").text(validateError($("#tweet-text").val()));
      $("#error").slideDown();
      // Removes error message after 2.5 seconds
      setTimeout(() => {
        $("#error").slideUp();
      }, 2500);
    }
  });

  // Scroll to write a new tweet
  $("#arrow").click(() => {
    $('html, body').animate({
      scrollTop: $("#error").offset().top
    }, 1000);
    $('#tweet-text').focus();
  });

  // Scroll to the top
  $(window).scroll(() => {
    let fromTopPx = 310; // distance to trigger
    let scrolledFromtop = $(window).scrollTop();
    if (scrolledFromtop > fromTopPx) {
      $("nav").addClass('scrolled');
      $(".fab").show();
    } else {
      $("nav").removeClass('scrolled');
      $(".fab").hide();
    }
  });
});