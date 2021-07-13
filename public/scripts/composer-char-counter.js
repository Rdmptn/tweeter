$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let remainingChars = 140 - this.value.length;
    let counter = $(this).parent().children('.bottomstuff').children('.counter')[0];
    counter.innerHTML = remainingChars;
    if (remainingChars <= 0) {
      $(counter).addClass("red");
    } else {
      $(counter).removeClass("red");
    }
  });
});