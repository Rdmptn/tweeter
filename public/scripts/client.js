/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 
// Entire client code wrapped in ready function to ensure page fully loads before interactive features can be called
$(document).ready(function() {
  
  // Grabs database, then clears the page and adds all the tweets from the database back to the page
  const loadTweets = function() {
    $.get('tweets', function(storedTweets) {
      $('.loadedTweets').empty();
      renderTweets(storedTweets);
    });
  };
  
  // Runs once on page load to display tweets already stored in database
  loadTweets(); 
  
  // Variable for default form visibility where up means hidden, since the form is hidden by default
  let visStatus = 'up';
  
  // Function for hiding/displaying new tweet form
  const writeTweet = function(currentVisibility) {
    if (currentVisibility === 'up') {
      $('.new-tweet').slideDown();
      $('#tweet-text').focus();
      visStatus = 'down';
    } else {
      $('.new-tweet').slideUp();
      visStatus = 'up';
    }
  };
 
  // Top button which hides/displays form
  $('.newtweet').click(function() {
    writeTweet(visStatus);
  });
  
  // Bottom button which scrolls to top of page and displays the form if hidden, but never hides it
  $('#bottomTweetButton').click(function() {
    $(window).scrollTop(0);
    writeTweet("up");
  });
  
  // Logic for posting a new tweet and displaying it on the page, returns error messages on the screen if certain criteria aren't met
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

// Loops through array of tweet objects, creates a new tweet for each object and displays it prior to the previous one
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    let thisTweet = createTweetElement(tweet);
    $('.loadedTweets').prepend(thisTweet);
  }
};

// Creates a tweet from information in a given object
const createTweetElement = function(tweet) {
  
  // Function to ensure code blocks are tweeted as text and can't interact with the app
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  // Creates an html article containing data extracted from database for that tweet
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