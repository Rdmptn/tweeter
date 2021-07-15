/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 
$(document).ready(function() {
  
  const loadTweets = function() {
    $.get('tweets', function(storedTweets) {
      $('.loadedTweets').empty();
      renderTweets(storedTweets);
    });
  };
  
  loadTweets(); 
  
  $('#post-tweet').submit(function() {
    event.preventDefault();
    let storeTweet = $('#tweet-text').serialize();
    if (storeTweet.length - 5 >= 140) {
      $('#errorMessage').html('💥 Cannot post a tweet over 140 characters, please try again! 💥');
      $('#errorMessage').slideDown();
      return;
    } else if (storeTweet.length - 5 === 0) {
      $('#errorMessage').html('💥 Cannot post an empty tweet, please try again! 💥');
      $('#errorMessage').slideDown();
      return;
    }
    $.post('tweets', storeTweet) 
    .then(function() {
      $('#errorMessage').slideUp();
      $('#tweet-text').val('');
      $('.counter').val('140');
      loadTweets();
    });
  });

});

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    let thisTweet = createTweetElement(tweet);
    $('.loadedTweets').prepend(thisTweet);
  }
};

const createTweetElement = function(tweet) {
  
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
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
        <p>${escape(tweet.content.text)}</p>
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