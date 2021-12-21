/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const createTweetElement = (tweet) => {
  let timeagoInst = new timeago();

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

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $("#tweet-container").append($tweet);
  }
};

$(function() {
  renderTweets(data);
});