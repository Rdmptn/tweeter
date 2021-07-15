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
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

$(document).ready(function() {
  renderTweets(data);
  $('#post-tweet').submit(function() {
    event.preventDefault();
    let storeTweet = $('#tweet-text').serialize();
    $.post('tweets', storeTweet) 
    // .then renderTweets(data);
  });
});

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    let thisTweet = createTweetElement(tweet);
    $('#tweets-container').append(thisTweet);
  }
};

const createTweetElement = function(tweet) {
  let $tweet = $(`
  <article class="tweetData">
      <header class="tweetHeader">
        <div class="tweetUserDetails">
          <img src="${tweet.user.avatars}" width="64" height="64">
          <p class="tweetUser">${tweet.user.name}</p>
        </div>
        <div class="userAt">
          <p>${tweet.user.handle}</p>
        </div>
      </header>
      <section class="tweetContent">
        <p>${tweet.content.text}</p>
      </section>
      <footer class="tweetFooter">
        <section class="timeSinceTweet">
          <p>${timeago.format(tweet.created_at)}</p>
        </section>
        <section class="tweetButtons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </section>
      </footer>
    </article>
  `);
  return $tweet;
};