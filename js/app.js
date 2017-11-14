var clickCount = 0;

$('#cat-img').click(function(e) {
    clickCount ++;
    $('#count').text("You've clicked the cat " + clickCount + " times");
});